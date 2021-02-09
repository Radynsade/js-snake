const CELL_SIZE = 12;
const CELL_GAP = 1;
const PLAYER_COLOUR = '#ff0000';
const EMPTY_COLOUR = '#ffffff';
const POINT_COLOUR = '#0000ff';

class Cell {
	constructor(context, column, row) {
		this.row = row;
		this.column = column;
		this.context = context;
		this.x = CELL_GAP + (CELL_SIZE + CELL_GAP) * column;
		this.y = CELL_GAP + (CELL_SIZE + CELL_GAP) * row;
	}

	fill(colour) {
		const context = this.context;
		context.fillStyle = colour;
		context.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);
	}
}

class Grid {
	constructor(width, height) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		canvas.setAttribute('width', `${width * CELL_SIZE + width * CELL_GAP + CELL_GAP}px`);
		canvas.setAttribute('height', `${height * CELL_SIZE + height * CELL_GAP + CELL_GAP}px`);

		let cells = [];
		let column, row;

		for (column = 0; column < width; column++) {
			cells[column] = [];

			for (row = 0; row < height; row++) {
				cells[column][row] = new Cell(context, column, row);
			}
		}

		this.width = width;
		this.height = height;
		this.canvas = canvas;
		this.context = context;
		this.cells = cells;
	}

	putInto(element) {
		element.appendChild(this.canvas);
	}
}

class Player {
	constructor(grid, startX, startY, destination) {
		grid.cells[startX][startY].fill(PLAYER_COLOUR);

		this.x = startX;
		this.y = startY;
		this.grid = grid;
		this.destination = destination;
	}

	move() {
		grid.cells[this.x][this.y].fill(EMPTY_COLOUR);

		switch (this.destination) {
			case 'ArrowUp':
				this.y = this.y - 1;
				break;
			case 'ArrowDown':
				this.y = this.y + 1;
				break;
			case 'ArrowLeft':
				this.x = this.x - 1;
				break;
			case 'ArrowRight':
				this.x = this.x + 1;
				break;
		}

		grid.cells[this.x][this.y].fill(PLAYER_COLOUR);
	}

	listenControl() {
		document.addEventListener('keydown', event => {
			this.destination = event.key;
		});
	}
}

class Game {
	constructor(grid, initialSpeed, maxSpeed, acceleration) {
		this.grid = grid;
		this.initialSpeed = initialSpeed;
		this.maxSpeed = maxSpeed;
		this.acceleration = acceleration;
		this.actualSpeed = 1000 / initialSpeed;
	}

	start() {
		const destinations = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
		const player = new Player(this.grid, 1, 30, destinations[Math.floor(Math.random() * destinations.length)]);

		player.listenControl();

		setInterval(() => {
			player.move();
		}, this.actualSpeed);
	}
}
