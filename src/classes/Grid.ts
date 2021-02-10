import Cell from 'Classes/Cell';

export default class Grid {
	protected _cells: Cell[][];
	protected _width: number;
	protected _height: number;
	protected canvas: HTMLCanvasElement;
	protected context: CanvasRenderingContext2D;
	protected static _background: string = '#ffffff';

	constructor(
		width: number,
		height: number
	) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		canvas.setAttribute('width', `${width * Cell.size + width * Cell.gap + Cell.gap}px`);
		canvas.setAttribute('height', `${height * Cell.size + height * Cell.gap + Cell.gap}px`);
		canvas.style.backgroundColor = Grid._background;

		let cells: Cell[][] = [];
		let column, row;

		for (column = 0; column < width; column++) {
			cells[column] = [];

			for (row = 0; row < height; row++) {
				cells[column][row] = new Cell(context as CanvasRenderingContext2D, column, row);
			}
		}

		this._cells = cells;
		this._width = width;
		this._height = height;
		this.canvas = canvas;
		this.context = context as CanvasRenderingContext2D;
	}

	public static get background() {
		return Grid._background;
	}

	public get cells() {
		return this._cells;
	}

	public get width(): number {
		return this._width;
	}

	public get height(): number {
		return this._height;
	}

	public async putInto(element: HTMLElement) {
		element.appendChild(this.canvas);
	}
}
