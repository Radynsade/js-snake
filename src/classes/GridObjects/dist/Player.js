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
var Point_1 = require("Classes/GridObjects/Point");
var enums_1 = require("Root/enums");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(grid, properties) {
        return _super.call(this, grid, __assign(__assign({}, properties), { colour: '#ff0000', typeId: Player.id })) || this;
    }
    Player.prototype.listenControl = function () {
        var _this = this;
        document.addEventListener('keydown', function (event) {
            if (event.key === enums_1.Direction.Up || event.key === enums_1.Direction.Down || event.key === enums_1.Direction.Left || event.key === enums_1.Direction.Right) {
                _this.setDirection(event.key);
            }
        });
    };
    Player.prototype.onMove = function (oldX, oldY, newX, newY) {
        if (this.grid.cells[newX][newY].object === Point_1["default"].id) {
            Point_1["default"].randomSpawn(this.grid);
        }
    };
    Player.id = 1;
    return Player;
}(GridObject_1["default"]));
exports["default"] = Player;
