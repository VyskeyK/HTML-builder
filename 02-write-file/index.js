const { stdin, stdout } = process;
const fs = require('fs');

const output = fs.createWriteStream('text.txt');

stdout.write('Привет!\nНиже введи свое сообщение, и оно будет записано в файл text.txt\nЧтобы закончить, введи exit или Ctrl+C\n');

stdin.on('data', function(chunk) {
  output.write(chunk);
})