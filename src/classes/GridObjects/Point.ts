import Grid from 'Classes/Grid';
import GridObject from 'Classes/GridObject';
import { Direction } from 'Root/enums';

export default class Point extends GridObject {
	public static id: number = 2;

	constructor(
		grid: Grid,
		properties: {
			x: number;
			y: number;
			direction: Direction;
		}
	) {
		super(grid, { ...properties, ...{ colour: '#0000ff', typeId: Point.id } });
	}

	public static randomSpawn(grid: Grid): Point {
		let spawnX, spawnY;

		while (true) {
			spawnX = Math.floor(Math.random() * (grid.width - 1));
			spawnY = Math.floor(Math.random() * (grid.height - 1));

			if (grid.cells[spawnX][spawnY].object === 0) {
				break;
			}
		}

		return new Point(grid, {
			x: spawnX,
			y: spawnY,
			direction: Direction.Up
		});
	}
}
