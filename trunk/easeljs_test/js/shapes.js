/*
*	This file contains the shape creating and effecting functions.
*/

/*********************************************************************
*
*		OBJECTS
*
*/


(function () {

	/*
	*	the Cloud object and constructor
	*/
	function ShapeCloud( inX,inY, inFillColor, inAlpha, inScaleRnd ){

		// variables
		this.x			= inX;
		this.y			= inY;
		this.fillColor	= inFillColor;
		this.alpha		= inAlpha;
		this.scaleRnd	= inScaleRnd;		// to randomize the scale

		// "constructor"
		// this.shape		= this.create( inX,inY, inFillColor, inAlpha );
		this.shape		= null;

		// this.shape	= null;

		// methods
		// this.create		= shapeCloudCreate;
		// this.addShadow	= shapeCloudAddShadow;

		// this.showCallback	= shapeCloudShowCallback;

		// this.show		= shapeCloudShow;




		/*
		*	draw a new cloud from JSON data and return with a Shape object
		*/
		this.create	= function ( inX,inY, inFillColor, inAlpha ){

			var jsonStr = '{"moveTo":{"x":140,"y":200},"quadraticCurveTo":[{"x":135,"y":155,"ref_x":180,"ref_y":150},{"x":220,"y":110,"ref_x":260,"ref_y":130},{"x":300,"y":100,"ref_x":340,"ref_y":130},{"x":390,"y":125,"ref_x":400,"ref_y":170},{"x":440,"y":190,"ref_x":420,"ref_y":230},{"x":420,"y":270,"ref_x":380,"ref_y":270},{"x":340,"y":290,"ref_x":300,"ref_y":270},{"x":260,"y":290,"ref_x":220,"ref_y":270},{"x":185,"y":275,"ref_x":170,"ref_y":250},{"x":185,"y":275,"ref_x":170,"ref_y":250},{"x":130,"y":240,"ref_x":140,"ref_y":200}]}';
			var cloudCoordArr = jQuery.parseJSON(jsonStr);

			var cloudGraphics = new Graphics();

			// All drawing methods in Graphics return the Graphics instance, so they can be chained together.
			cloudGraphics.beginFill( Graphics.getRGB( inFillColor, inAlpha) ).setStrokeStyle(6).beginLinearGradientStroke(["#000","#FFF"], [0, 1], 100, 100, 440, 300);

			cloudGraphics.moveTo(cloudCoordArr["moveTo"]["x"], cloudCoordArr["moveTo"]["y"]);


			for (var i=0; i<cloudCoordArr.quadraticCurveTo.length; i++){
				cloudGraphics.quadraticCurveTo( 
					cloudCoordArr["quadraticCurveTo"][i]["x"],
					cloudCoordArr["quadraticCurveTo"][i]["y"],
					cloudCoordArr["quadraticCurveTo"][i]["ref_x"],
					cloudCoordArr["quadraticCurveTo"][i]["ref_y"]
					);
			}

			cloudGraphics.closePath();


			// Multiple drawing methods are possible in the same Graphics instance.
			// I added some random snow to the cloud graphics in this example:
			var tmpX	= 0;
			var tmpY	= 0;
			for ( var i=0; i<5; i++ ){
				tmpX		= Math.round((Math.random())*400);
				tmpY		= Math.round((Math.random()-0.2)*100);
				tmpAlpha	= Math.random();
				cloudGraphics.beginFill( Graphics.getRGB( Common.getRandomColor(), tmpAlpha ) );
				cloudGraphics.setStrokeStyle(1);
				cloudGraphics.beginStroke('#fff');
				cloudGraphics.drawCircle( 135 + tmpX, 300 + tmpY, 5 );
			}



			/*
			*	Doc: A Shape allows you to display vector art in the display list. It composites a Graphics instance which exposes all of the vector drawing methods. 
			*	The Graphics instance can be shared between multiple Shape instances to display the same vector graphics with different positions or transforms.
			*/

			// Peti: The graphics object exists only virtual. We cannot draw it onto the canvas in normal way. (It's possible but not a good idea.)
			// So we need to add it to a new Shape.
			var cloudShape	= new Shape(cloudGraphics);
			cloudShape.x	= inX;
			cloudShape.y	= inY;

			return cloudShape;
		}



		/*
		*	generate shadow around the cloud shape
		*	in:		cloud shape
		*	return: -
		*/
		this.addShadow	= function (){
			var	shadow	= new Shadow( "gray", 10, 10, 3 );
			this.shape.shadow	= shadow;
		}



		/****************************
		*	The "constructor" part
		*/

		this.shape		= this.create( inX,inY, inFillColor, inAlpha ); 


	}



// connect the Bubble to the game namespace
game.Bubble	= Bubble;

}
// This line will generate the game namespace if it doesn't exists.
(this.game = this.game		 || {}));
