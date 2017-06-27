import processing from './processing.js';
import norms from './norms.js';

function extractHOG(imageData, options) {
  let histograms = extractHistograms(imageData, options);
  return extractHOGFromHistograms(histograms, options);
}

function extractHistograms(imageData, options) {
  let vectors = processing.gradientVectors(imageData);

  let cellSize = options.cellSize || 6;
  let bins = options.bins || 9;

  let cellsWide = Math.floor(vectors[0].length / cellSize);
  let cellsHigh = Math.floor(vectors.length / cellSize);

  let histograms = new Array(cellsHigh);

  for (let i = 0; i < cellsHigh; i++) {
    histograms[i] = new Array(cellsWide);

    for (let j = 0; j < cellsWide; j++) {
      histograms[i][j] = getHistogram(vectors, j * cellSize, i * cellSize,
                                      cellSize, bins);
    }
  }
  return histograms;
}

/* This function is decoupled so you can extract histograms for an entire image
 * to save recomputation, and use these to get HOGs from individual windows
 */
function extractHOGFromHistograms(histograms, options) {
  let blockSize = options.blockSize || 3;
  let blockStride = options.blockStride || (blockSize / 2);
  let normalize = norms[options.norm || "L2"];

  let blocks = [];
  let blocksHigh = histograms.length - blockSize + 1;
  let blocksWide = histograms[0].length - blockSize + 1;

  for (let y = 0; y < blocksHigh; y += blockStride) {
    for (let x = 0; x < blocksWide; x += blockStride) {
      let block = getBlock(histograms, x, y, blockSize);
      normalize(block);
      blocks.push(block);
    }
  }
  return Array.prototype.concat.apply([], blocks);
}

function getBlock(matrix, x, y, length) {
  let square = [];
  for (let i = y; i < y + length; i++) {
    for (let j = x; j < x + length; j++) {
      square.push(matrix[i][j]);
    }
  }
  return Array.prototype.concat.apply([], square);
}

function getHistogram(elements, x, y, size, bins) {
  let histogram = zeros(bins);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let vector = elements[y + i][x + j];
      let bin = binFor(vector.orient, bins);
      histogram[bin] += vector.mag;
    }
  }
  return histogram;
}

function binFor(radians, bins) {
  let angle = radians * (180 / Math.PI);
  if (angle < 0) {
    angle += 180;
  }

  // center the first bin around 0
  angle += 90 / bins;
  angle %= 180;

  let bin = Math.floor(angle / 180 * bins);
  return bin;
}

function zeros(size) {
  let array = new Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = 0;
  }
  return array;
}

module.exports = {
  extractHOG: extractHOG,
  extractHistograms: extractHistograms,
  extractHOGFromHistograms: extractHOGFromHistograms
}

// also export all the functions from processing.js
for (let func in processing) {
  module.exports[func] = processing[func];
}
