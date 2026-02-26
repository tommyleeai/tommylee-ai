/**
 * update-headwear-images.js
 * 自動更新 options-data.js 中 HEADWEAR 的前 25 個項目，加入 image 屬性
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'options-data.js');
let content = fs.readFileSync(filePath, 'utf-8');

const imageMap = {
    'Ahoge': 'hw_ahoge',
    'Hair Clip': 'hw_hair_clip',
    'Hair Bow': 'hw_hair_bow',
    'Scrunchie': 'hw_scrunchie',
    'Headband': 'hw_headband',
    'Hair Band': 'hw_hair_band',
    'Hair Ribbon': 'hw_hair_ribbon',
    'Mini Tiara': 'hw_mini_tiara',
    'Flower Hair Accessory': 'hw_flower_hair',
    'Pearl Hair Pin': 'hw_pearl_pin',
    'Earrings': 'hw_earrings',
    'Ear Cuff': 'hw_ear_cuff',
    'Nose Ring': 'hw_nose_ring',
    'Lip Ring': 'hw_lip_ring',
    'Eyebrow Piercing': 'hw_eyebrow_ring',
    'Baseball Cap': 'hw_baseball_cap',
    'Beret': 'hw_beret',
    'Witch Hat': 'hw_witch_hat',
    'Straw Hat': 'hw_straw_hat',
    'Military Cap': 'hw_military_cap',
    'Bucket Hat': 'hw_bucket_hat',
    'Top Hat': 'hw_top_hat',
    'Beanie': 'hw_beanie',
    'Scarf': 'hw_scarf',
    'Neckerchief': 'hw_neckerchief',
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
        if (replaced) return match; // 只替換第一次出現
        replaced = true;
        count++;
        return `${prefix}, image: '${imgPath}'${suffix}`;
    });

    if (newContent !== content) content = newContent;
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`✅ 已更新 ${count} 個 HEADWEAR 的 image 屬性`);
