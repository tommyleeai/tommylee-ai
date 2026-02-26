/**
 * reorder-hand-items.js
 * 重新排列 HAND_ITEMS，讓第一頁 30 個展示各類別最常見的項目
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'options-data.js');
let content = fs.readFileSync(filePath, 'utf-8');

// 找到 HAND_ITEMS 陣列
const startMarker = '    const HAND_ITEMS = [';
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) { console.error('找不到 HAND_ITEMS'); process.exit(1); }

// 找到匹配的結束 ];
let depth = 0;
let endIdx = -1;
for (let i = startIdx; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') {
        depth--;
        if (depth === 0) {
            endIdx = i + 1; // 包含 ]
            // 檢查後面是否有 ;
            if (content[endIdx] === ';') endIdx++;
            break;
        }
    }
}

if (endIdx === -1) { console.error('找不到 HAND_ITEMS 結尾'); process.exit(1); }

const originalBlock = content.substring(startIdx, endIdx);

// 提取所有項目（用 { ... } 匹配每一行）
const itemRegex = /\{ label: '[^']*', en: '[^']*', value: '[^']*'(?:, image: '[^']*')? \}/g;
const allItems = [];
let match;
while ((match = itemRegex.exec(originalBlock)) !== null) {
    allItems.push(match[0]);
}
console.log(`共找到 ${allItems.length} 個項目`);

// 提取所有分類註解
const commentRegex = /\/\/ ── [^─\n]+──/g;
const comments = [];
let cm;
while ((cm = commentRegex.exec(originalBlock)) !== null) {
    comments.push({ text: cm[0], index: cm.index });
}

// 找出每個分類的項目
function getItemsByLabel(labels) {
    return labels.map(label => {
        const found = allItems.find(item => {
            const m = item.match(/label: '([^']+)'/);
            return m && m[1] === label;
        });
        if (!found) console.warn(`⚠️ 找不到: ${label}`);
        return found;
    }).filter(Boolean);
}

// 基礎頁面 30 個 — 從各類別挑最常見的
const basePage = getItemsByLabel([
    // 武器（6）
    '長劍', '武士刀', '魔杖', '手槍', '匕首', '能量刃',
    // 魔法（5）
    '能量球', '火焰', '雷電', '冰霜結晶', '浮空魔法陣',
    // 工具（5）
    '書本', '相機', '提燈', '吉他', '藥水瓶',
    // 科技（3）
    '手機', '智慧手錶', '機械義手',
    // 手套（3）
    '半指手套', '長手套', '護手鎧',
    // 手環（2）
    '金屬手環', '鑽石戒指',
    // 盾牌/武器（2）
    '手持盾牌', '法杖',
    // 概念（2）
    '命運線纏繞', '手銬',
    // 其他（2）
    '鑰匙', '懷錶',
]);

console.log(`基礎頁面: ${basePage.length} 個`);

// 剩餘項目按原始順序
const baseSet = new Set(basePage);
const remaining = allItems.filter(item => !baseSet.has(item));
console.log(`剩餘: ${remaining.length} 個`);

// 重建 HAND_ITEMS 區塊
let newBlock = '    const HAND_ITEMS = [\n';
newBlock += '        // ── 基礎頁面：各類別精選 30 件 ──\n';
basePage.forEach(item => {
    newBlock += `        ${item},\n`;
});

// 找到剩餘項目的分類
// 用原始文檔中的分類註解和項目位置來分組
const categoryItems = {};
const categories = [
    { id: 'ring', label: '① 戒指 ring', items: [] },
    { id: 'bracelet', label: '② 手環手鍊 bracelet', items: [] },
    { id: 'glove', label: '③ 手套 glove', items: [] },
    { id: 'weapon', label: '④ 武器持握 weapon', items: [] },
    { id: 'tool', label: '⑤ 工具職業 tool', items: [] },
    { id: 'tech', label: '⑥ 科技裝置 tech', items: [] },
    { id: 'magic', label: '⑦ 魔法媒介 magic', items: [] },
    { id: 'guard', label: '⑧ 束縛防護 guard', items: [] },
    { id: 'concept', label: '⑨ 概念象徵 concept', items: [] },
];

// 用 en label 來分類剩餘項目
const ringEnLabels = ['Simple Ring', 'Gold Ring', 'Silver Ring', 'Gemstone Ring', 'Signet Ring', 'Wedding Ring', 'Engagement Ring', 'Magic Ring', 'Energy Ring', 'Skull Ring', 'Multi-finger Ring', 'Knuckle Ring', 'Claw Ring', 'Poison Ring', 'Mood Ring', 'Rose Gold Ring', 'Spinner Ring', 'Crown Ring', 'Snake Ring', 'Rune Ring', 'Ring Armor'];
const braceletEnLabels = ['Leather Bracelet', 'Gem Bangle', 'Chain Bracelet', 'Energy Bracelet', 'Monitor Bracelet', 'Seal Bangle', 'Charm Bracelet', 'Beaded Bracelet', 'Cuff Bracelet', 'Friendship Bracelet', 'Gold Bangle', 'Silver Bangle', 'Hemp Bracelet', 'Rubber Band', 'Bone Bracelet', 'Crystal Bracelet', 'ID Bracelet', 'Armlet', 'Prayer Beads', 'Tech Band', 'Vine Bracelet'];
const gloveEnLabels = ['Full Gloves', 'Tactical Gloves', 'Magic Gloves', 'Power Gloves', 'Boxing Gloves', 'Leather Gloves', 'Lace Gloves', 'Latex Gloves', 'Fur Gloves', 'Silk Gloves', 'Claw Gauntlets', 'Fire Gloves', 'Ice Gloves', 'Bandaged Hands', 'Work Gloves', 'Archery Glove', 'Neon Gloves', 'Shadow Gloves'];
const weaponEnLabels = ['Rapier', 'Short Sword', 'Scimitar', 'Revolver', 'Whip', 'Hand Axe', 'Kunai', 'Shuriken', 'Sai', 'Flail', 'Hand Crossbow', 'Talisman', 'Chain Blade', 'Dual Blades', 'War Fan', 'Arm Cannon', 'Plasma Pistol', 'Chakram', 'Scepter'];
const toolEnLabels = ['Magic Book', 'Notebook', 'Briefcase', 'Medical Kit', 'Forge Hammer', 'Measuring Tool', 'Pen', 'Paintbrush', 'Scissors', 'Wrench', 'Magnifying Glass', 'Telescope', 'Cooking Utensil', 'Scroll', 'Compass', 'Violin', 'Flute', 'Map'];
const techEnLabels = ['Hologram Device', 'Handheld Terminal', 'Data Pad', 'Energy Controller', 'Neural Link Band', 'Drone Controller', 'Wrist Computer', 'Scanner', 'Holo Map', 'Laser Pointer', 'Comm Device', 'Nano Tool', 'Gravity Device', 'Force Field Generator', 'Bio Scanner', 'Hacking Tool', 'Energy Pack', 'Mech Gauntlet', 'Holo Blade', 'Teleporter'];
const magicEnLabels = ['Soul Fire', 'Dark Vortex', 'Healing Light', 'Wind Spiral', 'Water Sphere', 'Earth Stone', 'Light Beam', 'Shadow Tendril', 'Star Dust', 'Blood Magic', 'Time Magic', 'Gravity Magic', 'Nature Magic', 'Crystal Magic', 'Rune Cast', 'Soul Orb', 'Chaos Energy', 'Void Rift', 'Phoenix Flame', 'Moonlight Magic'];
const guardEnLabels = ['Hand Armor', 'Wrist Guard', 'Seal Shackle', 'Energy Bind Ring', 'Hand Plate', 'Spiked Bracer', 'Chain Wrap', 'Ethereal Chains', 'Divine Seal', 'Leather Bracer', 'Riot Shield', 'Buckler', 'Cursed Chain', 'Barrier Glove', 'Binding Rope', 'Arm Brace', 'Power Limiter', 'Tattoo Seal', 'Exo Frame'];
const conceptEnLabels = ['Blood Pact Mark', 'Glowing Crest', 'Royal Seal Ring', 'Time Mark', 'Digital Pixel Fragment', 'Contract Mark', 'Cursed Brand', 'Star Map Mark', 'Elemental Mark', 'Dream Weave', 'Soul Brand', 'Quantum Mark', 'Void Mark'];

function getEnLabel(item) {
    const m = item.match(/en: '([^']+)'/);
    return m ? m[1] : '';
}

function categorizeRemaining(items) {
    const result = { ring: [], bracelet: [], glove: [], weapon: [], tool: [], tech: [], magic: [], guard: [], concept: [] };
    items.forEach(item => {
        const en = getEnLabel(item);
        if (ringEnLabels.includes(en)) result.ring.push(item);
        else if (braceletEnLabels.includes(en)) result.bracelet.push(item);
        else if (gloveEnLabels.includes(en)) result.glove.push(item);
        else if (weaponEnLabels.includes(en)) result.weapon.push(item);
        else if (toolEnLabels.includes(en)) result.tool.push(item);
        else if (techEnLabels.includes(en)) result.tech.push(item);
        else if (magicEnLabels.includes(en)) result.magic.push(item);
        else if (guardEnLabels.includes(en)) result.guard.push(item);
        else if (conceptEnLabels.includes(en)) result.concept.push(item);
        else {
            console.warn(`⚠️ 未分類: ${en}`);
            result.concept.push(item); // fallback
        }
    });
    return result;
}

const categorized = categorizeRemaining(remaining);

const catOrder = [
    { key: 'ring', label: '① 戒指 ring' },
    { key: 'bracelet', label: '② 手環手鍊 bracelet' },
    { key: 'glove', label: '③ 手套 glove' },
    { key: 'weapon', label: '④ 武器持握 weapon（餘）' },
    { key: 'tool', label: '⑤ 工具職業 tool（餘）' },
    { key: 'tech', label: '⑥ 科技裝置 tech（餘）' },
    { key: 'magic', label: '⑦ 魔法媒介 magic（餘）' },
    { key: 'guard', label: '⑧ 束縛防護 guard' },
    { key: 'concept', label: '⑨ 概念象徵 concept' },
];

catOrder.forEach(cat => {
    const items = categorized[cat.key];
    if (items.length === 0) return;
    newBlock += `        // ── ${cat.label}（${items.length} 件）──\n`;
    items.forEach(item => {
        newBlock += `        ${item},\n`;
    });
});

newBlock += '    ];';

// 替換
const newContent = content.substring(0, startIdx) + newBlock + content.substring(endIdx);
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log('\n✅ HAND_ITEMS 重排完成！');
console.log(`基礎頁面 ${basePage.length} 件 + 剩餘分類 ${remaining.length} 件 = 總計 ${basePage.length + remaining.length} 件`);
