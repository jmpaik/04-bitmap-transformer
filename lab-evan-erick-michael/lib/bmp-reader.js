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
  bitmap.readPalette(palette);
  bitmap.readPalette(invertedPalette);

 //manipulate values to transform palette for rgb to change colors in palette
  palette.transform = function(data) {
    for (var i = 0; i < data.length; i++) {
      var red = Math.floor(Math.random() * 255);
      var green = Math.floor(Math.random() * 255);
      var blue = Math.floor(Math.random() * 255);

      data[i] = [red, green, blue, 0];
    }
    return data;
  };

  invertedPalette.transform = function(data) {
    for (var i = 0; i < data.length; i++) {
      var pixelPalette = data[i];
      var red = 255 - pixelPalette[0];
      var green = 255 - pixelPalette[1];
      var blue = 255 - pixelPalette[2];

      data[i] = [red, green, blue, 0];
    }
    return data;
  };





//call transform function, store array in variable, make one array with all nested arrays
  var transformedPalette = palette.transform(palette);
  var transformedPaletteInverted = invertedPalette.transform(invertedPalette);
  var allArray = [];
  var allArrayTwo = [];

  transformedPalette.forEach(function(item) {
    item.forEach(function(item2) {
      allArray.push(item2);
    });
  });

  transformedPaletteInverted.forEach(function(item) {
    item.forEach(function(item2) {
      allArrayTwo.push(item2);
    });
  });

//create new buffer of transformed color palette
  var paletteBuffer = new Buffer(allArray);
  var paletteInvertedBuffer = new Buffer(allArrayTwo);
  var header = bufferData.slice(0, 54);
  var tail = bufferData.slice(1078);
  //concat header, transform buffer and tail to read to file
  var newBuffer = Buffer.concat([header, paletteBuffer, tail]);
  var newBufferTwo = Buffer.concat([header, paletteInvertedBuffer, tail]);
  //write new buffer to file
  fs.writeFile('../img/palette-bmp.bmp', newBuffer, (err) => {
    if (err) {
      console.log('error', err);
    }
  });

  fs.writeFile('../img/palette-inverted.bmp', newBufferTwo, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
});
