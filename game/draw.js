function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (ingame) {
		
		level.draw();
		player.draw();
		ctx.textAlign = "left";
		for (t of texts) {
			if (t.level == currlevel) {
				ctx.fillStyle = t.color;
				ctx.font = t.size + "px Arial";
				for (i = 0; i < t.string.length; ++i) {
					ctx.fillText(t.string[i], t.x, t.y + i * (t.size + 5));
				}
			}
		}
	}
}

function drawlogo(a) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(logoimg, Math.floor(canvas.width / 2 - 125), Math.floor(canvas.height / 2 - 120), 250, 240);
	ctx.fillStyle = "rgb(100, 100, 100)";
	ctx.font = "50px arial";
	ctx.textAlign = "center";
	ctx.fillText("BoltKey", canvas.width / 2, canvas.height / 2 + 170);
	t = Math.abs(a - 60) - 40;
	t = t < 0 ? 0 : (t / 20);
	ctx.fillStyle = "rgba(255, 255, 255, " + t + ")";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}