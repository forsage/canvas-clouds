 /*
* Global variables
*/

  
	var	sebesseg_oszto		= 2;
	var	irany_szorzo		= 1;
	var CLOUD_COLOR_CONTOUR	= "#D8EDF2";
	var CLOUD_COLOR_FILL	= "lightgray";
	var STAGE_WIDTH			= 900;
	var STAGE_HEIGHT		= 640;

	var layerCloud;		// normal cloud layer
	var layerBgCloud;	// background layer

	var cloudArr	= new  Array();
	var cloudCount	= 3;
	var stage;


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
*	first time cloud gnerating
*/
function initClouds(){

	// a felho darabszambol es kepernyo meretbol kiszamoljuk a felhok X koordinatajat es letaroljuk a cloudArr-ban
	for (var i=0;i<cloudCount;i++){
		var item  = new  Array();
		item["x"]		= Math.round( STAGE_WIDTH/cloudCount )*i;	// x position
		item["y"]		= Math.round( (Math.random()-0.5)*40 );
		item["color"]	= get_random_color();		// generate color
		item["alpha"]	= Math.random();			// alpha
		item["scaleRnd"]	= (Math.random()-0.5)/2;	// random scaling - maximum +-25%

		cloudArr[i] =  item;
	}

	
	// generating clouds from cloudArr
	for(var i=0;i<cloudArr.length;i++){

		var cloud = drawCloudShape( cloudArr[i]["x"], cloudArr[i]["y"], cloudArr[i]["color"], cloudArr[i]["alpha"] );
		
		// arnyek utolagos hozzadobasa minden egyes felhõhöz
		// Megnézni más offsettel is!!
		cloud.setShadow({
			color: 'black',
			blur: 10,
			offset: [10, 10],
			alpha: 0.5
		});

		layerCloud.add(cloud);

//		$("#message").text( $("#message").text()+' - '+ cloudArr[i][0] );

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
	var d = new Date;
	var ddiff	= d.getTime();
//	alert(ddiff);
	var frameCount	=	0;
	var eltolas	=0;
	var	irany	=1;

	var hexagon = new Kinetic.RegularPolygon({
		x: stage.getWidth() / 2,
		y: stage.getHeight() / 2,
		sides: 16,
		radius: 30,
		fill: "yellow",
		stroke: "black",
		strokeWidth: 2
	});
	layerBgCloud.add(hexagon);

	
	// Kinect animation tesztelése 
	stage.onFrame(function(frame) {
		frameCount++;
		var d2 = new Date;

		if ((frameCount%sebesseg_oszto)==0){
			if (CloudX > 300) {
				irany	= -1;
			}else if (CloudX < 200){
				irany	= 1;
			}
			CloudX = CloudX+irany*irany_szorzo;
		}

		hexagon.setX(CloudX);
		$("#c1").val(CloudX + ' | i' +irany_szorzo + ' | s' + sebesseg_oszto);

		// inditas ota frame-ek szama / eltelt masodpercek
		$("#c2").val( 'FPS: ' +  Math.round(frameCount/(d2.getTime()-ddiff)*1000 ) );       // durva FPS becslés
		layerBgCloud.draw();
	});

	stage.start();
}


	  
	  
function get_random_color() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
	color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}


