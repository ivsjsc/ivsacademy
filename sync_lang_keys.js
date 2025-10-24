
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

    allKeys.forEach(key => {
        if (!enKeys.has(key)) {
            en[key] = `Translate ${key}`;
        }
        if (!viKeys.has(key)) {
            vi[key] = `Translate ${key}`;
        }
        if (!zhKeys.has(key)) {
            zh[key] = `Translate ${key}`;
        }
    });

    fs.writeFileSync(enFilePath, JSON.stringify(en, null, 2));
    fs.writeFileSync(viFilePath, JSON.stringify(vi, null, 2));
    fs.writeFileSync(zhFilePath, JSON.stringify(zh, null, 2));

    console.log('Language files synchronized successfully.');

} catch (error) {
    console.error('An error occurred:', error.message);
}
