const { stdout } = require('process');
const path = require('path');
const { readdir } = require('fs/promises');

const stylesDir = path.join(__dirname, 'styles');
const bundleDir = path.join(__dirname, 'project-dist');

bundleStyles();

async function bundleStyles() {
  try {
    const files = await readdir(stylesDir, {withFileTypes: true});
    const filteredFiles = files.filter( (file) => file.isFile());
    for (const file of filteredFiles) {
      console.log(file.name)
    }

  } catch (err) {
    console.error(err.message);
  }
}