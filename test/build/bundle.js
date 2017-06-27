/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/test/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // identity function for calling harmony imports with the correct context
  /******/__webpack_require__.i = function (value) {
    return value;
  };
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "/build/";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DeepLook = function DeepLook() {
    _classCallCheck(this, DeepLook);
  };

  module.exports = DeepLook;

  /***/
}]
/******/);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _processing = __webpack_require__(3);

var _processing2 = _interopRequireDefault(_processing);

var _norms = __webpack_require__(2);

var _norms2 = _interopRequireDefault(_norms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractHOG(imageData, options) {
  var histograms = extractHistograms(imageData, options);
  return extractHOGFromHistograms(histograms, options);
}

function extractHistograms(imageData, options) {
  var vectors = _processing2.default.gradientVectors(imageData);

  var cellSize = options.cellSize || 6;
  var bins = options.bins || 9;

  var cellsWide = Math.floor(vectors[0].length / cellSize);
  var cellsHigh = Math.floor(vectors.length / cellSize);

  var histograms = new Array(cellsHigh);

  for (var i = 0; i < cellsHigh; i++) {
    histograms[i] = new Array(cellsWide);

    for (var j = 0; j < cellsWide; j++) {
      histograms[i][j] = getHistogram(vectors, j * cellSize, i * cellSize, cellSize, bins);
    }
  }
  return histograms;
}

/* This function is decoupled so you can extract histograms for an entire image
 * to save recomputation, and use these to get HOGs from individual windows
 */
function extractHOGFromHistograms(histograms, options) {
  var blockSize = options.blockSize || 3;
  var blockStride = options.blockStride || blockSize / 2;
  var normalize = _norms2.default[options.norm || "L2"];

  var blocks = [];
  var blocksHigh = histograms.length - blockSize + 1;
  var blocksWide = histograms[0].length - blockSize + 1;

  for (var y = 0; y < blocksHigh; y += blockStride) {
    for (var x = 0; x < blocksWide; x += blockStride) {
      var block = getBlock(histograms, x, y, blockSize);
      normalize(block);
      blocks.push(block);
    }
  }
  return Array.prototype.concat.apply([], blocks);
}

function getBlock(matrix, x, y, length) {
  var square = [];
  for (var i = y; i < y + length; i++) {
    for (var j = x; j < x + length; j++) {
      square.push(matrix[i][j]);
    }
  }
  return Array.prototype.concat.apply([], square);
}

function getHistogram(elements, x, y, size, bins) {
  var histogram = zeros(bins);

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      var vector = elements[y + i][x + j];
      var bin = binFor(vector.orient, bins);
      histogram[bin] += vector.mag;
    }
  }
  return histogram;
}

function binFor(radians, bins) {
  var angle = radians * (180 / Math.PI);
  if (angle < 0) {
    angle += 180;
  }

  // center the first bin around 0
  angle += 90 / bins;
  angle %= 180;

  var bin = Math.floor(angle / 180 * bins);
  return bin;
}

function zeros(size) {
  var array = new Array(size);
  for (var i = 0; i < size; i++) {
    array[i] = 0;
  }
  return array;
}

