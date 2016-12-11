'use strict';

const fs = require('fs');

//open file with fs and read file into buffer
module.exports = fs.readFile('../img/palette-bitmap.bmp', (err, bufferData) => {
  if (err) {
    console.log('error', err);
  }

// const bitmap = fs.readFileSync(`${__dirname}../img/palette-bmp.bmp`);
// const bitmap = fs.readFileSync(`../img/palette-bitmap.bmp`);
// var bmp = require('../model/bitmap-constructor.js');
//
// console.log(bmp);

//convert buffer into JS Object
  var bitmap = {};
  bitmap.size = bufferData.readInt32LE(2);
  bitmap.pixelStart = bufferData.readInt32LE(10);
  bitmap.dBISize = bufferData.readInt32LE(12);
  bitmap.colorPalette = bufferData.readInt32LE(54);
  // bitmap.toString('utf-8', 0, 2),
  // bitmap.readInt32LE(2),
  // bitmap.readInt32LE(18),
  // bitmap.readInt32LE(22),
  // bitmap.readInt32LE(10),
  // bitmap.readInt32LE(46)

// console.log(ourBmp);

//read color palette into integer array
  var palette = [];

  bitmap.readPalette = function() {
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
  bitmap.readPalette();

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
});


// notice that logging the length of the pallette gives us 256... leads
// me to believe that each 2 chars represents a color in the pallette
// if my theory is correct, I think the representations in the pix array
// will correlate to those codes, as in the color pallete lists all possible colors
// and the pix array will reference those to describe what should be displayed.
// I'll keep digging

// var createGroupedArray = function(name, arr, chunkSize, newArray) {
//   var groups = [], i;
//   for (i = 0; i < arr.length; i += chunkSize) {
//     groups.push(arr.slice(i, i + chunkSize));
//   }
//   newArray.push(groups);
//   console.log(name, newArray);
// };
// createGroupedArray('colors', ourBmp.colorTable, 4, ourBmp.ourColors);
// createGroupedArray('pixArrayBrokenDown', ourBmp.pixArray, 4, ourBmp.pixArrayBrokenDown);
