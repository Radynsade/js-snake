import Grid from 'Classes/Grid';
import GridObject from 'Classes/GridObject';
import { Direction } from 'Root/enums';

export default class Player extends GridObject {
	public static colour: string = '#ff0000';

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
