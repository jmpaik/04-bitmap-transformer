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
  var invertedPalette = [];

  bitmap.readPalette = function(palette) {
    var counter = 0;
    for (var i = 54; i < bitmap.pixelStart; i += 4) {
      palette[counter] = [
        bufferData.readUInt8(i),
        bufferData.readUInt8(i + 1),
        bufferData.readUInt8(i + 2),
        0];
      counter++;
    }
  };

 //call readPalette function? x-fingers.
  bitmap.readPalette(invertedPalette);

 //manipulate values to transform palette for rgb to change colors in palette

  invertedPalette.transform = function(data) {
    for (var i = 0; i < data.length; i++) {
      let pixelPalette = data[i];
      let red = 255 - pixelPalette[0];
      let green = 255 - pixelPalette[1];
      let blue = 255 - pixelPalette[2];

      data[i] = [red, green, blue, 0];
    }
    return data;
  };





//call transform function, store array in variable, make one array with all nested arrays
  var transformedPaletteInverted = invertedPalette.transform(invertedPalette);
  var allArray = [];

  transformedPaletteInverted.forEach(function(item) {
    item.forEach(function(item2) {
      allArray.push(item2);
    });
  });

//create new buffer of transformed color palette
  var paletteInvertedBuffer = new Buffer(allArray);
  var header = bufferData.slice(0, 54);
  var tail = bufferData.slice(1078);
  //concat header, transform buffer and tail to read to file
  var newBuffer = Buffer.concat([header, paletteInvertedBuffer, tail]);
  //write new buffer to file
  fs.writeFile('../img/palette-inverted.bmp', newBuffer, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
});
