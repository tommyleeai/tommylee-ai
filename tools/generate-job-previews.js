/**
 * generate-job-previews.js
 * 使用 xAI Grok API 為職業基礎頁面第一頁 30 個職業生成預覽圖
 * 基底圖：assets/previews/race/human.png（同一人物角色扮演不同職業）
 * 
 * 用法：
 *   node tools/generate-job-previews.js                    # 生成所有未完成的
 *   node tools/generate-job-previews.js --start 0 --end 4  # 只生成第 0~4 個
 *   node tools/generate-job-previews.js --only student      # 只生成特定職業
 *   node tools/generate-job-previews.js --force             # 強制重新生成（覆蓋已存在）
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

// ── 30 個職業定義 ──
const JOBS = [
    { key: 'student', label: '學生', prompt: 'Transform this woman into a student wearing a Japanese school uniform (seifuku) with a sailor collar, pleated skirt, school bag. Keep the EXACT same face, hair, and facial features. School hallway background.' },
    { key: 'teacher', label: '教師', prompt: 'Transform this woman into a teacher wearing professional attire with glasses, holding a textbook, standing near a whiteboard. Keep the EXACT same face, hair, and facial features. Classroom background.' },
    { key: 'kindergarten', label: '幼稚園老師', prompt: 'Transform this woman into a kindergarten teacher wearing a colorful apron over casual clothes, warm gentle smile, surrounded by toys. Keep the EXACT same face, hair, and facial features. Colorful playroom background.' },
    { key: 'nurse', label: '護士', prompt: 'Transform this woman into a nurse wearing a white nurse uniform with a nurse cap, stethoscope around neck. Keep the EXACT same face, hair, and facial features. Hospital corridor background.' },
    { key: 'doctor', label: '醫生', prompt: 'Transform this woman into a doctor wearing a white lab coat, stethoscope, professional medical attire. Keep the EXACT same face, hair, and facial features. Hospital office background.' },
    { key: 'pharmacist', label: '藥劑師', prompt: 'Transform this woman into a pharmacist wearing a white lab coat, handling medicine bottles on pharmacy shelves. Keep the EXACT same face, hair, and facial features. Pharmacy background.' },
    { key: 'police', label: '警察', prompt: 'Transform this woman into a police officer wearing a dark blue police uniform with badge, cap, and radio. Keep the EXACT same face, hair, and facial features. Police station background.' },
    { key: 'firefighter', label: '消防員', prompt: 'Transform this woman into a firefighter wearing a yellow/tan firefighter jacket and helmet, holding a fire hose. Keep the EXACT same face, hair, and facial features. Fire station background.' },
    { key: 'soldier', label: '軍人', prompt: 'Transform this woman into a soldier wearing military camouflage uniform, beret, and dog tags. Keep the EXACT same face, hair, and facial features. Military base background.' },
    { key: 'special_forces', label: '特種兵', prompt: 'Transform this woman into a special forces operator wearing tactical black gear, night vision goggles on helmet, body armor. Keep the EXACT same face, hair, and facial features. Dark tactical background.' },
    { key: 'flight_attendant', label: '空姐', prompt: 'Transform this woman into a flight attendant wearing a navy blue airline uniform with neckerchief, wings pin badge, elegant posture. Keep the EXACT same face, hair, and facial features. Aircraft cabin background.' },
    { key: 'pilot', label: '機長', prompt: 'Transform this woman into an airline pilot wearing a white pilot shirt with epaulettes, captain hat, aviator sunglasses on collar. Keep the EXACT same face, hair, and facial features. Cockpit background.' },
    { key: 'astronaut', label: '太空人', prompt: 'Transform this woman into an astronaut wearing a white NASA-style spacesuit, helmet held under arm. Keep the EXACT same face, hair, and facial features. Space station background with Earth visible.' },
    { key: 'secretary', label: '秘書', prompt: 'Transform this woman into a secretary wearing a formal blouse and pencil skirt, holding a clipboard, professional look. Keep the EXACT same face, hair, and facial features. Modern office background.' },
    { key: 'office_lady', label: 'OL', prompt: 'Transform this woman into an office lady wearing a tailored business suit (blazer + skirt), holding a laptop. Keep the EXACT same face, hair, and facial features. Corporate office background.' },
    { key: 'accountant', label: '會計', prompt: 'Transform this woman into an accountant wearing glasses, formal business attire, with calculator and financial documents on desk. Keep the EXACT same face, hair, and facial features. Office desk background.' },
    { key: 'lawyer', label: '律師', prompt: 'Transform this woman into a lawyer wearing a dark tailored suit, holding legal documents, confident pose. Keep the EXACT same face, hair, and facial features. Courtroom or law office background.' },
    { key: 'reporter', label: '記者', prompt: 'Transform this woman into a news reporter wearing professional attire, holding a microphone with press badge, reporting on location. Keep the EXACT same face, hair, and facial features. Outdoor news scene background.' },
    { key: 'news_anchor', label: '主播', prompt: 'Transform this woman into a TV news anchor wearing elegant professional attire, sitting at a news desk with monitors behind. Keep the EXACT same face, hair, and facial features. News studio background.' },
    { key: 'director', label: '導演', prompt: 'Transform this woman into a film director wearing casual stylish clothes, holding a megaphone, next to a film camera. Keep the EXACT same face, hair, and facial features. Film set background.' },
    { key: 'photographer', label: '攝影師', prompt: 'Transform this woman into a photographer wearing casual trendy clothes, holding a professional DSLR camera with large lens. Keep the EXACT same face, hair, and facial features. Photography studio background.' },
    { key: 'librarian', label: '圖書館員', prompt: 'Transform this woman into a librarian wearing a cardigan, glasses, surrounded by bookshelves, holding a stack of books. Keep the EXACT same face, hair, and facial features. Library background.' },
    { key: 'security_guard', label: '保全', prompt: 'Transform this woman into a security guard wearing a dark uniform with badge, utility belt, walkie-talkie. Keep the EXACT same face, hair, and facial features. Building entrance background.' },
    { key: 'architect', label: '建築師', prompt: 'Transform this woman into an architect wearing smart casual attire with a hard hat, holding blueprints and architectural plans. Keep the EXACT same face, hair, and facial features. Construction site or office background.' },
    { key: 'engineer', label: '工程師', prompt: 'Transform this woman into an engineer wearing a safety vest and hard hat, holding technical blueprints, at a construction site. Keep the EXACT same face, hair, and facial features. Industrial site background.' },
    { key: 'scientist', label: '科學家', prompt: 'Transform this woman into a scientist wearing a white lab coat, safety goggles on forehead, holding a beaker with colored liquid. Keep the EXACT same face, hair, and facial features. Laboratory background with equipment.' },
    { key: 'athlete', label: '運動員', prompt: 'Transform this woman into an athlete wearing sporty tank top and shorts, athletic build, holding a medal or trophy. Keep the EXACT same face, hair, and facial features. Stadium or track field background.' },
    { key: 'coach', label: '教練', prompt: 'Transform this woman into a sports coach wearing a tracksuit, whistle around neck, holding a clipboard with game strategy. Keep the EXACT same face, hair, and facial features. Sports field background.' },
    { key: 'lifeguard', label: '救生員', prompt: 'Transform this woman into a lifeguard wearing a red swimsuit/rashguard with LIFEGUARD text, holding a rescue buoy. Keep the EXACT same face, hair, and facial features. Beach/pool background.' },
    { key: 'mail_carrier', label: '郵差', prompt: 'Transform this woman into a mail carrier wearing a blue postal uniform, carrying a mail bag full of letters. Keep the EXACT same face, hair, and facial features. Residential street background.' },
];

// ── 生成單張 ──
async function generateSingle(apiKey, basePath, prompt, outputPath, jobLabel) {
    const imageBuffer = fs.readFileSync(basePath);
    const base64Image = imageBuffer.toString('base64');
    const ext = path.extname(basePath).toLowerCase();
    const mimeType = (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
    const dataUri = `data:${mimeType};base64,${base64Image}`;

    console.log(`🎨 正在生成：${jobLabel}...`);

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

// ── 主程式 ──
async function main() {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
        console.error('❌ 未找到 XAI_API_KEY，請在 .env 中設定');
        process.exit(1);
    }

    const basePath = path.join(__dirname, '..', 'assets', 'previews', 'race', 'human.png');
    if (!fs.existsSync(basePath)) {
        console.error('❌ 基底圖不存在：' + basePath);
        process.exit(1);
    }

    const outputDir = path.join(__dirname, '..', 'assets', 'previews', 'job');

    // 解析參數
    const args = process.argv.slice(2);
    const force = args.includes('--force');
    let startIdx = 0, endIdx = JOBS.length - 1;
    let onlyKey = null;

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--start' && args[i + 1]) startIdx = parseInt(args[i + 1]);
        if (args[i] === '--end' && args[i + 1]) endIdx = parseInt(args[i + 1]);
        if (args[i] === '--only' && args[i + 1]) onlyKey = args[i + 1];
    }

    const jobsToGenerate = onlyKey
        ? JOBS.filter(j => j.key === onlyKey)
        : JOBS.slice(startIdx, endIdx + 1);

    if (jobsToGenerate.length === 0) {
        console.error('❌ 沒有找到符合條件的職業');
        process.exit(1);
    }

    console.log(`\n📋 準備生成 ${jobsToGenerate.length} 張職業預覽圖`);
    console.log(`📁 輸出目錄：${outputDir}`);
    console.log(`🖼️ 基底圖：${basePath}\n`);

    let success = 0, skip = 0, fail = 0;

    for (const job of jobsToGenerate) {
        const outputPath = path.join(outputDir, `${job.key}.png`);

        if (!force && fs.existsSync(outputPath)) {
            console.log(`⏭️ 已存在，跳過：${job.label} (${job.key})`);
            skip++;
            continue;
        }

        try {
            await generateSingle(apiKey, basePath, job.prompt, outputPath, `${job.label} (${job.key})`);
            success++;
            // 避免 API rate limit
            await new Promise(r => setTimeout(r, 2000));
        } catch (err) {
            console.error(`   ❌ 生成失敗：${job.label} — ${err.message}`);
            fail++;
        }
    }

    console.log(`\n📊 結果：✅ ${success} 成功 | ⏭️ ${skip} 跳過 | ❌ ${fail} 失敗`);
}

main().catch(err => {
    console.error('❌ 執行錯誤：', err);
    process.exit(1);
});
