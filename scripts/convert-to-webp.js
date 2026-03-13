// scripts/convert-to-webp.js
// Batch converts all portfolio JPEGs in /public/images/ to optimised WebP
// Run from repo root: node scripts/convert-to-webp.js

'use strict';

const sharp    = require('sharp');
const { readdir } = require('fs/promises');
const { extname, basename, join } = require('path');

const IMAGE_DIR = './public/images';
const QUALITY   = 82;
const EFFORT    = 5;
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']);

async function convertAll() {
  let files;
  try {
    files = await readdir(IMAGE_DIR);
  } catch (err) {
    console.error('Could not read: ' + IMAGE_DIR);
    process.exit(1);
  }

  const targets = files.filter((f) => SUPPORTED.has(extname(f)));
  if (targets.length === 0) {
    console.log('No images found. Nothing to convert.');
    return;
  }

  console.log('Found ' + targets.length + ' image(s). Converting...\n');

  const results = await Promise.allSettled(
    targets.map(async (file) => {
      const inputPath  = join(IMAGE_DIR, file);
      const outputName = basename(file, extname(file)) + '.webp';
      const outputPath = join(IMAGE_DIR, outputName);
      const info = await sharp(inputPath)
        .webp({ quality: QUALITY, effort: EFFORT })
        .toFile(outputPath);
      console.log('  OK  ' + file + ' -> ' + outputName + '  (' + (info.size / 1024).toFixed(1) + ' KB)');
      return outputName;
    })
  );

  const passed = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected');
  if (failed.length > 0) {
    failed.forEach((f) => console.error('FAIL', f.reason?.message));
  }
  console.log('\nDone. ' + passed + '/' + targets.length + ' converted.');
  console.log('Update image refs from .jpg to .webp, then push to GitHub.\n');
}

convertAll();
