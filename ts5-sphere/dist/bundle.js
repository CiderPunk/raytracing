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
        return (discriminant >= 0);
    };
    Main.prototype.ray_color = function (ray) {
        if (this.hit_sphere(new _vec3__WEBPACK_IMPORTED_MODULE_2__.Vec3(0, 0, -1), 0.5, ray)) {
            return new _color__WEBPACK_IMPORTED_MODULE_0__.Color(1, 0, 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsRUFBRSxFQUMzQixJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsRUFBRSxDQUMxQixDQUFDO0lBQ0osQ0FBQztJQUNNLG1CQUFJLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFHTSx1QkFBUSxHQUFmO1FBQ0UsT0FBTyxXQUFJLElBQUksQ0FBQyxDQUFDLGVBQUssSUFBSSxDQUFDLENBQUMsZUFBSyxJQUFJLENBQUMsQ0FBQyxPQUFJLENBQUM7SUFDOUMsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDOzs7Ozs7OztVQ3RHRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7OztBQ044QjtBQUU5QixJQUFNLElBQUksR0FBRyxJQUFJLHVDQUFJLENBQUMsY0FBYyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHM1LXNwaGVyZS8uL3NyYy9jb2xvci50cyIsIndlYnBhY2s6Ly90czUtc3BoZXJlLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vdHM1LXNwaGVyZS8uL3NyYy9yYXkudHMiLCJ3ZWJwYWNrOi8vdHM1LXNwaGVyZS8uL3NyYy92ZWMzLnRzIiwid2VicGFjazovL3RzNS1zcGhlcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHM1LXNwaGVyZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHM1LXNwaGVyZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RzNS1zcGhlcmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90czUtc3BoZXJlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZlYzMgfSBmcm9tIFwiLi92ZWMzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29sb3IgZXh0ZW5kcyBWZWMze1xyXG4gIHB1YmxpYyBnZXQgcigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgZygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3k7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgYigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3o7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgd3JpdGUoYnVmZmVyOlVpbnQ4Q2xhbXBlZEFycmF5LCBvZmZzZXQ6bnVtYmVyKXtcclxuICAgIGJ1ZmZlcltvZmZzZXRdID0gTWF0aC5mbG9vcih0aGlzLnIgKiAyNTUuOTk5KVxyXG4gICAgYnVmZmVyW29mZnNldCsxXSA9IE1hdGguZmxvb3IodGhpcy5nICogMjU1Ljk5OSlcclxuICAgIGJ1ZmZlcltvZmZzZXQrMl0gPSBNYXRoLmZsb29yKHRoaXMuYiAqIDI1NS45OTkpXHJcbiAgICBidWZmZXJbb2Zmc2V0KzNdID0gMjU1XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9jb2xvclwiO1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tIFwiLi9yYXlcIjtcclxuaW1wb3J0IHsgUG9pbnQzLCBWZWMzIH0gZnJvbSBcIi4vdmVjM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1haW57XHJcblxyXG5cclxuICBoaXRfc3BoZXJlKGNlbnRlcjpQb2ludDMscmFkaXVzOm51bWJlciwgcjpSYXkpOmJvb2xlYW4ge1xyXG4gICAgY29uc3Qgb2MgPSBjZW50ZXIuc3ViKHIub3JpZ2luKTtcclxuICAgIGNvbnN0IGEgPSByLmRpcmVjdGlvbi5kb3Qoci5kaXJlY3Rpb24pO1xyXG4gICAgY29uc3QgYiA9IC0yICogci5kaXJlY3Rpb24uZG90KG9jKTtcclxuICAgIGNvbnN0IGMgPSBvYy5kb3Qob2MpIC0gcmFkaXVzICogcmFkaXVzO1xyXG4gICAgY29uc3QgZGlzY3JpbWluYW50ID0gYiAqIGIgLSA0KmEqYztcclxuICAgIHJldHVybiAoZGlzY3JpbWluYW50ID49IDApO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICByYXlfY29sb3IocmF5OlJheSk6Q29sb3J7XHJcbiAgICBpZiAodGhpcy5oaXRfc3BoZXJlKG5ldyBWZWMzKDAsMCwtMSksIDAuNSwgcmF5KSl7XHJcbiAgICAgIHJldHVybiBuZXcgQ29sb3IoMSwwLDApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdW5pdF9kaXJlY3Rpb24gPSByYXkuZGlyZWN0aW9uLnVuaXQoKTtcclxuICAgIGNvbnNvbGUubG9nKHVuaXRfZGlyZWN0aW9uLnRvU3RyaW5nKCkpXHJcbiAgICBjb25zdCBhID0gMC41Kih1bml0X2RpcmVjdGlvbi55ICsgMS4wKTtcclxuICAgIHJldHVybiBuZXcgQ29sb3IoMS4wLCAxLjAsIDEuMCkuc2NhbGVJblBsYWNlKDEtYSkuYWRkSW5QbGFjZShuZXcgQ29sb3IoMC41LCAwLjcsIDEuMCkuc2NhbGVJblBsYWNlKGEpKSBhcyBDb2xvcjtcclxuICB9XHJcblxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZWxlbWVudDpzdHJpbmcpe1xyXG4gICAgLy9jYW52YXMgc2V0dXBcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgY2FudmFzLndpZHRoID0gNDAwO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IDIyNTtcclxuXHJcbiAgICAvL2NvbnRleHQgc2V0dXBcclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCl7XHJcbiAgICAgIHRocm93IFwiY2FudmFzIGNvbnRleHQgbm90IGZvdW5kXCJcclxuICAgIH1cclxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwwLGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XHJcblxyXG5cclxuICAgIC8vZGlzcGxheSBzaXplXHJcbiAgICBjb25zdCBhc3BlY3RfcmF0aW8gPSAxNi85O1xyXG4gICAgY29uc3QgaW1hZ2Vfd2lkdGggPSAgY2FudmFzLndpZHRoO1xyXG4gICAgY29uc3QgaW1hZ2VfaGVpZ2h0ID0gTWF0aC5mbG9vcihpbWFnZV93aWR0aCAvIGFzcGVjdF9yYXRpbyk7XHJcblxyXG4gICAgLy9jYW1lcmEvIHZpZXdwb3J0XHJcbiAgICBjb25zdCBmb2NhbF9sZW5ndGggPSAxLjA7XHJcbiAgICBjb25zdCB2aWV3cG9ydF9oZWlnaHQgPSAyLjA7XHJcbiAgICBjb25zdCB2aWV3cG9ydF93aWR0aCA9IHZpZXdwb3J0X2hlaWdodCAqIGltYWdlX3dpZHRoIC8gaW1hZ2VfaGVpZ2h0O1xyXG4gICAgY29uc3QgY2FtZXJhX2NlbnRlciA9IG5ldyBWZWMzKDAsMCwwKTtcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIHZlY3RvcnMgYWNyb3NzIHRoZSBob3Jpem9udGFsIGFuZCBkb3duIHRoZSB2ZXJ0aWNhbCB2aWV3cG9ydCBlZGdlcy5cclxuICAgIGNvbnN0IHZpZXdwb3J0X3UgPSBuZXcgVmVjMyh2aWV3cG9ydF93aWR0aCwgMCwgMCk7XHJcbiAgICBjb25zdCB2aWV3cG9ydF92ID0gbmV3IFZlYzMoMCwgLXZpZXdwb3J0X2hlaWdodCwgMCk7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBkZWx0YSB2ZWN0b3JzIGZyb20gcGl4ZWwgdG8gcGl4ZWwuXHJcbiAgICBjb25zdCBwaXhlbF9kZWx0YV91ID0gdmlld3BvcnRfdS5kaXYoaW1hZ2Vfd2lkdGgpO1xyXG4gICAgY29uc3QgcGl4ZWxfZGVsdGFfdiA9IHZpZXdwb3J0X3YuZGl2KGltYWdlX2hlaWdodCk7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBsb2NhdGlvbiBvZiB0aGUgdXBwZXIgbGVmdCBwaXhlbC5cclxuICAgIGNvbnN0IHZpZXdwb3J0X3VwcGVyX2xlZnQgPSBjYW1lcmFfY2VudGVyXHJcbiAgICAgIC5zdWIobmV3IFZlYzMoMCwwLGZvY2FsX2xlbmd0aCkpXHJcbiAgICAgIC5zdWJJblBsYWNlKHZpZXdwb3J0X3UuZGl2KDIpKVxyXG4gICAgICAuc3ViSW5QbGFjZSh2aWV3cG9ydF92LmRpdigyKSk7XHJcblxyXG4gICAgY29uc3QgcGl4ZWwwMF9sb2MgPSB2aWV3cG9ydF91cHBlcl9sZWZ0LmFkZChwaXhlbF9kZWx0YV91LmFkZChwaXhlbF9kZWx0YV92KS5zY2FsZUluUGxhY2UoMC41KSk7XHJcblxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBpbWFnZV9oZWlnaHQ7IGorKykge1xyXG4gICAgICBjb25zb2xlLmxvZyhgU2NhbmxpbmVzIHJlbWFpbmluZzogJHtpbWFnZV9oZWlnaHQgLSBqfWApXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2Vfd2lkdGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IG9mZnMgPSAoKGogKiBpbWFnZV93aWR0aCkgKyBpKSAqIDRcclxuXHJcbiAgICAgICAgY29uc3QgcGl4ZWxfY2VudGVyID0gcGl4ZWwwMF9sb2MuYWRkKHBpeGVsX2RlbHRhX3Uuc2NhbGUoaSkpLmFkZEluUGxhY2UocGl4ZWxfZGVsdGFfdi5zY2FsZShqKSk7XHJcbiAgICAgICAgY29uc3QgcmF5X2RpcmVjdGlvbiA9IHBpeGVsX2NlbnRlci5zdWIoY2FtZXJhX2NlbnRlcik7XHJcbiAgICAgICAgY29uc3QgciA9IG5ldyBSYXkoY2FtZXJhX2NlbnRlciwgcmF5X2RpcmVjdGlvbik7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSB0aGlzLnJheV9jb2xvcihyKTtcclxuICAgICAgICBjb2xvci53cml0ZShkYXRhLCBvZmZzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgUG9pbnQzLCBWZWMzIH0gZnJvbSBcIi4vdmVjM1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJheXtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBfb3JpZzpQb2ludDMsIHByaXZhdGUgcmVhZG9ubHkgX2RpcjpWZWMzKXtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgb3JpZ2luKCk6IFBvaW50MyB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3JpZztcclxuICB9XHJcbiAgcHVibGljIGdldCBkaXJlY3Rpb24oKTogVmVjMyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlyO1xyXG4gIH1cclxuXHJcbiAgYXQodDpudW1iZXIpOlBvaW50MyB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3JpZy5hZGQodGhpcy5fZGlyLnNjYWxlKHQpKTtcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgVmVjM3tcclxuXHJcbiAgcHJvdGVjdGVkIF94OiBudW1iZXIgPSAwO1xyXG4gIHByb3RlY3RlZCBfeTpudW1iZXIgPSAwO1xyXG4gIHByb3RlY3RlZCBfejpudW1iZXIgPSAwO1xyXG5cclxuXHJcbiAgcHVibGljIGdldCB4KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5feDtcclxuICB9XHJcbiAgcHVibGljIGdldCB5KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5feTtcclxuICB9XHJcbiAgcHVibGljIGdldCB6KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fejtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpO1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyKTtcclxuICBwdWJsaWMgY29uc3RydWN0b3IodjpWZWMzKTtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoeDpWZWMzfG51bWJlciA9IDAsIHk6bnVtYmVyID0gMCwgejpudW1iZXIgPSAwKXtcclxuICAgIGlmICh0eXBlb2YgeCA9PT0gXCJudW1iZXJcIil7XHJcbiAgICAgIHRoaXMuX3ggPSB4O1xyXG4gICAgICB0aGlzLl95ID0geTtcclxuICAgICAgdGhpcy5feiA9IHo7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB0aGlzLl94ID0geC5feDtcclxuICAgICAgdGhpcy5feSA9IHguX3k7XHJcbiAgICAgIHRoaXMuX3ogPSB4Ll96O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGludmVydCgpOlZlYzN7XHJcbiAgICByZXR1cm4gbmV3IFZlYzMoLXRoaXMuX3gsIC10aGlzLl95LC10aGlzLl96KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRJblBsYWNlKHQ6VmVjMyk6VmVjM3tcclxuICAgIHRoaXMuX3ggKz0gdC5feDtcclxuICAgIHRoaXMuX3kgKz0gdC5feTtcclxuICAgIHRoaXMuX3ogKz0gdC5fejtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICBwdWJsaWMgc3ViSW5QbGFjZSh0OlZlYzMpOlZlYzN7XHJcbiAgICB0aGlzLl94IC09IHQuX3g7XHJcbiAgICB0aGlzLl95IC09IHQuX3k7XHJcbiAgICB0aGlzLl96IC09IHQuX3o7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzY2FsZUluUGxhY2UoczpudW1iZXIpOlZlYzN7XHJcbiAgICB0aGlzLl94ICo9IHM7XHJcbiAgICB0aGlzLl95ICo9IHM7XHJcbiAgICB0aGlzLl96ICo9IHM7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXZJblBsYWNlKHM6bnVtYmVyKTpWZWMze1xyXG4gICAgcmV0dXJuIHRoaXMuc2NhbGVJblBsYWNlKDEvcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbGVuZ3RoKCk6bnVtYmVye1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxdWFyZWQoKSk7XHJcbiAgfSAgXHJcbiAgcHVibGljIGxlbmd0aFNxdWFyZWQoKTpudW1iZXJ7XHJcbiAgICByZXR1cm4gdGhpcy5feCp0aGlzLl94ICsgdGhpcy5feSp0aGlzLl95ICsgdGhpcy5feip0aGlzLl96O1xyXG4gIH0gIFxyXG5cclxuICBwdWJsaWMgYWRkKHY6VmVjMyk6VmVjM3tcclxuICAgIHJldHVybiBuZXcgVmVjMyggdGhpcy5feCArIHYuX3gsIHRoaXMuX3krdi5feSwgdGhpcy5feit2Ll96KTtcclxuICB9XHJcbiAgXHJcbiAgcHVibGljIHN1Yih2OlZlYzMpOlZlYzN7XHJcbiAgICByZXR1cm4gbmV3IFZlYzMoIHRoaXMuX3gtdi5feCwgdGhpcy5feS12Ll95LCB0aGlzLl96LXYuX3opO1xyXG4gIH1cclxuICBwdWJsaWMgbXVsKHY6VmVjMyk6VmVjM3tcclxuICAgIHJldHVybiBuZXcgVmVjMyh0aGlzLl94KnYuX3gsIHRoaXMuX3kqdi5feSwgdGhpcy5feip2Ll96KTtcclxuICB9ICBcclxuICBwdWJsaWMgc2NhbGUoczpudW1iZXIpOlZlYzN7XHJcbiAgICByZXR1cm4gbmV3IFZlYzModGhpcy5feCpzLCB0aGlzLl95KnMsIHRoaXMuX3oqcyk7XHJcbiAgfSAgXHJcbiAgcHVibGljIGRpdihzOm51bWJlcik6VmVjM3tcclxuICAgIHJldHVybiB0aGlzLnNjYWxlKDEvcyk7XHJcbiAgfVxyXG4gIHB1YmxpYyBkb3QodjpWZWMzKTpudW1iZXJ7XHJcbiAgICByZXR1cm4gdGhpcy5feCp2Ll94ICsgdGhpcy5feSp2Ll95ICsgdGhpcy5feip2Ll96O1xyXG4gIH1cclxuICBwdWJsaWMgY3Jvc3ModjpWZWMzKTpWZWMze1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKFxyXG4gICAgICB0aGlzLl95KnYuX3ggLSB0aGlzLl96KnYuX3ksXHJcbiAgICAgIHRoaXMuX3oqdi5feCAtIHRoaXMuX3gqdi5feixcclxuICAgICAgdGhpcy5feCp2Ll95LXRoaXMuX3kqdi5felxyXG4gICAgKTtcclxuICB9XHJcbiAgcHVibGljIHVuaXQoKXtcclxuICAgIHJldHVybiB0aGlzLmRpdih0aGlzLmxlbmd0aCgpKVxyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyB0b1N0cmluZygpOnN0cmluZ3tcclxuICAgIHJldHVybiBgKCR7dGhpcy54fSwgJHt0aGlzLnl9LCAke3RoaXMuen19KWA7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBQb2ludDMgPSBWZWMzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgTWFpbiB9IGZyb20gXCIuL21haW5cIjtcclxuXHJcbmNvbnN0IG1haW4gPSBuZXcgTWFpbihcInJlbmRlckNhbnZhc1wiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==