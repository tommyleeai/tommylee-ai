const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '..', 'data', 'options-data.js'), 'utf8');
const match = code.match(/const OUTFITS = \[([\s\S]*?)\];/);
if (!match) { console.log('OUTFITS not found'); process.exit(1); }

const items = match[1].match(/\{[^}]+\}/g);
const missing = [];
const has = [];

items.forEach((item, i) => {
    const label = (item.match(/label:\s*'([^']+)'/) || [])[1] || '?';
    const en = (item.match(/en:\s*'([^']+)'/) || [])[1] || '?';
    const img = (item.match(/image:\s*'([^']+)'/) || [])[1] || null;

    if (img) {
        has.push({ label, en, img });
    } else {
        missing.push({ label, en });
    }
});

console.log(`Total OUTFITS: ${items.length}`);
console.log(`Has preview: ${has.length}`);
console.log(`Missing preview: ${missing.length}`);
console.log('\n=== MISSING ===');
missing.forEach((m, i) => console.log(`${i + 1}. ${m.label} (${m.en})`));
