texts = [
	{string: ["Hi! Welcome to Upright! This game was created in 48 hours for Ludum Dare 34"], 
		size: 20,
		x: 20, y: 30, 
		level: 0, color: "#ffffff"
		},
	{string: [	"This time, themes are 'two button controls'", "and 'grow'"], 
		size: 17,
		x: 450, y: 100, 
		level: 0, color: "#ffffff"
		},
	{string: ["Go ahead and try to get to the purple exit!", "Dodge all the red to survive!"], 
		size: 20, 
		x: 300, y: 350, 
		level: 0, color: "#ffffff"
		}
]

var dialogues = [
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
	[	// 7
		
	],
	[	// 8
		{
			condition: function() {return player.leveltime === 20},
			string: function() {return ["Now what the ", "hell is THAT?"]}
		},
		{
			condition: function() {if (player.growing && !this.shown) {
										this.shown = true;
										return true;
									}
			},
			string: function() {return ["oooOOOoooh, it makes me grow!", "I wonder what is that good for..."]},
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