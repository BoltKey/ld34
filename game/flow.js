var level;
var currlevel;
function toGame() {
	ctx.font = "12px Arial";
	console.log("ingame");
	currlevel = Cookies.get("levelSave");
	if (typeof(currlevel) === "undefined") currlevel = 0;
	level = levels[currlevel];
	//music.play();
	ingame = true;
	player = new Player();
	level.draw(true);
}

function c(n) {
	Cookies.set("levelSave", n, {expires: 30});
}

function nextLevel() {
	if (currlevel < levels.length - 1) {
		++currlevel;
		level = levels[currlevel];
		Cookies.set("levelSave", currlevel, {expires: 30});
		player.newLevel();
		goalSound.play();
	}
	else player.die();	
}
