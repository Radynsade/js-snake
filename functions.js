const CELL_SIZE = 12;
const CELL_GAP = 1;
const PLAYER_COLOUR = '#ff0000';
const EMPTY_COLOUR = '#ffffff';
const POINT_COLOUR = '#0000ff';

const OBJECT = {
	NONE: 0,
	PLAYER: 1,
	POINT: 2
}

class Cell {
	constructor(context, column, row) {
		this.row = row;
		this.column = column;
		this.context = context;
		this.object = OBJECT.NONE;
		this.x = CELL_GAP + (CELL_SIZE + CELL_GAP) * column;
		this.y = CELL_GAP + (CELL_SIZE + CELL_GAP) * row;
	}

	fill(colour) {
		const context = this.context;
		context.fillStyle = colour;
		context.fillRect(this.x, this.y, CELL_SIZE, CELL_SIZE);

		return this;
	}

	setObject(object) {
		this.object = object;

		return this;
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

class Point {
	constructor(
		grid,
		attached = false,
		spawnX = NaN,
		spawnY = NaN,
		order = 0,
		remains = 0
	) {
		if (!attached) {
			while (true) {
				spawnX = Math.floor(Math.random() * (grid.width - 1));
				spawnY = Math.floor(Math.random() * (grid.height - 1));

				if (grid.cells[spawnX][spawnY].object === OBJECT.NONE) {
					break;
				}
			}
		}

		grid.cells[spawnX][spawnY].fill(POINT_COLOUR).setObject(OBJECT.POINT);
		this.grid = grid;
		this.x = spawnX;
		this.y = spawnY;
		this.order = order;
		this.remains = remains;
		this.attached = attached;
	}

	move() {
		this.grid.cells[this.x][this.y].fill(EMPTY_COLOUR).setObject(OBJECT.NONE);
		let newY, newX;
	}
}

class Player {
	constructor(grid, startX, startY, destination) {
		grid.cells[startX][startY].fill(PLAYER_COLOUR).setObject(OBJECT.PLAYER);

		this.x = startX;
		this.y = startY;
		this.grid = grid;
		this.destination = destination;
		this.points = [];
	}

	move() {
		this.grid.cells[this.x][this.y].fill(EMPTY_COLOUR).setObject(OBJECT.NONE);
		let newY, newX;

		switch (this.destination) {
			case 'ArrowUp':
				newY = this.y - 1;
				this.y = newY < 0 ? this.grid.height - 1 : newY;
				break;
			case 'ArrowDown':
				newY = this.y + 1;
				this.y = newY >= this.grid.height ? 0 : newY;
				break;
			case 'ArrowLeft':
				newX = this.x - 1;
				this.x = newX < 0 ? this.grid.width - 1 : newX;
				break;
			case 'ArrowRight':
				newX = this.x + 1;
				this.x = newX >= this.grid.width ? 0 : newX;
				break;
		}

		if (this.grid.cells[this.x][this.y].object === OBJECT.POINT) {
			new Point(this.grid);

			this.points.push(new Point(this.grid, ));
		}

		this.grid.cells[this.x][this.y].fill(PLAYER_COLOUR).setObject(OBJECT.PLAYER);
		this.points.forEach(point => { point.move() });
	}

	listenControl() {
		document.addEventListener('keydown', event => {
			if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
				this.destination = event.key;
			}
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

		const player = new Player(
			this.grid,
			Math.floor(this.grid.width/2 + (Math.floor(Math.random() * 5) - 5)),
			Math.floor(this.grid.height/2 + (Math.floor(Math.random() * 4) - 4)),
			destinations[Math.floor(Math.random() * destinations.length)]
		);

		player.listenControl();
		new Point(this.grid);

		const timer = setInterval(() => {
			player.move();
		}, this.actualSpeed);
	}
}
