// 'use strict';
//
// var BitmapConstrutor = module.exports = function(type, size, pixelStart, dBISize, colorPalette) {
//   this.type = type;
//   this.size = size;
//   this.pixelStart = pixelStart;
//   this.dBISize = dBISize;
//   this.colorPalette = colorPalette;
//   this.getMaxVal = function() {
//     var counter = 0;
//     for (var i = this.colorPalette; i < this.pixelStart; i += 4) {
//       this.maxValPalette[counter] = [
//         Math.ceil(bufferData.readUInt8(i),
//         bufferData.readUInt8(i + 1),
//         bufferData.readUInt8(i + 2))
//       ];
//       counter++;
//     }
//   };
//   this.transformGray = function(data) {
//     for (var i = 0; i < data.length; i++) {
//       let red = this.maxValPalette[i];
//       let green = this.maxValPalette[i];
//       let blue = this.maxValPalette[i];
//
//       data[i] = [red, green, blue, 0];
//     }
//     console.log(data);
//     return data;
//   };
//   this.grayPalette = this.maxValPalette.transformGray(this.maxValPalette);
//   this.wholeArray = [];
//
// };
