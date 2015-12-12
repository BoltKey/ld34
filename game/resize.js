function resize() {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	ctx.fillRect(10 + canvas.width / 10, 10 + canvas.height / 5, 200, 100 + canvas.height / 3);
	//newButtons();
}