'use strict';

function TransformConstructor() {

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
  this.invertedTransform = function(data) {
    for (var i = 0; i < data.length; i++) {
      let pixelPalette = data[i];
      let red = 255 - pixelPalette[0];
      let green = 255 - pixelPalette[1];
      let blue = 255 - pixelPalette[2];

      data[i] = [red, green, blue, 0];
    }
    console.log(data);
    return data;
  };
  this.transformScale = function(data) {
    for(var i=0;i<data.length;i++) {
      let red = bufferData.readUInt8(i);
      red/=255;
      red*=100;
      let green = bufferData.readUInt8(i + 1);
      green/=255;
      green*=100;
      let blue = bufferData.readUInt8(i + 2);
      blue/=255;
      blue*=100;
      data[i] = [red, green, blue, 0];
    }
    console.log(data);
    return data;
  };

  this.transformedGrayPalette = this.transformGray(this.grayPalette);
  this.transformedRandomPalette = this.randomTransform(this.randomPalette);
  this.transformedPaletteInverted = this.invertedTransform(this.invertedPalette);
  this.transformedScaledPalette = this.transformScale(this.scaledPalette);
  this.wholeArray = [];

}
