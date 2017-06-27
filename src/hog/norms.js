const epsilon = 0.00001;

module.exports = {
  L1: function(vector) {
    let norm = 0;
    for (let i = 0; i < vector.length; i++) {
      norm += Math.abs(vector[i]);
    }
    let denom = norm + epsilon;

    for (let i = 0; i < vector.length; i++) {
      vector[i] /= denom;
    }
  },

 'L1-sqrt': function(vector) {
    let norm = 0;
    for (let i = 0; i < vector.length; i++) {
      norm += Math.abs(vector[i]);
    }
    let denom = norm + epsilon;

    for (let i = 0; i < vector.length; i++) {
      vector[i] = Math.sqrt(vector[i] / denom);
    }
  },

  L2: function(vector) {
    let sum = 0;
    for (let i = 0; i < vector.length; i++) {
      sum += Math.pow(vector[i], 2);
    }
    let denom = Math.sqrt(sum + epsilon);
    for (let i = 0; i < vector.length; i++) {
      vector[i] /= denom;
    }
  }
}
