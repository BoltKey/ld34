/*var menubuttons;
var pressedkeys = [];
function newButtons() {
	menubuttons = [
		{x: 20, y: canvas.height - 120, display: "Restart", menu: [1], onClick: "player.die()"},
		{x: 50, y: 30, display: "Play", menu: [0], onClick: "toGame()"},
		{x: 20, y: canvas.height - 60, display: "Back", menu: [1], onClick: "goBack()"}
	];
}

function navigateMenu(id) {
	$(".btn").remove();
	for (b of menubuttons) {
		if (b.menu.indexOf(id) > -1) {
			var a = $("<button type='button' class='btn btn-lg btn-primary' onclick='" + b.onClick + "'>" + b.display + "</button>")
			a.css("position", "fixed");
			a.css("left", b.x);
			a.css("top", b.y);
			$("body").append(a);
		}
	}
}*/