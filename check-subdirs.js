const fs = require('fs');
const path = require('path');

console.log('=== Translation Usage in Pages Subdirectories ===\n');

const dirs = ['affiliate', 'apps', 'blogs', 'careers', 'games', 'ivs-celestech', 'legal', 'website'];

dirs.forEach(d => {
  const dirPath = path.join(__dirname, 'Pages', d);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    let total = 0;
    files.forEach(f => {
      const content = fs.readFileSync(path.join(dirPath, f), 'utf-8');
      const matches = content.match(/data-lang-key="([^"]+)"/g);
      if (matches) total += matches.length;
    });
    console.log(`Pages/${d}/: ${files.length} HTML files, ${total} translation keys`);
  }
});
