/**
 * generate-hand-previews.js
 * 批量生成手持物件預覽圖（基礎頁面前 30 個）
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

const BASE_PROMPT = 'Keep the same anime girl character, black hair, white background, full body anime illustration style.';

const HAND_ITEMS = [
    { filename: 'hand_longsword', prompt: `Make this anime girl hold a longsword in her right hand, medieval fantasy sword. ${BASE_PROMPT}` },
    { filename: 'hand_katana', prompt: `Make this anime girl hold a katana japanese sword in her right hand. ${BASE_PROMPT}` },
    { filename: 'hand_wand', prompt: `Make this anime girl hold a magic wand in her right hand, wizard wand with glowing tip. ${BASE_PROMPT}` },
    { filename: 'hand_handgun', prompt: `Make this anime girl hold a handgun pistol in her right hand. ${BASE_PROMPT}` },
    { filename: 'hand_dagger', prompt: `Make this anime girl hold a dagger short blade in her right hand. ${BASE_PROMPT}` },
    { filename: 'hand_energy_blade', prompt: `Make this anime girl hold a glowing energy blade lightsaber in her right hand. ${BASE_PROMPT}` },
    { filename: 'hand_energy_ball', prompt: `Add a glowing energy orb sphere floating above this anime girl's right hand palm. ${BASE_PROMPT}` },
    { filename: 'hand_fire', prompt: `Add fire and flames emanating from this anime girl's right hand palm, pyrokinesis fire magic. ${BASE_PROMPT}` },
    { filename: 'hand_lightning', prompt: `Add lightning electricity sparking from this anime girl's right hand, thunder magic. ${BASE_PROMPT}` },
    { filename: 'hand_ice', prompt: `Add ice crystals and frost forming around this anime girl's right hand, ice magic. ${BASE_PROMPT}` },
    { filename: 'hand_magic_circle', prompt: `Add a floating magic circle rune array hovering above this anime girl's right hand. ${BASE_PROMPT}` },
    { filename: 'hand_book', prompt: `Make this anime girl hold an open book in both hands, reading a book. ${BASE_PROMPT}` },
    { filename: 'hand_camera', prompt: `Make this anime girl hold a camera DSLR in her hands, photography pose. ${BASE_PROMPT}` },
    { filename: 'hand_lantern', prompt: `Make this anime girl hold an oil lantern in her right hand, warm glow. ${BASE_PROMPT}` },
    { filename: 'hand_guitar', prompt: `Make this anime girl hold an acoustic guitar, playing guitar pose. ${BASE_PROMPT}` },
    { filename: 'hand_potion', prompt: `Make this anime girl hold a glowing potion bottle in her right hand, alchemy flask. ${BASE_PROMPT}` },
    { filename: 'hand_smartphone', prompt: `Make this anime girl hold a smartphone in her right hand, looking at phone. ${BASE_PROMPT}` },
    { filename: 'hand_smartwatch', prompt: `Add a smartwatch digital watch on this anime girl's left wrist. ${BASE_PROMPT}` },
    { filename: 'hand_mech_arm', prompt: `Replace this anime girl's right arm with a cybernetic mechanical prosthetic arm. ${BASE_PROMPT}` },
    { filename: 'hand_fingerless_gloves', prompt: `Add fingerless gloves half-finger gloves on this anime girl's hands. ${BASE_PROMPT}` },
    { filename: 'hand_long_gloves', prompt: `Add elegant long elbow-length opera gloves on this anime girl's arms. ${BASE_PROMPT}` },
    { filename: 'hand_gauntlets', prompt: `Add armored metal gauntlets on this anime girl's hands and forearms. ${BASE_PROMPT}` },
    { filename: 'hand_bracelet', prompt: `Add a metal bracelet bangle on this anime girl's right wrist. ${BASE_PROMPT}` },
    { filename: 'hand_diamond_ring', prompt: `Add a sparkling diamond ring on this anime girl's ring finger, close-up visible. ${BASE_PROMPT}` },
    { filename: 'hand_shield', prompt: `Make this anime girl hold a round shield in her left hand, fantasy shield. ${BASE_PROMPT}` },
    { filename: 'hand_staff', prompt: `Make this anime girl hold a tall magic staff wizard staff in her right hand. ${BASE_PROMPT}` },
    { filename: 'hand_fate_thread', prompt: `Add red string of fate threads wrapped around this anime girl's fingers, destiny thread. ${BASE_PROMPT}` },
    { filename: 'hand_handcuffs', prompt: `Add handcuffs shackles on this anime girl's wrists, chained hands. ${BASE_PROMPT}` },
    { filename: 'hand_key', prompt: `Make this anime girl hold an ornate golden skeleton key in her right hand. ${BASE_PROMPT}` },
    { filename: 'hand_pocket_watch', prompt: `Make this anime girl hold an antique pocket watch with chain in her right hand. ${BASE_PROMPT}` },
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

    const basePath = path.join(__dirname, '..', 'assets', 'previews', 'base', 'outfit_base.png');
    if (!fs.existsSync(basePath)) { console.error(`❌ 基底圖不存在：${basePath}`); process.exit(1); }

    const outputDir = path.join(__dirname, '..', 'assets', 'previews');
    console.log(`📷 基底圖：${basePath}`);
    console.log(`🚀 開始生成 ${HAND_ITEMS.length} 張手持物件預覽圖\n`);

    let success = 0, fail = 0, skip = 0;

    for (let i = 0; i < HAND_ITEMS.length; i++) {
        const item = HAND_ITEMS[i];
        const outputPath = path.join(outputDir, `${item.filename}.png`);

        if (fs.existsSync(outputPath)) {
            console.log(`⏭️  [${i + 1}/${HAND_ITEMS.length}] ${item.filename} — 已存在，跳過`);
            skip++; success++; continue;
        }

        try {
            console.log(`[${i + 1}/${HAND_ITEMS.length}]`);
            await generateSingle(apiKey, basePath, item.prompt, outputPath, item.filename);
            success++;
            if (i < HAND_ITEMS.length - 1) {
                console.log('   ⏳ 等待 3 秒...');
                await new Promise(r => setTimeout(r, 3000));
            }
        } catch (err) {
            console.error(`   ❌ ${item.filename} 失敗：${err.message}`);
            fail++;
        }
    }

    console.log(`\n📊 完成！成功 ${success}/${HAND_ITEMS.length}（跳過 ${skip}），失敗 ${fail}`);
}

main();
