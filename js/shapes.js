

function drawCloudShape( inX,inY, inFillColor, inAlpha ){
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
//			name: 'red',
            fill: inFillColor,
            stroke: CLOUD_COLOR_CONTOUR,
            strokeWidth: 4, 
            scale: [0,0], 
			alpha: inAlpha,
            draggable: false,
            x:inX,
            y:inY
          });

    return cloud;
}
