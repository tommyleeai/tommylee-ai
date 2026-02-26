/**
 * generate-headwear-previews.js
 * 批量生成頭飾預覽圖（基礎頁面前 30 個）
 * 兩種基底圖：帽子用 headwear_base_hat.png，小飾品用 headwear_base_face.png
 */
const fs = require('fs');
const path = require('path');

function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) { console.error('❌ 找不到 .env'); process.exit(1); }
    fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
        const [key, ...vals] = line.split('=');
        if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
    });
}

const FACE_BASE = 'face'; // 小飾品：臉部大特寫
const HAT_BASE = 'hat';   // 帽子：頭頂留空

const REAL_PROMPT = 'Keep the same woman, same face, photorealistic portrait, white background.';

const HEADWEAR_ITEMS = [
    // ── 01 髮飾（10 件）→ face base
    { filename: 'hw_ahoge', base: FACE_BASE, prompt: `Add a single strand of ahoge antenna hair sticking up from the top of this woman's head. ${REAL_PROMPT}` },
    { filename: 'hw_hair_clip', base: FACE_BASE, prompt: `Add a cute metallic hair clip on the side of this woman's hair, small decorative hair pin. ${REAL_PROMPT}` },
    { filename: 'hw_hair_bow', base: FACE_BASE, prompt: `Add a large ribbon bow hair accessory on top of this woman's head, cute fabric bow. ${REAL_PROMPT}` },
    { filename: 'hw_scrunchie', base: FACE_BASE, prompt: `Add a colorful scrunchie hair tie in this woman's hair, fabric hair elastic. ${REAL_PROMPT}` },
    { filename: 'hw_headband', base: FACE_BASE, prompt: `Add a simple elegant headband on this woman's head, thin band pushing hair back. ${REAL_PROMPT}` },
    { filename: 'hw_hair_band', base: FACE_BASE, prompt: `Add a wide fabric hair band on this woman's head, bohemian style head wrap. ${REAL_PROMPT}` },
    { filename: 'hw_hair_ribbon', base: FACE_BASE, prompt: `Add a silk ribbon tied in this woman's hair, elegant flowing hair ribbon. ${REAL_PROMPT}` },
    { filename: 'hw_mini_tiara', base: FACE_BASE, prompt: `Add a small sparkling tiara crown on top of this woman's head, delicate mini princess crown. ${REAL_PROMPT}` },
    { filename: 'hw_flower_hair', base: FACE_BASE, prompt: `Add a fresh flower hair accessory on the side of this woman's hair, floral hair ornament. ${REAL_PROMPT}` },
    { filename: 'hw_pearl_pin', base: FACE_BASE, prompt: `Add elegant pearl hair pins in this woman's hair, multiple small pearl ornaments. ${REAL_PROMPT}` },
    // ── 02 穿刺飾品（5 件）→ face base
    { filename: 'hw_earrings', base: FACE_BASE, prompt: `Add dangling silver earrings on this woman's ears, elegant drop earrings visible. ${REAL_PROMPT}` },
    { filename: 'hw_ear_cuff', base: FACE_BASE, prompt: `Add a decorative ear cuff on this woman's ear cartilage, metallic helix ear jewelry. ${REAL_PROMPT}` },
    { filename: 'hw_nose_ring', base: FACE_BASE, prompt: `Add a small delicate nose ring on this woman's nostril, subtle nose piercing. ${REAL_PROMPT}` },
    { filename: 'hw_lip_ring', base: FACE_BASE, prompt: `Add a small lip ring on this woman's lower lip, subtle lip piercing. ${REAL_PROMPT}` },
    { filename: 'hw_eyebrow_ring', base: FACE_BASE, prompt: `Add an eyebrow piercing ring on this woman's eyebrow, small barbell eyebrow jewelry. ${REAL_PROMPT}` },
    // ── 03 帽子（8 件）→ hat base
    { filename: 'hw_baseball_cap', base: HAT_BASE, prompt: `Put a baseball cap on this woman's head, casual sporty snapback cap. ${REAL_PROMPT}` },
    { filename: 'hw_beret', base: HAT_BASE, prompt: `Put a french beret on this woman's head, classic wool beret tilted to one side. ${REAL_PROMPT}` },
    { filename: 'hw_witch_hat', base: HAT_BASE, prompt: `Put a pointed witch hat on this woman's head, classic black wizard hat with wide brim. ${REAL_PROMPT}` },
    { filename: 'hw_straw_hat', base: HAT_BASE, prompt: `Put a wide-brim straw sun hat on this woman's head, woven straw hat with ribbon. ${REAL_PROMPT}` },
    { filename: 'hw_military_cap', base: HAT_BASE, prompt: `Put a military officer cap on this woman's head, peaked military cap with badge. ${REAL_PROMPT}` },
    { filename: 'hw_bucket_hat', base: HAT_BASE, prompt: `Put a bucket hat on this woman's head, casual fisherman hat. ${REAL_PROMPT}` },
    { filename: 'hw_top_hat', base: HAT_BASE, prompt: `Put a tall black top hat on this woman's head, formal Victorian top hat. ${REAL_PROMPT}` },
    { filename: 'hw_beanie', base: HAT_BASE, prompt: `Put a knit beanie on this woman's head, cozy winter knit cap. ${REAL_PROMPT}` },
    // ── 04 圍巾頸部（2 件）→ face base（只到 30）
    { filename: 'hw_scarf', base: FACE_BASE, prompt: `Add a warm knit scarf around this woman's neck, cozy winter scarf wrapped. ${REAL_PROMPT}` },
    { filename: 'hw_neckerchief', base: FACE_BASE, prompt: `Add a silk neckerchief tied around this woman's neck, elegant neck scarf. ${REAL_PROMPT}` },
];

