import Grid from 'Classes/Grid';
import GridObject from 'Classes/GridObject';
import { Direction } from 'Root/enums';

export default class FollowingPoint extends GridObject {
	public static id: number = 3;

	constructor(
		grid: Grid,
		properties: {
			x: number;
			y: number;
			direction: Direction;
		}
	) {
		super(grid, { ...properties, ...{ colour: '#00aa00', typeId: FollowingPoint.id } });
	}

	protected afterMove(oldX: number, oldY: number) {
		const currentCell = this.grid.cells[this.x][this.y];

		if (currentCell.direction) this.setDirection(currentCell.direction);
	}
}
