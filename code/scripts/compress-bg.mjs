import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '../src/img/Background_image.jpg');
const outputAvif = path.join(__dirname, '../public/img/Background_image.avif');
const outputPlaceholder = path.join(__dirname, '../public/img/bg-placeholder.webp');

// 生成 AVIF
await sharp(input)
  .resize({ width: 1920, withoutEnlargement: true })
  .avif({ quality: 60 })
  .toFile(outputAvif);
console.log('AVIF 生成完成:', outputAvif);

// 生成极小占位图（20px 宽，低质量）
await sharp(input)
  .resize({ width: 20 })
  .webp({ quality: 20 })
  .toFile(outputPlaceholder);

const base64 = fs.readFileSync(outputPlaceholder).toString('base64');
console.log('\n--- 复制以下 base64 占位图字符串 ---');
console.log(`data:image/webp;base64,${base64}`);
console.log('--- 结束 ---\n');
