const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Привет!\nНиже введи свое сообщение, и оно будет записано в файл text.txt\nЧтобы закончить, введи exit или Ctrl+C\n');

stdin.on('data', function(chunk) {
  if (chunk.toString().trim() === 'exit') {
    stdout.write('Ввод завершен\nПока!')
    process.exit();
  }
  output.write(chunk);
})

process.on('SIGINT', function() {
  stdout.write('Ввод завершен\nПока!')
  process.exit();
});