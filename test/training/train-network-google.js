import DeepLook from '../../src/app.js';
import brain from 'brain';
import Hog from 'hog-descriptor';
import * as globals from '../../globals.js';
import * as faces from './google/faces.json';
import * as nonfaces from './google/nonfaces.json';

const net = DeepLook.net;
const faceSrcs = faces.srcs;
const nonfaceSrcs = nonfaces.srcs;

export default function trainNetworkGoogle() {

  let hogParams = {
      cellSize : globals.CELL_SIZE
  };
  let data = [];
  let dataCount = faceSrcs.length;
  let extractCount = 0;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext("2d");

  canvas.width = globals.PATCH_SIZE;
  canvas.height = globals.PATCH_SIZE;

  function extractImage(){
      if(extractCount < 100){
        processImage(faceSrcs[extractCount],1);
        processImage(nonfaceSrcs[extractCount],0);
        console.log(extractCount + ' data processed');
        extractCount = extractCount + 1;
      }else{
        startTraining();
      }
  }

  function processImage(src,expected){
    let img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    (function(img){
      img.onload = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0,img.width,img.height,0,0,globals.PATCH_SIZE,globals.PATCH_SIZE);
        let imgData = ctx.getImageData(0,0,globals.PATCH_SIZE,globals.PATCH_SIZE);
        data.push({
          input: Hog.extractHOG(imgData,hogParams),
          output:[expected]
        });
        if(expected === 0) extractImage();
      };
    })(img);
  }

  function startTraining(){
    //randomize data
    data.sort(function() {
      return 1 - 2 * Math.round(Math.random());
    });
    net.train(data,{
      errorThresh: 0.008,
      log: true,
      logPeriod: 1
    });
    let trainedData = JSON.stringify(net.toJSON());
    let textarea = document.getElementById('network-data');
    textarea.value = trainedData;
  }

  extractImage();
}
