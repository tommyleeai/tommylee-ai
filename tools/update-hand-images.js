/**
 * update-hand-images.js
 * 自動更新 options-data.js 中的前 30 個 HAND_ITEMS，加入 image 屬性
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'options-data.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 前 30 個手持物件的 en label → 檔名映射
const imageMap = {
    'Longsword': 'hand_longsword',
    'Katana': 'hand_katana',
    'Magic Wand': 'hand_wand',
    'Handgun': 'hand_handgun',
    'Dagger': 'hand_dagger',
    'Energy Blade': 'hand_energy_blade',
    'Energy Ball': 'hand_energy_ball',
    'Fire': 'hand_fire',
    'Lightning': 'hand_lightning',
    'Ice Crystal': 'hand_ice',
    'Floating Magic Circle': 'hand_magic_circle',
    'Book': 'hand_book',
    'Camera': 'hand_camera',
    'Lantern': 'hand_lantern',
    'Guitar': 'hand_guitar',
    'Potion Bottle': 'hand_potion',
    'Smartphone': 'hand_smartphone',
    'Smartwatch': 'hand_smartwatch',
    'Mechanical Arm': 'hand_mech_arm',
    'Fingerless Gloves': 'hand_fingerless_gloves',
    'Long Gloves': 'hand_long_gloves',
    'Gauntlets': 'hand_gauntlets',
    'Metal Bracelet': 'hand_bracelet',
    'Diamond Ring': 'hand_diamond_ring',
    'Hand Shield': 'hand_shield',
    'Staff': 'hand_staff',
    'Fate Thread': 'hand_fate_thread',
    'Handcuffs': 'hand_handcuffs',
    'Key': 'hand_key',
    'Pocket Watch': 'hand_pocket_watch',
};

let count = 0;
for (const [enLabel, filename] of Object.entries(imageMap)) {
    const imgPath = `assets/previews/${filename}.png`;

    // 找到匹配的行（en label 在 HAND_ITEMS 基礎頁面區域）
    // 只替換沒有 image 屬性的行
    const pattern = new RegExp(
        `(\\{ label: '[^']+', en: '${enLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}', value: '[^']+')( \\})`,
        'g'
    );

    const newContent = content.replace(pattern, (match, prefix, suffix) => {
        // 只在基礎頁面區域替換（第一次出現）
        if (match.includes('image:')) return match; // 已有 image，跳過
        count++;
        return `${prefix}, image: '${imgPath}'${suffix}`;
    });

    if (newContent !== content) {
        content = newContent;
    }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`✅ 已更新 ${count} 個 HAND_ITEMS 的 image 屬性`);
