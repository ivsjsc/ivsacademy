const fs = require('fs');
const path = require('path');

// Load language files
const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', 'en.json'), 'utf-8'));
const vi = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', 'vi.json'), 'utf-8'));
const zh = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', 'zh.json'), 'utf-8'));

// Generate detailed report
let report = '# Translation Completeness Report\n\n';
report += `Generated: ${new Date().toISOString()}\n\n`;

report += '## Summary\n\n';
report += `- **English (EN)**: ${Object.keys(en).length} keys (baseline)\n`;
report += `- **Vietnamese (VI)**: ${Object.keys(vi).length} keys (${((Object.keys(vi).length / Object.keys(en).length) * 100).toFixed(2)}%)\n`;
report += `- **Chinese (ZH)**: ${Object.keys(zh).length} keys (${((Object.keys(zh).length / Object.keys(en).length) * 100).toFixed(2)}%)\n\n`;

// Missing in VI
const missingInVI = Object.keys(en).filter(k => !vi.hasOwnProperty(k));
report += `## Missing Vietnamese Translations (${missingInVI.length} keys)\n\n`;
report += '| Key | English Value |\n';
report += '|-----|---------------|\n';
missingInVI.forEach(k => {
  const enValue = en[k].substring(0, 100) + (en[k].length > 100 ? '...' : '');
  report += `| ${k} | ${enValue.replace(/\|/g, '\\|')} |\n`;
});

report += '\n\n';

// Empty in VI
const emptyVI = Object.entries(vi).filter(([k, v]) => !v || v.trim() === '');
if (emptyVI.length > 0) {
  report += `## Empty Vietnamese Translations (${emptyVI.length} keys)\n\n`;
  report += '| Key | English Value |\n';
  report += '|-----|---------------|\n';
  emptyVI.forEach(([k, v]) => {
    if (en[k]) {
      const enValue = en[k].substring(0, 100) + (en[k].length > 100 ? '...' : '');
      report += `| ${k} | ${enValue.replace(/\|/g, '\\|')} |\n`;
    }
  });
  report += '\n\n';
}

// Extra keys (in VI/ZH but not in EN)
const extraInVI = Object.keys(vi).filter(k => !en.hasOwnProperty(k));
const extraInZH = Object.keys(zh).filter(k => !en.hasOwnProperty(k));

if (extraInVI.length > 0) {
  report += `## Extra Keys in Vietnamese (not in English) (${extraInVI.length} keys)\n\n`;
  extraInVI.forEach(k => {
    report += `- ${k}\n`;
  });
  report += '\n\n';
}

if (extraInZH.length > 0) {
  report += `## Extra Keys in Chinese (not in English) (${extraInZH.length} keys)\n\n`;
  extraInZH.forEach(k => {
    report += `- ${k}\n`;
  });
  report += '\n\n';
}

// Missing in ZH
const missingInZH = Object.keys(en).filter(k => !zh.hasOwnProperty(k));
if (missingInZH.length > 0) {
  report += `## Missing Chinese Translations (${missingInZH.length} keys)\n\n`;
  report += '| Key | English Value |\n';
  report += '|-----|---------------|\n';
  missingInZH.forEach(k => {
    const enValue = en[k].substring(0, 100) + (en[k].length > 100 ? '...' : '');
    report += `| ${k} | ${enValue.replace(/\|/g, '\\|')} |\n`;
  });
  report += '\n\n';
}

// Save report
fs.writeFileSync(path.join(__dirname, 'translation-report.md'), report, 'utf-8');
console.log('✅ Report saved to translation-report.md');
console.log(`\nTotal missing in VI: ${missingInVI.length}`);
console.log(`Total missing in ZH: ${missingInZH.length}`);
console.log(`Total empty in VI: ${emptyVI.length}`);

// Also save missing keys to JSON for automated fixing
const missingData = {
  missingInVI: missingInVI.reduce((obj, k) => { obj[k] = en[k]; return obj; }, {}),
  emptyVI: emptyVI.map(([k]) => k).reduce((obj, k) => { obj[k] = en[k] || ''; return obj; }, {}),
  missingInZH: missingInZH.reduce((obj, k) => { obj[k] = en[k]; return obj; }, {}),
};

fs.writeFileSync(
  path.join(__dirname, 'missing-translations.json'),
  JSON.stringify(missingData, null, 2),
  'utf-8'
);
console.log('✅ Missing translations data saved to missing-translations.json');
