import DeepLook from '../src/app.js';
import trainNetwork from './training/train-network.js';
import * as globals from '../globals.js';

let img = new Image();
img.src = './cat.jpg';
let canvas = document.getElementById('test-canvas');

// Copy the image contents to the canvas
let ctx = canvas.getContext("2d");
let dataURL;

img.onload = function(){
  ctx.drawImage(img, 0, 0,img.width,img.height,0,0,canvas.width,canvas.height);
}

window.test = function(){
    let faces = DeepLook.detectFaces(canvas);
    console.log(faces);
    for(let i = 0;i<faces.length;i++){
      let face = faces[i];
      ctx.fillStyle="#FF0000";
      ctx.beginPath();
      ctx.arc(face.x, face.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
};

window.trainNetwork = function(){
    trainNetwork(DeepLook.net);
};
