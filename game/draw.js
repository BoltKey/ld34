function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (ingame) {
		
		level.draw();
		player.draw();
		ctx.textAlign = "left";
		for (t of texts) {
			if (t.level === currlevel) {
				ctx.fillStyle = t.color;
				ctx.font = t.size + "px Arial";
				for (i = 0; i < t.string.length; ++i) {
					ctx.fillText(t.string[i], t.x, t.y + i * (t.size + 5));
				}
			}
		}
	}
}