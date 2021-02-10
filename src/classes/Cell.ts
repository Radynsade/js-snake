export default class Cell {
	protected context: CanvasRenderingContext2D;
	protected _column: number;
	protected _row: number;
	protected x: number;
	protected y: number;
	protected static gap: number = 1;
	protected static size: number = 10;

	constructor(
		context: CanvasRenderingContext2D,
		column: number,
		row: number
	) {
		this.context = context;
		this._column = column;
		this._row = row;
		this.x = Cell.gap + (Cell.size + Cell.gap) * column;
		this.y = Cell.gap + (Cell.size + Cell.gap) * row;
	}

	get column() {
		return this._column;
	}

	get row() {
		return this._row;
	}

	fill(colour: string) {
		const { context } = this;

		context.fillStyle = colour;
		context.fillRect(this.x, this.y, Cell.size, Cell.size);
	}
}
