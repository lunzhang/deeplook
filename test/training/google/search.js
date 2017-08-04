var request = require('request');
var fs = require('fs');

var faceQuery = ['baby','boy','girl','man','woman',
'asian baby','asian boy','asian girl','asian man','asian woman',
'spanish baby','spanish boy','spanish girl','spanish man','spanish woman',
'black baby','black boy','black girl','black man','black woman',
'white baby','white boy','white girl','white man','white woman',
'chinese baby','chinese boy','chinese girl','chinese man','chinese woman',
'korean baby','korean boy','korean girl','korean man','korean woman',
'japanese baby','japanese boy','japanese girl','japanese man','japanese woman',
'indian baby','indian boy','indian girl','indian man','indian woman',
'mexican baby','mexican boy','mexican girl','mexican man','mexican woman',
'brazilian baby','brazilian boy','brazilian girl','brazilian man','brazilian woman',
'argentinian baby','argentinian boy','argentinian girl','argentinian man','argentinian woman',
'egyptian baby','egyptian boy','egyptian girl','egyptian man','egyptian woman',
'algerian baby','algerian boy','algerian girl','algerian man','algerian woman',
'kenyan baby','kenyan boy','kenyan girl','kenyan man','kenyan woman',
'moroccan baby','moroccan boy','moroccan girl','moroccan man','moroccan woman',
'british baby','british boy','british girl','british man','british woman',
'german baby','german boy','german girl','german man','german woman',
'french baby','french boy','french girl','french man','french woman',
'russian baby','russian boy','russian girl','russian man','russian woman'];
var faceCount = 25;
var faceUrls = [];
var faceSrcs = [];
var facesDir = './test/training/google/faces.json';

for(var i = 0;i<faceQuery.length;i++){
  faceUrls.push(
    'http://www.google.com/search?ei=NFN_Wa6eN8Ln-wGD86SgDA&yv=2&q='
    +faceQuery[i]+'&tbm=isch&vet=10ahUKEwiuiIib8bPVAhXC8z4KHYM5CcQQuT0IywEoAQ.NFN_Wa6eN8Ln-wGD86SgDA.i&ved=0ahUKEwiuiIib8bPVAhXC8z4KHYM5CcQQuT0IywEoAQ&ijn=1&start='
    +faceCount+'&asearch=ichunk&async=_id:rg_s,_pms:s'
  );
}

var nonfaceQuery = ['beaver', 'dolphin', 'otter', 'seal', 'whale',
'aquarium fish', 'flatfish', 'ray', 'shark', 'trout',
'orchids', 'poppies', 'roses', 'sunflowers', 'tulips',
'bottles', 'bowls', 'cans', 'cups', 'plates',
'apples', 'mushrooms', 'oranges', 'pears', 'sweet peppers',
'clock', 'computer keyboard', 'lamp', 'telephone', 'television',
'bed', 'chair', 'couch', 'table', 'wardrobe',
'bee', 'beetle', 'butterfly', 'caterpillar', 'cockroach',
'bear', 'leopard', 'lion', 'tiger', 'wolf',
'bridge', 'castle', 'house', 'road', 'skyscraper',
'cloud', 'forest', 'mountain', 'plain', 'sea',
'camel', 'cattle', 'chimpanzee', 'elephant', 'kangaroo',
'fox', 'porcupine', 'possum', 'raccoon', 'skunk',
'crab', 'lobster', 'snail', 'spider', 'worm',
'crocodile', 'dinosaur', 'lizard', 'snake', 'turtle',
'hamster', 'mouse', 'rabbit', 'shrew', 'squirrel',
'maple', 'oak', 'palm', 'pine', 'willow',
'bicycle', 'bus', 'motorcycle', 'pickup', 'truck', 'train',
'lawn-mower', 'rocket', 'streetcar', 'tank', 'tractor',
'monkey','gorilla','apes','chimpanzee'];
var nonfaceCount = 25;
var nonfaceUrls = [];
var nonfaceSrcs = [];
var nonfacesDir = './test/training/google/nonfaces.json';

for(var i = 0;i<nonfaceQuery.length;i++){
  nonfaceUrls.push(
    'http://www.google.com/search?ei=NFN_Wa6eN8Ln-wGD86SgDA&yv=2&q='
    +nonfaceQuery[i]+'&tbm=isch&vet=10ahUKEwiuiIib8bPVAhXC8z4KHYM5CcQQuT0IywEoAQ.NFN_Wa6eN8Ln-wGD86SgDA.i&ved=0ahUKEwiuiIib8bPVAhXC8z4KHYM5CcQQuT0IywEoAQ&ijn=1&start='
    +nonfaceCount+'&asearch=ichunk&async=_id:rg_s,_pms:s'
  );
}

var fetchCount = 0;

function fetchData(query,url,dir,fetch){
  request(url, function (error, response, body) {
    var results = body.split(' ');
    var srcs = [];

    //extract srcs from data
    for(var i = 0;i<results.length;i++){
      if(results[i].indexOf('src=') != -1){
          var src = results[i].replace('src=\\"','');
          src = src.slice(0,src.length-2);
          srcs.push(src);
      }
    }

    if(fetch){
      nonfaceSrcs = nonfaceSrcs.concat(srcs);
      setTimeout(fetchNext,5000);
    }else{
      faceSrcs = faceSrcs.concat(srcs);
    }
    console.log(query + ' data updated');
  });
};

function fetchNext(){
    if(fetchCount < 100){
      fetchData(faceQuery[fetchCount],faceUrls[fetchCount],facesDir,false);
      fetchData(nonfaceQuery[fetchCount],nonfaceUrls[fetchCount],nonfacesDir,true);
      fetchCount = fetchCount + 1;
    }else{
      writeToFile(facesDir,faceSrcs);
      writeToFile(nonfacesDir,nonfaceSrcs);
      console.log('done fetching');
    }
};

function writeToFile(dir,srcs){
  try{
    var data = fs.readFileSync(dir,'utf8');
    //if file exists add to file
    data = JSON.parse(data).srcs;
    data = data.concat(srcs);
    fs.writeFileSync(dir,JSON.stringify({srcs:data}));
  }catch(err){
    //if file doesn't exist write to file
    fs.writeFileSync(dir,JSON.stringify({srcs}));
  }
}

fetchNext();
