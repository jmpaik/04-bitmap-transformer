'use strict';

var BitmapConstrutor = module.exports = function(type, size, width, height, pixStart, colorPallete) {
  this.type = type;
  this.size = size;
  this.width = width;
  this.height = height;
  this.pixStart = pixStart;
  this.colorPallete = colorPallete;
  this.colorTable = new Buffer(this.colorPallete, 1077, 'utf-8');
  this.pixArray = new Buffer(this.pixStart, 11078, 'utf-8');
  this.ourColors = [];
  this.pixArrayBrokenDown = [];
};
