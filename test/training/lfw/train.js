import DeepLook from '../../../src/app.js';
import brain from 'brain';
import Hog from 'hog-descriptor';
import * as globals from '../../../globals.js';
import * as faces from './faces.json';
import * as nonfaces from '../google/nonfaces.json';

const net = DeepLook.net;
const faceNames = faces.names;
const nonfaceSrcs = nonfaces.srcs;

export default function trainNetworkLFW() {
  let hogParams = {
      cellSize : globals.CELL_SIZE
  };
  let data = [];
  let faceCount = 0;
  let nonfaceCount = 0;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext("2d");

  canvas.width = globals.PATCH_SIZE;
  canvas.height = globals.PATCH_SIZE;

  function extractImage(){
      if(faceCount < faceNames.length){
        processFace(faceNames[faceCount]);
        faceCount = faceCount + 1;
        console.log(faceNames[faceCount] + ' data processed');
      }
      if(nonfaceCount < nonfaceSrcs.length){
        processNonface(nonfaceSrcs[nonfaceCount]);
        nonfaceCount = nonfaceCount + 1;
      }
      if(faceCount + nonfaceCount >= faceNames.length + nonfaceSrcs.length){
        startTraining();
      }else{
        setTimeout(extractImage,100);
      }
  }

  function processFace(name){
    let img = new Image();
    img.src = 'http://vis-www.cs.umass.edu/lfw/images/'+name+'/'+name+'_0001.jpg';
    img.crossOrigin = "Anonymous";
    (function(img){
      img.onload = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0,img.width,img.height,0,0,globals.PATCH_SIZE,globals.PATCH_SIZE);
        let imgData = ctx.getImageData(0,0,globals.PATCH_SIZE,globals.PATCH_SIZE);
        data.push({
          input: Hog.extractHOG(imgData,hogParams),
          output:[1]
        });
      };
    })(img);
  }

  function processNonface(src){
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
          output:[0]
        });
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
