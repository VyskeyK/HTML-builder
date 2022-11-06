const { stdout } = process;
const {readdir} = require('fs/promises');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

stdout.write(pathToFolder);

findFilesInDir(pathToFolder);

async function findFilesInDir(path) {
  try {
    const files = await readdir(path);
    for (const file of files) stdout.write(file);
  } catch (err) {
    console.error(err);
  }
}