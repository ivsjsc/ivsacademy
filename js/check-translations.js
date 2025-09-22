const fs = require('fs');
const path = require('path');

// Read the language files
const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../lang/en.json'), 'utf8'));
const vi = JSON.parse(fs.readFileSync(path.join(__dirname, '../lang/vi.json'), 'utf8'));

// Find missing keys in Vietnamese file
const missingKeys = Object.keys(en).filter(key => !vi[key]);

console.log('Missing keys in vi.json:', missingKeys.length);
console.log('------------------------');
missingKeys.forEach(key => {
    console.log(`"${key}": "${en[key]}",`);
});

// Create update file with missing translations
const updateObject = {};
missingKeys.forEach(key => {
    updateObject[key] = en[key]; // Copy English text as placeholder
});

// Write missing translations to a new file
fs.writeFileSync(
    path.join(__dirname, '../lang/missing-vi.json'),
    JSON.stringify(updateObject, null, 2)
);

console.log('\nMissing translations have been written to missing-vi.json');
console.log(`Total keys in en.json: ${Object.keys(en).length}`);
console.log(`Total keys in vi.json: ${Object.keys(vi).length}`);