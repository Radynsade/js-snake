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

	public listenControl(): void {
		document.addEventListener('keydown', event => {
			if (event.key === Direction.Up || event.key === Direction.Down || event.key === Direction.Left || event.key === Direction.Right) {
				this.setDirection(event.key);
			}
		});
	}

	protected onMove(oldX: number, oldY: number, newX: number, newY: number): void {
		if (this.grid.cells[newX][newY].object === Point.id) {
			Point.randomSpawn(this.grid);
		}
	}
}
