'use strict';

const fs = require('fs');
const bitmap = fs.readFileSync(`../img/palette-bitmap.bmp`);
var bmp = require('../model/bitmap-constructor.js');
console.log(bmp);

var ourBmp = new bmp(
  bitmap.toString('utf-8', 0, 2),
  bitmap.readInt32LE(2),
  bitmap.readInt32LE(18),
  bitmap.readInt32LE(22),
  bitmap.readInt32LE(10),
  bitmap.readInt32LE(46)
);

console.log(ourBmp);
