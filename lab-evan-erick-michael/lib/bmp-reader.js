'use strict';

const fs = require('fs');
const bitmap = fs.readFileSync(`../img/palette-bitmap.bmp`);

const bmp = {};

bmp.type = bitmap.toString('utf-8', 0, 2);

// there are other options for this
bmp.size = bitmap.readInt32LE(2);
bmp.width = bitmap.readUInt32LE(18);
bmp.height = bitmap.readUInt32LE(22);
bmp.pixStart = bitmap.readUInt32LE(10);
bmp.colorPallete = bitmap.readUInt32LE(46);
// bmp.colorPallete = bitmap.readUInt32LE(54);
// console.log(bmp.colorPallete);
// console.log(bmp);
// console.log(bmp.pixStart);
var colorTable = new Buffer(bmp.colorPallete, 1077, 'hex');
var pixArray = new Buffer(bmp.pixStart, 11078, 'hex');
console.log('pixArray', pixArray);
console.log('colorTable', colorTable);

// fs.writeFile('./writeable.txt', pixArray, 'base64');
// fs.writeFile('./writeable2.txt', colorTable, 'base64');
