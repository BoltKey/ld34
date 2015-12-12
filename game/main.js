var player;
var texts;
var ingame;
function main() {
	canvas = $("#canvas")[0];
	ctx = canvas.getContext("2d");
	resize();
	
	music = new Audio("sounds/music.wav");
	//music.play();
	dieSound = new Audio("sounds/die.wav");
	hitSounds = [];
	for (i = 1; i <= 5; ++i) {
		hitSounds.push(new Audio("sounds/hit" + i + ".wav"));
	}
	music.loop = true;
	//newButtons();
	mainloop();
	ingame = true;
	toGame();
}
