#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

const htmlFilePath = argv.file;
if (!htmlFilePath) throw new Error(`[--file=] is a required argument`);
const filePath = path.resolve(__dirname, htmlFilePath);
console.info(`Inlining images for file [${filePath}]`);
const fileContents = fs.readFileSync(filePath, 'utf-8');
console.info(`File is [${fileContents.length}] chars: ${fileContents.slice(0, 20)} ... ${fileContents.slice(-20)}`);

const $ = cheerio.load(fileContents);
const imgEls = $('img');
console.info(`Found [${imgEls.length}] images, inlining them now`);

for (const $img of imgEls.toArray()) {
    const localImgPath = path.resolve(filePath, '../', $img.attribs.src);
    console.info(`Inlining image [${localImgPath}]`);
    try {
        const mimeType = localImgPath.split('?')[0].split('.').slice(-1)[0];
        console.info(`Assuming mime type [${mimeType}]`);
        const imgContents = fs.readFileSync(localImgPath, 'base64');
        console.info(`Image contents length [${imgContents.length}]`);
        $img.attribs.src = `data:image/${mimeType};base64,${imgContents}`;
    } catch (err) {
        console.warn(`Failed to read image, skipping`, err);
    }
}

const linkEls = $('link');
console.info(`Found [${linkEls.length}] links, inlining them now`);
for (const $link of linkEls.toArray()) {
    const localHrefPath = path.resolve(filePath, '../', $link.attribs.href);
    console.info(`Inlining href [${localHrefPath}]`);
    try {
        let styleContents = fs.readFileSync(localHrefPath, 'utf8');
        console.info(`Style contents length [${styleContents.length}]`);
        styleContents = preprocessStyle(styleContents, localHrefPath);
        const styleEl = $('<style>');
        styleEl.html(styleContents);
        $('head').append(styleEl);
    } catch (err) {
        console.warn(`Failed to read image, skipping`, err);
    }
}

const scriptEls = $('script');
console.info(`Found [${scriptEls.length}] scripts, inlining them now`);
for (const $script of scriptEls.toArray()) {
    const localSrcPath = path.resolve(filePath, '../', $script.attribs.src);
    console.info(`Inlining src [${localSrcPath}]`);
    try {
        let scriptContents = fs.readFileSync(localSrcPath, 'utf8');
        console.info(`Script contents length [${scriptContents.length}]`);
        const scriptEl = $('<script>');
        scriptEl.html(scriptContents);
        $('head').append(scriptEl);
    } catch (err) {
        console.warn(`Failed to read image, skipping`, err);
    }
}

const finalOutHtml = $.html();
console.info(`Final output length [${finalOutHtml.length}]`);



const destinationFilePath = argv.destination;
var outPath
if (!destinationFilePath) {
    const htmlOutPath = path.basename(htmlFilePath);
     outPath = path.join(__dirname, htmlOutPath);
} else {
     outPath = path.resolve(__dirname, destinationFilePath);
}

console.info(`Writing to [${outPath}]`);
fs.writeFileSync(outPath, finalOutHtml, 'utf-8');

console.info('Done');



function preprocessStyle(cssStr, filePath) {
    console.info(`Inlining relative images in CSS`);
    const urlRefs = cssStr.match(/url\(.*?\)/g);
    if (urlRefs) {
        for (const ref of urlRefs) {
            const [, imgPath] = ref.match(/url\((.*)\)/);
            const localImgPath = path.resolve(filePath, '../', imgPath);
            console.info(`Inlining image [${localImgPath}]`);
            try {
                const mimeType = localImgPath.split('?')[0].split('.').slice(-1)[0];
                console.info(`Assuming mime type [${mimeType}]`);
                const imgContents = fs.readFileSync(localImgPath, 'base64');
                console.info(`Image contents length [${imgContents.length}]`);
                cssStr = cssStr.replace(ref, `url(data:image/${mimeType};base64,${imgContents})`);
            } catch (err) {
                console.warn(`Failed to read image, skipping`, err);
            }
        }
    }
    return cssStr;
}
