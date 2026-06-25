const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load language files
const en = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', 'en.json'), 'utf-8'));
const vi = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', 'vi.json'), 'utf-8'));
const zh = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang', 'zh.json'), 'utf-8'));

console.log('=== Translation System Analysis ===\n');
console.log(`EN (English): ${Object.keys(en).length} keys`);
console.log(`VI (Vietnamese): ${Object.keys(vi).length} keys`);
console.log(`ZH (Chinese): ${Object.keys(zh).length} keys`);

// Find missing keys
const enKeys = new Set(Object.keys(en));
const viKeys = new Set(Object.keys(vi));
const zhKeys = new Set(Object.keys(zh));

const missingInVI = [...enKeys].filter(k => !viKeys.has(k));
const missingInZH = [...enKeys].filter(k => !zhKeys.has(k));
const extraInVI = [...viKeys].filter(k => !enKeys.has(k));
const extraInZH = [...zhKeys].filter(k => !enKeys.has(k));

console.log('\n=== Missing Keys Analysis ===');
console.log(`Missing in VI: ${missingInVI.length} keys`);
console.log(`Missing in ZH: ${missingInZH.length} keys`);
console.log(`Extra in VI (not in EN): ${extraInVI.length} keys`);
console.log(`Extra in ZH (not in EN): ${extraInZH.length} keys`);

// Show first 20 missing keys for each language
if (missingInVI.length > 0) {
  console.log('\nFirst 20 missing keys in VI:');
  missingInVI.slice(0, 20).forEach(k => console.log(`  - ${k}`));
}

if (missingInZH.length > 0) {
  console.log('\nFirst 20 missing keys in ZH:');
  missingInZH.slice(0, 20).forEach(k => console.log(`  - ${k}`));
}

// Calculate completeness percentage
const viCompleteness = ((viKeys.size / enKeys.size) * 100).toFixed(2);
const zhCompleteness = ((zhKeys.size / enKeys.size) * 100).toFixed(2);

console.log('\n=== Completeness ===');
console.log(`VI: ${viCompleteness}% (${viKeys.size}/${enKeys.size})`);
console.log(`ZH: ${zhCompleteness}% (${zhKeys.size}/${enKeys.size})`);

// Find empty or placeholder translations
console.log('\n=== Checking for Empty/Placeholder Translations ===');

const emptyVI = Object.entries(vi).filter(([k, v]) => !v || v.trim() === '');
const emptyZH = Object.entries(zh).filter(([k, v]) => !v || v.trim() === '');

console.log(`Empty translations in VI: ${emptyVI.length}`);
console.log(`Empty translations in ZH: ${emptyZH.length}`);

if (emptyVI.length > 0 && emptyVI.length <= 10) {
  console.log('\nEmpty VI translations:');
  emptyVI.forEach(([k, v]) => console.log(`  - ${k}: "${v}"`));
}

if (emptyZH.length > 0 && emptyZH.length <= 10) {
  console.log('\nEmpty ZH translations:');
  emptyZH.forEach(([k, v]) => console.log(`  - ${k}: "${v}"`));
}

// Check for keys that might be identical to English (untranslated)
console.log('\n=== Potentially Untranslated Keys ===');
const untranslatedVI = Object.entries(vi).filter(([k, v]) => en[k] && v === en[k]);
const untranslatedZH = Object.entries(zh).filter(([k, v]) => en[k] && v === en[k]);

console.log(`Potentially untranslated in VI: ${untranslatedVI.length}`);
console.log(`Potentially untranslated in ZH: ${untranslatedZH.length}`);

if (untranslatedVI.length > 0 && untranslatedVI.length <= 10) {
  console.log('\nFirst 10 untranslated VI keys:');
  untranslatedVI.slice(0, 10).forEach(([k, v]) => console.log(`  - ${k}: "${v}"`));
}

if (untranslatedZH.length > 0 && untranslatedZH.length <= 10) {
  console.log('\nFirst 10 untranslated ZH keys:');
  untranslatedZH.slice(0, 10).forEach(([k, v]) => console.log(`  - ${k}: "${v}"`));
}

console.log('\n=== Summary ===');
if (missingInVI.length === 0 && missingInZH.length === 0 && emptyVI.length === 0 && emptyZH.length === 0) {
  console.log('✅ Translation system is COMPLETE!');
} else {
  console.log('⚠️  Translation system has gaps:');
  if (missingInVI.length > 0) console.log(`   - ${missingInVI.length} keys missing in Vietnamese`);
  if (missingInZH.length > 0) console.log(`   - ${missingInZH.length} keys missing in Chinese`);
  if (emptyVI.length > 0) console.log(`   - ${emptyVI.length} empty translations in Vietnamese`);
  if (emptyZH.length > 0) console.log(`   - ${emptyZH.length} empty translations in Chinese`);
}
