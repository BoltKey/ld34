function Player() {
	this.speedx = 0;
	this.speedy = 0;
	
	this.up = function() {
		console.log("right");
		this.speedy -= 0.03;
	}
	this.right = function() {
		console.log("up");
		this.speedx += 0.03;
	}
	this.die = function() {
		this.x = level.start[0];
		this.y = level.start[1];
		this.speedx = 0;
		this.speedy = 0;
	}
	this.die();
	this.update = function() {
		this.x += this.speedx;
		this.y += this.speedy;
		this.checkcollision();
	}
	this.checkcollision = function() {
		var x = Math.floor(this.x / 24)
		var y = Math.floor(this.y / 24)
		var c = true;
		var mod = (this.speedx > 0 ? 16 : 0);
		var h = (this.speedx > 0 ? 1 : -1);
		if (Math.floor((this.x + this.speedx + mod + 0.01 * h) / 24) === Math.floor((this.x + mod) / 24 + h)) {
			for (var i = 0; i < ((this.y % 24 < 8) ? 1 : 2); ++i) {
				var tile = level.code[y + i][x + h];
				if (tile === 1 && c) {
					if (math.abs(speedx) <  0.03) {
						speedx = sign(speedx) * 0.03
					}
					this.speedx = - this.speedx;
					c = false;
				}
				if (tile === 2) {
					this.die();
				}
			}
		}
		var c = true;
		var mod = (this.speedy > 0 ? 16 : 0);
		var h = (this.speedy > 0 ? 1 : -1);
		if (Math.floor((this.y + this.speedy + mod + 0.01 * h) / 24) === Math.floor((this.y + mod) / 24 + h)) {
			for (var i = 0; i < ((this.x % 24 < 8) ? 1 : 2); ++i) {
				var tile = level.code[y + h][x + i];
				if (tile === 1 && c) {
					if (math.abs(speedy) <  0.03) {
						speedx = sign(speedy) * 0.03
					}
					this.speedy = - this.speedy;
					c = false;
				}
				if (tile === 2) {
					this.die();
				}
			}
		}
	}
	this.draw = function() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, 16, 16);
	}
}