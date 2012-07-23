
(function(namespace){

	var Sun	= function(){
		this.initialize();
	}
	

	Sun.shape	= null;


	Sun.prototype.initialize = function() {
		var g		= new Graphics;
		var x		= 50;
		var y		= 50;

		g.beginFill( Graphics.getRGB( '0xFFF946', 1 ) );
		g.setStrokeStyle(3);
		g.beginStroke('#fff');
		g.drawCircle( 0, 0, 30 );
		g.endStroke();


		var numberOfLines	= 11;
		var radianOffset	= 360/numberOfLines;
		var radius			= 40;
		for(var i=1;i<numberOfLines;i++){
			x	= Math.round(Math.cos(i*radianOffset) * radius);
			y	= Math.round(Math.sin(i*radianOffset) * radius);
			g.drawCircle( x, y, 3 );
			x	= Math.round(Math.cos(i*radianOffset) * (radius+10));
			y	= Math.round(Math.sin(i*radianOffset) * (radius+10));
			g.drawCircle( x, y, 3 );
		}

		this.shape	= new Shape(g);
		this.shape.x	= -20;
		this.shape.y	= 50;


		var tween	= Tween.get( this.shape );
		tween.to({x:300,y:0,alpha:0.4},4000, Ease.linearOut )
					.to({x:600,y:0,alpha:0.8},4000, Ease.linearOut )
					.to({x:1000,y:100,alpha:1},4000, Ease.linearOut )
		;
		tween.loop	= true;
	};



	namespace.Sun	= Sun;

}(game || (game	= {})));
var game;