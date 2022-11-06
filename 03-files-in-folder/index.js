const { stdout } = process;
const fs = require('fs/promises');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

stdout.write(pathToFolder);
