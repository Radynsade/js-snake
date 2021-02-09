const options = {
	width: 50, // Количество клеток в ширину
	height: 35, // Количество клеток в высоту
	initialSpeed: 5, // Стартовая скорость (количество обновлений в секунду)
	maxSpeed: 10, // Максимальная скорость
	acceleration: 1 // Ускорение, которое будет прибавляться каждый раз, когда ты схаваешь точку
}

const grid = new Grid(50, 35);

grid.putInto(document.body);

const game = new Game(grid, options.initialSpeed, options.maxSpeed, options.acceleration);

game.start();