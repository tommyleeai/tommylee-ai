/**
 * 快速截圖工具 — 用 Puppeteer (headless Chrome) 截圖
 * 
 * 用法：
 *   node screenshot.js                          → 截 http://localhost:5050 全頁
 *   node screenshot.js http://localhost:5050     → 指定 URL
 *   node screenshot.js http://localhost:5050 header  → 只截頂部 800px
 */

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const url = process.argv[2] || 'http://localhost:5050';
    const mode = process.argv[3] || 'full'; // 'full' 或 'header'
    const outputFile = path.join(__dirname, 'screenshot.png');

    console.log(`📸 正在截圖: ${url} (模式: ${mode})`);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

        if (mode === 'header') {
            // 只截頂部
            await page.screenshot({
                path: outputFile,
                clip: { x: 0, y: 0, width: 1920, height: 800 }
            });
        } else {
            // 全頁截圖
            await page.screenshot({
                path: outputFile,
                fullPage: true
            });
        }

        console.log(`✅ 截圖已存檔: ${outputFile}`);
    } catch (err) {
        console.error('❌ 截圖失敗:', err.message);
    } finally {
        await browser.close();
    }
})();