module.exports = {
  extractHOG: extractHOG,
  extractHistograms: extractHistograms,
  extractHOGFromHistograms: extractHOGFromHistograms

  // also export all the functions from processing.js
};for (var func in _processing2.default) {
  module.exports[func] = _processing2.default[func];
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var epsilon = 0.00001;

module.exports = {
  L1: function L1(vector) {
    var norm = 0;
    for (var i = 0; i < vector.length; i++) {
      norm += Math.abs(vector[i]);
    }
    var denom = norm + epsilon;

    for (var _i = 0; _i < vector.length; _i++) {
      vector[_i] /= denom;
    }
  },

  'L1-sqrt': function L1Sqrt(vector) {
    var norm = 0;
    for (var i = 0; i < vector.length; i++) {
      norm += Math.abs(vector[i]);
    }
    var denom = norm + epsilon;

    for (var _i2 = 0; _i2 < vector.length; _i2++) {
      vector[_i2] = Math.sqrt(vector[_i2] / denom);
    }
  },

  L2: function L2(vector) {
    var sum = 0;
    for (var i = 0; i < vector.length; i++) {
      sum += Math.pow(vector[i], 2);
    }
    var denom = Math.sqrt(sum + epsilon);
    for (var _i3 = 0; _i3 < vector.length; _i3++) {
      vector[_i3] /= denom;
    }
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var processing = {
  //converts to grey scale image
  intensities: function intensities(imagedata) {
    var lumas = new Array(imagedata.height);
    for (var y = 0; y < imagedata.height; y++) {
      lumas[y] = new Array(imagedata.width);

      for (var x = 0; x < imagedata.height; x++) {
        var i = x * 4 + y * 4 * imagedata.width;
        var r = imagedata.data[i],
            g = imagedata.data[i + 1],
            b = imagedata.data[i + 2],
            a = imagedata.data[i + 3];

        var luma = a == 0 ? 1 : (r * 299 / 1000 + g * 587 / 1000 + b * 114 / 1000) / 255;

        lumas[y][x] = luma;
      }
    }
    return lumas;
  },

  gradients: function gradients(imageData) {
    var intensities = this.intensities(imageData);
    return this._gradients(intensities);
  },

  _gradients: function _gradients(intensities) {
    var height = intensities.length;
    var width = intensities[0].length;

    var gradX = new Array(height);
    var gradY = new Array(height);

    for (var y = 0; y < height; y++) {
      gradX[y] = new Array(width);
      gradY[y] = new Array(width);

      var row = intensities[y];

      for (var x = 0; x < width; x++) {
        var prevX = x == 0 ? 0 : intensities[y][x - 1];
        var nextX = x == width - 1 ? 0 : intensities[y][x + 1];
        var prevY = y == 0 ? 0 : intensities[y - 1][x];
        var nextY = y == height - 1 ? 0 : intensities[y + 1][x];

        // kernel [-1, 0, 1]
        gradX[y][x] = -prevX + nextX;
        gradY[y][x] = -prevY + nextY;
      }
    }

    return {
      x: gradX,
      y: gradY
    };
  },

  gradientVectors: function gradientVectors(imageData) {
    var intensities = this.intensities(imageData);
    return this._gradientVectors(intensities);
  },

  _gradientVectors: function _gradientVectors(intensities) {
    var height = intensities.length;
    var width = intensities[0].length;

    var vectors = new Array(height);

    for (var y = 0; y < height; y++) {
      vectors[y] = new Array(width);

      for (var x = 0; x < width; x++) {
        var prevX = x == 0 ? 0 : intensities[y][x - 1];
        var nextX = x == width - 1 ? 0 : intensities[y][x + 1];
        var prevY = y == 0 ? 0 : intensities[y - 1][x];
        var nextY = y == height - 1 ? 0 : intensities[y + 1][x];

        // kernel [-1, 0, 1]
        var gradX = -prevX + nextX;
        var gradY = -prevY + nextY;

        vectors[y][x] = {
          mag: Math.sqrt(Math.pow(gradX, 2) + Math.pow(gradY, 2)),
          orient: Math.atan2(gradY, gradX)
        };
      }
    }
    return vectors;
  },

  drawGreyscale: function drawGreyscale(canvas) {
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var intensities = this.intensities(imageData);

    for (var y = 0; y < imageData.height; y++) {
      for (var x = 0; x < imageData.width; x++) {
        var i = y * 4 * imageData.width + x * 4;
        var luma = intensities[y][x] * 255;

        imageData.data[i] = luma;
        imageData.data[i + 1] = luma;
        imageData.data[i + 2] = luma;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    return canvas;
  },

  drawGradient: function drawGradient(canvas, dir) {
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var gradients = this.gradients(imageData);
    var grads = gradients[dir || "x"];

    for (var y = 0; y < imageData.height; y++) {
      for (var x = 0; x < imageData.width; x++) {
        var i = y * 4 * imageData.width + x * 4;
        var grad = Math.abs(grads[y][x]) * 255;

        imageData.data[i] = grad;
        imageData.data[i + 1] = grad;
        imageData.data[i + 2] = grad;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    return canvas;
  },

  drawMagnitude: function drawMagnitude(canvas) {
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var vectors = processing.gradientVectors(imageData);

    for (var y = 0; y < imageData.height; y++) {
      for (var x = 0; x < imageData.width; x++) {
        var i = y * 4 * imageData.width + x * 4;
        var mag = Math.abs(vectors[y][x].mag) * 255;
        imageData.data[i] = mag;
        imageData.data[i + 1] = mag;
        imageData.data[i + 2] = mag;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    return canvas;
  },

  drawOrients: function drawOrients(canvas) {
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var vectors = processing.gradientVectors(imageData);

    for (var y = 0; y < imageData.height; y++) {
      for (var x = 0; x < imageData.width; x++) {
        var i = y * 4 * imageData.width + x * 4;
        var orient = Math.abs(vectors[y][x].orient);
        orient *= 180 / Math.PI;
        if (orient < 0) {
          orient += 180;
        }
        orient *= 255 / 180;

        imageData.data[i] = orient;
        imageData.data[i + 1] = orient;
        imageData.data[i + 2] = orient;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    return canvas;
  }
};

module.exports = processing;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bundle = __webpack_require__(0);

var _bundle2 = _interopRequireDefault(_bundle);

var _hog = __webpack_require__(1);

var _hog2 = _interopRequireDefault(_hog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
    var img = document.getElementById('img');
    var canvas = document.getElementById('canvas');
    var imgData = getImageData(img, canvas);
    _hog2.default.drawMagnitude(canvas);
};

function getImageData(img, canvas) {
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = ctx.getImageData(0, 0, img.width, img.height);

    return dataURL;
}

/***/ })
/******/ ]);