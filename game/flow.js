var level;
var currlevel;
function toGame() {
	console.log("ingame");
	currlevel = 0;
	level = levels[currlevel];
	ingame = true;
	player = new Player();
}

function nextLevel() {
	++currlevel;
	level = levels[currlevel];
	player.newLevel();
	goalSound.play();
}

/*function goBack() {
	console.log("goin back");
	navigateMenu(0);
}*/