import Grid from 'Classes/Grid';
import { Direction } from 'Root/enums';

export default abstract class GridObject {
	public x: number;
	public y: number;
	protected _grid: Grid;
	protected _direction: Direction;
	protected _colour: string;
	protected _typeId: number;

	constructor(
		grid: Grid,
		properties: {
			x: number;
			y: number;
			direction: Direction;
			colour: string;
			typeId: number;
		}
	) {
		const { x, y, direction, colour, typeId } = properties;

		grid.cells[x][y].fill(colour).setObject(typeId);

		this._typeId = typeId;
		this._grid = grid;
		this._direction = direction;
		this._colour = colour;
		this.x = x;
		this.y = y;
	}

	public get typeId() {
		return this._typeId;
	}

	public get colour() {
		return this._colour;
	}

	public get grid() {
		return this._grid;
	}

	public get direction() {
		return this._direction;
	}

	public setDirection(direction: Direction) {
		this._direction = direction;

		return this;
	}

	public move() {
		const oldX = this.x;
		const oldY = this.y;
		let newX, newY;

		switch (this.direction) {
			case Direction.Up:
				newY = this.y - 1;
				newY = newY < 0 ? this.grid.height - 1 : newY;
				newX = this.x;
				break;
			case Direction.Down:
				newY = this.y + 1;
				newY = newY >= this.grid.height ? 0 : newY;
				newX = this.x;
				break;
			case Direction.Left:
				newX = this.x - 1;
				newX = newX < 0 ? this.grid.width - 1 : newX;
				newY = this.y;
				break;
			case Direction.Right:
				newX = this.x + 1;
				newX = newX >= this.grid.width ? 0 : newX;
				newY = this.y;
				break;
		}

		if (this.onMove) this.onMove(oldX, oldY, newX, newY);

		this.x = newX;
		this.y = newY;

		this.grid.cells[oldX][oldY].fill(Grid.background).setObject(0);
		this.grid.cells[newX][newY].fill(this.colour).setObject(this.typeId);
	}

	protected onMove?(
		oldX: number,
		oldY: number,
		newX: number,
		newY: number
	): void;
}
