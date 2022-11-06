const path = require('path');
const { rm, mkdir, readFile, writeFile, readdir, copyFile} = require('fs/promises');
const { createWriteStream } = require('fs');

const distDir = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');
const oldDir = path.join(__dirname, 'assets');
const newDir = path.join(distDir, 'assets');

createPage()

function createPage() {
  createDist();
  bundleHTML();
  bundleStyles();
  copyDir(oldDir, newDir);
}

async function createDist() {
  try {
    await rm(distDir, { force: true, recursive: true });
    await mkdir(distDir, { recursive: true });
  } catch (err) {
    console.error(err.message);
  }
}

async function bundleHTML() {
  const templatePath = path.join(__dirname, 'template.html');
  const componentsPath = path.join(__dirname, 'components');
  let templateSource = await readFile(templatePath, 'utf-8');
  const templateComponents = templateSource.match(/{{(.*)}}/gi);

  for (const component of templateComponents) {
    const componentFile = component.replace('{{', '').replace('}}', '') + '.html';
    const componentPath = path.join(componentsPath, componentFile);
    const componentFileSource = await readFile(componentPath, 'utf-8');
  
    templateSource = templateSource.replace(component, componentFileSource);
  }
  await writeFile(path.join(distDir, 'index.html'), templateSource);
}

async function bundleStyles() {
  try {
    const bundlePath = path.join(distDir, 'style.css')
    const files = await readdir(stylesDir, {withFileTypes: true});
    const filteredFiles = files.filter( (file) => file.isFile() && path.extname(file.name) === '.css');
    const stream = createWriteStream(bundlePath, 'utf-8');
    for (const file of filteredFiles) {
      const fileText = await readFile(path.join(stylesDir, file.name), 'utf-8');
      stream.write(`${fileText}\n`);
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function copyDir(oldDir, newDir) {
  try {
    await mkdir(newDir, { recursive: true });
    const files = await readdir(oldDir, {withFileTypes: true});
    for (const file of files) {
      if (file.isDirectory()) {
        copyDir(path.join(oldDir, file.name), path.join(newDir, file.name));
      } else {
        copyFile(path.join(oldDir, file.name), path.join(newDir, file.name))
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}