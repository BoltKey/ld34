function Player() {
	this.speedx = 0;
	this.speedy = 0;
	this.dialogue = "";
	this.totaldeaths = 0;
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
		this.dialogue = "";
		++this.totaldeaths;
		++this.leveldeaths;
	}
	this.newLevel = function() {
		this.x = level.start[0];
		this.y = level.start[1];
		this.speedx = 0;
		this.speedy = 0;
		this.leveltime = 0;
		this.helptimer = 0;
		this.dialogue = "";
		this.msgshown = false;
		this.leveldeaths = 0;
	}
	this.newLevel();
	this.update = function() {
		++this.leveltime;
		++this.sametext;
		++this.helptimer;
		this.x += this.speedx;
		this.y += this.speedy;
		this.checkcollision();
		var temp = this.dialogues[currlevel].concat(this.dialogues[this.dialogues.length - 1])
		for (d of temp) {
			if (d.condition()) {
				this.dialogue = d.string;
				this.sametext = 0;
			}
		}
		if (this.sametext > 150 * this.dialogue.length) {
			this.dialogue = [];
		}
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
		ctx.textAlign = "center";
		ctx.font = "12px Arial";
		for (i = 0; i < this.dialogue.length; ++i) {
			ctx.fillText(this.dialogue[i], this.x + 8, this.y - 5 - (this.dialogue.length - i - 1) * 14);
		}
	}
	this.dialogues = [
		[
			{
				condition: function() {return player.leveltime === 200},
				string: ["..."]
			},
			{
				condition: function() {return player.leveltime === 300},
				string: ["How did I get here?"]
			},
			{
				condition: function() {return player.leveltime === 400},
				string: ["Why is it so hot in here?"]
			},
			{
				condition: function() {return player.leveltime === 500},
				string: ["Wow, that looks like an exit,", " better get there ASAP"]
			}
		],
		[	
			{
				condition: function() {return player.leveltime === 50},
				string: ["Another exit, that's slick!"]
			},
			{
				condition: function() {
					if (!player.msgshown && (pressedkeys.indexOf(37) > 0 || pressedkeys.indexOf(40) > 0)){
						player.msgshown = true;
						player.helptimer = 0;
						return true;
					}
				},
				string: ["What's going on? I can't move!"]
			},
			{
				condition: function() {	return (player.msgshown && player.helptimer === 50)	},
				string: ["My legs! MY LEGS!", "I CAN'T FEEL THEM!"]
			},
			{
				condition: function() {	return (player.msgshown && player.helptimer === 150)	},
				string: ["Ok. So it looks like I can only", 
						" move up or right. What a day..."]
			},
			{
				condition: function() {	return (player.msgshown && player.helptimer === 320)	},
				string: ["Maybe I could bounce off that corner?",
						"that would be some goPro level stunt!"]
			}
		],
		[
			{
				condition: function() {return Math.sqrt(Math.pow(Math.abs(player.speedx), 2) + Math.pow(Math.abs(player.speedy), 2)) >= 4}, 
				string: ["WEEEEE!!!!"]
			}
		]
	]
}