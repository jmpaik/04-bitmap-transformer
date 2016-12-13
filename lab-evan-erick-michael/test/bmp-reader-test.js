'use strict';

const fs = require('fs');
const BMPReader = require('../lib/bmp-reader.js');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const expect = require('chai').expect;

describe('bitmap transform testing', () => {

  it('write a new image to a file', () => {
    let image = fs.readFileSync('../img/palette-bitmap.bmp');
    let transformedImage = fs.readFileSync('../img/palette-bmp.bmp');
    expect(image).to.not.equal(transformedImage);
  });
});
