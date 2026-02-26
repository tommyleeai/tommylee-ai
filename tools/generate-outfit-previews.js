/**
 * generate-outfit-previews.js
 * 批量生成服裝預覽圖（基礎頁面前 30 個）
 * 
 * 用法：node tools/generate-outfit-previews.js
 */

const fs = require('fs');
const path = require('path');

// ── 讀取 .env ──
function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(envPath)) {
        console.error('❌ 找不到 .env 檔案');
        process.exit(1);
    }
    const content = fs.readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
        const [key, ...vals] = line.split('=');
        if (key && vals.length) {
            process.env[key.trim()] = vals.join('=').trim();
        }
    });
}

// ── 基礎頁面前 30 個服裝（缺少預覽的）──
const OUTFIT_PROMPTS = [
    {
        filename: 'clothing_shorts',
        prompt: 'Change the outfit of this anime girl to casual denim shorts with a simple top. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_tank_top',
        prompt: 'Change the outfit of this anime girl to a casual tank top with shorts. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_crop_top',
        prompt: 'Change the outfit of this anime girl to a trendy crop top showing midriff with high-waist pants. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_leather_jacket',
        prompt: 'Change the outfit of this anime girl to a cool black leather jacket with jeans. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_trench_coat',
        prompt: 'Change the outfit of this anime girl to a long beige trench coat over a dress. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_cardigan',
        prompt: 'Change the outfit of this anime girl to a cozy knit cardigan over a blouse with a skirt. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_streetwear',
        prompt: 'Change the outfit of this anime girl to trendy streetwear fashion with oversized hoodie, cargo pants, and sneakers. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_pajamas',
        prompt: 'Change the outfit of this anime girl to cute pajamas with a sleep shirt and loose pants. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_overalls',
        prompt: 'Change the outfit of this anime girl to casual denim overalls with a t-shirt underneath. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_summer_dress',
        prompt: 'Change the outfit of this anime girl to a light flowy summer dress with floral pattern. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_denim_jacket',
        prompt: 'Change the outfit of this anime girl to a denim jacket over a casual dress. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_polo',
        prompt: 'Change the outfit of this anime girl to a polo shirt with a skirt, preppy casual style. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_maxi_dress',
        prompt: 'Change the outfit of this anime girl to an elegant long maxi dress reaching ankles. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_mini_skirt',
        prompt: 'Change the outfit of this anime girl to a fashionable mini skirt with a fitted top. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_pleated_skirt',
        prompt: 'Change the outfit of this anime girl to a pleated skirt with a blouse, school-fashion style. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_camisole',
        prompt: 'Change the outfit of this anime girl to a delicate camisole spaghetti strap top with a skirt. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_bomber_jacket',
        prompt: 'Change the outfit of this anime girl to a bomber flight jacket with casual pants. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_turtleneck',
        prompt: 'Change the outfit of this anime girl to a fitted turtleneck sweater with a skirt. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_blouse',
        prompt: 'Change the outfit of this anime girl to an elegant feminine blouse with a pencil skirt, office fashion. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_jumpsuit',
        prompt: 'Change the outfit of this anime girl to a stylish one-piece jumpsuit. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_parka',
        prompt: 'Change the outfit of this anime girl to a warm hooded parka winter coat with jeans. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
    {
        filename: 'clothing_yoga_pants',
        prompt: 'Change the outfit of this anime girl to yoga pants leggings with a sports bra top, athletic wear. Keep the same character, pose, black hair, white background, full body anime illustration style.'
    },
];

// ── 生成單張圖片 ──
async function generateSingle(apiKey, basePath, prompt, outputPath, name) {
    const imageBuffer = fs.readFileSync(basePath);
    const base64Image = imageBuffer.toString('base64');
    const ext = path.extname(basePath).toLowerCase();
    const mimeType = (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
    const dataUri = `data:${mimeType};base64,${base64Image}`;

    console.log(`🎨 正在生成：${name}...`);

    const url = 'https://api.x.ai/v1/images/edits';
    const requestBody = {
        model: 'grok-imagine-image',
        prompt: prompt,
        n: 1,
        image: { url: dataUri, type: 'image_url' },
        response_format: 'b64_json'
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 錯誤 (${response.status})：${errorText}`);
    }

    const data = await response.json();
    if (!data.data || data.data.length === 0) {
        throw new Error('API 沒有回傳任何圖片');
    }

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const imageData = data.data[0];
    if (imageData.b64_json) {
        const outputBuffer = Buffer.from(imageData.b64_json, 'base64');
        fs.writeFileSync(outputPath, outputBuffer);
        console.log(`   ✅ 已儲存：${outputPath} (${(outputBuffer.length / 1024).toFixed(1)} KB)`);
    } else if (imageData.url) {
        const imgResponse = await fetch(imageData.url);
        const arrayBuffer = await imgResponse.arrayBuffer();
        const outputBuffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(outputPath, outputBuffer);
        console.log(`   ✅ 已儲存：${outputPath} (${(outputBuffer.length / 1024).toFixed(1)} KB)`);
    } else {
        throw new Error('無法解析回應格式');
    }
}

// ── 主函數 ──
async function main() {
    loadEnv();

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
        console.error('❌ .env 中找不到 XAI_API_KEY');
        process.exit(1);
    }

    // 基底圖路徑
    const basePath = path.join(__dirname, '..', 'assets', 'previews', 'base', 'outfit_base.png');
    if (!fs.existsSync(basePath)) {
        console.error(`❌ 基底圖不存在：${basePath}`);
        console.error('   請先將基底圖放到 assets/previews/base/outfit_base.png');
        process.exit(1);
    }

    const outputDir = path.join(__dirname, '..', 'assets', 'previews');

    console.log(`📷 基底圖：${basePath}`);
    console.log(`📂 輸出目錄：${outputDir}`);
    console.log(`🚀 開始生成 ${OUTFIT_PROMPTS.length} 張服裝預覽圖\n`);

    let success = 0, fail = 0, skip = 0;

    for (let i = 0; i < OUTFIT_PROMPTS.length; i++) {
        const item = OUTFIT_PROMPTS[i];
        const outputPath = path.join(outputDir, `${item.filename}.png`);

        // 跳過已存在的圖片
        if (fs.existsSync(outputPath)) {
            console.log(`⏭️  [${i + 1}/${OUTFIT_PROMPTS.length}] ${item.filename} — 已存在，跳過`);
            skip++;
            success++;
            continue;
        }

        try {
            console.log(`[${i + 1}/${OUTFIT_PROMPTS.length}]`);
            await generateSingle(apiKey, basePath, item.prompt, outputPath, item.filename);
            success++;
            // API rate limit 緩衝
            if (i < OUTFIT_PROMPTS.length - 1) {
                console.log('   ⏳ 等待 3 秒...');
                await new Promise(r => setTimeout(r, 3000));
            }
        } catch (err) {
            console.error(`   ❌ ${item.filename} 失敗：${err.message}`);
            fail++;
        }
    }

    console.log(`\n📊 完成！成功 ${success}/${OUTFIT_PROMPTS.length}（跳過 ${skip}），失敗 ${fail}`);
}

main();
