'use strict';

const fs = require('fs');

//open file with fs and read file into buffer
module.exports = fs.readFile('../img/palette-bitmap.bmp', (err, bufferData) => {
  if (err) {
    console.log('error', err);
  }

//convert buffer into JS Object
  var bitmap = {};
  bitmap.size = bufferData.readInt32LE(2);
  bitmap.pixelStart = bufferData.readInt32LE(10);
  bitmap.dBISize = bufferData.readInt32LE(12);
  bitmap.colorPalette = bufferData.readInt32LE(54);

//read color palette into integer array
  var palette = [];

  bitmap.getMaxVal = function() {
    var counter = 0;
    for (var i = 54; i < bitmap.pixelStart; i += 4) {
      palette[counter] = [
        Math.ceil(bufferData.readUInt8(i),
        bufferData.readUInt8(i + 1),
        bufferData.readUInt8(i + 2))
      ];
      counter++;
    }

  };

// call the getMaxVal function
   bitmap.getMaxVal();

 // set all rgb values to same number to achieve grayscale
  palette.transform = function(data) {
    for (var i = 0; i < data.length; i++) {
      let red = palette[i];
      let green = palette[i];
      let blue = palette[i];

      data[i] = [red, green, blue, 0];
    }
    console.log(data);
    return data;
  };

//call transform function, store array in variable, make one array with all nested arrays
  var transformedPalette = palette.transform(palette);
  var allArray = [];

  transformedPalette.forEach(function(item) {
    item.forEach(function(item2) {
      allArray.push(item2);
    });
  });

//create new buffer of transformed color palette
  var paletteBuffer = new Buffer(allArray);
  var header = bufferData.slice(0, 54);
  var tail = bufferData.slice(1078);
  //concat header, transform buffer and tail to read to file
  var newBuffer = Buffer.concat([header, paletteBuffer, tail]);
  //write new buffer to file
  fs.writeFile('../img/grayscale-bmp.bmp', newBuffer, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
});
