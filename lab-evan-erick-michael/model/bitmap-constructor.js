'use strict';

var BitmapConstrutor = module.exports = function(type, size, pixelStart, dBISize, colorPalette) {
  this.type = type;
  this.size = size;
  this.pixelStart = pixelStart;
  this.dBISize = dBISize;
  this.colorPalette = colorPalette;
  this.grayPalette = [];
  this.randomPalette = [];
  this.invertedPalette = [];
  this.getMaxVal = function() {
    var counter = 0;
    for (var i = this.colorPalette; i < this.pixelStart; i += 4) {
      this.grayPalette[counter] = [
        Math.ceil(bufferData.readUInt8(i),
          bufferData.readUInt8(i + 1),
          bufferData.readUInt8(i + 2)
        )
      ];
      counter++;
    }
  };
  this.readPalette = function() {
    var counter = 0;
    for (var i = 54; i < bitmap.pixelStart; i += 4) {
      this.randomPalette[counter] = [
        bufferData.readUInt8(i),
        bufferData.readUInt8(i + 1),
        bufferData.readUInt8(i + 2),
        0];
      counter++;
    }
  };

  this.transformGray = function(data) {
    for (var i = 0; i < data.length; i++) {
      let red = this.grayPalette[i];
      let green = this.grayPalette[i];
      let blue = this.grayPalette[i];

      data[i] = [red, green, blue, 0];
    }
    console.log(data);
    return data;
  };
  this.randomTransform = function(data) {
    for (var i = 0; i < data.length; i++) {
      let red = Math.floor(Math.random() * 255);
      let green = Math.floor(Math.random() * 255);
      let blue = Math.floor(Math.random() * 255);

      data[i] = [red, green, blue, 0];
    }
    console.log(data);
    return data;
  };

  this.transformedGrayPalette = this.transformGray(this.grayPalette);
  this.transformedRandomPalette = this.randomTransform(this.randomPalette);
  this.wholeArray = [];

};
