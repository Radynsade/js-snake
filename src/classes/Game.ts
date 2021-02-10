import Grid from 'Classes/Grid';
import Player from 'Classes/GridObjects/Player';
import Point from 'Classes/GridObjects/Point';
import { Direction } from 'Root/enums';

export default class Game {
	protected _grid: Grid;
	protected _initialSpeed: number;
	protected _maxSpeed: number;
	protected _acceleration: number;
	protected _actualSpeed: number;

	constructor(
		grid: Grid,
		options: {
			initialSpeed: number;
			maxSpeed: number;
			acceleration: number;
		}
	) {
		const { initialSpeed, maxSpeed, acceleration } = options;

		this._grid = grid;
		this._initialSpeed = initialSpeed;
		this._maxSpeed = maxSpeed;
		this._acceleration = acceleration;
		this._actualSpeed = 1000 / initialSpeed;
	}

	public get grid() {
		return this._grid;
	}

	public get actualSpeed() {
		return this._actualSpeed;
	}

	public get initialSpeed() {
		return this._initialSpeed;
	}

	public get maxSpeed() {
		return this._maxSpeed;
	}

	public get acceleration() {
		return this._acceleration;
	}

	public start(): void {
		const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];

		const player = new Player(
			this.grid,
			{
				x: Math.floor(this.grid.width / 2 + (Math.floor(Math.random() * 5) - 5)),
				y: Math.floor(this.grid.height / 2 + (Math.floor(Math.random() * 4) - 4)),
				direction: directions[Math.floor(Math.random() * directions.length)]
			}
		);

		player.listenControl();
		Point.randomSpawn(this.grid);

		const timer = setInterval(() => {
			player.move();
		}, this.actualSpeed);
	}
}