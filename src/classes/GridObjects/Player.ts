import Grid from 'Classes/Grid';
import GridObject from 'Classes/GridObject';
import Point from 'Classes/GridObjects/Point';
import { Direction } from 'Root/enums';

export default class Player extends GridObject {
	public static id: number = 1;

	constructor(
		grid: Grid,
		properties: {
			x: number;
			y: number;
			direction: Direction;
		}
	) {
		super(grid, { ...properties, ...{ colour: '#ff0000', typeId: Player.id } });
	}

	public async listenControl(): Promise<void> {

	}

	protected async onMove(oldX: number, oldY: number, newX: number, newY: number): Promise<void> {
		if (this.grid.cells[this.x][this.y].object === Point.id) {
			Point.randomSpawn(this.grid);
		}
	}
}
