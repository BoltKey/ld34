function Player() {
	this.speedx = 0;
	this.speedy = 0;
	this.gravity = [0, 0];
	this.totaldeaths = 0;
	this.leveldeaths = 0;
	this.deadpixels = [];
	this.aliveTimer = 0;
	this.onIce = false;
	this.hitstrings = [];
	this.up = function() {
		console.log("right");
		this.speedy -= (this.onIce ? 0.006 : 0.03);
	}
	this.right = function() {
		console.log("up");
		this.speedx += (this.onIce ? 0.006 : 0.03);
	}
	this.die = function() {
		this.x = level.start[0];
		this.y = level.start[1];
		this.speedx = 0;
		this.speedy = 0;
		this.aliveTimer = 0;
		this.dialogue = "";
		dieSound.play();
		++this.totaldeaths;
		++this.leveldeaths;
	}
	this.newLevel = function() {
		this.x = level.start[0];
		this.y = level.start[1];
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
		var x = Math.floor((this.x + 8) / 24);
		var y = Math.floor((this.y + 8) / 24);
		switch (level.code[y][x]) {
			case 4:
				this.onIce = true;
				this.gravity = [0, 0];
				break;
			case 5: 
				this.gravity = [0, 1];
				this.onIce = false;
				break;
			case 6:
				this.gravity = [1, 0];
				this.onIce = false;
				break;
			case 7:
				this.gravity = [-1, 0];
				this.onIce = false;
				break;
			case 8:
				this.gravity = [0, -1];
				this.onIce = false;
				break;
			default:
				this.gravity = [0, 0];
				this.onIce = false;
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
		mod = (this.speedy > 0 ? 16 : 0);
		h = (this.speedy > 0 ? 1 : -1);
		if (Math.floor((this.y + this.speedy + mod + 0.01 * h) / 24) === Math.floor((this.y + mod) / 24 + h)) {
			for (var i = 0; i < ((this.x % 24 < 8) ? 1 : 2); ++i) {
				var tile = level.code[y + h][x + i];
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
		this.hitstrings.push({str: string, x: this.x + 8 + Math.sign(this.speedx) * 16, y: this.y + 8 + Math.sign(this.speedy) * 16, time: 0});
		
	}
	this.draw = function() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, 16, 16);
		ctx.textAlign = "center";
		ctx.font = "12px Arial";
		for (p of this.deadpixels) {
			ctx.fillStyle = p[2];
			ctx.fillRect(this.x + p[0], this.y + p[1], 1, 1);
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
	this.dialogues = [
		[ 	// 0
			{
				condition: function() {return player.leveltime === 100},
				string: function() {return ["..."]}
			},
			{
				condition: function() {return player.leveltime === 200},
				string: function() {return ["How did I get here?"]}
			},
			{
				condition: function() {return player.leveltime === 300},
				string: function() {return ["Why is it so hot in here?"]}
			},
			{
				condition: function() {return player.leveltime === 400},
				string: function() {return ["Wow, that looks like an exit,", " better get there ASAP"]}
			}
		],
		[	// 1
			{
				condition: function() {return player.leveltime === 50},
				string: function() {return ["Another exit, that's slick!"]}
			},
			{
				condition: function() {
					if (!player.msgshown && (pressedkeys.indexOf(37) > 0 || pressedkeys.indexOf(40) > 0)){
						player.msgshown = true;
						player.helptimer = 0;
						return true;
					}
				},
				string: function() {return ["What's going on? I can't move!"]}
			},
			{
				condition: function() {	return (player.msgshown && player.helptimer === 100)	},
				string: function() {return ["My legs! MY LEGS!", "I CAN'T FEEL THEM!"]}
			},
			{
				condition: function() {	return (player.msgshown && player.helptimer === 230)	},
				string: function() {return ["Ok. So it looks like I can only", 
				" move up or right. What a day..."]}
			},
			{
				condition: function() {	return (player.msgshown && player.helptimer === 420)	},
				string: function() {return ["Maybe I could bounce off that corner?",
				"that would be some goPro level stunt!"]}
			},
			{
				condition: function() { if (player.x > 450 && player.y < 130) {
											this.shown = true;
											return true;
										}
									},
				string: function() {return ["Woohoo!"]},
				shown: false
			},
			{
				condition: function() {return player.dialogues[1][5].shown && player.speed() <= 0.2},
				string: function() {return ["Darn, looks like I'll have to", "try again with better speed."]}
			}
		],
		[	// 2
			
			{
				condition: function() {if (player.y > 150 && player.x < 130 && !player.dialogues[2][0].shown) {
												this.shown = true; 
												return true;
												}
											},
				string: function() {return ["This feels almost", "like dribbling", "a basketball :)"]},
				shown: false
			}
		], 
		[	// 3
			{
				condition: function() {return player.leveltime === 10},
				string: function() {return ["I think I got the hang of it.", "It could be worse..."]}
			},
			{
				condition: function() {if(player.onIce && !this.shown) {
										this.shown = true;
										return true;
										}
				},
				shown: false,
				string: function() {return ["It looks like ice.", "It is slipery as ice.", "I guess it is ice"]}
			}
		],
		[  // 4
			{
				condition: function() {return player.leveltime === 10},
				string: function() {return ["Holy cow!"]}
			},
			{
				condition: function() {return player.leveltime === 100},
				string: function() {return ["This looks dangerous!"]}
			}
		],
		[  // 5
		
		],
		[  // 6
			{
				condition: function() {return player.leveltime === 10},
				string: function() {return ["WTF are these?"]}
			},
			{
				condition: function() {
					if (player.gravity[0] === -1 && !this.shown) {
						this.shown = true; 
						return true;
						}
					},
				string: function() {return ["It seems to change gravity"]},
				shown: false
			}
		],
		[	// global
			{
				cases: 22,
				condition: function() {return player.leveldeaths >= 1 && player.aliveTimer === 10},
				string: function() {return [
				["That hurt."], 
				["Ouch!"], 
				["I am in great pain!"], 
				["Fun fact: I will never ", "actually die"],
				["Stop doing this to me!"],
				["You should make a tutorial...", "called How to die 101. BWAHAHAHA!!!"],
				["But what if", "I am not kill?"],
				["Stop being sadist"], 
				["One of my pixels just died.", "I hope you are happy now."],
				["Squares have souls too!"], 
				["It is getting repetitive.", "I died " + player.totaldeaths + " times already!"],
				["There was chance of 1 in " + this.cases, "that you get this quote now.", "You should feel lucky"],
				["These quotes and hit effects", "are the only random events", "in the game"],
				["THIS IS 1,000,000th GLOBAL DEATH!", "GO CLAIM PRIZE TO CPYGN.RU!!!!!!!"],
				["Really?"],
				["There is no death penalty...", "except for frustration"],
				["I may have just died, but at least", "I'm not green"],
				["Is it lava?", "Or just a lot of berries?"],
				["I'm not gonna lie", "I want you to keep playing", "just so you see all of these quotes"],
				["This game is actually", " controlled with 4 keys"],
				["I am not racist", "I am just allergic to some colours"],
				["That was unfair"],
				["All the quotes are random...", "except for this one...", "this one is controlled by fate"]
				]
				[Math.floor(Math.random() * this.cases)]}
			}
		]
	]
}