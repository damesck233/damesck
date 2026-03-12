import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '../src/img/Background_image.jpg');
const output = path.join(__dirname, '../src/img/Background_image.webp');

sharp(input)
  .webp({ quality: 85 })
  .toFile(output)
  .then(info => console.log('压缩完成:', info))
  .catch(err => console.error('压缩失败:', err));
