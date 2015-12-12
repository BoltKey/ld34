var level;
var currlevel;
function toGame() {
	console.log("ingame");
	currlevel = Cookies.get("levelSave");
	if (typeof(currlevel) === "undefined") currlevel = 0;
	level = levels[currlevel];
	ingame = true;
	player = new Player();
}

function c(n) {
	Cookies.set("levelSave", n, {expires: 30});
}

function nextLevel() {
	++currlevel;
	level = levels[currlevel];
	Cookies.set("levelSave", currlevel, {expires: 30});
	player.newLevel();
	goalSound.play();
}
