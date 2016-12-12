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
  var scalingPalette = [];

  bitmap.readPalette = function() {
    var counter = 0;
    for (var i = 54; i < bitmap.pixelStart; i += 4) {
      scalingPalette[counter] = [
        bufferData.readUInt8(i),
        bufferData.readUInt8(i + 1),
        bufferData.readUInt8(i + 2),
        0
      ];
      counter++;
    }
  };

 //call readPalette function? x-fingers.
  bitmap.readPalette();

  scalingPalette.transformScale = function(data) {
    for(var i=0;i<data.length;i++) {
      let red = bufferData.readUInt8(i);
      red/=255;
      red*=100;
      let green = bufferData.readUInt8(i + 1);
      green/=255;
      green*=100;
      let blue = bufferData.readUInt8(i + 2);
      blue/=255;
      blue*=100;
      data[i] = [red, green, blue, 0];
    }
    return data;
  };

//call transform function, store array in variable, make one array with all nested arrays

  var scaledPalette = scalingPalette.transformScale(scalingPalette);
  var scaled = [];

  scaledPalette.forEach(function(item) {
    item.forEach(function(item2) {
      scaled.push(item2);
    });
  });

//create new buffer of transformed color palette
  var header = bufferData.slice(0, 54);
  var tail = bufferData.slice(1078);
  //concat header, transform buffer and tail to read to file
  var scaledBuffer = new Buffer(scaled);
  var newScaled = Buffer.concat([header, scaledBuffer, tail]);

  fs.writeFile('../img/colorScale-bmp.bmp', newScaled, (err) => {
    if(err) {
      console.log('error', err);
    };
  });
});
