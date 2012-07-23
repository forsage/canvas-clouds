	
/*
* Global variables
*/
	
	// Bubble parameters
	var DEFAULT_BUBBLE_X		= 150;
	var DEFAULT_BUBBLE_Y		= 150;
	var DEFAULT_BUBBLE_RADIUS	= 30;
	
	// Layers, stages
	var layerCloud;		// normal cloud layer
	var layerBgCloud;	// background layer
	var stage;
	
	var STAGE_WIDTH				= 900;
	var STAGE_HEIGHT			= 400;
	var CLOUD_COLOR_CONTOUR		= "#D8EDF2";
	var CLOUD_COLOR_FILL		= "lightgray";
	
	// Cloud parameters
	var cloudArr				= new  Array();
	var cloudCount				= 3;
	
	
	// development (temporary) parameters
	var	sebesseg_oszto			= 2;
	var	irany_szorzo			= 1;
	
	var programStartDate		= new Date;
	var programStartTime		= programStartDate.getTime();
	var lastLogT				= programStartTime;
	
	// for measuring FPS
	var currDateFPS				= new Date;
	var currTimeFPS				= currDateFPS.getTime();
	

/*
*	the main function
*/
$(document).ready( function() {

	/* Get the canvas and set the its size.
	*		(The size setting works only this way. why??)
	*/
	var canvas		= $('#container').get(0);
	canvas.width	= STAGE_WIDTH;
	canvas.height	= STAGE_HEIGHT;
//	$('#container').css('width','900px');	// this solution would be nice but the size setting from css is buggy
//	$('#container').css('height','300px');

	/* A stage is the root level Container for a display list. Each time its tick method is called, it will render its display list to its target canvas. */
	stage		= new Stage(canvas);
	layerCloud	= new Container();

	game.main.initClouds();
	// stage.enableMouseOver();

	var sun	= new game.Sun();
	stage.addChild(sun.shape);

	// set the global ticker which used by tween.js and easeljs animations
	Ticker.setFPS(30);
	Ticker.addListener(tick);

}
)


//function called by the Tick instance at a set interval
function tick()
{

	$('#FPS').val('FPS: '+ Ticker.getMeasuredFPS() );
	//re-render the stage
	stage.update();
}




/*
*	The main object
*/


(function(namespace){
	var main	= new Object;

	/*
	*	first time cloud generating
	*/
	main.initClouds	= function (){

		var offset	= cloudArr.length;

		// generate (draw) clouds from cloudArr
		for(var i=offset;i<(cloudCount+offset);i++){
			x			= Math.round( STAGE_WIDTH/cloudCount )*i;	// x position (equal cloud distance)
			y			= Math.round( (Math.random()-0.5)*40 );		// random y position (offset)
			color		= game.common.getRandomColor();							// generate random color
			alpha		= Math.random();							// alpha
			scaleRnd	= (Math.random())/2+0.5;					// random scaling - maximum +-25%

			var cloud 	= new game.Cloud( x, y, color, alpha, scaleRnd );

			// cloud.shape	= cloud.create();
			cloud.addShadow();

			layerCloud.addChild(cloud.shape);

			//store clouds in a global array too
			cloudArr[i]	= cloud;
	//		cloud.show();
		}

		// start the effects on every cloud
		var tweenArr	= Array();
		var tmpX,tmpY		= 0;
		for(var i=offset;i<(cloudCount+offset);i++){
			tmpX		= Math.round((Math.random())*1000)-200;
			tmpY		= Math.round((Math.random()-0.2)*10);
			tmpAlpha	= Math.random();
			tweenArr[i] = Tween.get( cloudArr[i].shape );
			tweenArr[i].to({x:170,y:50,alpha:0.1},4000, Ease.elasticInOut ).to({x:tmpX, y:tmpY, alpha:0.9},4000, Ease.bounceInOut).to( {rotation:360}, 4000, Ease.elasticInOut );


			// show information about cloud
			cloudArr[i].shape.onClick	= function(mouseEvent){ 
					tmpStr	= " x:" + Math.round(this.x) + " y:" + Math.round(this.y) +
								" \n skewX:" + this.skewX  + "  skewY:" + this.skewY +
								" \n regX:" + this.regX  + "  regY:" + this.regY + 
								" \n alpha: " + this.alpha + 
								" \n color: "
								;
					alert( tmpStr ) 
				};




			// add simple drag'n drop to every cloud shape
			(function (target){
				cloudArr[i].shape.onPress	= function(evt){
					var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};

					// add a handler to the event object's onMouseMove callback
					// this will be active until the user releases the mouse button:
					evt.onMouseMove = function(ev) {
						target.x = ev.stageX+offset.x;
						target.y = ev.stageY+offset.y;
						// indicate that the stage should be updated on the next tick:
						update = true;
					}
				}
				cloudArr[i].shape.onMouseOver = function() {
					target.scaleX = target.scaleY = target.scale*1.2;
					update = true;
				}
				cloudArr[i].shape.onMouseOut = function() {
					target.scaleX = target.scaleY = target.scale;
					update = true;
				}
			})(cloudArr[i].shape)

		}

		stage.addChild(layerCloud);

		stage.update();

	}	// end main.initClouds



	/*
	*	Cache testing:
	*	Add cache to every cloud shape;
	*	Comment: The caching will be slow if the cached graphic is too big. 
	*/
	main.turnOnCache	= function( sizeX, sizeY ){
		// set the defult size
		if (sizeX==0){
			sizeX=300;
			sizeY=180;
		}

		for  ( var i=0; i<cloudArr.length; i++){
			//turn on the cache
			cloudArr[i].shape.cache(130,110,sizeX,sizeY);					// NA EZÉRT SZÍVÁS A DEFAULT FELHŐ OFFSET
		}
	}


	main.turnOffCache	= function(){

		for  ( var i=0; i<cloudArr.length; i++){
			//turn on the cache
			cloudArr[i].shape.uncache();
		}
	}


namespace.main	= main;
}(game || (game = {})));
var game;