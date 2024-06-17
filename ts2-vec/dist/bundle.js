/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/color.ts":
/*!**********************!*\
  !*** ./src/color.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: () => (/* binding */ Color)
/* harmony export */ });
/* harmony import */ var _vec3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vec3 */ "./src/vec3.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Color = /** @class */ (function (_super) {
    __extends(Color, _super);
    function Color() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Color.prototype, "r", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: function () {
            return this._z;
        },
        enumerable: false,
        configurable: true
    });
    Color.prototype.write = function (buffer, offset) {
        buffer[offset] = Math.floor(this.r * 255.999);
        buffer[offset + 1] = Math.floor(this.g * 255.999);
        buffer[offset + 2] = Math.floor(this.b * 255.999);
        buffer[offset + 3] = 255;
    };
    return Color;
}(_vec3__WEBPACK_IMPORTED_MODULE_0__.Vec3));



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Main: () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/color.ts");

var Main = /** @class */ (function () {
    function Main(element) {
        var canvas = document.getElementById(element);
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            throw "canvas context not found";
        }
        var image_width = canvas.width;
        var image_height = canvas.height;
        var imageData = ctx.getImageData(0, 0, image_width, image_height);
        var data = imageData.data;
        for (var j = 0; j < image_height; j++) {
            for (var i = 0; i < image_width; i++) {
                var offs = ((j * image_width) + i) * 4;
                var col = new _color__WEBPACK_IMPORTED_MODULE_0__.Color(i / image_width, j / image_height, 0);
                col.write(data, offs);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
    return Main;
}());



/***/ }),

/***/ "./src/vec3.ts":
/*!*********************!*\
  !*** ./src/vec3.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vec3: () => (/* binding */ Vec3)
