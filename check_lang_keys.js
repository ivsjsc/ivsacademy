
const fs = require('fs');

const enFilePath = 'lang/en.json';
const viFilePath = 'lang/vi.json';
const zhFilePath = 'lang/zh.json';

try {
    const en = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));
    const vi = JSON.parse(fs.readFileSync(viFilePath, 'utf8'));
    const zh = JSON.parse(fs.readFileSync(zhFilePath, 'utf8'));

    const enKeys = new Set(Object.keys(en));
    const viKeys = new Set(Object.keys(vi));
    const zhKeys = new Set(Object.keys(zh));

    const allKeys = new Set([...enKeys, ...viKeys, ...zhKeys]);

    const missingInEn = [];
    for (const key of allKeys) {
        if (!enKeys.has(key)) {
            missingInEn.push(key);
        }
    }

    const missingInVi = [];
    for (const key of allKeys) {
        if (!viKeys.has(key)) {
            missingInVi.push(key);
        }
    }

    const missingInZh = [];
    for (const key of allKeys) {
        if (!zhKeys.has(key)) {
            missingInZh.push(key);
        }
    }

    if (missingInEn.length > 0) {
        console.log('Missing keys in en.json:', missingInEn);
    }
    if (missingInVi.length > 0) {
        console.log('Missing keys in vi.json:', missingInVi);
    }
    if (missingInZh.length > 0) {
        console.log('Missing keys in zh.json:', missingInZh);
    }

    if (missingInEn.length === 0 && missingInVi.length === 0 && missingInZh.length === 0) {
        console.log('All language files are synchronized.');
    }

} catch (error) {
    console.error('An error occurred:', error.message);
}
