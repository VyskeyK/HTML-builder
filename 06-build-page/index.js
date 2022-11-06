const path = require('path');
const { mkdir, readFile} = require('fs/promises');

const distDir = path.join(__dirname, 'project-dist');

createDist();
bundleHTML();

async function createDist() {
  try {
    await mkdir(distDir, { recursive: true });
  } catch (err) {
    console.error(err.message);
  }
}

async function bundleHTML() {
  const templatePath = path.join(__dirname, 'template.html');
  const templateSource = await readFile(templatePath, 'utf-8');
  const templateComponents = templateSource.match(/{{(.*)}}/gi);

  for (const component of templateComponents) {
    const componentFile = component.replace('{{', '').replace('}}', '') + '.html';
    console.log(componentFile);
  }
}