var lastLoop = new Date;
var frameCount = 0;

function mainloop() {
	window.requestAnimationFrame(mainloop);
	var thisLoop = new Date;
	if(thisLoop - lastLoop >= 1000/60) {
		fps = frameCount;
		lastLoop = thisLoop;
		frameCount = 0;
		
		if (starttimer > 0) {
			--starttimer;
			drawlogo(starttimer);
		}
		else if (starttimer === 0) {
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
}