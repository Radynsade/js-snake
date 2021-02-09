const CELL_SIZE = 12;
const CELL_GAP = 2;
const PLAYER_COLOUR = '#ff0000';
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

class Game {
	constructor(grid, initialSpeed, maxSpeed, acceleration) {
		this.grid = grid;
		this.initialSpeed = initialSpeed;
		this.maxSpeed = maxSpeed;
		this.acceleration = acceleration
	}

	start() {

	}
}
