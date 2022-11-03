const path = require('path');
const pathToText = path.join(__dirname, 'text.txt');

const fs = require('fs');
const stream = fs.createReadStream(pathToText, {encoding: 'UTF-8'});

stream.on('data', function(chunk) {
  console.log(chunk);
});