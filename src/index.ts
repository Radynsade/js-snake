import Game from 'Classes/Game';
import Grid from 'Classes/Grid';

const grid = new Grid(50, 35);

const game = new Game(grid, {
	initialSpeed: 5,
	maxSpeed: 10,
	acceleration: 1
});

grid.putInto(document.body);
game.start();
