'use strict';

const fs = require('fs');

//open file with fs and read file into buffer
module.exports = fs.readFile('../img/palette-bitmap.bmp', (err, bufferData) => {
  if (err) {
    console.log('error', err);
  }

//convert buffer into JS Object
  // var bitmap = {};
  var BMP = require('../model/bitmap-constructor.js');
   var gray = new BMP(
     bufferData.toString('utf-8', 0, 2),
     bufferData.readInt32LE(2),
     bufferData.readInt32LE(10),
     bufferData.readInt32LE(12),
     bufferData.readInt32LE(54)
   );
   var inverted = new BMP(
     bufferData.toString('utf-8', 0, 2),
     bufferData.readInt32LE(2),
     bufferData.readInt32LE(10),
     bufferData.readInt32LE(12),
     bufferData.readInt32LE(54)
   );
   var random = new BMP(
     bufferData.toString('utf-8', 0, 2),
     bufferData.readInt32LE(2),
     bufferData.readInt32LE(10),
     bufferData.readInt32LE(12),
     bufferData.readInt32LE(54)
   );
   var colorScaling = new BMP(
     bufferData.toString('utf-8', 0, 2),
     bufferData.readInt32LE(2),
     bufferData.readInt32LE(10),
     bufferData.readInt32LE(12),
     bufferData.readInt32LE(54)
   );

//read color palette into integer array
  // var palette = [];
  //
  // bitmap.readPalette = function(palette) {
  //   var counter = 0;
  //   for (var i = 54; i < bitmap.pixelStart; i += 4) {
  //     palette[counter] = [
  //       bufferData.readUInt8(i),
  //       bufferData.readUInt8(i + 1),
  //       bufferData.readUInt8(i + 2),
  //       0];
  //     counter++;
  //   }
  // };

 //call readPalette function? x-fingers.
  // bitmap.readPalette(palette);

 //manipulate values to transform palette for rgb to change colors in palette
  // palette.transform = function(data) {
  //   for (var i = 0; i < data.length; i++) {
  //     var red = Math.floor(Math.random() * 255);
  //     var green = Math.floor(Math.random() * 255);
  //     var blue = Math.floor(Math.random() * 255);
  //
  //     data[i] = [red, green, blue, 0];
  //   }
  //   return data;
  // };

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
  fs.writeFile('../img/palette-bmp.bmp', newBuffer, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
  fs.writeFile('../img/palette-inverted.bmp', newBuffer, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
  fs.writeFile('../img/colorScale-bmp.bmp', newBuffer, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
  fs.writeFile('../img/grayscale-bmp.bmp', newBuffer, (err) => {
    if (err) {
      console.log('error', err);
    }
  });
