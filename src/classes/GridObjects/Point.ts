import Grid from 'Classes/Grid';
import GridObject from 'Classes/GridObject';
import { Direction } from 'Root/enums';

export default class Point extends GridObject {
	public static colour: string = '#0000ff';

	constructor(
		grid: Grid,
		properties: {
			x: number;
			y: number;
			direction: Direction;
		}
	) {
		super(grid, properties);
	}
}
