import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const IMAGE_DIRS = [
  path.join(ROOT, 'src', 'assets', 'images'),
  path.join(ROOT, 'public', 'assets', 'images'),
];

const THUMB_MAX = 520;
const THUMB_QUALITY = 72;

function writeFileSafe(file, buffer) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buffer);
}

async function createThumbs(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Skip missing: ${dir}`);
    return 0;
  }

  const thumbDir = path.join(dir, 'thumbs');
  fs.mkdirSync(thumbDir, { recursive: true });

  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.webp'));
  let count = 0;

  for (const file of files) {
    const input = path.join(dir, file);
    const thumbOut = path.join(thumbDir, file);
    const thumbBuffer = await sharp(input)
      .rotate()
      .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY, effort: 4 })
      .toBuffer();

    writeFileSafe(thumbOut, thumbBuffer);
    count++;
  }

  return count;
}

async function main() {
  let total = 0;
  for (const dir of IMAGE_DIRS) {
    const count = await createThumbs(dir);
    total += count;
    console.log(`${dir}: ${count} thumbnails`);
  }
  console.log(`Done. ${total} thumbnails ready.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
