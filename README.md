# inlining-images
Quick project to enable images to be inlined

[![install size](https://packagephobia.com/badge?p=inlining-images)](https://packagephobia.com/result?p=inlining-images)

# Setup & Run
The software can be run directly from the source or used as an npm package.

Two modes are available. In the first it uses the filename of the source file and creates the output file with the same name in the local folder (this can be the same directory as the source, in which case it will overwrite the source file).
```bash
➜  node --version # recommend over 12.xx.xx
➜  npm i # install dependencies
➜  node index.js --file=sourcehtml/index.html
➜  open index.html
```
The second mode is where the destination is specified. This is particularly useful in CI's and when running the command with `npx` which runs in a temporary folder and then deletes that folder immediately afterwards.

```bash
➜  node --version # recommend over 12.xx.xx
➜  npm i # install dependencies
➜  node index.js --file=sourcehtml/index.html --destination=`pwd`/packaged.html
➜  open packaged.html
```
Here's an example of the syntax when running the command using npx (which allows the package to be run without being installed). 
```
npx inlining-images   --file=/full/path/to/source/html/file.html  --destination=/full/path/to/destination/html/file.html
```

# Future work
- ~~inline non-image resources~~
- compress images before re-inserting them
- ...

# Use case examples
- To enable images and css to be incorporated into jacoco code coverage reports. Microsoft's Azure DevOps disabled the images and css 3 years ago and only render the basic html which is unattractive and loses information, see https://github.com/MicrosoftDocs/azure-devops-docs/issues/1535 

# Special thanks to
- How to make a beautiful, tiny npm package and publish it https://www.freecodecamp.org/news/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78/ which provided the guidelines to help me package the code and deploy it.
