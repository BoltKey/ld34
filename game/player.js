function Player() {
	this.speedx = 0;
	this.speedy = 0;
	this.width = 16;
	this.gravity = [0, 0];
	this.growing = false;
	this.totaldeaths = 0;
	this.leveldeaths = 0;
	this.deadpixels = [];
	this.aliveTimer = 0;
	this.onIce = false;
	this.hitstrings = [];
	this.up = function() {
		console.log("right");
		this.speedy -= Math.pow((this.width / 16), 2)*(this.onIce ? 0.006 : 0.03);
	}
	this.right = function() {
		console.log("up");
		this.speedx += Math.pow((this.width / 16), 2)*(this.onIce ? 0.006 : 0.03);
	}
	this.die = function() {
		this.x = level.start[0];
		this.y = level.start[1];
		this.speedx = 0;
		this.speedy = 0;
		this.width = 16;
		this.aliveTimer = 0;
		this.dialogue = "";
		dieSound.play();
		++this.totaldeaths;
		++this.leveldeaths;
		level.draw(true);
	}
	this.newLevel = function() {
		this.x = level.start[0];
		this.y = level.start[1];
		this.width = 16;
		this.speedx = 0;
		this.speedy = 0;
		this.leveltime = 0;
		this.aliveTimer = 0;
		this.helptimer = 0;
		this.dialogue = "";
		this.msgshown = false;
		this.leveldeaths = 0;
		this.hitstring = [];
	}
	this.newLevel();
	this.dialogue = ((currlevel === 0) ? [] : ["Phew, it autosaves"]);
	this.sametext = 0;
	this.speed = function() {
		return Math.sqrt(Math.pow(Math.abs(player.speedx), 2) + Math.pow(Math.abs(player.speedy), 2));
	}
	this.update = function() {
		++this.leveltime;
		++this.sametext;
		++this.helptimer;
		++this.aliveTimer;
		this.x += this.speedx;
		this.y += this.speedy;
		if (!this.onIce) {
			this.speedy *= 0.994;
			this.speedx *= 0.994;
		}
		if (this.growing) {
			this.width += 0.04;
			this.x -= 0.02;
			this.y -= 0.02;
			if (this.width >= 48) {
				this.die();
			}
		}
		this.speedx += 0.02 * this.gravity[0];
		this.speedy += 0.02 * this.gravity[1];
		this.checkcollision();
		this.checkIce();
		var temp = this.dialogues[currlevel].concat(this.dialogues[this.dialogues.length - 1])
		for (d of temp) {
			if (d.condition()) {
				this.dialogue = d.string();
				if (this.dialogue[0] === "One of my pixels just died.") {
					this.deadpixels.push([Math.floor(Math.random() * 14) + 1, Math.floor(Math.random() * 14) + 1, 
					"rgb(" + (128 + Math.floor(Math.random() * 128)) + ", 0, " + (128 + Math.floor(Math.random() * 128))]);
				}
				this.sametext = 0;
			}
		}
		if (this.sametext > 90 * this.dialogue.length) {
			this.dialogue = [];
		}
	}
	this.checkIce = function() {
		var x = Math.floor((this.x + this.width / 2) / 24);
		var y = Math.floor((this.y + this.width / 2) / 24);
		this.onIce = false;
		this.gravity = [0, 0];
		this.growing = false;
		switch (level.code[y][x]) {
			case 4:
				this.onIce = true;
				break;
			case 5: 
				this.gravity = [0, 1];
				break;
			case 6:
				this.gravity = [1, 0];
				break;
			case 7:
				this.gravity = [-1, 0];
				break;
			case 8:
				this.gravity = [0, -1];
				break;
			case 9:
				this.growing = true;
				break;
		}
	}
	this.checkcollision = function() {  // please... don't read this code. Just... don't... it's a monster...
		var x = Math.floor(this.x / 24);
		var y = Math.floor(this.y / 24);
		var c = true;
		var mod = (this.speedx > 0 ? this.width : 0);
		var h = (this.speedx > 0 ? 1 : -1);
		if (Math.floor((this.x + this.speedx + mod + 0.01 * Math.pow(this.width - 16, 2) * h) / 24) === Math.floor((this.x + mod) / 24 + h)) {
			var maxi = ((this.y % 24 < 24 - (this.width % 24) || (this.y + this.speedy) % 24 < 24 - (this.width % 24)) ? 1 : 2) + (this.width >= 24 ? 1 : 0);
			for (var i = 0; i < maxi; ++i) {
				var tile = level.code[y + i][x + h + ((this.width > 24 && this.speedx > 0) ? 1 : 0)];
				if (tile === 1 && c) {
					if (Math.abs(this.speedx) <  0.5) {
						this.speedx = Math.sign(this.speedx) * 0.5;
					}
					this.hit();
					this.speedx = - this.speedx;
					c = false;
					
				}
				if (tile === 2) {
					this.die();
					return;
				}
				if (tile === 3) {
					nextLevel();
					return;
				}
			}
		}
		x = Math.floor(this.x / 24)
		y = Math.floor(this.y / 24)
		c = true;
		mod = (this.speedy > 0 ? this.width : 0);
		h = (this.speedy > 0 ? 1 : -1);
		if (Math.floor((this.y + this.speedy + mod + 0.01 * Math.pow(this.width - 16, 2) * h) / 24) === Math.floor((this.y + mod) / 24 + h)) {
			var maxi = ((this.x % 24 < 24 - (this.width % 24) || (this.x + this.speedx) % 24 < 24 - (this.width % 24)) ? 1 : 2) + (this.width >= 24 ? 1 : 0);
			for (var i = 0; i < maxi; ++i) {
				var tile = level.code[y + h + ((this.width > 24 && this.speedy > 0) ? 1 : 0)][x + i];
				if (tile === 1 && c) {
					if (Math.abs(this.speedy) < 0.5) {
						this.speedy = Math.sign(this.speedy) * 0.5;
					}
					this.hit();
					this.speedy = - this.speedy;
					
					c = false;
				}
				if (tile === 2) {
					this.die();
					return;
				}
				if (tile === 3) {
					nextLevel();
					return;
				}
			}
		}
	}
	this.hit = function() {
		var temp = Math.floor(Math.random() * 5);
		hitSounds[temp].play();
		var string;
		switch(temp) {
			case 0:
				string = "pow";
				break;
			case 1:
				string = "pew";
				break;
			case 2:
				string = "blib";
				break;
			case 3:
				string = "pwiu";
				break;
			case 4:
				string = "ding";
				break;
		}
		this.hitstrings.push({str: string, x: this.x + 8 + Math.sign(this.speedx) * this.width, y: this.y + 8 + Math.sign(this.speedy) * this.width, time: 0});
		
	}
	this.draw = function() {
		ctx.font = "12px Arial";
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.width);
		ctx.textAlign = "center";
		for (p of this.deadpixels) {
			ctx.fillStyle = p[2];
			var c = this.width / 16
			ctx.fillRect(this.x + p[0] * c, this.y + p[1] * c, c, c);
		}
		ctx.fillStyle = "green";
		for (i = 0; i < this.dialogue.length; ++i) {
			var str = this.dialogue[i];
			var x = this.x + 8;
			var y = this.y - 5 - (this.dialogue.length - i - 1) * 14;
			ctx.fillText(str, x, y);
		}
		for (h of this.hitstrings) {
			++h.time;
			ctx.fillStyle = "rgba(255, 128, 0, " + (1 - h.time / 100) + ")";
			ctx.textAlign = "center";
			ctx.fillText(h.str, h.x, h.y);
		}
	}
	this.dialogues = dialogues;
}