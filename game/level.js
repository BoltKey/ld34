Level = function(code, start) {
	this.code = code;
	this.start = start;
	this.randomColors = []
	for (line of this.code) {
		toPush = [];
		for (tile of line) {
			toPush.push(235 + (Math.floor(Math.random() * 20)));
		}
		this.randomColors.push(toPush);
	}
	this.draw = function(full) {
		i = 0;
		for (line of this.code) {
			j = 0;
			for (tile of line) {
				var s = "";
				switch(tile) {
					case 4:
						ctx.fillStyle = "#bbbbff";
						break;
					case 3:
						ctx.fillStyle = "purple";
						break;
					case 2: 
						ctx.fillStyle = "rgb(" + this.randomColors[i][j] + ", 0, 0)";
						break;
					
					case 1: 
						ctx.fillStyle = "black";
						break;
						
					case 0: 
						ctx.fillStyle = "rgb(" + this.randomColors[i][j] + ", " + this.randomColors[i][j] + ", " + this.randomColors[i][j] + ")";
						break;
						
					case 5:
						s = "↓";
						ctx.fillStyle = "yellow";
						break;
					case 6:
						s = "→";
						ctx.fillStyle = "yellow";
						break;
					case 7:
						s = "←";
						ctx.fillStyle = "yellow";
						break;
					case 8:
						s = "↑";
						ctx.fillStyle = "yellow";
						break;
					case 9:
						ctx.fillStyle = "#ccffcc";
						
				}
				ctx.fillRect(j * 24, i * 24, 24, 24);
				ctx.fillStyle = "magenta";
				ctx.font = "18px Arial";
				ctx.textAlign = "center";
				ctx.fillText(s, j * 24 + 12, i * 24 + 16);
				++j;
			}
			++i;
		}
	}
}