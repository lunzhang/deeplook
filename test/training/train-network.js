import brain from 'brain';
import Hog from 'hog-descriptor';

window.trainNetwork = function() {

  var PATCH_SIZE = 48;

  var net = new brain.NeuralNetwork({
    hiddenLayers: [10, 10],
    learningRate: 0.2
  });
  var data = [];
  var dataCount = 10;
  var counter = 0;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");

  canvas.width = PATCH_SIZE;
  canvas.height = PATCH_SIZE;

  //extract data from FACE_DATASET
  for(var i = 1;i<dataCount;i++){
    var img = new Image();
    img.src = "./training/FACE_DATASET/download ("+i+").jpg";
    (function(img){
      img.onload = function(){
        ctx.drawImage(img, 0, 0,img.width,img.height,0,0,PATCH_SIZE,PATCH_SIZE);
        var imgData = ctx.getImageData(0,0,PATCH_SIZE,PATCH_SIZE);
        data.push({
          input: Hog.extractHOG(imgData,{}),
          output:[1]
        });
        counter++;
        if(counter >= (dataCount-1)*2){
            startTraining();
        }
      };
    })(img);
  }

  //extract data from NON_FACE_DATASET
  for(var i = 1;i<dataCount;i++){
    var img = new Image();
    img.src = "./training/NON_FACE_DATASET/download ("+i+").jpg";

    (function(img){
      img.onload = function(){
        ctx.drawImage(img, 0, 0,img.width,img.height,0,0,PATCH_SIZE,PATCH_SIZE);
        var imgData = ctx.getImageData(0,0,PATCH_SIZE,PATCH_SIZE);
        data.push({
          input: Hog.extractHOG(imgData,{}),
          output:[0]
        });
        counter++;
        if(counter >= (dataCount-1)*2){
            startTraining();
        }
      };
    })(img);
  }

  var samples =  0;

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
    var trainedData = JSON.stringify(net.toJSON());
    var textarea = document.getElementById('network-data');
    textarea.value = trainedData;
  }

}
