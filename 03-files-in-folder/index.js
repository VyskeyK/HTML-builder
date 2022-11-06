const { stdout } = process;
const {readdir, stat} = require('fs/promises');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

findFilesInDir(pathToFolder);

async function findFilesInDir(pathToFolder) {
  try {
    const files = await readdir(pathToFolder, {withFileTypes: true});
    const filteredFiles = files.filter( (file) => file.isFile());
    for (const file of filteredFiles) {
      const filePath = path.join(pathToFolder, file.name);
      const fileStat = await stat(filePath);
      const fileInfo = (file.name).split('.');
      fileInfo.push(formatBytes(fileStat.size));
      stdout.write(fileInfo.join(' - ') + '\n');
    }
  } catch (err) {
    console.error(err);
  }
}

function formatBytes(a,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}`}