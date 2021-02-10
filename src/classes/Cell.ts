export default class Cell {
	protected context: CanvasRenderingContext2D;
	protected _object: number = 0;
	protected _column: number;
	protected _row: number;
	protected x: number;
	protected y: number;
	private static _gap: number = 1;
	private static _size: number = 10;

	constructor(
		context: CanvasRenderingContext2D,
		column: number,
		row: number
	) {
		this.context = context;
		this._column = column;
		this._row = row;
		this.x = Cell._gap + (Cell._size + Cell._gap) * column;
		this.y = Cell._gap + (Cell._size + Cell._gap) * row;
	}

	public get column() {
		return this._column;
	}

	public get row() {
		return this._row;
	}

	public get object() {
		return this._object;
	}

	public static get size() {
		return this._size;
	}

	public static get gap() {
		return this._gap;
	}

	public setObject(id: number) {
		this._object = id;

		return this;
	}

	public fill(colour: string) {
		const { context } = this;

		context.fillStyle = colour;
		context.fillRect(this.x, this.y, Cell.size, Cell.size);

		return this;
	}
}
