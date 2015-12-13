texts = [
	{string: ["Hi! Welcome to Upright! This game was created in 48 hours for Ludum Dare 34"], 
		size: 20,
		x: 20, y: 30, 
		level: 0, color: "#ffffff"
		},
	{string: [	"This time, themes are 'two ", "button controls'and 'grow'"], 
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
		},
		{
			condition: function() {if (player.x > 200 && !this.shown) {
											this.shown = true; 
											return true;
											}
										},
			string: function() {return ["SPAAAACE!!!"]},
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
		},
		{
			condition: function() {return player.gravity[0] === 1},
			string: function() {return ["These arrows are fun ^^"]}
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
	[	// 9
		{
			condition: function() {return player.leveltime === 20},
			string: function() {return ["So apparently the bigger", "I am, the faster I accelerate"]}
		}
	],
	[	// 10
	
	],
	[	// 11
	
	],
	[	// 12
	
	],
	[	// credits
		
	],
	[	// global
		{
			condition: function() {return player.width > 42 && player.growing},
			string: function() {return ["I feel like I will", "explode soon!"]}
		},
		{
			cases: 24,
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
			["These quotes, hit effects and", "tile colors are the only random events", "in the game"],
			["THIS IS 1,000,000TH GLOBAL DEATH!", "GO CLAIM PRIZE ON CPYGN.RU!!!!!!!"],
			["Really?"],
			["There is no death penalty...", "except for frustration"],
			["I may have just died, but", "at least I'm not green"],
			["Is it lava?", "Or just a lot of berries?"],
			["I'm not gonna lie", "I want you to keep playing", "just to see all of these quotes"],
			["This game is actually", " controlled with 4 keys"],
			["I am not racist", "I am just allergic to some colours"],
			["That was unfair"],
			["All the quotes are random...", "except for this one...", "this one is controlled by fate"],
			["Wow", "Much die", "Very pain"]
			]
			[Math.floor(Math.random() * this.cases)]}
		},
		{
			cases: 20,
			condition: function() {return player.sametext === 600},
			string: function() {return [
			["I like cats."], 
			["Nice weather huh?"], 
			["I am bored."], 
			["These words exist", "in your head only"],
			["Thanks for sparing me ^^"],
			["That music is so", "annoying. I like it."],
			["Internet... is a", "weird place to live..."],
			["I am just several lights", "in a pattern, yet you", "have a personal bond with me."], 
			["With some imagination,", "every game is violent"],
			["Hey! I like you!"],
			["Thanks for playing!"],
			["Knock knock", "Who's there?", "5 stars for humor!"],
			["LoL > DotA"],
			["Top kek"],
			["I have nothing more to say."],
			["Your mother was a murloc!", "hahahaha"],
			["squares > trianles"],
			["3rd dimension? On which level", "do I earn it?"],
			["Which team am I on?"],
			["Let me win this for you...", "With which key od you jump?"],
			]
			[Math.floor(Math.random() * this.cases)]}
		}
	]
]