/*
*	This file contains the shape creating and effecting functions.
*/

/*********************************************************************
*
*		OBJECTS
*
*/

/*
*	the Cloud object
*/
function ShapeCloud( inX,inY, inFillColor, inAlpha, inScaleRnd, idCloud ){
	// variables
	this.x			= inX;
	this.y			= inY;
	this.fillColor	= inFillColor;
	this.alpha		= inAlpha;
	this.scaleRnd	= inScaleRnd;		// to randomize the scale

	// "constructor"
	this.shape		= shapeCloudCreate( inX,inY, inFillColor, inAlpha, idCloud );

	// methods
	this.create		= shapeCloudCreate;
	this.show		= shapeCloudShow;
	this.addShadow	= shapeCloudAddShadow;

	this.showCallback	= shapeCloudShowCallback;

}


/*
*	the Bubble object
*/
function ShapeBubble(){
	// "constructor"
	this.shape	= shapeCreateBubble();
}


/*********************************************************************
*
*		METHODS
*
*/


/*
*	create a new cloud shape and return with it
*/
function shapeCloudCreate( inX,inY, inFillColor, inAlpha, idCloud ){
	var cloud = new Kinetic.Shape({
		drawFunc: function() {
			var x0  = 0;
			var y0  = 0;
			//              var x0 = i * 50 + 50 * rnd;
			//              var y0 = i * 32 + 32 * rnd;
			var context = this.getContext();
			context.beginPath();
			context.moveTo(x0 + 140, y0 + 200);
			context.quadraticCurveTo(x0 + 135, y0 + 155, x0 + 180, y0 + 150);
			context.quadraticCurveTo(x0 + 220, y0 + 110, x0 + 260, y0 + 130);
			context.quadraticCurveTo(x0 + 300, y0 + 100, x0 + 340, y0 + 130);
			context.quadraticCurveTo(x0 + 390, y0 + 125, x0 + 400, y0 + 170);
			context.quadraticCurveTo(x0 + 440, y0 + 190, x0 + 420, y0 + 230);
			context.quadraticCurveTo(x0 + 420, y0 + 270, x0 + 380, y0 + 270);
			context.quadraticCurveTo(x0 + 340, y0 + 290, x0 + 300, y0 + 270);
			context.quadraticCurveTo(x0 + 260, y0 + 290, x0 + 220, y0 + 270);
			context.quadraticCurveTo(x0 + 185, y0 + 275, x0 + 170, y0 + 250);
			context.quadraticCurveTo(x0 + 130, y0 + 240, x0 + 140, y0 + 200);
			context.closePath();
			this.fill();
			this.stroke();
		},
		fill: inFillColor,
		stroke: CLOUD_COLOR_CONTOUR,
		strokeWidth: 4,
		scale: [0,0],
		alpha: inAlpha,
		draggable: false,
		x:inX,
		y:inY, 
		id: idCloud
	});

	return cloud;
}



/*
*	generate shadow around the cloud shape
*	in:		cloud shape
*	return: -
*/
function shapeCloudAddShadow(){
	this.shape.setShadow({
		color: 'black',
		blur: 10,
		offset: [10, 10],
		alpha: 0.5
	});
}


/*
*	Showing the cloud = start effect (now: blow up effect)
*/
function shapeCloudShow() {
	log( 'shapeCloudShow this.shape.id: '  + this.shape.getId());
	var shapeCloud = this;
	var shapeCallback = function(shapeCloud) {
		log( 'shapeCallback shapeCloud.id: '  + shapeCloud.shape.getId());
		shapeCloud.showCallback();
	};
	this.shape.transitionTo({
		scale: {
			x:0.5 + this.scaleRnd,
			y:0.5 + this.scaleRnd
		},
		easing: 'bounce-ease-out',
		duration:2,
		// If used as plain variable, 'this' refers to ShapeClod object,
		// but the callback happens at the beginning of the previous animation
//		callback: shapeCallback(this)
		// If used inside a function, it will happen at the end of the previous 
		// animation, but 'this' is not the ShapeCloud object anymore.
		// Instead, we use the local variable 'that': inside a closure we have
		// access to the local variable even after the main function has returned
		callback: function() { shapeCallback(shapeCloud) }
	});
	//alert(this);
}


function shapeCloudShowCallback(){
	log( 'shapeCloudShowCallback this.shape.id: '  + this.shape.getId());
	this.shape.transitionTo({
		x: Math.round((Math.random()-0.5)*1000),
		y: Math.round((Math.random()-0.5)*100),
		duration: 2
	});
}

/*
*	generate the bubble shape
*/
function shapeCreateBubble(){
	var bubble	= new Kinetic.Circle({
		x:DEFAULT_BUBBLE_X,
		y:DEFAULT_BUBBLE_Y,
		radius:DEFAULT_BUBBLE_RADIUS,
		fill:"yellow",
		stroke:"black",
		strokeWidth:4
	});
	return bubble;
}
