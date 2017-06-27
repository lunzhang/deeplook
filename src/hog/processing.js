const processing = {
  //converts to grey scale image
  intensities: function(imagedata) {
    let lumas = new Array(imagedata.height);
    for (let y = 0; y < imagedata.height; y++) {
      lumas[y] = new Array(imagedata.width);

      for (let x = 0; x < imagedata.height; x++) {
        let i = x * 4 + y * 4 * imagedata.width;
        let r = imagedata.data[i],
            g = imagedata.data[i + 1],
            b = imagedata.data[i + 2],
            a = imagedata.data[i + 3];

        let luma = a == 0 ? 1 : (r * 299/1000 + g * 587/1000
          + b * 114/1000) / 255;

        lumas[y][x] = luma;
      }
    }
    return lumas;
  },

  gradients: function(imageData) {
    let intensities = this.intensities(imageData);
    return this._gradients(intensities);
  },

  _gradients: function(intensities) {
    let height = intensities.length;
    let width = intensities[0].length;

    let gradX = new Array(height);
    let gradY = new Array(height);

    for (let y = 0; y < height; y++) {
      gradX[y] = new Array(width);
      gradY[y] = new Array(width);

      let row = intensities[y];

      for (let x = 0; x < width; x++) {
        let prevX = x == 0 ? 0 : intensities[y][x - 1];
        let nextX = x == width - 1 ? 0 : intensities[y][x + 1];
        let prevY = y == 0 ? 0 : intensities[y - 1][x];
        let nextY = y == height - 1 ? 0 : intensities[y + 1][x];

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

  gradientVectors: function(imageData) {
    let intensities = this.intensities(imageData);
    return this._gradientVectors(intensities);
  },

  _gradientVectors: function(intensities) {
    let height = intensities.length;
    let width = intensities[0].length;

    let vectors = new Array(height);

    for (let y = 0; y < height; y++) {
      vectors[y] = new Array(width);

      for (let x = 0; x < width; x++) {
        let prevX = x == 0 ? 0 : intensities[y][x - 1];
        let nextX = x == width - 1 ? 0 : intensities[y][x + 1];
        let prevY = y == 0 ? 0 : intensities[y - 1][x];
        let nextY = y == height - 1 ? 0 : intensities[y + 1][x];

        // kernel [-1, 0, 1]
        let gradX = -prevX + nextX;
        let gradY = -prevY + nextY;

        vectors[y][x] = {
          mag: Math.sqrt(Math.pow(gradX, 2) + Math.pow(gradY, 2)),
          orient: Math.atan2(gradY, gradX)
        }
      }
    }
    return vectors;
  },

  drawGreyscale: function(canvas) {
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let intensities = this.intensities(imageData);

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        let i = (y * 4) * imageData.width + x * 4;
        let luma = intensities[y][x] * 255;

        imageData.data[i] = luma;
        imageData.data[i + 1] = luma;
        imageData.data[i + 2] = luma;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    return canvas;
  },

  drawGradient: function(canvas, dir) {
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let gradients = this.gradients(imageData);
    let grads = gradients[dir || "x"];

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        let i = (y * 4) * imageData.width + x * 4;
        let grad = Math.abs(grads[y][x]) * 255;

        imageData.data[i] = grad;
        imageData.data[i + 1] = grad;
        imageData.data[i + 2] = grad;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    return canvas;
  },

  drawMagnitude: function(canvas) {
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let vectors = processing.gradientVectors(imageData);

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        let i = (y * 4) * imageData.width + x * 4;
        let mag = Math.abs(vectors[y][x].mag) * 255;
        imageData.data[i] = mag;
        imageData.data[i + 1] = mag;
        imageData.data[i + 2] = mag;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
    return canvas;
  },

  drawOrients: function(canvas) {
    let ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let vectors = processing.gradientVectors(imageData);

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        let i = (y * 4) * imageData.width + x * 4;
        let orient = Math.abs(vectors[y][x].orient);
        orient *= (180 / Math.PI);
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
}

module.exports = processing;
