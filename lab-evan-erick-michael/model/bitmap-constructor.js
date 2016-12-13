'use strict';

var BitmapConstructor = module.exports = function(type, size, pixelStart, dBISize, colorPalette) {
  this.type = type;
  this.size = size;
  this.pixelStart = pixelStart;
  this.dBISize = dBISize;
  this.colorPalette = colorPalette;
  this.grayPalette = [];
  this.randomPalette = [];
  this.invertedPalette = [];
  this.scaledPalette = [];
  this.transformedGrayPalette = [];
  this.transformedRandomPalette = [];
  this.transformedPaletteInverted = [];
  this.transformedScaledPalette = [];
  // this.getMaxVal = function() {
  //   var counter = 0;
  //   for (var i = 54; i < this.pixelStart; i += 4) {
  //     this.grayPalette[counter] = [
  //       Math.ceil(bufferData.readUInt8(i),
  //         bufferData.readUInt8(i + 1),
  //         bufferData.readUInt8(i + 2)
  //       )
  //     ];
  //     counter++;
  //   }
  //   console.log(this.grayPalette);
  // };
  // this.readPalette = function() {
  //   var counter = 0;
  //   for (var i = 54; i < bitmap.pixelStart; i += 4) {
  //     this.invertedPalette[counter] = [
  //       bufferData.readUInt8(i),
  //       bufferData.readUInt8(i + 1),
  //       bufferData.readUInt8(i + 2),
  //       0];
  //     this.scaledPalette[counter] = [
  //       bufferData.readUInt8(i),
  //       bufferData.readUInt8(i + 1),
  //       bufferData.readUInt8(i + 2),
  //       0];
  //     this.randomPalette[counter] = [
  //       bufferData.readUInt8(i),
  //       bufferData.readUInt8(i + 1),
  //       bufferData.readUInt8(i + 2),
  //       0];
  //     counter++;
  //   }
  //   console.log(this.invertedPalette);
  //   console.log(this.scaledPalette);
  //   console.log(this.randomPalette);
  // };
};
