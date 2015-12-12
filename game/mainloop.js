function mainloop() {
	window.requestAnimationFrame(mainloop);
	for (i of pressedkeys) {
		keyholdaction(i);
	}
	if (ingame) {
		player.update();
	}
	draw();
}