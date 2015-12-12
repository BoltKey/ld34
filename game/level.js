Level = function(code) {
	this.code = code;
	this.draw = function() {
		i = 0;
		for (line of code) {
			j = 0;
			for (tile of line) {
				if (tile = 2)
					ctx.fillStyle = "red";
				ctx.fillRect(j * 16, i * 16, 15, 15);
				++j;
			}
			++i;
		}
	}
}