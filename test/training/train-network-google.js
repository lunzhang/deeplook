import DeepLook from '../../src/app.js';
import brain from 'brain';
import Hog from 'hog-descriptor';
import * as globals from '../../globals.js';
import * as faces from './google/faces.json';

const net = DeepLook.net;
const faceSrcs = faces.srcs;

export default function trainNetworkGoogle() {

  let hogParams = {
      cellSize : globals.CELL_SIZE
  };
  let data = [];
  let dataCount = faceSrcs.length;
  let counter = 0;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext("2d");

  canvas.width = globals.PATCH_SIZE;
  canvas.height = globals.PATCH_SIZE;

  //extract data from FACE_DATASET
  for(let i = 0;i<faceSrcs;i++){
    let img = new Image();
    img.src = faceSrcs[i];
    (function(img){
      img.onload = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0,img.width,img.height,0,0,globals.PATCH_SIZE,globals.PATCH_SIZE);
        let imgData = ctx.getImageData(0,0,globals.PATCH_SIZE,globals.PATCH_SIZE);
        data.push({
          input: Hog.extractHOG(imgData,hogParams),
          output:[1]
        });
        counter++;
        if(counter >= dataCount){
            startTraining();
        }
      };
    })(img);
  }

  //extract data from NON_FACE_DATASET
  //for(let i = 1;i<dataCount;i++){
  //   let img = new Image();
  //   img.src = "./training/NON_FACE_DATASET/download ("+i+").jpg";
  //
  //   (function(img){
  //     img.onload = function(){
  //       ctx.drawImage(img, 0, 0,img.width,img.height,0,0,globals.PATCH_SIZE,globals.PATCH_SIZE);
  //       let imgData = ctx.getImageData(0,0,globals.PATCH_SIZE,globals.PATCH_SIZE);
  //       data.push({
  //         input: Hog.extractHOG(imgData,hogParams),
  //         output:[0]
  //       });
  //       counter++;
  //       if(counter >= (dataCount-1)*2){
  //           startTraining();
  //       }
  //     };
  //   })(img);
  // }

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

}
