/**
 * generate-preview.js
 * 使用 xAI Grok API 將基底圖轉換為指定風格的預覽圖
 * 
 * 用法：
 *   node tools/generate-preview.js --style "miyazaki" --output "./assets/previews/anime/miyazaki.png"
 *   node tools/generate-preview.js --prompt "自訂 prompt" --output "./output.png"
 * 
 * 參數：
 *   --base    基底圖路徑（預設：./images/base_candidate_a.png）
 *   --style   預設風格名稱（見 STYLE_PRESETS）
 *   --prompt  自訂 prompt（覆蓋 --style）
 *   --output  輸出圖片路徑（必填）
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

// ── 風格預設（28 位漫畫家）──
const STYLE_PRESETS = {
    miyazaki: 'Transform this anime girl into Studio Ghibli / Hayao Miyazaki style. Warm, nostalgic and whimsical atmosphere with gentle watercolor-like shading and soft edges. Keep the same pose, composition, and white/light background.',
    shinkai: 'Transform this anime girl into Makoto Shinkai style. Vivid, detailed backgrounds with stunning light effects, lens flares, and photorealistic sky. Keep the same pose, composition, and light background.',
    toriyama: 'Transform this anime girl into Akira Toriyama / Dragon Ball style. Bold outlines, vibrant colors, dynamic energy, characteristic eye style. Keep the same pose, composition, and light background.',
    araki: 'Transform this anime girl into Hirohiko Araki / JoJo\'s Bizarre Adventure style. Dramatic poses, bold shading, fashion-inspired aesthetic. Keep the same pose, composition, and light background.',
    miura: 'Transform this anime girl into Kentaro Miura / Berserk style. Dark, detailed, high-contrast manga style with intricate cross-hatching. Keep the same pose, composition, and light background.',
    gotouge: 'Transform this anime girl into Koyoharu Gotouge / Demon Slayer style. Distinctive art with flowing patterns and watercolor-like effects. Keep the same pose, composition, and light background.',
    oda: 'Transform this anime girl into Eiichiro Oda / One Piece style. Exaggerated proportions, expressive features, bold linework. Keep the same pose, composition, and light background.',
    kishimoto: 'Transform this anime girl into Masashi Kishimoto / Naruto style. Clean lines, detailed character design, ninja aesthetic influence. Keep the same pose, composition, and light background.',
    fujimoto: 'Transform this anime girl into Tatsuki Fujimoto / Chainsaw Man style. Raw, gritty art style with rough edges and intense expressions. Keep the same pose, composition, and light background.',
    akutami: 'Transform this anime girl into Gege Akutami / Jujutsu Kaisen style. Dynamic action-oriented art, sharp angular features, dramatic shading. Keep the same pose, composition, and light background.',
    murata: 'Transform this anime girl into Yusuke Murata / One Punch Man style. Incredibly detailed, hyper-dynamic art with extreme attention to anatomy. Keep the same pose, composition, and light background.',
    anno: 'Transform this anime girl into Hideaki Anno / Evangelion style. Mecha-inspired aesthetic, distinctive 90s anime look, dramatic lighting. Keep the same pose, composition, and light background.',
    kyoani: 'Transform this anime girl into Kyoto Animation (KyoAni) style. Soft, highly detailed, beautiful character designs with warm colors. Keep the same pose, composition, and light background.',
    ufotable: 'Transform this anime girl into Ufotable style. Stunning visual effects, dramatic lighting, fluid dynamic poses, blend of 2D and 3D. Keep the same pose, composition, and light background.',
    kubo: 'Transform this anime girl into Tite Kubo / Bleach style. Stylish, fashion-forward character design, clean bold lines, dramatic black and white. Keep the same pose, composition, and light background.',
    togashi: 'Transform this anime girl into Yoshihiro Togashi / Hunter x Hunter style. Expressive, versatile art style with strong character personality. Keep the same pose, composition, and light background.',
    arakawa: 'Transform this anime girl into Hiromu Arakawa / Fullmetal Alchemist style. Balanced proportions, expressive faces, clean and readable art. Keep the same pose, composition, and light background.',
    inoue: 'Transform this anime girl into Takehiko Inoue / Slam Dunk style. Realistic proportions, detailed ink work, masterful use of black ink. Keep the same pose, composition, and light background.',
    ito: 'Transform this anime girl into Junji Ito horror manga style. Unsettling, highly detailed art with meticulous cross-hatching and eerie atmosphere. Keep the same pose, composition, and light background.',
    takahashi: 'Transform this anime girl into Rumiko Takahashi / 90s anime style. Classic 80s-90s anime aesthetic, expressive comedy style, warm and nostalgic. Keep the same pose, composition, and light background.',
    clamp: 'Transform this anime girl into CLAMP / Cardcaptor Sakura style. Elegant, flowing designs with long limbs, beautiful costume details, shoujo aesthetic. Keep the same pose, composition, and light background.',
    takeuchi: 'Transform this anime girl into Naoko Takeuchi / Sailor Moon style. Magical girl aesthetic, sparkly effects, elegant proportions, pastel colors. Keep the same pose, composition, and light background.',
    tezuka: 'Transform this anime girl into Osamu Tezuka / Astro Boy style. Classic vintage manga style, rounded features, expressive large eyes, retro aesthetic. Keep the same pose, composition, and light background.',
    nagai: 'Transform this anime girl into Go Nagai retro mecha style. Bold, aggressive linework, 70s retro anime aesthetic. Keep the same pose, composition, and light background.',
    sadamoto: 'Transform this anime girl into Yoshiyuki Sadamoto / Evangelion character design style. Clean, detailed character designs with subtle emotional expressions. Keep the same pose, composition, and light background.',
    matsumoto: 'Transform this anime girl into Leiji Matsumoto / Galaxy Express 999 style. Retro space opera aesthetic, distinctive elongated female features. Keep the same pose, composition, and light background.',
    katsura: 'Transform this anime girl into Masakazu Katsura style. Beautiful, detailed realistic anime art, delicate features, clean polished linework. Keep the same pose, composition, and light background.',
    hojo: 'Transform this anime girl into Tsukasa Hojo / City Hunter style. 80s anime aesthetic, detailed realistic proportions, cool urban style. Keep the same pose, composition, and light background.',
};

// ── 藝術風格預設（28 種渲染風格）──
const ART_STYLE_PRESETS = {
    realistic: 'Transform this anime girl into a photorealistic portrait photograph. Real human skin texture, natural lighting, DSLR photography quality. Keep the same pose, composition, and clean background.',
    ghibli_art: 'Transform this anime girl into Studio Ghibli watercolor illustration style. Soft pastel colors, gentle brushstrokes, warm nostalgic atmosphere. Keep the same pose, composition, and light background.',
    shinkai_art: 'Transform this anime girl into Makoto Shinkai cinematic style. Stunning light rays, lens flares, vivid sky colors, photorealistic backgrounds. Keep the same pose, composition, and light background.',
    kyoani_art: 'Transform this anime girl into Kyoto Animation style. Soft detailed shading, beautiful eye highlights, warm color palette, high production quality anime. Keep the same pose, composition, and light background.',
    cyberpunk: 'Transform this anime girl into cyberpunk style. Neon lights, holographic effects, futuristic tech accessories, dark city atmosphere with vibrant neon glow. Keep the same pose and composition.',
    oil_painting: 'Transform this anime girl into a thick impasto oil painting. Visible brushstrokes, rich texture, Renaissance-inspired lighting, classical art style. Keep the same pose, composition, and light background.',
    watercolor: 'Transform this anime girl into a watercolor painting. Soft wet edges, color bleeding, paper texture, transparent layered washes, artistic and dreamy. Keep the same pose, composition, and light background.',
    semi_realistic: 'Transform this anime girl into semi-realistic style. Blend of anime and realistic features, detailed skin texture but maintaining anime eye proportions. Keep the same pose, composition, and light background.',
    '3d_render': 'Transform this anime girl into a 3D rendered character. Smooth plastic-like skin, Pixar/Disney 3D animation quality, subsurface scattering. Keep the same pose, composition, and light background.',
    '90s_anime': 'Transform this anime girl into 1990s retro anime style. Cel-shaded, limited color palette, VHS aesthetic, nostalgic 90s anime look with soft grain. Keep the same pose, composition, and light background.',
    sketch: 'Transform this anime girl into a pencil sketch drawing. Monochrome graphite, cross-hatching shading, visible pencil strokes, sketch paper texture. Keep the same pose, composition, and white background.',
    chibi: 'Transform this anime girl into chibi/super-deformed style. Tiny body, oversized head, simplified features, cute and round proportions. Keep the composition and light background.',
    pixel_art: 'Transform this anime girl into pixel art style. 16-bit retro game aesthetic, visible pixels, limited color palette, clean pixel placement. Keep the same pose and composition.',
    vaporwave: 'Transform this anime girl into vaporwave aesthetic. Pink and cyan gradients, glitch effects, retro grid, 80s-90s Japanese pop culture influence. Keep the same pose and composition.',
    ink_wash: 'Transform this anime girl into traditional East Asian ink wash painting (sumi-e). Black ink on white paper, flowing brushstrokes, minimalist, zen aesthetic. Keep the same pose, composition, and white background.',
    ukiyoe: 'Transform this anime girl into Japanese ukiyo-e woodblock print style. Flat colors, bold outlines, traditional Japanese art patterns, vintage aesthetic. Keep the same pose and composition.',
    pop_art: 'Transform this anime girl into pop art style. Bold primary colors, Ben-Day dots, thick black outlines, Andy Warhol / Roy Lichtenstein inspired. Keep the same pose, composition, and vibrant background.',
    film_noir: 'Transform this anime girl into film noir style. High contrast black and white, dramatic shadows, venetian blind lighting, moody atmosphere. Keep the same pose and composition.',
    gothic: 'Transform this anime girl into gothic art style. Dark and elegant, ornate Victorian details, deep purple and black tones, romantic darkness. Keep the same pose, composition, and dark background.',
    steampunk: 'Transform this anime girl into steampunk style. Brass gears, Victorian machinery, goggles, copper and bronze tones, industrial elegance. Keep the same pose and composition.',
    webtoon: 'Transform this anime girl into Korean webtoon (manhwa) style. Clean digital coloring, soft shading, modern character design, full color. Keep the same pose, composition, and light background.',
    horror: 'Transform this anime girl into horror art style. Dark unsettling atmosphere, eerie lighting, slightly distorted features, creepy undertones. Keep the same pose, composition, and dark background.',
    bw_manga: 'Transform this anime girl into black and white manga style. Screen tones, ink hatching, dramatic contrast, printed manga page look. Keep the same pose, composition, and white background.',
    claymation: 'Transform this anime girl into claymation/stop-motion style. Clay-like texture, rounded 3D forms, handcrafted look, Aardman animation quality. Keep the same pose and composition.',
    papercut: 'Transform this anime girl into papercut art style. Layered cut paper, visible paper edges and shadows, multi-layered depth effect. Keep the same pose, composition, and light background.',
    stained_glass: 'Transform this anime girl into stained glass art style. Bold black lead lines, translucent colorful glass segments, cathedral window look. Keep the same pose and composition.',
    graffiti: 'Transform this anime girl into street art graffiti style. Spray paint texture, bold colors, urban wall background, dripping paint effects. Keep the same pose and composition.',
    pastel_goth: 'Transform this anime girl into pastel goth aesthetic. Soft pastel pink/purple/mint colors combined with gothic elements, cute but dark. Keep the same pose, composition, and light background.',
};

// ── 合併所有預設 ──
const ALL_PRESETS = { ...STYLE_PRESETS, ...ART_STYLE_PRESETS };

// ── 解析命令列參數 ──
function parseArgs() {
    const args = process.argv.slice(2);
    const parsed = {
        base: path.join(__dirname, '..', 'images', 'base_candidate_a.png'),
        style: null,
        prompt: null,
        output: null,
        batch: false,
        category: null,  // 'anime' | 'art'
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--base': parsed.base = args[++i]; break;
            case '--style': parsed.style = args[++i]; break;
            case '--prompt': parsed.prompt = args[++i]; break;
            case '--output': parsed.output = args[++i]; break;
            case '--batch': parsed.batch = true; break;
            case '--category': parsed.category = args[++i]; break;
        }
    }

    // 批量模式
    if (parsed.batch) {
        if (!parsed.category) {
            console.error('❌ 批量模式請指定 --category (anime | art)');
            process.exit(1);
        }
        return parsed;
    }

    if (!parsed.output) {
        console.error('❌ 請指定 --output 輸出路徑');
        process.exit(1);
    }

    if (!parsed.prompt && !parsed.style) {
        console.error('❌ 請指定 --style 或 --prompt');
        process.exit(1);
    }

    if (!parsed.prompt) {
        if (!ALL_PRESETS[parsed.style]) {
            console.error(`❌ 未知風格："${parsed.style}"。`);
            console.error(`   動漫風格：${Object.keys(STYLE_PRESETS).join(', ')}`);
            console.error(`   藝術風格：${Object.keys(ART_STYLE_PRESETS).join(', ')}`);
            process.exit(1);
        }
        parsed.prompt = ALL_PRESETS[parsed.style];
    }

    if (!fs.existsSync(parsed.base)) {
        console.error(`❌ 基底圖不存在：${parsed.base}`);
        process.exit(1);
    }

    return parsed;
}

// ── 生成單張圖片 ──
async function generateSingle(apiKey, basePath, prompt, outputPath, styleName) {
    const imageBuffer = fs.readFileSync(basePath);
    const base64Image = imageBuffer.toString('base64');
    const ext = path.extname(basePath).toLowerCase();
    const mimeType = (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
    const dataUri = `data:${mimeType};base64,${base64Image}`;

    console.log(`🎨 正在生成：${styleName || '自訂'}...`);

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

// ── 藝術風格 key → 檔名映射 ──
const ART_STYLE_FILENAMES = {
    realistic: 'realistic',
    ghibli_art: 'ghibli',
    shinkai_art: 'shinkai',
    kyoani_art: 'kyoani',
    cyberpunk: 'cyberpunk',
    oil_painting: 'oil_painting',
    watercolor: 'watercolor',
    semi_realistic: 'semi_realistic',
    '3d_render': '3d_render',
    '90s_anime': '90s_anime',
    sketch: 'sketch',
    chibi: 'chibi',
    pixel_art: 'pixel_art',
    vaporwave: 'vaporwave',
    ink_wash: 'ink_wash',
    ukiyoe: 'ukiyoe',
    pop_art: 'pop_art',
    film_noir: 'film_noir',
    gothic: 'gothic',
    steampunk: 'steampunk',
    webtoon: 'webtoon',
    horror: 'horror',
    bw_manga: 'bw_manga',
    claymation: 'claymation',
    papercut: 'papercut',
    stained_glass: 'stained_glass',
    graffiti: 'graffiti',
    pastel_goth: 'pastel_goth',
};

// ── 主函數 ──
async function main() {
    loadEnv();

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
        console.error('❌ .env 中找不到 XAI_API_KEY');
        process.exit(1);
    }

    const args = parseArgs();

    if (!fs.existsSync(args.base)) {
        console.error(`❌ 基底圖不存在：${args.base}`);
        process.exit(1);
    }

    console.log(`📷 基底圖：${args.base}`);

    // ── 批量模式 ──
    if (args.batch) {
        const presets = args.category === 'art' ? ART_STYLE_PRESETS : STYLE_PRESETS;
        const outputDir = args.category === 'art'
            ? path.join(__dirname, '..', 'assets', 'previews', 'art')
            : path.join(__dirname, '..', 'assets', 'previews', 'anime');
        const filenames = args.category === 'art' ? ART_STYLE_FILENAMES : null;

        const keys = Object.keys(presets);
        console.log(`\n🚀 批量生成 ${keys.length} 張 [${args.category}] 預覽圖\n`);

        let success = 0, fail = 0;
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const filename = filenames ? (filenames[key] || key) : key;
            const outputPath = path.join(outputDir, `${filename}.png`);

            // 跳過已存在的圖片
            if (fs.existsSync(outputPath)) {
                console.log(`⏭️  [${i + 1}/${keys.length}] ${key} — 已存在，跳過`);
                success++;
                continue;
            }

            try {
                console.log(`[${i + 1}/${keys.length}]`);
                await generateSingle(apiKey, args.base, presets[key], outputPath, key);
                success++;
                // API rate limit 緩衝
                if (i < keys.length - 1) {
                    console.log('   ⏳ 等待 3 秒...');
                    await new Promise(r => setTimeout(r, 3000));
                }
            } catch (err) {
                console.error(`   ❌ ${key} 失敗：${err.message}`);
                fail++;
            }
        }

        console.log(`\n📊 完成！成功 ${success}/${keys.length}，失敗 ${fail}`);
        return;
    }

    // ── 單張模式 ──
    try {
        await generateSingle(apiKey, args.base, args.prompt, args.output, args.style);
    } catch (err) {
        console.error(`❌ ${err.message}`);
        process.exit(1);
    }
}

main();
