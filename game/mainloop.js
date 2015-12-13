function mainloop() {
	window.requestAnimationFrame(mainloop);
	/*if (starttimer > 0) {
		--starttimer;
		drawlogo(starttimer);
	}
	else if (starttimer === 0) {*/if (!ingame) {
		toGame();
		--starttimer;
	}
	else {
		for (i of pressedkeys) {
			keyholdaction(i);
		}
		if (ingame) {
			player.update();
		}
		draw();
	}
}