'use strict';

const fs = require('fs');

//open file with fs and read file into buffer
module.exports = fs.readFile('../img/palette-bitmap.bmp', (err, bufferData) => {
  if (err) {
    console.log('error', err);
  }

 //convert buffer into JS Object
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

  function getMaxVal() {
    var counter = 0;
    for (var i = 54; i < gray.pixelStart; i += 4) {
      gray.grayPalette[counter] = [
        Math.ceil(
          bufferData.readUInt8(i),
          bufferData.readUInt8(i + 1),
          bufferData.readUInt8(i + 2)
        )
      ];
      counter++;
    }
  }

  function readPalette() {
    var counter = 0;
    for (var i = 54; i < 1078; i += 4) {
      inverted.invertedPalette[counter] = [
        bufferData.readUInt8(i),
        bufferData.readUInt8(i + 1),
        bufferData.readUInt8(i + 2),
        0
      ];
      colorScaling.scaledPalette[counter] = [
        bufferData.readUInt8(i),
        bufferData.readUInt8(i + 1),
        bufferData.readUInt8(i + 2),
        0
      ];
      random.randomPalette[counter] = [
        bufferData.readUInt8(i),
        bufferData.readUInt8(i + 1),
        bufferData.readUInt8(i + 2),
        0
      ];
      counter++;
    }
  }

  function transformGray() {
    for (var i = 0; i < gray.grayPalette.length; i++) {
      let red = gray.grayPalette[i];
      let green = gray.grayPalette[i];
      let blue = gray.grayPalette[i];

      gray.grayPalette[i] = [red, green, blue, 0];
    }
    return gray.grayPalette;
  }

  function randomTransform() {
    for (var i = 0; i < random.randomPalette.length; i++) {
      let red = Math.floor(Math.random() * 255);
      let green = Math.floor(Math.random() * 255);
      let blue = Math.floor(Math.random() * 255);

      random.randomPalette[i] = [red, green, blue, 0];
    }
    return random.randomPalette;
  }

  function invertedTransform() {
    for (var i = 0; i < inverted.invertedPalette.length; i++) {
      let pixelPalette = inverted.invertedPalette[i];
      let red = 255 - pixelPalette[0];
      let green = 255 - pixelPalette[1];
      let blue = 255 - pixelPalette[2];

      inverted.invertedPalette[i] = [red, green, blue, 0];
    }
    return inverted.invertedPalette;
  }

  function transformScale() {
    for(var i=0;i<colorScaling.scaledPalette.length;i++) {
      let red = bufferData.readUInt8(i);
      red/=255;
      red = Math.round(red*=100);
      let green = bufferData.readUInt8(i + 1);
      green/=255;
      green = Math.round(green*=100);
      let blue = bufferData.readUInt8(i + 2);
      blue/=255;
      blue = Math.round(blue*=100);
      colorScaling.scaledPalette[i] = [red, green, blue, 0];
    }
    return colorScaling.scaledPalette;
  }

  getMaxVal();
  readPalette();
  transformGray();
  randomTransform();
  invertedTransform();
  transformScale();

  //call transform function, store array in variable, make one array with all nested arrays
  gray.grayPalette.forEach(function(item) {
    item.forEach(function(item2) {
      gray.transformedGrayPalette.push(item2);
    });
  });

  inverted.invertedPalette.forEach(function(item) {
    item.forEach(function(item2) {
      inverted.transformedPaletteInverted.push(item2);
    });
  });

  random.randomPalette.forEach(function(item) {
    item.forEach(function(item2) {
      random.transformedRandomPalette.push(item2);
    });
  });

  colorScaling.scaledPalette.forEach(function(item) {
    item.forEach(function(item2) {
      colorScaling.transformedScaledPalette.push(item2);
    });
  });

  //create new buffer of transformed color palette
  var grayBuffer = new Buffer(gray.transformedGrayPalette);
  var invertedBuffer = new Buffer(inverted.transformedPaletteInverted);
  var randomBuffer = new Buffer(random.transformedRandomPalette);
  var colorScalingBuffer = new Buffer(colorScaling.transformedScaledPalette);
  var header = bufferData.slice(0, 54);
  var tail = bufferData.slice(1078);
  //concat header, transform buffer and tail to read to file
  var newBufferGray = Buffer.concat([header, grayBuffer, tail]);
  var newBufferInverted = Buffer.concat([header, invertedBuffer, tail]);
  var newBufferRandom = Buffer.concat([header, randomBuffer, tail]);
  var newBufferScaled = Buffer.concat([header, colorScalingBuffer, tail]);
  //write new buffer to file
  fs.writeFile('../img/palette-bmp.bmp', newBufferRandom, (err) => {
    if (err) {
      console.log('error', err);
    }
    fs.writeFile('../img/palette-inverted.bmp', newBufferInverted, (err) => {
      if (err) {
        console.log('error', err);
      }
      fs.writeFile('../img/colorScale-bmp.bmp', newBufferScaled, (err) => {
        if (err) {
          console.log('error', err);
        }
        fs.writeFile('../img/grayscale-bmp.bmp', newBufferGray, (err) => {
          if (err) {
            console.log('error', err);
          }
        });
      });
    });
  });
});
