var player;
var texts;
var ingame;
var ctx;
var canvas;
var starttimer = 120;
logoimg = new Image();
logoimg.src = "http://boltkey.cz/boltkeylogo.png";
function main() {
	canvas = $("#canvas")[0];
	ctx = canvas.getContext("2d");
	
	canvas.height = 480;
	canvas.width = 768;
	
	music = new Audio("sounds/music.wav");
	music.volume = 0.3;
	dieSound = new Audio("sounds/die.wav");
	hitSounds = [];
	for (i = 1; i <= 5; ++i) {
		hitSounds.push(new Audio("sounds/hit" + i + ".wav"));
	}
	goalSound = new Audio("sounds/finish.wav");
	goalSound.volume = 0.4;
	music.loop = true;
	ctx.font = "50px Arial";
	mainloop();
}

