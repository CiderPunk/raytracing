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
/* harmony import */ var _ray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ray */ "./src/ray.ts");
/* harmony import */ var _vec3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vec3 */ "./src/vec3.ts");



var Main = /** @class */ (function () {
    function Main(element) {
        //canvas setup
        var canvas = document.getElementById(element);
        canvas.width = 400;
        canvas.height = 225;
        //context setup
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            throw "canvas context not found";
        }
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        //display size
        var aspect_ratio = 16 / 9;
        var image_width = canvas.width;
        var image_height = Math.floor(image_width / aspect_ratio);
        //camera/ viewport
        var focal_length = 1.0;
        var viewport_height = 2.0;
        var viewport_width = viewport_height * image_width / image_height;
        var camera_center = new _vec3__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, 0, 0);
        // Calculate the vectors across the horizontal and down the vertical viewport edges.
        var viewport_u = new _vec3__WEBPACK_IMPORTED_MODULE_2__.Vec3(viewport_width, 0, 0);
        var viewport_v = new _vec3__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, -viewport_height, 0);
        // Calculate the horizontal and vertical delta vectors from pixel to pixel.
        var pixel_delta_u = viewport_u.div(image_width);
        var pixel_delta_v = viewport_v.div(image_height);
        // Calculate the location of the upper left pixel.
        var viewport_upper_left = camera_center
            .sub(new _vec3__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, 0, focal_length))
            .subInPlace(viewport_u.div(2))
            .subInPlace(viewport_v.div(2));
        var pixel00_loc = viewport_upper_left.add(pixel_delta_u.add(pixel_delta_v)).scaleInPlace(0.5);
        for (var j = 0; j < image_height; j++) {
            console.log("Scanlines remaining: ".concat(image_height - j));
            for (var i = 0; i < image_width; i++) {
                var offs = ((j * image_width) + i) * 4;
                var pixel_center = pixel00_loc.add(pixel_delta_u.scale(i)).addInPlace(pixel_delta_v.scale(j));
                var ray_direction = pixel_center.sub(camera_center);
                var r = new _ray__WEBPACK_IMPORTED_MODULE_1__.Ray(camera_center, ray_direction);
                var color = this.ray_color(r);
                color.write(data, offs);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }
    Main.prototype.ray_color = function (ray) {
        var unit_direction = ray.direction.unit();
        console.log(unit_direction.toString());
        var a = 0.5 * (unit_direction.y + 1.0);
        return new _color__WEBPACK_IMPORTED_MODULE_0__.Color(1.0, 1.0, 1.0).scaleInPlace(1 - a).addInPlace(new _color__WEBPACK_IMPORTED_MODULE_0__.Color(1.0, 0, 0).scaleInPlace(a));
    };
    return Main;
}());



/***/ }),

/***/ "./src/ray.ts":
/*!********************!*\
  !*** ./src/ray.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ray: () => (/* binding */ Ray)
