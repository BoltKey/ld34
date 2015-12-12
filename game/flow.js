function toGame() {
	console.log("ingame");
	level = levels[0];
	ingame = true;
	player = new Player();
	navigateMenu(1);
}

function goBack() {
	console.log("goin back");
	navigateMenu(0);
}