import Grid from 'Classes/Grid';
import { Direction } from 'Root/enums';

export default abstract class GridObject {
	public x: number;
	public y: number;
	protected _grid: Grid;
	protected _direction: Direction;

	constructor(
		grid: Grid,
		properties: {
			x: number;
			y: number;
			direction: Direction;
		}
	) {
		const { x, y, direction } = properties;

		this._grid = grid;
		this._direction = direction;
		this.x = x;
		this.y = y;
	}

	get grid() {
		return this._grid;
	}
}
