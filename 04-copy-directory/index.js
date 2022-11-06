const { stdout } = require('process');
const path = require('path');
const { mkdir, readdir } = require('fs/promises');

const oldDir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy');

copyDir();

async function copyDir() {
  try {
    await mkdir(newDir, { recursive: true });
    const files = await readdir(oldDir, {withFileTypes: true});
    const filteredFiles = files.filter( (file) => file.isFile());
    for (const file of filteredFiles) {
      stdout.write(file.name + '\n');
    }
  } catch (err) {
    console.error(err.message);
  }
}