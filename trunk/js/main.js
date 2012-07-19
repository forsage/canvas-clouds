
 /*
* Global variables
*/

	// Bubble parameters
	DEFAULT_BUBBLE_X		= 150;
	DEFAULT_BUBBLE_Y		= 150;
	DEFAULT_BUBBLE_RADIUS	= 30;

	// Layers, stages
	var layerCloud;		// normal cloud layer
	var layerBgCloud;	// background layer
	var stage;

	var STAGE_WIDTH			= 900;
	var STAGE_HEIGHT		= 640;
	var CLOUD_COLOR_CONTOUR	= "#D8EDF2";
	var CLOUD_COLOR_FILL	= "lightgray";

	// Cloud parameters
	var cloudArr	= new  Array();
	var cloudCount	= 3;


	// development (temporary) parameters
	var	sebesseg_oszto		= 2;
	var	irany_szorzo		= 1;

	var programStartDate	= new Date;
	var programStartTime	= programStartDate.getTime();
	var lastLogT			= programStartTime;

	// for measuring FPS
	var currDateFPS = new Date;
	var currTimeFPS	= currDateFPS.getTime();


/*
*	the main function
*/
window.onload = function() {

	stage = new Kinetic.Stage({
		container: 'container',
		width: STAGE_WIDTH,
		height: STAGE_HEIGHT
	});


	// generate cloud layers
	layerCloud = new Kinetic.Layer();
	stage.add(layerCloud);

	layerBgCloud = new Kinetic.Layer();
	stage.add(layerBgCloud);

}



/*
*	first time cloud generating
*/
function initClouds(){

	/*
	*	initialize the coulds
	*/

	// generate (draw) clouds from cloudArr
	for(var i=0;i<cloudCount;i++){
		x			= Math.round( STAGE_WIDTH/cloudCount )*i;	// x position (equal cloud distance)
		y			= Math.round( (Math.random()-0.5)*40 );		// random y position (offset)
		color		= get_random_color();						// generate random color
		alpha		= Math.random();							// alpha
		scaleRnd	= (Math.random()-0.5)/2;					// random scaling - maximum +-25%

		var cloud 	= new ShapeCloud( x, y, color, alpha, scaleRnd, "cloud_" + i );

		cloud.addShadow();

		layerCloud.add(cloud.shape);

		//store cloud in a global array
		cloudArr[i]	= cloud;
//		cloud.show();
	}


	// start the "blowing up" effect on every cloud
	for(var i=0;i<cloudCount;i++){
		cloudArr[i].show();
	}


};

// "programozhato" kinect animacio tesztelese
function test_kinectanim(){

	var amplitude = 150;
	var period = 2000;
	// in ms
	var centerX = stage.getWidth();

	var CloudX	= 250;
	var animStartDateFPS	= new Date;
	var animStartTimeFPS	= animStartDateFPS.getTime();
	var frameCount	=	0;
	var eltolas	=0;
	var	irany	=1;

	bubble = shapeCreateBubble();
	layerBgCloud.add(bubble);


	// Kinect animation tesztelése
	stage.onFrame(function(frame) {
		frameCount++;

		if ((frameCount%sebesseg_oszto)==0){
			if (CloudX > 300) {
				irany	= -1;
			}else if (CloudX < 200){
				irany	= 1;
			}
			CloudX = CloudX+irany*irany_szorzo;
		}

		bubble.setX(CloudX);
		$("#c1").val(CloudX + ' | i' +irany_szorzo + ' | s' + sebesseg_oszto);
		layerBgCloud.draw();

		// simple FPS calculator
		$("#FPS").val( 'FPS: ' +  Math.round(frameCount/(currTimeFPS-animStartTimeFPS)*1000 ) );       // durva FPS becslés
	});

	stage.start();
}



/*
*	random color generator for testing
*/
function get_random_color() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
	color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}


/*
*	log text to console
*/
function log( text ){
	var currD	= new Date;
	var currT	= currD.getTime();
	var elapsedTimePrgStart	= (currT-programStartTime)/1000;
	var elapsedTimeLastLog	= (currT-lastLogT)/1000;
	var callerFunctionName	= arguments.callee.caller.name.toString();

	console.log( elapsedTimePrgStart + 's: ' + callerFunctionName + ' -- ' + text + ' -- Elõzõ log óta eltelt: ' + elapsedTimeLastLog +'s');

	lastLogT	= currT;
}
