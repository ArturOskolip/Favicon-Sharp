// server.mjs
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

let favicon = null;
try {
  favicon = readFileSync('./img/favicon-32x32.png');
} catch (err) {
  console.error('Favicon not found, continuing without it:', err.message);
}
const server = createServer((req, res) => {
  console.log(req.url)
  if(req.url === '/favicon.ico') {
    //open file and return it 
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(favicon);
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

if (favicon) {
  sharp('./img/favicon-32x32.png')
    .resize(300, 300, {
      fit: 'cover', //Зображення стане 300х300, зайве буде обрізано
      position: 'center', // Вирівняє по центру при обрізці
    })
    .toFile('output.png')
    .then(() => console.log('Зображення успішно оброблено!'))
    .catch(err => console.error('Помилка Sharp:', err));
} else {
  console.log('Пропускаю обробку зображення — файл не знайдено.');
}

// run with `node server.mjs`







  
  
