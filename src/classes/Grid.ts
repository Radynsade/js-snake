import Cell from 'Classes/Cell';

export default class Grid {
	public cells: Cell[];
	private _width: number;
	private _height: number;
	private canvas: HTMLCanvasElement

	constructor(
		width: number,
		height: number
	) {
		this._width = width;
		this._height = height;
		this.canvas = document.createElement('canvas');
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}
}
