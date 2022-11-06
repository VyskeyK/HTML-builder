const path = require('path');
const { mkdir} = require('fs/promises');

const distDir = path.join(__dirname, 'project-dist');

createDist();

async function createDist() {
  try {
    await mkdir(distDir, { recursive: true });
  } catch (err) {
    console.error(err.message);
  }
}