
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

	/*	initialize the could array 
	*		This iteration generates the next values:
	*		- random alpha, random color, random y offset
	*		- x coordinate, so that the clouds will be in equal distance inside the canvas (stage)
	*/
	for (var i=0;i<cloudCount;i++){
		var item  = new  Array();
		item["x"]		= Math.round( STAGE_WIDTH/cloudCount )*i;	// x position (equal cloud distance)
		item["y"]		= Math.round( (Math.random()-0.5)*40 );	// random y position (offset)
		item["color"]	= get_random_color();					// generate random color
		item["alpha"]	= Math.random();						// alpha
		item["scaleRnd"]	= (Math.random()-0.5)/2;			// random scaling - maximum +-25%

		cloudArr[i] =  item;
	}

	
	// generate (draw) clouds from cloudArr
	for(var i=0;i<cloudArr.length;i++){

		var cloud = shapeCreateCloud( cloudArr[i]["x"], cloudArr[i]["y"], cloudArr[i]["color"], cloudArr[i]["alpha"] );

		shapeAddCloudShadow( cloud );
		
		layerCloud.add(cloud);

		// felho "felfujasa" letrehozaskor
		cloud.transitionTo({
			scale: {
				x:0.5 + cloudArr[i]["scaleRnd"],
				y:0.5 + cloudArr[i]["scaleRnd"]
			},
			easing: 'bounce-ease-out',
			duration:2,
			// miutan lefutott, elinditjuk a lassu usztatast
			callback: function() {
				cloud.transitionTo({
					x: Math.round((Math.random()-0.5)*1000),
					y: Math.round((Math.random()-0.5)*100),
					duration: 200
				});
            }
		});
	
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
		var currDateFPS = new Date;
		var currTimeFPS	= currDateFPS.getTime();

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


