# BITMAP TRANSFORMER

### What does this app do?

The purpose of this app is listed below:

1) Reads the contents of a 16-bit bitmap image file called "palette-bitmap.bmp".

2) Manipulates the pixels with 4 different types of transforms, which include a grayscale effect, inversion effect, shading effect (color scale) and random effect.

3) Collects the outputted pixels from each transform, reformats and writes the new pixel information to unique bitmap image files.

### How do I use this app?

If you intend to use this app, you should clone this repository and run the command `npm i` in your terminal to install all of the dependencies for the development environment. Once everything has been installed, navigate to the lib/ folder located within the app. While in this folder, you must run the command `node bmp-reader.js`. The result of this command will create new bitmap image files, which are located inside of the img/ folder.
