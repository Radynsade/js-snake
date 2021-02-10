"use strict";
exports.__esModule = true;
var Grid_1 = require("Classes/Grid");
var enums_1 = require("Root/enums");
var GridObject = /** @class */ (function () {
    function GridObject(grid, properties) {
        var x = properties.x, y = properties.y, direction = properties.direction, colour = properties.colour, typeId = properties.typeId;
        grid.cells[x][y].fill(colour).setObject(typeId);
        this._typeId = typeId;
        this._grid = grid;
        this._direction = direction;
        this._colour = colour;
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(GridObject.prototype, "typeId", {
        get: function () {
            return this._typeId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridObject.prototype, "colour", {
        get: function () {
            return this._colour;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridObject.prototype, "grid", {
        get: function () {
            return this._grid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GridObject.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: false,
        configurable: true
    });
    GridObject.prototype.setDirection = function (direction) {
        this._direction = direction;
        return this;
    };
    GridObject.prototype.move = function () {
        var oldX = this.x;
        var oldY = this.y;
        var newX, newY;
        switch (this.direction) {
            case enums_1.Direction.Up:
                newY = this.y - 1;
                newY = newY < 0 ? this.grid.height - 1 : newY;
                newX = this.x;
                break;
            case enums_1.Direction.Down:
                newY = this.y + 1;
                newY = newY >= this.grid.height ? 0 : newY;
                newX = this.x;
                break;
            case enums_1.Direction.Left:
                newX = this.x - 1;
                newX = newX < 0 ? this.grid.width - 1 : newX;
                newY = this.y;
                break;
            case enums_1.Direction.Right:
                newX = this.x + 1;
                newX = newX >= this.grid.width ? 0 : newX;
                newY = this.y;
                break;
        }
        if (this.onMove)
            this.onMove(oldX, oldY, newX, newY);
        this.x = newX;
        this.y = newY;
        this.grid.cells[oldX][oldY].fill(Grid_1["default"].background).setObject(0);
        this.grid.cells[newX][newY].fill(this.colour).setObject(this.typeId);
    };
    return GridObject;
}());
exports["default"] = GridObject;