/* harmony export */ });
var Ray = /** @class */ (function () {
    function Ray(_orig, _dir) {
        this._orig = _orig;
        this._dir = _dir;
    }
    Object.defineProperty(Ray.prototype, "origin", {
        get: function () {
            return this._orig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ray.prototype, "direction", {
        get: function () {
            return this._dir;
        },
        enumerable: false,
        configurable: true
    });
    Ray.prototype.at = function (t) {
        return this._orig.add(this._dir.scale(t));
    };
    return Ray;
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
    Vec3.prototype.toString = function () {
        return "(".concat(this.x, ", ").concat(this.y, ", ").concat(this.z, "})");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y0FBYyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHMxLWltZy8uL3NyYy9jb2xvci50cyIsIndlYnBhY2s6Ly90czEtaW1nLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vdHMxLWltZy8uL3NyYy9yYXkudHMiLCJ3ZWJwYWNrOi8vdHMxLWltZy8uL3NyYy92ZWMzLnRzIiwid2VicGFjazovL3RzMS1pbWcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHMxLWltZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHMxLWltZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RzMS1pbWcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90czEtaW1nLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZlYzMgfSBmcm9tIFwiLi92ZWMzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29sb3IgZXh0ZW5kcyBWZWMze1xyXG4gIHB1YmxpYyBnZXQgcigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgZygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgYigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3o7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgd3JpdGUoYnVmZmVyOlVpbnQ4Q2xhbXBlZEFycmF5LCBvZmZzZXQ6bnVtYmVyKXtcclxuICAgIGJ1ZmZlcltvZmZzZXRdID0gTWF0aC5mbG9vcih0aGlzLnIgKiAyNTUuOTk5KVxyXG4gICAgYnVmZmVyW29mZnNldCsxXSA9IE1hdGguZmxvb3IodGhpcy5nICogMjU1Ljk5OSlcclxuICAgIGJ1ZmZlcltvZmZzZXQrMl0gPSBNYXRoLmZsb29yKHRoaXMuYiAqIDI1NS45OTkpXHJcbiAgICBidWZmZXJbb2Zmc2V0KzNdID0gMjU1XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9jb2xvclwiO1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tIFwiLi9yYXlcIjtcclxuaW1wb3J0IHsgUG9pbnQzLCBWZWMzIH0gZnJvbSBcIi4vdmVjM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1haW57XHJcblxyXG4gIHJheV9jb2xvcihyYXk6UmF5KTpDb2xvcntcclxuICAgIGNvbnN0IHVuaXRfZGlyZWN0aW9uID0gcmF5LmRpcmVjdGlvbi51bml0KCk7XHJcblxyXG4gICAgY29uc29sZS5sb2codW5pdF9kaXJlY3Rpb24udG9TdHJpbmcoKSlcclxuICAgIGNvbnN0IGEgPSAwLjUqKHVuaXRfZGlyZWN0aW9uLnkgKyAxLjApO1xyXG4gICAgcmV0dXJuIG5ldyBDb2xvcigxLjAsIDEuMCwgMS4wKS5zY2FsZUluUGxhY2UoMS1hKS5hZGRJblBsYWNlKG5ldyBDb2xvcigxLjAsIDAsIDApLnNjYWxlSW5QbGFjZShhKSkgYXMgQ29sb3I7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGVsZW1lbnQ6c3RyaW5nKXtcclxuICAgIC8vY2FudmFzIHNldHVwXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGNhbnZhcy53aWR0aCA9IDQwMDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSAyMjU7XHJcblxyXG4gICAgLy9jb250ZXh0IHNldHVwXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgaWYgKCFjdHgpe1xyXG4gICAgICB0aHJvdyBcImNhbnZhcyBjb250ZXh0IG5vdCBmb3VuZFwiXHJcbiAgICB9XHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsMCxjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhO1xyXG5cclxuXHJcbiAgICAvL2Rpc3BsYXkgc2l6ZVxyXG4gICAgY29uc3QgYXNwZWN0X3JhdGlvID0gMTYvOTtcclxuICAgIGNvbnN0IGltYWdlX3dpZHRoID0gIGNhbnZhcy53aWR0aDtcclxuICAgIGNvbnN0IGltYWdlX2hlaWdodCA9IE1hdGguZmxvb3IoaW1hZ2Vfd2lkdGggLyBhc3BlY3RfcmF0aW8pO1xyXG5cclxuICAgIC8vY2FtZXJhLyB2aWV3cG9ydFxyXG4gICAgY29uc3QgZm9jYWxfbGVuZ3RoID0gMS4wO1xyXG4gICAgY29uc3Qgdmlld3BvcnRfaGVpZ2h0ID0gMi4wO1xyXG4gICAgY29uc3Qgdmlld3BvcnRfd2lkdGggPSB2aWV3cG9ydF9oZWlnaHQgKiBpbWFnZV93aWR0aCAvIGltYWdlX2hlaWdodDtcclxuICAgIGNvbnN0IGNhbWVyYV9jZW50ZXIgPSBuZXcgVmVjMygwLDAsMCk7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSB2ZWN0b3JzIGFjcm9zcyB0aGUgaG9yaXpvbnRhbCBhbmQgZG93biB0aGUgdmVydGljYWwgdmlld3BvcnQgZWRnZXMuXHJcbiAgICBjb25zdCB2aWV3cG9ydF91ID0gbmV3IFZlYzModmlld3BvcnRfd2lkdGgsIDAsIDApO1xyXG4gICAgY29uc3Qgdmlld3BvcnRfdiA9IG5ldyBWZWMzKDAsIC12aWV3cG9ydF9oZWlnaHQsIDApO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgZGVsdGEgdmVjdG9ycyBmcm9tIHBpeGVsIHRvIHBpeGVsLlxyXG4gICAgY29uc3QgcGl4ZWxfZGVsdGFfdSA9IHZpZXdwb3J0X3UuZGl2KGltYWdlX3dpZHRoKTtcclxuICAgIGNvbnN0IHBpeGVsX2RlbHRhX3YgPSB2aWV3cG9ydF92LmRpdihpbWFnZV9oZWlnaHQpO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgbG9jYXRpb24gb2YgdGhlIHVwcGVyIGxlZnQgcGl4ZWwuXHJcbiAgICBjb25zdCB2aWV3cG9ydF91cHBlcl9sZWZ0ID0gY2FtZXJhX2NlbnRlclxyXG4gICAgICAuc3ViKG5ldyBWZWMzKDAsMCxmb2NhbF9sZW5ndGgpKVxyXG4gICAgICAuc3ViSW5QbGFjZSh2aWV3cG9ydF91LmRpdigyKSlcclxuICAgICAgLnN1YkluUGxhY2Uodmlld3BvcnRfdi5kaXYoMikpO1xyXG5cclxuICAgIGNvbnN0IHBpeGVsMDBfbG9jID0gdmlld3BvcnRfdXBwZXJfbGVmdC5hZGQocGl4ZWxfZGVsdGFfdS5hZGQocGl4ZWxfZGVsdGFfdikpLnNjYWxlSW5QbGFjZSgwLjUpO1xyXG5cclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW1hZ2VfaGVpZ2h0OyBqKyspIHtcclxuICAgICAgY29uc29sZS5sb2coYFNjYW5saW5lcyByZW1haW5pbmc6ICR7aW1hZ2VfaGVpZ2h0IC0gan1gKVxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlX3dpZHRoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBvZmZzID0gKChqICogaW1hZ2Vfd2lkdGgpICsgaSkgKiA0XHJcblxyXG4gICAgICAgIGNvbnN0IHBpeGVsX2NlbnRlciA9IHBpeGVsMDBfbG9jLmFkZChwaXhlbF9kZWx0YV91LnNjYWxlKGkpKS5hZGRJblBsYWNlKHBpeGVsX2RlbHRhX3Yuc2NhbGUoaikpO1xyXG4gICAgICAgIGNvbnN0IHJheV9kaXJlY3Rpb24gPSBwaXhlbF9jZW50ZXIuc3ViKGNhbWVyYV9jZW50ZXIpO1xyXG4gICAgICAgIGNvbnN0IHIgPSBuZXcgUmF5KGNhbWVyYV9jZW50ZXIsIHJheV9kaXJlY3Rpb24pO1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5yYXlfY29sb3Iocik7XHJcbiAgICAgICAgY29sb3Iud3JpdGUoZGF0YSwgb2ZmcylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xyXG4gIH1cclxufSIsImltcG9ydCB7IFBvaW50MywgVmVjMyB9IGZyb20gXCIuL3ZlYzNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYXl7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgX29yaWc6UG9pbnQzLCBwcml2YXRlIHJlYWRvbmx5IF9kaXI6VmVjMyl7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG9yaWdpbigpOiBQb2ludDMge1xyXG4gICAgcmV0dXJuIHRoaXMuX29yaWc7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgZGlyZWN0aW9uKCk6IFZlYzMge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RpcjtcclxuICB9XHJcblxyXG4gIGF0KHQ6bnVtYmVyKTpQb2ludDMge1xyXG4gICAgcmV0dXJuIHRoaXMuX29yaWcuYWRkKHRoaXMuX2Rpci5zY2FsZSh0KSk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFZlYzN7XHJcblxyXG4gIHByb3RlY3RlZCBfeDogbnVtYmVyID0gMDtcclxuICBwcm90ZWN0ZWQgX3k6bnVtYmVyID0gMDtcclxuICBwcm90ZWN0ZWQgX3o6bnVtYmVyID0gMDtcclxuXHJcblxyXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgeigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3o7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoKTtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCB6Om51bWJlcik7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHY6VmVjMyk7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHg6VmVjM3xudW1iZXIgPSAwLCB5Om51bWJlciA9IDAsIHo6bnVtYmVyID0gMCl7XHJcbiAgICBpZiAodHlwZW9mIHggPT09IFwibnVtYmVyXCIpe1xyXG4gICAgICB0aGlzLl94ID0geDtcclxuICAgICAgdGhpcy5feSA9IHk7XHJcbiAgICAgIHRoaXMuX3ogPSB6O1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgdGhpcy5feCA9IHguX3g7XHJcbiAgICAgIHRoaXMuX3kgPSB4Ll95O1xyXG4gICAgICB0aGlzLl96ID0geC5fejtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnZlcnQoKTpWZWMze1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKC10aGlzLl94LCAtdGhpcy5feSwtdGhpcy5feik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkSW5QbGFjZSh0OlZlYzMpOlZlYzN7XHJcbiAgICB0aGlzLl94ICs9IHQuX3g7XHJcbiAgICB0aGlzLl95ICs9IHQuX3k7XHJcbiAgICB0aGlzLl96ICs9IHQuX3o7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcHVibGljIHN1YkluUGxhY2UodDpWZWMzKTpWZWMze1xyXG4gICAgdGhpcy5feCAtPSB0Ll94O1xyXG4gICAgdGhpcy5feSAtPSB0Ll95O1xyXG4gICAgdGhpcy5feiAtPSB0Ll96O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2NhbGVJblBsYWNlKHM6bnVtYmVyKTpWZWMze1xyXG4gICAgdGhpcy5feCAqPSBzO1xyXG4gICAgdGhpcy5feSAqPSBzO1xyXG4gICAgdGhpcy5feiAqPSBzO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGl2SW5QbGFjZShzOm51bWJlcik6VmVjM3tcclxuICAgIHJldHVybiB0aGlzLnNjYWxlSW5QbGFjZSgxL3MpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGxlbmd0aCgpOm51bWJlcntcclxuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXVhcmVkKCkpO1xyXG4gIH0gIFxyXG4gIHB1YmxpYyBsZW5ndGhTcXVhcmVkKCk6bnVtYmVye1xyXG4gICAgcmV0dXJuIHRoaXMuX3gqdGhpcy5feCArIHRoaXMuX3kqdGhpcy5feSArIHRoaXMuX3oqdGhpcy5fejtcclxuICB9ICBcclxuXHJcbiAgcHVibGljIGFkZCh2OlZlYzMpOlZlYzN7XHJcbiAgICByZXR1cm4gbmV3IFZlYzMoIHRoaXMuX3ggKyB2Ll94LCB0aGlzLl95K3YuX3ksIHRoaXMuX3ordi5feik7XHJcbiAgfVxyXG4gIFxyXG4gIHB1YmxpYyBzdWIodjpWZWMzKTpWZWMze1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKCB0aGlzLl94LXYuX3gsIHRoaXMuX3ktdi5feSwgdGhpcy5fei12Ll96KTtcclxuICB9XHJcbiAgcHVibGljIG11bCh2OlZlYzMpOlZlYzN7XHJcbiAgICByZXR1cm4gbmV3IFZlYzModGhpcy5feCp2Ll94LCB0aGlzLl95KnYuX3ksIHRoaXMuX3oqdi5feik7XHJcbiAgfSAgXHJcbiAgcHVibGljIHNjYWxlKHM6bnVtYmVyKTpWZWMze1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMuX3gqcywgdGhpcy5feSpzLCB0aGlzLl96KnMpO1xyXG4gIH0gIFxyXG4gIHB1YmxpYyBkaXYoczpudW1iZXIpOlZlYzN7XHJcbiAgICByZXR1cm4gdGhpcy5zY2FsZSgxL3MpO1xyXG4gIH1cclxuICBwdWJsaWMgZG90KHY6VmVjMyk6bnVtYmVye1xyXG4gICAgcmV0dXJuIHRoaXMuX3gqdi5feCArIHRoaXMuX3kqdi5feSArIHRoaXMuX3oqdi5fejtcclxuICB9XHJcbiAgcHVibGljIGNyb3NzKHY6VmVjMyk6VmVjM3tcclxuICAgIHJldHVybiBuZXcgVmVjMyhcclxuICAgICAgdGhpcy5feSp2Ll94IC0gdGhpcy5feip2Ll95LFxyXG4gICAgICB0aGlzLl96KnYuX3ggLSB0aGlzLl94KnYuX3osXHJcbiAgICAgIHRoaXMuX3gqdi5feS10aGlzLl95KnYuX3pcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1YmxpYyB1bml0KCl7XHJcbiAgICByZXR1cm4gdGhpcy5kaXYodGhpcy5sZW5ndGgoKSlcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgdG9TdHJpbmcoKTpzdHJpbmd7XHJcbiAgICByZXR1cm4gYCgke3RoaXMueH0sICR7dGhpcy55fSwgJHt0aGlzLnp9fSlgO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUG9pbnQzID0gVmVjMzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IE1haW4gfSBmcm9tIFwiLi9tYWluXCI7XHJcblxyXG5jb25zdCBtYWluID0gbmV3IE1haW4oXCJyZW5kZXJDYW52YXNcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=