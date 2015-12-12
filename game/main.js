var player;
var texts;
var ingame;
function main() {
	canvas = $("#canvas")[0];
	ctx = canvas.getContext("2d");
	resize();
	
	music = new Audio(
	//newButtons();
	mainloop();
	ingame = true;
	toGame();
}
