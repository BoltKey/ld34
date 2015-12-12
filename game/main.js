var player;
function main() {
	canvas = $("#canvas")[0];
	ctx = canvas.getContext("2d");
	resize();
	newButtons();
	navigateMenu(0);
	mainloop();
}