async function generateSingle(apiKey, basePath, prompt, outputPath, name) {
    const imageBuffer = fs.readFileSync(basePath);
    const base64Image = imageBuffer.toString('base64');
    const ext = path.extname(basePath).toLowerCase();
    const mimeType = (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
    const dataUri = `data:${mimeType};base64,${base64Image}`;

    console.log(`🎨 正在生成：${name}...`);

    const response = await fetch('https://api.x.ai/v1/images/edits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
            model: 'grok-imagine-image',
            prompt, n: 1,
            image: { url: dataUri, type: 'image_url' },
            response_format: 'b64_json'
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 錯誤 (${response.status})：${errorText}`);
    }

    const data = await response.json();
    if (!data.data || data.data.length === 0) throw new Error('API 沒有回傳任何圖片');

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const imageData = data.data[0];
    if (imageData.b64_json) {
        const buf = Buffer.from(imageData.b64_json, 'base64');
        fs.writeFileSync(outputPath, buf);
        console.log(`   ✅ 已儲存：${outputPath} (${(buf.length / 1024).toFixed(1)} KB)`);
    } else if (imageData.url) {
        const imgRes = await fetch(imageData.url);
        const buf = Buffer.from(await imgRes.arrayBuffer());
        fs.writeFileSync(outputPath, buf);
        console.log(`   ✅ 已儲存：${outputPath} (${(buf.length / 1024).toFixed(1)} KB)`);
    }
}

async function main() {
    loadEnv();
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) { console.error('❌ .env 中找不到 XAI_API_KEY'); process.exit(1); }

    const baseDir = path.join(__dirname, '..', 'assets', 'previews', 'base');
    const facePath = path.join(baseDir, 'headwear_base_face.png');
    const hatPath = path.join(baseDir, 'headwear_base_hat.png');

    if (!fs.existsSync(facePath)) { console.error(`❌ 基底圖不存在：${facePath}`); process.exit(1); }
    if (!fs.existsSync(hatPath)) { console.error(`❌ 基底圖不存在：${hatPath}`); process.exit(1); }

    const outputDir = path.join(__dirname, '..', 'assets', 'previews');
    console.log(`📷 臉部基底圖：${facePath}`);
    console.log(`📷 帽子基底圖：${hatPath}`);
    console.log(`🚀 開始生成 ${HEADWEAR_ITEMS.length} 張頭飾預覽圖\n`);

    let success = 0, fail = 0, skip = 0;

    for (let i = 0; i < HEADWEAR_ITEMS.length; i++) {
        const item = HEADWEAR_ITEMS[i];
        const outputPath = path.join(outputDir, `${item.filename}.png`);
        const basePath = item.base === HAT_BASE ? hatPath : facePath;

        if (fs.existsSync(outputPath)) {
            console.log(`⏭️  [${i + 1}/${HEADWEAR_ITEMS.length}] ${item.filename} — 已存在，跳過`);
            skip++; success++; continue;
        }

        try {
            console.log(`[${i + 1}/${HEADWEAR_ITEMS.length}] (${item.base === HAT_BASE ? '帽子' : '小飾品'}基底)`);
            await generateSingle(apiKey, basePath, item.prompt, outputPath, item.filename);
            success++;
            if (i < HEADWEAR_ITEMS.length - 1) {
                console.log('   ⏳ 等待 3 秒...');
                await new Promise(r => setTimeout(r, 3000));
            }
        } catch (err) {
            console.error(`   ❌ ${item.filename} 失敗：${err.message}`);
            fail++;
        }
    }

    console.log(`\n📊 完成！成功 ${success}/${HEADWEAR_ITEMS.length}（跳過 ${skip}），失敗 ${fail}`);
}

main();
