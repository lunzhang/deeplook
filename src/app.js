import Hog from 'hog-descriptor';
import brain from 'brain';
import networkData from './network-data';

const PATCH_SIZE = 48;

class DeepLook {

  constructor(){
    this.Hog = Hog;
    this.shift = 6;
    this.net = new brain.NeuralNetwork({
      hiddenLayers: [10, 10],
      learningRate: 0.2
    });
    this.net.fromJSON(networkData);
  }

  detectFaces(imageData){
    let histograms = Hog.extractHistograms(imageData,{});
    let faces = [];
    for(let y = 0; y + PATCH_SIZE < imageData.height; y+=this.shift ){
      for(let x = 0; x + PATCH_SIZE < imageData.width; x+=this.shift){
        let histRect = this.getRect(histograms, x / this.shift, y / this.shift, PATCH_SIZE / this.shift, PATCH_SIZE / this.shift);
        let hog = Hog.extractHOGFromHistograms(histRect,{});
        let prob = this.net.runInput(hog)[0];
        if(prob > .9){
          console.log(prob,x,y);
        }
      }
    }

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

}

export default new DeepLook();
