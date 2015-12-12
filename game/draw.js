function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (ingame) {
		
		level.draw();
		player.draw();
	}
}