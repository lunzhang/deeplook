import Hog from 'hog-descriptor';
import brain from 'brain';
import networkData from './network-data';
import * as globals from '../globals.js';
import nms from './nm.js';

class DeepLook {

  constructor(){
    this.Hog = Hog;
    this.net = new brain.NeuralNetwork({
      hiddenLayers: [10, 10],
      learningRate: 0.2
    });
    this.net.fromJSON(networkData);
    this.resize = 360;
    this.scaleStep = 6;
  }

  detectFaces(canvas){
    let resizes = this.getAllSizes(canvas, 48);

    let faces = [];
    resizes.forEach(function(resize) {
      let face = this.detectAtScale(resize.imagedata, resize.scale);
      faces = faces.concat(face);
    }.bind(this));
    faces = this.combineOverlaps(faces, 0.5, 2);
    return faces;
  }

  detectAtScale(imageData,scale){
    let histograms = Hog.extractHistograms(imageData,{});
    let faces = [];
    for(let y = 0; y + globals.PATCH_SIZE < imageData.height; y+=globals.CELL_SIZE ){
      for(let x = 0; x + globals.PATCH_SIZE < imageData.width; x+=globals.CELL_SIZE){
        let histRect = this.getRect(histograms, x / globals.CELL_SIZE, y / globals.CELL_SIZE, globals.PATCH_SIZE / globals.CELL_SIZE, globals.PATCH_SIZE / globals.CELL_SIZE);
        let hog = Hog.extractHOGFromHistograms(histRect,{});
        let prob = this.net.runInput(hog)[0];

        if(prob > .999){
          faces.push({
            x: Math.floor(x / scale),
            y: Math.floor(y / scale),
            width: Math.floor(globals.PATCH_SIZE / scale),
            height: Math.floor(globals.PATCH_SIZE / scale),
            prob
          });
        }

      }
    }
    return faces;
  }

  getRect(matrix, x, y, width, height) {
    let square = new Array(height);
    for (let i = 0; i < height; i++) {
      square[i] = new Array(width);
      for (let j = 0; j < width; j++) {
        square[i][j] = matrix[y + i][x + j];
      }
    }
    return square;
  }

  getAllSizes(canvas, minSize){
    // For use with Worker threads, return canvas ImageDatas
    // resized to accomodate letious window sizes

    minSize = minSize;

    // resize canvas to cut down on number of windows to check
    let max = Math.max(canvas.width, canvas.height)
    let scale = Math.min(max, this.resize) / max;

    let resizes = [];
    for (let size = minSize; size < max; size += this.scaleStep) {
      let winScale = (minSize / size) * scale;
      let imagedata = this.scaleCanvas(canvas, winScale);

      resizes.push({
        imagedata: imagedata,
        scale: winScale,
        size: size
      })
    }
    return resizes;
  }

  scaleCanvas(canvas, scale) {
    let width = Math.floor(canvas.width * scale);
    let height = Math.floor(canvas.height * scale);

    canvas = this.resizeCanvas(canvas, width, height);
    let ctx = canvas.getContext("2d");
    let imagedata = ctx.getImageData(0, 0, width, height);

    return imagedata;
  }

  resizeCanvas(canvas, width, height) {
    let resizeCanvas = this.createCanvas(width, height);
    let ctx = resizeCanvas.getContext('2d');
    ctx.patternQuality = "best";

    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height,0, 0, width, height);
    return resizeCanvas;
  }

  createCanvas(width, height) {
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    return canvas;
  }

  combineOverlaps(rects, overlapThresh, minOverlaps) {
    let faces = nms.combineOverlaps(rects, overlapThresh, minOverlaps);
    return faces;
  }

}

export default new DeepLook();
