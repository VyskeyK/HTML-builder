const { stdout } = require('process');
const path = require('path');
const { mkdir } = require('fs/promises');

const oldDir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy');

copyDir();

async function copyDir() {
  try {
    await mkdir(newDir, { recursive: true });
  } catch (err) {
    console.error(err.message);
  }
}