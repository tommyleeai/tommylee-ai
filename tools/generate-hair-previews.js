/**
 * generate-hair-previews.js
 * 補齊缺少的髮型預覽圖，基底圖用 hair_long_hair.png（白制服紅蝴蝶結風格）
 * 
 * 用法：
 *   node tools/generate-hair-previews.js                   # 生成所有缺少的
 *   node tools/generate-hair-previews.js --only messy_short # 只生成特定髮型
 *   node tools/generate-hair-previews.js --force            # 強制重新生成
 */

const fs = require('fs');
const path = require('path');

// ── 讀取 .env ──
function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) process.env[match[1]] = (match[2] || '').replace(/^["']|["']$/g, '');
    });
}
loadEnv();

// ── 缺少預覽圖的 15 個髮型 ──
const MISSING_HAIRSTYLES = [
    { key: 'messy_short', label: '凌亂短髮', prompt: 'Change ONLY the hairstyle of this anime girl to messy short hair, tousled and textured with natural volume, choppy layers. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'french_braid', label: '法式編髮', prompt: 'Change ONLY the hairstyle of this anime girl to a French braid, neatly braided from the top of the head going down the back. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'side_ponytail', label: '側馬尾', prompt: 'Change ONLY the hairstyle of this anime girl to a side ponytail, hair gathered and tied to one side with a hair tie. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'curly', label: '捲髮', prompt: 'Change ONLY the hairstyle of this anime girl to curly hair, soft bouncy curls throughout, medium length. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'drill_hair', label: '鑽頭捲', prompt: 'Change ONLY the hairstyle of this anime girl to drill hair (twin drill curls), long ringlet curls that spiral downward like drills on both sides. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'half_up_bun', label: '半丸子頭', prompt: 'Change ONLY the hairstyle of this anime girl to a half-up bun, top half of hair tied into a small bun while the rest flows down naturally. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'side_braid', label: '側邊編髮', prompt: 'Change ONLY the hairstyle of this anime girl to a side braid, hair braided and draped over one shoulder. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'crown_braid', label: '皇冠編髮', prompt: 'Change ONLY the hairstyle of this anime girl to a crown braid, braids wrapped around the head like a crown or halo. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'dreadlocks', label: '髒辮', prompt: 'Change ONLY the hairstyle of this anime girl to dreadlocks, long rope-like twisted locks of hair. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'mohawk', label: '龐克莫霍克', prompt: 'Change ONLY the hairstyle of this anime girl to a mohawk, sides shaved short with a tall strip of spiked hair running down the center. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'cloud_hair', label: '雲朵燙', prompt: 'Change ONLY the hairstyle of this anime girl to cloud hair (cloud perm), soft fluffy voluminous waves that look like clouds, airy and bouncy. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'floating_hair', label: '漂浮長髮', prompt: 'Change ONLY the hairstyle of this anime girl to floating hair, long hair that defies gravity and floats upward and outward as if in zero gravity or underwater, ethereal and magical. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'medium_hair', label: '不過肩長髮', prompt: 'Change ONLY the hairstyle of this anime girl to medium-length hair that reaches just above the shoulders, neat and natural. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'very_long_hair', label: '超長髮', prompt: 'Change ONLY the hairstyle of this anime girl to very long hair reaching down past the waist, flowing and silky straight. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
    { key: 'asymmetrical', label: '不對稱短髮', prompt: 'Change ONLY the hairstyle of this anime girl to asymmetrical short hair, one side noticeably longer than the other, stylish and edgy. Keep the EXACT same face, eyes, expression, outfit (white blouse with red bow), and white background. Do not change anything else.' },
];

// ── 生成單張 ──
async function generateSingle(apiKey, basePath, prompt, outputPath, label) {
    const imageBuffer = fs.readFileSync(basePath);
    const base64Image = imageBuffer.toString('base64');
    const ext = path.extname(basePath).toLowerCase();
    const mimeType = (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
    const dataUri = `data:${mimeType};base64,${base64Image}`;

    console.log(`🎨 正在生成：${label}...`);

    const response = await fetch('https://api.x.ai/v1/images/edits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'grok-imagine-image',
            prompt: prompt,
            n: 1,
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
    } else {
        throw new Error('無法解析回應格式');
    }
}

// ── 主程式 ──
async function main() {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) { console.error('❌ 未找到 XAI_API_KEY'); process.exit(1); }

    const basePath = path.join(__dirname, '..', 'assets', 'previews', 'hair_long_hair.png');
    if (!fs.existsSync(basePath)) { console.error('❌ 基底圖不存在：' + basePath); process.exit(1); }

    const outputDir = path.join(__dirname, '..', 'assets', 'previews');

    const args = process.argv.slice(2);
    const force = args.includes('--force');
    let onlyKey = null;
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--only' && args[i + 1]) onlyKey = args[i + 1];
    }

    const toGenerate = onlyKey
        ? MISSING_HAIRSTYLES.filter(h => h.key === onlyKey)
        : MISSING_HAIRSTYLES;

    if (toGenerate.length === 0) { console.error('❌ 沒有找到符合條件的髮型'); process.exit(1); }

    console.log(`\n📋 準備生成 ${toGenerate.length} 張髮型預覽圖`);
    console.log(`📁 輸出目錄：${outputDir}`);
    console.log(`🖼️ 基底圖：${basePath}\n`);

    let success = 0, skip = 0, fail = 0;

    for (const hair of toGenerate) {
        const outputPath = path.join(outputDir, `hair_${hair.key}.png`);

        if (!force && fs.existsSync(outputPath)) {
            console.log(`⏭️ 已存在，跳過：${hair.label} (${hair.key})`);
            skip++;
            continue;
        }

        try {
            await generateSingle(apiKey, basePath, hair.prompt, outputPath, `${hair.label} (${hair.key})`);
            success++;
            await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
            console.error(`   ❌ 生成失敗：${hair.label} — ${err.message}`);
            fail++;
        }
    }

    console.log(`\n📊 結果：✅ ${success} 成功 | ⏭️ ${skip} 跳過 | ❌ ${fail} 失敗`);
}

main().catch(err => { console.error('❌ 執行錯誤：', err); process.exit(1); });
