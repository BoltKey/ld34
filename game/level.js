Level = function(code, start) {
	this.code = code;
	this.start = start;
	this.draw = function() {
		i = 0;
		for (line of this.code) {
			j = 0;
			for (tile of line) {
				switch(tile) {
					case 2: 
						ctx.fillStyle = "red";
						break;
					
					case 1: 
						ctx.fillStyle = "black";
						break;
						
					case 0: 
						ctx.fillStyle = "white";
						break;
				}
				ctx.fillRect(j * 24, i * 24, 23, 23);
				++j;
			}
			++i;
		}
	}
}