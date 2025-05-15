// This script resizes your profile photo to create PWA icons
// Run it with: npm run create-icons

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createIcons() {
  const sourceFile = path.join(__dirname, 'public', 'images', 'ahmadullah.png');
  const outputDir = path.join(__dirname, 'public', 'images');
  
  // Make sure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create icons in various sizes
  const sizes = [
    { width: 192, height: 192, name: 'icon-192x192.png' },
    { width: 512, height: 512, name: 'icon-512x512.png' },
    { width: 180, height: 180, name: 'apple-touch-icon.png' },
    { width: 32, height: 32, name: 'favicon-32x32.png' },
    { width: 16, height: 16, name: 'favicon-16x16.png' }
  ];

  for (const size of sizes) {
    await sharp(sourceFile)
      .resize(size.width, size.height)
      .toFile(path.join(outputDir, size.name));
    
    console.log(`Created ${size.name} (${size.width}x${size.height})`);
  }
  
  console.log('Icon generation completed successfully!');
}

createIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
