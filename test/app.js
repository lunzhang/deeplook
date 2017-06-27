import DeepLook from '../build/bundle.js';
import Hog from '../src/hog/hog.js';

window.onload = function() {
  let img = document.getElementById('img');
  let canvas = document.getElementById('canvas');
  let imgData = getImageData(img,canvas);
  Hog.drawMagnitude(canvas);
}

function getImageData(img,canvas) {
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let dataURL = ctx.getImageData(0,0,img.width,img.height);

    return dataURL;
}
