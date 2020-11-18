let game = true;

let Enemy = function(x,y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/enemy-bug.png';
	this.height = 65;
	this.width = 95;
	this.collision = false;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 150 * dt;
    
    if (this.x > ctx.canvas.width + this.width) {
        this.x = -200 * Math.floor(Math.random() * 4) +1;
    } else {
        this.x += 150 * dt;
	}
	
	//check for collision
	if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
		this.collision = true;

		//player sent back to starting position
		if (player) {
			player.x = 202;
			player.y = 400;
		}
	} else {
		this.collision = false;
	}
};

// Draw the enemy on the screen
Enemy.prototype.render = function(dt) {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Player = function(x,y,sprite) {
	this.x = x;
	this.y = y;
    this.sprite = sprite;
    this.height = 75;
	this.width = 65;
};

Player.prototype.update = function(dt) {
	if (game && this.y < 40) {
		game = false;
		youWin();
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(direction) {
    const horizontal = 101,
          vertical = 83;

	if (direction === 'left' && this.x - horizontal >= 0) {
		this.x -= horizontal;
	} else if (direction === 'right' && this.x + horizontal < ctx.canvas.width) {
		this.x += horizontal;
	} else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200) {
		this.y += vertical;
	} else if (direction === 'up' && this.y - vertical > 0 - this.height) {
		this.y -= vertical;
	} 
};

// This listens for key presses and sends the keys to
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
	const allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

const enemySpot = [55, 140, 230];

// Place the player object in a variable called player
const player = new Player(202, 400, 'images/char-princess-girl.png');

// Place all enemy objects in an array called allEnemies
let allEnemies = enemySpot.map((y, index) => {
	return new Enemy(-150 * (index + 1), y);
});

function collision(px, py, pw, ph, ex, ey, ew, eh) {
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}

function youWin() {
	noBugs();
	alert("You win! Congrats!");
	document.location.reload();
}

function noBugs() {
	allEnemies = [];
}