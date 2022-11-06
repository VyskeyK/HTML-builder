const { stdout } = require('process');
const path = require('path');
const { readdir, readFile } = require('fs/promises');
const { createWriteStream } = require('fs');

const stylesDir = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

bundleStyles();

async function bundleStyles() {
  try {
    const files = await readdir(stylesDir, {withFileTypes: true});
    const filteredFiles = files.filter( (file) => file.isFile() && path.extname(file.name) === '.css');
    const stream = createWriteStream(bundlePath, 'utf-8');
    for (const file of filteredFiles) {
      const fileText = await readFile(path.join(stylesDir, file.name), 'utf-8');
      stream.write(`${fileText}\n`);
    }
    stdout.write('The bundle was created successfully');
  } catch (err) {
    console.error(err.message);
  }
}