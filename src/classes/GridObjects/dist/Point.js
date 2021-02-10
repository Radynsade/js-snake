"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var GridObject_1 = require("Classes/GridObject");
var enums_1 = require("Root/enums");
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point(grid, properties) {
        return _super.call(this, grid, __assign(__assign({}, properties), { colour: '#0000ff', typeId: Point.id })) || this;
    }
    Point.randomSpawn = function (grid) {
        var spawnX, spawnY;
        while (true) {
            spawnX = Math.floor(Math.random() * (grid.width - 1));
            spawnY = Math.floor(Math.random() * (grid.height - 1));
            if (grid.cells[spawnX][spawnY].object === 0) {
                break;
            }
        }
        return new Point(grid, {
            x: spawnX,
            y: spawnY,
            direction: enums_1.Direction.Up
        });
    };
    Point.id = 2;
    return Point;
}(GridObject_1["default"]));
exports["default"] = Point;
