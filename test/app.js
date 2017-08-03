import trainNetworkLocal from './training/train-network-local.js';
import trainNetworkGoogle from './training/train-network-google.js';
import * as globals from '../globals.js';

let img = new Image();
img.src = './SuccessKid.jpg';
let canvas = document.getElementById('test-canvas');

// Copy the image contents to the canvas
let ctx = canvas.getContext("2d");
let dataURL;

img.onload = function(){
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0,img.width,img.height,0,0,canvas.width,canvas.height);
};

window.test = function(){
    let faces = DeepLook.detectFaces(canvas);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    for(let i = 0;i<faces.length;i++){
      let face = faces[i];
      ctx.strokeRect(face.x, face.y, face.width, face.height);
    }
};

window.trainNetworkLocal = function(){
    trainNetworkLocal();
};

window.trainNetworkGoogle = function(){
    trainNetworkGoogle();
};
