import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetDirs = [
  path.join(rootDir, 'public', 'assets', 'images'),
  path.join(rootDir, 'src', 'assets', 'images')
];

function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function run() {
  console.log('--- Starting Image Compression ---');
  let totalBefore = 0;
  let totalWebp = 0;
  let totalCompressedOriginal = 0;

  for (const dir of targetDirs) {
    const files = getFiles(dir);
    console.log(`\nProcessing directory: ${dir} (${files.length} images)`);

    for (const filePath of files) {
      const ext = path.extname(filePath).toLowerCase();
      const origSize = fs.statSync(filePath).size;
      totalBefore += origSize;

      const meta = await sharp(filePath).metadata();
      let targetWidth = 1200;
      if (filePath.includes('logo')) {
        targetWidth = 400;
      } else if (filePath.includes('testimonials') || filePath.includes('founder') || filePath.includes('slide')) {
        targetWidth = 800;
      }

      const width = Math.min(meta.width || targetWidth, targetWidth);

      // 1. Create high-efficiency WebP
      const webpPath = filePath.substring(0, filePath.lastIndexOf('.')) + '.webp';
      const webpTmp = webpPath + '.tmp';
      await sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(webpTmp);
      if (fs.existsSync(webpPath)) fs.unlinkSync(webpPath);
      fs.renameSync(webpTmp, webpPath);
      const webpSize = fs.statSync(webpPath).size;
      totalWebp += webpSize;

      // 2. Compress the original format in-place as backward-compatible fallback
      const tmpOriginal = filePath + '.tmp';
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(filePath)
          .resize({ width, withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true, progressive: true })
          .toFile(tmpOriginal);
      } else if (ext === '.png') {
        await sharp(filePath)
          .resize({ width, withoutEnlargement: true })
          .png({ quality: 80, palette: true, compressionLevel: 9 })
          .toFile(tmpOriginal);
      }

      fs.unlinkSync(filePath);
      fs.renameSync(tmpOriginal, filePath);
      const newOrigSize = fs.statSync(filePath).size;
      totalCompressedOriginal += newOrigSize;

      const rel = path.relative(rootDir, filePath);
      console.log(
        `✓ ${rel}: ${(origSize / 1024).toFixed(0)}KB -> WebP: ${(webpSize / 1024).toFixed(0)}KB, Fallback: ${(newOrigSize / 1024).toFixed(0)}KB`
      );
    }
  }

  console.log('\n=======================================');
  console.log(`Original total size: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total size:     ${(totalWebp / 1024 / 1024).toFixed(2)} MB (${((1 - totalWebp / totalBefore) * 100).toFixed(1)}% reduction!)`);
  console.log(`Optimized fallbacks: ${(totalCompressedOriginal / 1024 / 1024).toFixed(2)} MB (${((1 - totalCompressedOriginal / totalBefore) * 100).toFixed(1)}% reduction)`);
  console.log('=======================================');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
