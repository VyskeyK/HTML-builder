const { stdout } = process;
const {readdir, stat} = require('fs/promises');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

stdout.write(pathToFolder);

findFilesInDir(pathToFolder);

async function findFilesInDir(pathToFolder) {
  try {
    const files = await readdir(pathToFolder, {withFileTypes: true});
    for (const file of files) {
      const filePath = path.join(pathToFolder, file.name);
      const fileStat = await stat(filePath);
      stdout.write('\n' + file.name + ' ' + fileStat.size);
    }
  } catch (err) {
    console.error(err);
  }
}