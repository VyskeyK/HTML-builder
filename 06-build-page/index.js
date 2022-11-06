const path = require('path');
const { mkdir, readFile, writeFile, readdir} = require('fs/promises');
const { createWriteStream } = require('fs');

const distDir = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');

createDist();
bundleHTML();
bundleStyles();

async function createDist() {
  try {
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