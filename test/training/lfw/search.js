var request = require('request');
var fs = require('fs');

var regex = /<a href="person.*>(.*)<\/a>/g;
var names = [];
var dir = './test/training/lfw/faces.json';

request('http://vis-www.cs.umass.edu/lfw/justnames.html',function (error, response, body){
  var anchors = body.match(regex);
  for(var i = 0;i<anchors.length;i++){
    var name = regex.exec(anchors[i])[1].replace(/ /g,'_');
    names.push(name);
    regex.lastIndex = 0;
  }

  try{
    var data = fs.readFileSync(dir,'utf8');
    //if file exists add to file
    data = JSON.parse(data).names;
    names = data.concat(names);
    fs.writeFileSync(dir,JSON.stringify({names}));
  }catch(err){
    //if file doesn't exist write to file
    fs.writeFileSync(dir,JSON.stringify({names}));
  }

});
