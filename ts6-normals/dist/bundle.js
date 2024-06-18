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
        var pixel00_loc = viewport_upper_left.add(pixel_delta_u.add(pixel_delta_v).scaleInPlace(0.5));
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
    Main.prototype.hit_sphere = function (center, radius, r) {
        var oc = center.sub(r.origin);
        var a = r.direction.dot(r.direction);
        var b = -2 * r.direction.dot(oc);
        var c = oc.dot(oc) - radius * radius;
        var discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return -1.0;
        }
        else {
            return (-b - Math.sqrt(discriminant)) / (2.0 * a);
        }
    };
    Main.prototype.ray_color = function (ray) {
        var t = this.hit_sphere(new _vec3__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, 0, -1), 0.5, ray);
        if (t > 0.0) {
            var N = ray.at(t).subInPlace(new _vec3__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, 0, -1)).unit();
            return new _color__WEBPACK_IMPORTED_MODULE_0__.Color(N.x + 1, N.y + 1, N.z + 1).scaleInPlace(0.5);
        }
        var unit_direction = ray.direction.unit();
        console.log(unit_direction.toString());
        var a = 0.5 * (unit_direction.y + 1.0);
        return new _color__WEBPACK_IMPORTED_MODULE_0__.Color(1.0, 1.0, 1.0).scaleInPlace(1 - a).addInPlace(new _color__WEBPACK_IMPORTED_MODULE_0__.Color(0.5, 0.7, 1.0).scaleInPlace(a));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTjhCO0FBRTlCLElBQU0sSUFBSSxHQUFHLElBQUksdUNBQUksQ0FBQyxjQUFjLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90czUtc3BoZXJlLy4vc3JjL2NvbG9yLnRzIiwid2VicGFjazovL3RzNS1zcGhlcmUvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly90czUtc3BoZXJlLy4vc3JjL3JheS50cyIsIndlYnBhY2s6Ly90czUtc3BoZXJlLy4vc3JjL3ZlYzMudHMiLCJ3ZWJwYWNrOi8vdHM1LXNwaGVyZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90czUtc3BoZXJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90czUtc3BoZXJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdHM1LXNwaGVyZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RzNS1zcGhlcmUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmVjMyB9IGZyb20gXCIuL3ZlYzNcIjtcblxuZXhwb3J0IGNsYXNzIENvbG9yIGV4dGVuZHMgVmVjM3tcbiAgcHVibGljIGdldCByKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3g7XG4gIH1cbiAgcHVibGljIGdldCBnKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3k7XG4gIH1cbiAgcHVibGljIGdldCBiKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3o7XG4gIH1cblxuICBwdWJsaWMgd3JpdGUoYnVmZmVyOlVpbnQ4Q2xhbXBlZEFycmF5LCBvZmZzZXQ6bnVtYmVyKXtcbiAgICBidWZmZXJbb2Zmc2V0XSA9IE1hdGguZmxvb3IodGhpcy5yICogMjU1Ljk5OSlcbiAgICBidWZmZXJbb2Zmc2V0KzFdID0gTWF0aC5mbG9vcih0aGlzLmcgKiAyNTUuOTk5KVxuICAgIGJ1ZmZlcltvZmZzZXQrMl0gPSBNYXRoLmZsb29yKHRoaXMuYiAqIDI1NS45OTkpXG4gICAgYnVmZmVyW29mZnNldCszXSA9IDI1NVxuICB9XG59IiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9jb2xvclwiO1xuaW1wb3J0IHsgUmF5IH0gZnJvbSBcIi4vcmF5XCI7XG5pbXBvcnQgeyBQb2ludDMsIFZlYzMgfSBmcm9tIFwiLi92ZWMzXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWlue1xuXG5cbiAgaGl0X3NwaGVyZShjZW50ZXI6UG9pbnQzLHJhZGl1czpudW1iZXIsIHI6UmF5KTpudW1iZXIge1xuICAgIGNvbnN0IG9jID0gY2VudGVyLnN1YihyLm9yaWdpbik7XG4gICAgY29uc3QgYSA9IHIuZGlyZWN0aW9uLmRvdChyLmRpcmVjdGlvbik7XG4gICAgY29uc3QgYiA9IC0yICogci5kaXJlY3Rpb24uZG90KG9jKTtcbiAgICBjb25zdCBjID0gb2MuZG90KG9jKSAtIHJhZGl1cyAqIHJhZGl1cztcbiAgICBjb25zdCBkaXNjcmltaW5hbnQgPSBiICogYiAtIDQqYSpjO1xuXG4gICAgaWYgKGRpc2NyaW1pbmFudCA8IDApIHtcbiAgICAgIHJldHVybiAtMS4wO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKC1iIC0gTWF0aC5zcXJ0KGRpc2NyaW1pbmFudCkgKSAvICgyLjAqYSk7XG4gICAgfVxuICB9XG5cblxuXG4gIHJheV9jb2xvcihyYXk6UmF5KTpDb2xvcntcbiAgICBjb25zdCB0ID0gdGhpcy5oaXRfc3BoZXJlKG5ldyBWZWMzKDAsMCwtMSksIDAuNSwgcmF5KTtcbiAgICBpZiAodCA+IDAuMCkge1xuICAgICAgY29uc3QgTiA9IHJheS5hdCh0KS5zdWJJblBsYWNlKG5ldyBWZWMzKDAsMCwtMSkpLnVuaXQoKTtcbiAgICAgIHJldHVybiBuZXcgQ29sb3IoTi54KzEsIE4ueSsxLCBOLnorMSkuc2NhbGVJblBsYWNlKDAuNSkgYXMgQ29sb3I7XG4gICAgfVxuICAgIGNvbnN0IHVuaXRfZGlyZWN0aW9uID0gcmF5LmRpcmVjdGlvbi51bml0KCk7XG4gICAgY29uc29sZS5sb2codW5pdF9kaXJlY3Rpb24udG9TdHJpbmcoKSlcbiAgICBjb25zdCBhID0gMC41Kih1bml0X2RpcmVjdGlvbi55ICsgMS4wKTtcbiAgICByZXR1cm4gbmV3IENvbG9yKDEuMCwgMS4wLCAxLjApLnNjYWxlSW5QbGFjZSgxLWEpLmFkZEluUGxhY2UobmV3IENvbG9yKDAuNSwgMC43LCAxLjApLnNjYWxlSW5QbGFjZShhKSkgYXMgQ29sb3I7XG4gIH1cblxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihlbGVtZW50OnN0cmluZyl7XG4gICAgLy9jYW52YXMgc2V0dXBcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICBjYW52YXMud2lkdGggPSA0MDA7XG4gICAgY2FudmFzLmhlaWdodCA9IDIyNTtcblxuICAgIC8vY29udGV4dCBzZXR1cFxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgaWYgKCFjdHgpe1xuICAgICAgdGhyb3cgXCJjYW52YXMgY29udGV4dCBub3QgZm91bmRcIlxuICAgIH1cbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsMCxjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGNvbnN0IGRhdGEgPSBpbWFnZURhdGEuZGF0YTtcblxuXG4gICAgLy9kaXNwbGF5IHNpemVcbiAgICBjb25zdCBhc3BlY3RfcmF0aW8gPSAxNi85O1xuICAgIGNvbnN0IGltYWdlX3dpZHRoID0gIGNhbnZhcy53aWR0aDtcbiAgICBjb25zdCBpbWFnZV9oZWlnaHQgPSBNYXRoLmZsb29yKGltYWdlX3dpZHRoIC8gYXNwZWN0X3JhdGlvKTtcblxuICAgIC8vY2FtZXJhLyB2aWV3cG9ydFxuICAgIGNvbnN0IGZvY2FsX2xlbmd0aCA9IDEuMDtcbiAgICBjb25zdCB2aWV3cG9ydF9oZWlnaHQgPSAyLjA7XG4gICAgY29uc3Qgdmlld3BvcnRfd2lkdGggPSB2aWV3cG9ydF9oZWlnaHQgKiBpbWFnZV93aWR0aCAvIGltYWdlX2hlaWdodDtcbiAgICBjb25zdCBjYW1lcmFfY2VudGVyID0gbmV3IFZlYzMoMCwwLDApO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSB2ZWN0b3JzIGFjcm9zcyB0aGUgaG9yaXpvbnRhbCBhbmQgZG93biB0aGUgdmVydGljYWwgdmlld3BvcnQgZWRnZXMuXG4gICAgY29uc3Qgdmlld3BvcnRfdSA9IG5ldyBWZWMzKHZpZXdwb3J0X3dpZHRoLCAwLCAwKTtcbiAgICBjb25zdCB2aWV3cG9ydF92ID0gbmV3IFZlYzMoMCwgLXZpZXdwb3J0X2hlaWdodCwgMCk7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGhvcml6b250YWwgYW5kIHZlcnRpY2FsIGRlbHRhIHZlY3RvcnMgZnJvbSBwaXhlbCB0byBwaXhlbC5cbiAgICBjb25zdCBwaXhlbF9kZWx0YV91ID0gdmlld3BvcnRfdS5kaXYoaW1hZ2Vfd2lkdGgpO1xuICAgIGNvbnN0IHBpeGVsX2RlbHRhX3YgPSB2aWV3cG9ydF92LmRpdihpbWFnZV9oZWlnaHQpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBsb2NhdGlvbiBvZiB0aGUgdXBwZXIgbGVmdCBwaXhlbC5cbiAgICBjb25zdCB2aWV3cG9ydF91cHBlcl9sZWZ0ID0gY2FtZXJhX2NlbnRlclxuICAgICAgLnN1YihuZXcgVmVjMygwLDAsZm9jYWxfbGVuZ3RoKSlcbiAgICAgIC5zdWJJblBsYWNlKHZpZXdwb3J0X3UuZGl2KDIpKVxuICAgICAgLnN1YkluUGxhY2Uodmlld3BvcnRfdi5kaXYoMikpO1xuXG4gICAgY29uc3QgcGl4ZWwwMF9sb2MgPSB2aWV3cG9ydF91cHBlcl9sZWZ0LmFkZChwaXhlbF9kZWx0YV91LmFkZChwaXhlbF9kZWx0YV92KS5zY2FsZUluUGxhY2UoMC41KSk7XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGltYWdlX2hlaWdodDsgaisrKSB7XG4gICAgICBjb25zb2xlLmxvZyhgU2NhbmxpbmVzIHJlbWFpbmluZzogJHtpbWFnZV9oZWlnaHQgLSBqfWApXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlX3dpZHRoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2ZmcyA9ICgoaiAqIGltYWdlX3dpZHRoKSArIGkpICogNFxuXG4gICAgICAgIGNvbnN0IHBpeGVsX2NlbnRlciA9IHBpeGVsMDBfbG9jLmFkZChwaXhlbF9kZWx0YV91LnNjYWxlKGkpKS5hZGRJblBsYWNlKHBpeGVsX2RlbHRhX3Yuc2NhbGUoaikpO1xuICAgICAgICBjb25zdCByYXlfZGlyZWN0aW9uID0gcGl4ZWxfY2VudGVyLnN1YihjYW1lcmFfY2VudGVyKTtcbiAgICAgICAgY29uc3QgciA9IG5ldyBSYXkoY2FtZXJhX2NlbnRlciwgcmF5X2RpcmVjdGlvbik7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5yYXlfY29sb3Iocik7XG4gICAgICAgIGNvbG9yLndyaXRlKGRhdGEsIG9mZnMpXG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcbiAgfVxufSIsImltcG9ydCB7IFBvaW50MywgVmVjMyB9IGZyb20gXCIuL3ZlYzNcIjtcblxuZXhwb3J0IGNsYXNzIFJheXtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF9vcmlnOlBvaW50MywgcHJpdmF0ZSByZWFkb25seSBfZGlyOlZlYzMpe1xuICB9XG5cbiAgcHVibGljIGdldCBvcmlnaW4oKTogUG9pbnQzIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZztcbiAgfVxuICBwdWJsaWMgZ2V0IGRpcmVjdGlvbigpOiBWZWMzIHtcbiAgICByZXR1cm4gdGhpcy5fZGlyO1xuICB9XG5cbiAgYXQodDpudW1iZXIpOlBvaW50MyB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWcuYWRkKHRoaXMuX2Rpci5zY2FsZSh0KSk7XG4gIH1cbn0iLCJleHBvcnQgY2xhc3MgVmVjM3tcblxuICBwcm90ZWN0ZWQgX3g6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfeTpudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3o6bnVtYmVyID0gMDtcblxuXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl94O1xuICB9XG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl95O1xuICB9XG4gIHB1YmxpYyBnZXQgeigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl96O1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCk7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyKTtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHY6VmVjMyk7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih4OlZlYzN8bnVtYmVyID0gMCwgeTpudW1iZXIgPSAwLCB6Om51bWJlciA9IDApe1xuICAgIGlmICh0eXBlb2YgeCA9PT0gXCJudW1iZXJcIil7XG4gICAgICB0aGlzLl94ID0geDtcbiAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgdGhpcy5feiA9IHo7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICB0aGlzLl94ID0geC5feDtcbiAgICAgIHRoaXMuX3kgPSB4Ll95O1xuICAgICAgdGhpcy5feiA9IHguX3o7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGludmVydCgpOlZlYzN7XG4gICAgcmV0dXJuIG5ldyBWZWMzKC10aGlzLl94LCAtdGhpcy5feSwtdGhpcy5feik7XG4gIH1cblxuICBwdWJsaWMgYWRkSW5QbGFjZSh0OlZlYzMpOlZlYzN7XG4gICAgdGhpcy5feCArPSB0Ll94O1xuICAgIHRoaXMuX3kgKz0gdC5feTtcbiAgICB0aGlzLl96ICs9IHQuX3o7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcHVibGljIHN1YkluUGxhY2UodDpWZWMzKTpWZWMze1xuICAgIHRoaXMuX3ggLT0gdC5feDtcbiAgICB0aGlzLl95IC09IHQuX3k7XG4gICAgdGhpcy5feiAtPSB0Ll96O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIHNjYWxlSW5QbGFjZShzOm51bWJlcik6VmVjM3tcbiAgICB0aGlzLl94ICo9IHM7XG4gICAgdGhpcy5feSAqPSBzO1xuICAgIHRoaXMuX3ogKj0gcztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBkaXZJblBsYWNlKHM6bnVtYmVyKTpWZWMze1xuICAgIHJldHVybiB0aGlzLnNjYWxlSW5QbGFjZSgxL3MpO1xuICB9XG5cbiAgcHVibGljIGxlbmd0aCgpOm51bWJlcntcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3F1YXJlZCgpKTtcbiAgfSAgXG4gIHB1YmxpYyBsZW5ndGhTcXVhcmVkKCk6bnVtYmVye1xuICAgIHJldHVybiB0aGlzLl94KnRoaXMuX3ggKyB0aGlzLl95KnRoaXMuX3kgKyB0aGlzLl96KnRoaXMuX3o7XG4gIH0gIFxuXG4gIHB1YmxpYyBhZGQodjpWZWMzKTpWZWMze1xuICAgIHJldHVybiBuZXcgVmVjMyggdGhpcy5feCArIHYuX3gsIHRoaXMuX3krdi5feSwgdGhpcy5feit2Ll96KTtcbiAgfVxuICBcbiAgcHVibGljIHN1Yih2OlZlYzMpOlZlYzN7XG4gICAgcmV0dXJuIG5ldyBWZWMzKCB0aGlzLl94LXYuX3gsIHRoaXMuX3ktdi5feSwgdGhpcy5fei12Ll96KTtcbiAgfVxuICBwdWJsaWMgbXVsKHY6VmVjMyk6VmVjM3tcbiAgICByZXR1cm4gbmV3IFZlYzModGhpcy5feCp2Ll94LCB0aGlzLl95KnYuX3ksIHRoaXMuX3oqdi5feik7XG4gIH0gIFxuICBwdWJsaWMgc2NhbGUoczpudW1iZXIpOlZlYzN7XG4gICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMuX3gqcywgdGhpcy5feSpzLCB0aGlzLl96KnMpO1xuICB9ICBcbiAgcHVibGljIGRpdihzOm51bWJlcik6VmVjM3tcbiAgICByZXR1cm4gdGhpcy5zY2FsZSgxL3MpO1xuICB9XG4gIHB1YmxpYyBkb3QodjpWZWMzKTpudW1iZXJ7XG4gICAgcmV0dXJuIHRoaXMuX3gqdi5feCArIHRoaXMuX3kqdi5feSArIHRoaXMuX3oqdi5fejtcbiAgfVxuICBwdWJsaWMgY3Jvc3ModjpWZWMzKTpWZWMze1xuICAgIHJldHVybiBuZXcgVmVjMyhcbiAgICAgIHRoaXMuX3kqdi5feCAtIHRoaXMuX3oqdi5feSxcbiAgICAgIHRoaXMuX3oqdi5feCAtIHRoaXMuX3gqdi5feixcbiAgICAgIHRoaXMuX3gqdi5feS10aGlzLl95KnYuX3pcbiAgICApO1xuICB9XG4gIHB1YmxpYyB1bml0KCl7XG4gICAgcmV0dXJuIHRoaXMuZGl2KHRoaXMubGVuZ3RoKCkpXG4gIH1cblxuXG4gIHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ3tcbiAgICByZXR1cm4gYCgke3RoaXMueH0sICR7dGhpcy55fSwgJHt0aGlzLnp9fSlgO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFBvaW50MyA9IFZlYzM7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNYWluIH0gZnJvbSBcIi4vbWFpblwiO1xuXG5jb25zdCBtYWluID0gbmV3IE1haW4oXCJyZW5kZXJDYW52YXNcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=