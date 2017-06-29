import brain from 'brain';
import networkData from '../../src/network-data.js';

window.testNetwork = function() {
  let net = new brain.NeuralNetwork({
    hiddenLayers: [10, 10],
    learningRate: 0.2
  });
  net.fromJSON(networkData);

}
