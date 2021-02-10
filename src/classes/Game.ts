import 'Classes/Grid';
import Grid from 'Classes/Grid';

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
}