function Player() {
	this.x;
	this.y;
	this.speedx;
	this.speedy;
	this.up = function() {
		console.log("right");
		this.speedy -= 1;
	}
	this.right = function() {
		console.log("up");
		this.speex += 1;
	}
	this.draw = function() {
		ctx.fill
	}
}