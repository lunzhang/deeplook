import DeepLook from '../build/bundle.js';

window.onload = function() {
  let img = document.getElementById('img');
  let data = getImageData(img,0,0,img.width,img.height);
}

function getImageData(img,x,y,w,h) {
    // Create an empty canvas element
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let dataURL = ctx.getImageData(x,y,w,h);

    return dataURL;
}
