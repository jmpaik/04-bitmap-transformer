'use strict';

const fs = require('fs');

const bitmap = fs.readFileSync(`${__dirname}../img/palette-bmp.bmp`);

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

// console.log(ourBmp);

// notice that logging the length of the pallette gives us 256... leads
// me to believe that each 2 chars represents a color in the pallette
// if my theory is correct, I think the representations in the pix array
// will correlate to those codes, as in the color pallete lists all possible colors
// and the pix array will reference those to describe what should be displayed.
// I'll keep digging

var createGroupedArray = function(name, arr, chunkSize, newArray) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    newArray.push(groups);
    console.log(name, newArray);
}
createGroupedArray('colors', ourBmp.colorTable, 4, ourBmp.ourColors);
createGroupedArray('pixArrayBrokenDown', ourBmp.pixArray, 4, ourBmp.pixArrayBrokenDown);
