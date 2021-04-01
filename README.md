# inlining-images
Quick project to enable images to be inlined

[![NPM](https://nodei.co/npm/inlining-images.png)](https://npmjs.org/package/inlining-images)
![npm](https://img.shields.io/npm/v/inlining-images.svg)
[![install size](https://packagephobia.com/badge?p=inlining-images)](https://packagephobia.com/result?p=inlining-images)

# Setup & Run
The software can be run directly from the source or used as an npm package.
## From source
To install from source, checkout this repo, then:
```bash
➜  node --version # recommend over 12.xx.xx
➜  npm i # install dependencies
```
## Install the npm package
Install the npm package 
https://www.npmjs.com/package/inlining-images

```
npm install inlining-images
```
## Using npx
See below.

# Modes of operation
Three modes are available. 
## Mode 1: process one file and write locally.
In the first it uses the filename of the source file and creates the output file with the same name in the local folder (this can be the same directory as the source, in which case it will overwrite the source file).
```bash
➜  node index.js --file=sourcehtml/index.html
➜  open index.html
```
## Mode 2: process one file and write to a specified destination folder
The second mode is where the destination is specified. This is particularly useful in CI's and when running the command with `npx` which runs in a temporary folder and then deletes that folder immediately afterwards.

```bash
➜  node index.js --file=sourcehtml/index.html --destination=`pwd`/packaged.html
➜  open packaged.html
```
Here's an example of the syntax when running the command using npx (which allows the package to be run without being installed). 
```
npx inlining-images   --file=/full/path/to/source/html/file.html  --destination=/full/path/to/destination/html/file.html
```

## Mode 3: process a folder in-situ recursively
The third mode processes all the `.html` files in a folder, including subfolders.

```bash
➜  node index.js --inlineall=temphtmlfolder/
➜  open temphtmlfolder/index.html #Assuming an index.html exists in that folder.
```

Here's an example of the syntax when running the command using npx (which allows the package to be run without being installed). 
```
npx inlining-images   --inlineall=/full/path/to/source/html/
```


# Future work
- ~~inline non-image resources~~
- compress images before re-inserting them
- ...

# Use case examples
- To enable images and css to be incorporated into jacoco code coverage reports. Microsoft's Azure DevOps disabled the images and css 3 years ago and only render the basic html which is unattractive and loses information, see https://github.com/MicrosoftDocs/azure-devops-docs/issues/1535 

# Special thanks to
- [How to make a beautiful, tiny npm package and publish it](https://www.freecodecamp.org/news/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78/) which provided the guidelines to help me package the code and deploy it.
- [A guide to creating a NodeJS command-line package](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e) which provides another very helpful guide to the end to end process.
- https://gist.github.com/victorsollozzo/4134793 for the original code that recurses the folder structure. This has been adapted to export the function.