/* harmony export */ });
var Vec3 = /** @class */ (function () {
    function Vec3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this._x = 0;
        this._y = 0;
        this._z = 0;
        if (typeof x === "number") {
            this._x = x;
            this._y = y;
            this._z = z;
        }
        else {
            this._x = x._x;
            this._y = x._y;
            this._z = x._z;
        }
    }
    Object.defineProperty(Vec3.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "z", {
        get: function () {
            return this._z;
        },
        enumerable: false,
        configurable: true
    });
    Vec3.prototype.invert = function () {
        return new Vec3(-this._x, -this._y, -this._z);
    };
    Vec3.prototype.addInPlace = function (t) {
        this._x += t._x;
        this._y += t._y;
        this._z += t._z;
        return this;
    };
    Vec3.prototype.subInPlace = function (t) {
        this._x -= t._x;
        this._y -= t._y;
        this._z -= t._z;
        return this;
    };
    Vec3.prototype.scaleInPlace = function (s) {
        this._x *= s;
        this._y *= s;
        this._z *= s;
        return this;
    };
    Vec3.prototype.divInPlace = function (s) {
        return this.scaleInPlace(1 / s);
    };
    Vec3.prototype.length = function () {
        return Math.sqrt(this.lengthSquared());
    };
    Vec3.prototype.lengthSquared = function () {
        return this._x * this._x + this._y * this._y + this._z * this._z;
    };
    Vec3.prototype.add = function (v) {
        return new Vec3(this._x + v._x, this._y + v._y, this._z + v._z);
    };
    Vec3.prototype.sub = function (v) {
        return new Vec3(this._x - v._x, this._y - v._y, this._z - v._z);
    };
    Vec3.prototype.mul = function (v) {
        return new Vec3(this._x * v._x, this._y * v._y, this._z * v._z);
    };
    Vec3.prototype.scale = function (s) {
        return new Vec3(this._x * s, this._y * s, this._z * s);
    };
    Vec3.prototype.div = function (s) {
        return this.scale(1 / s);
    };
    Vec3.prototype.dot = function (v) {
        return this._x * v._x + this._y * v._y + this._z * v._z;
    };
    Vec3.prototype.cross = function (v) {
        return new Vec3(this._y * v._x - this._z * v._y, this._z * v._x - this._x * v._z, this._x * v._y - this._y * v._z);
    };
    Vec3.prototype.unit = function () {
        return this.div(this.length());
    };
    return Vec3;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./src/main.ts");

var main = new _main__WEBPACK_IMPORTED_MODULE_0__.Main("renderCanvas");

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMzQixJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsRUFBRSxDQUMxQixDQUFDO0lBQ0osQ0FBQztJQUNNLG1CQUFJLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7VUNsR0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOOEI7QUFFOUIsSUFBTSxJQUFJLEdBQUcsSUFBSSx1Q0FBSSxDQUFDLGNBQWMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RzMS1pbWcvLi9zcmMvY29sb3IudHMiLCJ3ZWJwYWNrOi8vdHMxLWltZy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL3RzMS1pbWcvLi9zcmMvdmVjMy50cyIsIndlYnBhY2s6Ly90czEtaW1nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RzMS1pbWcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RzMS1pbWcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90czEtaW1nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdHMxLWltZy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWMzIH0gZnJvbSBcIi4vdmVjM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbG9yIGV4dGVuZHMgVmVjM3tcclxuICBwdWJsaWMgZ2V0IHIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl94O1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0IGcoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl95O1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0IGIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl96O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHdyaXRlKGJ1ZmZlcjpVaW50OENsYW1wZWRBcnJheSwgb2Zmc2V0Om51bWJlcil7XHJcbiAgICBidWZmZXJbb2Zmc2V0XSA9IE1hdGguZmxvb3IodGhpcy5yICogMjU1Ljk5OSlcclxuICAgIGJ1ZmZlcltvZmZzZXQrMV0gPSBNYXRoLmZsb29yKHRoaXMuZyAqIDI1NS45OTkpXHJcbiAgICBidWZmZXJbb2Zmc2V0KzJdID0gTWF0aC5mbG9vcih0aGlzLmIgKiAyNTUuOTk5KVxyXG4gICAgYnVmZmVyW29mZnNldCszXSA9IDI1NVxyXG4gIH1cclxufSIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWlue1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihlbGVtZW50OnN0cmluZyl7XHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCl7XHJcbiAgICAgIHRocm93IFwiY2FudmFzIGNvbnRleHQgbm90IGZvdW5kXCJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbWFnZV93aWR0aCA9ICBjYW52YXMud2lkdGg7XHJcbiAgICBjb25zdCBpbWFnZV9oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLDAsaW1hZ2Vfd2lkdGgsIGltYWdlX2hlaWdodCk7XHJcbiAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XHJcblxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbWFnZV9oZWlnaHQ7IGorKykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlX3dpZHRoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBvZmZzID0gKChqICogaW1hZ2Vfd2lkdGgpICsgaSkgKiA0XHJcbiAgICAgICAgdmFyIGNvbCA9IG5ldyBDb2xvcihpIC8gaW1hZ2Vfd2lkdGgsIGovaW1hZ2VfaGVpZ2h0LCAwKVxyXG4gICAgICAgIGNvbC53cml0ZShkYXRhLCBvZmZzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFZlYzN7XHJcblxyXG4gIHByb3RlY3RlZCBfeDogbnVtYmVyID0gMDtcclxuICBwcm90ZWN0ZWQgX3k6bnVtYmVyID0gMDtcclxuICBwcm90ZWN0ZWQgX3o6bnVtYmVyID0gMDtcclxuXHJcblxyXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgeigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3o7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoKTtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCB6Om51bWJlcik7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHY6VmVjMyk7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHg6VmVjM3xudW1iZXIgPSAwLCB5Om51bWJlciA9IDAsIHo6bnVtYmVyID0gMCl7XHJcbiAgICBpZiAodHlwZW9mIHggPT09IFwibnVtYmVyXCIpe1xyXG4gICAgICB0aGlzLl94ID0geDtcclxuICAgICAgdGhpcy5feSA9IHk7XHJcbiAgICAgIHRoaXMuX3ogPSB6O1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgdGhpcy5feCA9IHguX3g7XHJcbiAgICAgIHRoaXMuX3kgPSB4Ll95O1xyXG4gICAgICB0aGlzLl96ID0geC5fejtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnZlcnQoKTpWZWMze1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKC10aGlzLl94LCAtdGhpcy5feSwtdGhpcy5feik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkSW5QbGFjZSh0OlZlYzMpOlZlYzN7XHJcbiAgICB0aGlzLl94ICs9IHQuX3g7XHJcbiAgICB0aGlzLl95ICs9IHQuX3k7XHJcbiAgICB0aGlzLl96ICs9IHQuX3o7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcHVibGljIHN1YkluUGxhY2UodDpWZWMzKTpWZWMze1xyXG4gICAgdGhpcy5feCAtPSB0Ll94O1xyXG4gICAgdGhpcy5feSAtPSB0Ll95O1xyXG4gICAgdGhpcy5feiAtPSB0Ll96O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2NhbGVJblBsYWNlKHM6bnVtYmVyKTpWZWMze1xyXG4gICAgdGhpcy5feCAqPSBzO1xyXG4gICAgdGhpcy5feSAqPSBzO1xyXG4gICAgdGhpcy5feiAqPSBzO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGl2SW5QbGFjZShzOm51bWJlcik6VmVjM3tcclxuICAgIHJldHVybiB0aGlzLnNjYWxlSW5QbGFjZSgxL3MpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxlbmd0aCgpOm51bWJlcntcclxuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXVhcmVkKCkpO1xyXG5cclxuICB9ICBcclxuICBwdWJsaWMgbGVuZ3RoU3F1YXJlZCgpOm51bWJlcntcclxuICAgIHJldHVybiB0aGlzLl94KnRoaXMuX3ggKyB0aGlzLl95KnRoaXMuX3kgKyB0aGlzLl96KnRoaXMuX3o7XHJcbiAgfSAgXHJcblxyXG4gIHB1YmxpYyBhZGQodjpWZWMzKTpWZWMze1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKCB0aGlzLl94ICsgdi5feCwgdGhpcy5feSt2Ll95LCB0aGlzLl96K3YuX3opO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgc3ViKHY6VmVjMyk6VmVjM3tcclxuICAgIHJldHVybiBuZXcgVmVjMyggdGhpcy5feC12Ll94LCB0aGlzLl95LXYuX3ksIHRoaXMuX3otdi5feik7XHJcbiAgfVxyXG4gIHB1YmxpYyBtdWwodjpWZWMzKTpWZWMze1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMuX3gqdi5feCwgdGhpcy5feSp2Ll95LCB0aGlzLl96KnYuX3opO1xyXG4gIH0gIFxyXG4gIHB1YmxpYyBzY2FsZShzOm51bWJlcik6VmVjM3tcclxuICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLl94KnMsIHRoaXMuX3kqcywgdGhpcy5feipzKTtcclxuICB9ICBcclxuICBwdWJsaWMgZGl2KHM6bnVtYmVyKTpWZWMze1xyXG4gICAgcmV0dXJuIHRoaXMuc2NhbGUoMS9zKTtcclxuICB9XHJcbiAgcHVibGljIGRvdCh2OlZlYzMpOm51bWJlcntcclxuICAgIHJldHVybiB0aGlzLl94KnYuX3ggKyB0aGlzLl95KnYuX3kgKyB0aGlzLl96KnYuX3o7XHJcbiAgfVxyXG4gIHB1YmxpYyBjcm9zcyh2OlZlYzMpOlZlYzN7XHJcbiAgICByZXR1cm4gbmV3IFZlYzMoXHJcbiAgICAgIHRoaXMuX3kqdi5feCAtIHRoaXMuX3oqdi5feSxcclxuICAgICAgdGhpcy5feip2Ll94IC0gdGhpcy5feCp2Ll96LFxyXG4gICAgICB0aGlzLl94KnYuX3ktdGhpcy5feSp2Ll96XHJcbiAgICApO1xyXG4gIH1cclxuICBwdWJsaWMgdW5pdCgpe1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2KHRoaXMubGVuZ3RoKCkpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBwb2ludCA9IFZlYzM7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNYWluIH0gZnJvbSBcIi4vbWFpblwiO1xyXG5cclxuY29uc3QgbWFpbiA9IG5ldyBNYWluKFwicmVuZGVyQ2FudmFzXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9