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
	this.newLevel = function() {
		this.x = level.start[0];
		this.y = level.start[1];
		this.speedx = 0;
		this.speedy = 0;
	}
	this.newLevel();
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
			for (var i = 0; i < ((this.y % 24 < 8 || (this.y + this.speedy) % 24 < 8) ? 1 : 2); ++i) {
				var tile = level.code[y + i][x + h];
				if (tile === 1 && c) {
					if (Math.abs(this.speedx) <  0.5) {
						this.speedx = Math.sign(this.speedx) * 0.5;
					}
					this.speedx = - this.speedx;
					c = false;
				}
				if (tile === 2) {
					this.die();
				}
				if (tile === 3) {
					nextLevel();
				}
			}
		}
		x = Math.floor(this.x / 24)
		y = Math.floor(this.y / 24)
		c = true;
		mod = (this.speedy > 0 ? 16 : 0);
		h = (this.speedy > 0 ? 1 : -1);
		if (Math.floor((this.y + this.speedy + mod + 0.01 * h) / 24) === Math.floor((this.y + mod) / 24 + h)) {
			for (var i = 0; i < ((this.x % 24 < 8) ? 1 : 2); ++i) {
				var tile = level.code[y + h][x + i];
				if (tile === 1 && c) {
					if (Math.abs(this.speedy) < 0.5) {
						this.speedy = Math.sign(this.speedy) * 0.5;
					}
					this.speedy = - this.speedy;
					c = false;
				}
				if (tile === 2) {
					this.die();
				}
				if (tile === 3) {
					nextLevel();
				}
			}
		}
	}
	this.draw = function() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, 16, 16);
	}
}