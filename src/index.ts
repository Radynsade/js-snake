import Game from 'Classes/Game';
import Grid from 'Classes/Grid';

const grid = new Grid(30, 20);

const game = new Game(grid, {
	initialSpeed: 5,
	maxSpeed: 10,
	acceleration: 0.5
});

grid.putInto(document.body);
game.start();
