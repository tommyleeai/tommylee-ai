/**
 * update-headwear-extra.js
 * 補上最後 5 個頭飾 + 呆毛已重新生成不需重新映射
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'options-data.js');
let content = fs.readFileSync(filePath, 'utf-8');

const imageMap = {
    'Shawl': 'hw_shawl',
    'Hooded Cloak': 'hw_hooded_cloak',
    'Bandana': 'hw_bandana',
    'Mask': 'hw_mask',
    'Half Mask': 'hw_half_mask',
};

let count = 0;
for (const [enLabel, filename] of Object.entries(imageMap)) {
    const imgPath = `assets/previews/${filename}.png`;
    const escaped = enLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(
        `(\\{ label: '[^']+', en: '${escaped}', value: '[^']+')( \\})`,
        'g'
    );

    let replaced = false;
    const newContent = content.replace(pattern, (match, prefix, suffix) => {
        if (match.includes('image:')) return match;
        if (replaced) return match;
        replaced = true;
        count++;
        return `${prefix}, image: '${imgPath}'${suffix}`;
    });

    if (newContent !== content) content = newContent;
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`✅ 已更新 ${count} 個 HEADWEAR 的 image 屬性`);
