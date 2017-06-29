import DeepLook from '../src/app.js';
import './training/test-network.js';
import './training/train-network.js';

let img = new Image();
img.src = './SuccessKid.jpg';

function getImageData(img) {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let dataURL = ctx.getImageData(0,0,img.width,img.height);

    return dataURL;
}
