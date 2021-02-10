"use strict";
exports.__esModule = true;
var Cell = /** @class */ (function () {
    function Cell(context, column, row) {
        this._object = 0;
        this.context = context;
        this._column = column;
        this._row = row;
        this.x = Cell._gap + (Cell._size + Cell._gap) * column;
        this.y = Cell._gap + (Cell._size + Cell._gap) * row;
    }
    Object.defineProperty(Cell.prototype, "column", {
        get: function () {
            return this._column;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "row", {
        get: function () {
            return this._row;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "object", {
        get: function () {
            return this._object;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Cell, "gap", {
        get: function () {
            return this._gap;
        },
        enumerable: false,
        configurable: true
    });
    Cell.prototype.setObject = function (id) {
        this._object = id;
        return this;
    };
    Cell.prototype.fill = function (colour) {
        var context = this.context;
        context.fillStyle = colour;
        context.fillRect(this.x, this.y, Cell.size, Cell.size);
        return this;
    };
    Cell._gap = 1;
    Cell._size = 10;
    return Cell;
}());
exports["default"] = Cell;
