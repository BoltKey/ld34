function keypush(ev) {
	if([17, 27, 37, 38, 39, 40, 32, 82].indexOf(ev.keyCode) > -1) {  
        ev.preventDefault();
    }
	if (pressedkeys.indexOf(ev.keyCode) === -1) {
		pressedkeys.push(ev.keyCode);
		keypressaction(ev.keyCode);
	}
	console.log("pushed keys: " + pressedkeys);
}

function keyrelease(ev) {
	pressedkeys.splice(pressedkeys.indexOf(ev.keyCode), 1);
	console.log("pushed keys: " + pressedkeys);
}

function keypressaction(c) {
	switch(c) {
		case 38: 	// up
			//player.up();
			break;
		case 39:	// right
			player.right();
			break;
	}
}

function keyholdaction(c) {
	switch(c) {
		case 38: 	// up
			player.up();
			break;
		case 39: 
			player.right();
			break;
	}
}