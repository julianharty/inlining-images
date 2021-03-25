# inlining-images
Quick project to enable images to be inlined

# Setup & Run
```bash
➜  node --version # recommend over 12.xx.xx
➜  npm i # install dependencies
➜  node index.js --file=sourcehtml/index.html
➜  open out.html
```

# Future work
- ~~inline non-image resources~~
- compress images before re-inserting them
- ...

# Use case examples
- To enable images and css to be incorporated into jacoco code coverage reports. Microsoft's Azure DevOps disabled the images and css 3 years ago and only render the basic html which is unattractive and loses information, see https://github.com/MicrosoftDocs/azure-devops-docs/issues/1535 
