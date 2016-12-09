'use strict';

const fs = require('fs');
const bitmap = fs.readFileSync(`${__dirname}../img/palette-bmp.bmp`);

const bmp = {};

bmp.type = bitmap.toString('utf-8', 0, 2);

// there are other options for this
bmp.size = bitmap.readInt32LE(2);
bmp.width = bitmap.readUInt32LE(18);
bmp.height = bitmap.readUInt32LE(22);

console.dir(bmp);
