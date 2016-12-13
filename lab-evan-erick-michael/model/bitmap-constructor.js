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
};
