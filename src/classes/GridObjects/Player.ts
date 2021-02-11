import Grid from 'Classes/Grid';
import Game from 'Classes/Game';
import GridObject from 'Classes/GridObject';
import Point from 'Classes/GridObjects/Point';
import FollowingPoint from 'Classes/GridObjects/FollowingPoint';
import { Direction } from 'Root/enums';

export default class Player extends GridObject {
	protected lastX: number;
	protected lastY: number;
	protected lastDirection: Direction;
	protected _points: FollowingPoint[] = [];
	protected previousPoints: number = 0;
	protected currentPoints: number = 0;
	protected game: Game;
	private changedDirection: boolean = false;
	private counter: HTMLElement;
	public static id: number = 1;

	constructor(
		game: Game,
		grid: Grid,
		properties: {
			x: number;
			y: number;
			direction: Direction;
		}
	) {
		super(grid, { ...properties, ...{ colour: '#ff0000', typeId: Player.id } });

		const { x, y, direction } = properties;

		this.lastX = x;
		this.lastY = y;
		this.lastDirection = direction;
		this.game = game;
		this.counter = document.getElementById('points') as HTMLElement;
		this.counter.textContent = String(this.currentPoints);
	}

	public get points() {
		return this._points;
	}

	public listenControl(): void {
		document.addEventListener('keydown', event => {
			if (event.key === Direction.Up || event.key === Direction.Down || event.key === Direction.Left || event.key === Direction.Right) {
				if (!this.changedDirection) {
					if (this.currentPoints <= 0) {
						this.grid.cells[this.x][this.y].direction = event.key;
						this.setDirection(event.key);
						this.changedDirection = true;

						return;
					}

					if (event.key === Direction.Up && this.direction === Direction.Down) return;
					if (event.key === Direction.Down && this.direction === Direction.Up) return;
					if (event.key === Direction.Left && this.direction === Direction.Right) return;
					if (event.key === Direction.Right && this.direction === Direction.Left) return;

					this.grid.cells[this.x][this.y].direction = event.key;
					this.setDirection(event.key);
					this.changedDirection = true;
				}
			}
		});
	}

	protected beforeMove(newX: number, newY: number) {
		const nextCell = this.grid.cells[newX][newY];

		if (nextCell.object === Point.id) {
			Point.randomSpawn(this.grid);
			this.currentPoints += 1;
			this.game.accelerate();

			this.counter.textContent = String(this.currentPoints);
			const lastPoint = this.points[this.points.length - 1] || undefined;

			if (lastPoint) {
				this.lastX = lastPoint.prevX;
				this.lastY = lastPoint.prevY;
				this.lastDirection = lastPoint.prevDirection;
			} else {
				this.lastX = this.prevX;
				this.lastY = this.prevY;
				this.lastDirection = this.prevDirection;
			}
		}

		if (nextCell.object === FollowingPoint.id) {
			this.game.stop();
		}
	}

	protected afterMove(oldX: number, oldY: number): void {
		this.changedDirection = false;

		const lastPoint = this.points[this.points.length - 1] || undefined;

		if (this.previousPoints < this.currentPoints) {
			this.points.push(new FollowingPoint(
				this.grid,
				{
					x: this.lastX,
					y: this.lastY,
					direction: this.lastDirection
				}
			));

			this.previousPoints += 1;
		}

		this.points.forEach(point => point.move());

		if (lastPoint) {
			this.grid.cells[lastPoint.prevX][lastPoint.prevY].direction = undefined;
		} else {
			this.grid.cells[this.prevX][this.prevY].direction = undefined;
		}
	}
}
