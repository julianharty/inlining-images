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

const finalOutHtml = $.html();
console.info(`Final output length [${finalOutHtml.length}]`);
const htmlOutPath = './out.html';
const outPath = path.join(__dirname, htmlOutPath);
console.info(`Writing to [${outPath}]`);
fs.writeFileSync(outPath, finalOutHtml, 'utf-8');

console.info('Done');
