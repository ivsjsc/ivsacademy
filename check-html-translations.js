const fs = require('fs');
const path = require('path');

console.log('=== Translation Usage in HTML Pages ===\n');

// Check main HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  'contact.html',
  'education.html',
  'solutions.html',
  'admin.html',
  'auth.html',
  'gallery.html',
  'consulting.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(/data-lang-key="([^"]+)"/g);
    const count = matches ? matches.length : 0;
    console.log(`${file}: ${count} translation keys`);
  } else {
    console.log(`${file}: FILE NOT FOUND`);
  }
});

// Check Pages directory
console.log('\n=== Pages Directory ===\n');
const pagesDir = path.join(__dirname, 'Pages');
if (fs.existsSync(pagesDir)) {
  const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
  pages.forEach(file => {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(/data-lang-key="([^"]+)"/g);
    const count = matches ? matches.length : 0;
    if (count > 0) {
      console.log(`Pages/${file}: ${count} translation keys`);
    }
  });
}
