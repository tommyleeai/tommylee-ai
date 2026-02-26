// ============================================
// Image Analyzer — 圖片分析生成提示詞模組
// 使用 Gemini Vision API 分析上傳圖片，自動產生 AI 繪圖提示詞
// 掛載至 window.PromptGen.ImageAnalyzer
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.ImageAnalyzer = (function () {
    'use strict';

    // ── 常數 ──
    const STORAGE_KEY = 'promptgen_gemini_api_key';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    // ── System Prompt：引導 Gemini 做 AI 繪圖 prompt 分析 ──
    const SYSTEM_PROMPT = `You are an expert AI image prompt engineer. Analyze the provided image and generate a detailed prompt suitable for AI image generation tools (Stable Diffusion, Midjourney, NovelAI).

Your output MUST be a single block of English tags/keywords separated by commas. Do NOT use sentences or paragraphs — only comma-separated descriptive tags.

Analyze and include tags for ALL of the following aspects (if visible):
1. **Subject**: gender, age appearance, race/species (human, elf, demon, etc.)
2. **Face & Expression**: facial features, expression, makeup
3. **Hair**: color, length, style (ponytail, twintails, bob cut, etc.)
4. **Eyes**: color, shape, special features
5. **Body**: body type, skin tone, notable features
6. **Clothing & Accessories**: outfit details, accessories, jewelry, headwear, footwear
7. **Pose & Action**: pose description, hand placement, body angle
8. **Art Style**: anime, realistic, semi-realistic, specific artist style, rendering style
9. **Background & Scene**: setting, environment, objects
10. **Atmosphere & Lighting**: mood, color palette, lighting direction, time of day
11. **Camera**: angle (front, side, 3/4), shot type (close-up, full body, portrait), depth of field
12. **Quality tags**: masterpiece, best quality, highly detailed, etc.

Example output format:
1girl, long blonde hair, blue eyes, elf ears, white dress, flower crown, sitting on grass, meadow background, soft sunlight, warm colors, fantasy art style, front view, upper body, masterpiece, best quality, highly detailed

IMPORTANT:
- Output ONLY the comma-separated tags, nothing else
- Start with quality tags and subject, then details
- Be specific and descriptive
- Use standard AI art prompt vocabulary
- Minimum 20 tags, maximum 60 tags`;

    // ── 狀態 ──
    let currentImageBase64 = null;
    let currentImageMimeType = null;
    let modal = null;

    // ── API Key 管理 ──
    function getApiKey() {
        return localStorage.getItem(STORAGE_KEY) || '';
    }

    function setApiKey(key) {
        if (key && key.trim()) {
            localStorage.setItem(STORAGE_KEY, key.trim());
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // ── 初始化 Modal ──
    function init() {
        modal = document.getElementById('image-analyzer-modal');
        if (!modal) return;

        const btnOpen = document.getElementById('btn-image-analyzer');
        const btnClose = document.getElementById('btn-close-image-analyzer');
        const uploadZone = modal.querySelector('.ia-upload-zone');
        const fileInput = modal.querySelector('#ia-file-input');
        const previewContainer = modal.querySelector('.ia-preview-container');
        const previewImg = modal.querySelector('#ia-preview-img');
        const btnRemove = modal.querySelector('.ia-preview-remove');
        const btnAnalyze = modal.querySelector('.ia-analyze-btn');
        const resultArea = modal.querySelector('.ia-result-area');
        const resultBox = modal.querySelector('.ia-result-box');
        const btnApply = modal.querySelector('.ia-btn-apply');
        const btnCopy = modal.querySelector('.ia-btn-copy');
        const errorDiv = modal.querySelector('.ia-error');
        const apikeyHint = modal.querySelector('.ia-apikey-hint');
        const tokenInfo = modal.querySelector('.ia-token-info');

        // 開啟 Modal
        if (btnOpen) {
            btnOpen.addEventListener('click', function () {
                // 檢查 API Key
                if (!getApiKey()) {
                    apikeyHint.classList.add('active');
                } else {
                    apikeyHint.classList.remove('active');
                }
                modal.classList.add('active');
                if (window.PromptGen.ModalRegistry) {
                    window.PromptGen.ModalRegistry.register('image-analyzer-modal');
                }
            });
        }

        // 「前往設定」連結
        const gotoSettingsLink = document.getElementById('ia-goto-settings');
        if (gotoSettingsLink) {
            gotoSettingsLink.addEventListener('click', function () {
                closeModal();
                // 開啟 Settings Modal
                const settingsBtn = document.getElementById('btn-settings');
                if (settingsBtn) settingsBtn.click();
            });
        }

        // 關閉 Modal
        if (btnClose) {
            btnClose.addEventListener('click', closeModal);
        }
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });

        // 上傳區域：點擊
        if (uploadZone) {
            uploadZone.addEventListener('click', function () {
                fileInput.click();
            });

            // 拖放
            uploadZone.addEventListener('dragover', function (e) {
                e.preventDefault();
                uploadZone.classList.add('drag-over');
            });
            uploadZone.addEventListener('dragleave', function () {
                uploadZone.classList.remove('drag-over');
            });
            uploadZone.addEventListener('drop', function (e) {
                e.preventDefault();
                uploadZone.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) handleFile(files[0]);
            });
        }

        // 檔案選擇
        if (fileInput) {
            fileInput.addEventListener('change', function () {
                if (this.files.length > 0) handleFile(this.files[0]);
            });
        }

        // 貼上圖片
        modal.addEventListener('paste', function (e) {
            const items = e.clipboardData && e.clipboardData.items;
            if (!items) return;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.startsWith('image/')) {
                    e.preventDefault();
                    handleFile(items[i].getAsFile());
                    return;
                }
            }
        });

        // 移除圖片
        if (btnRemove) {
            btnRemove.addEventListener('click', function (e) {
                e.stopPropagation();
                resetImage();
            });
        }

        // 分析按鈕
        if (btnAnalyze) {
            btnAnalyze.addEventListener('click', function () {
                analyzeImage();
            });
        }

        // 套用按鈕
        if (btnApply) {
            btnApply.addEventListener('click', function () {
                const text = resultBox.textContent;
                if (!text) return;
                const outputEl = document.getElementById('final-prompt');
                if (outputEl) {
                    outputEl.textContent = text;
                    // 觸發音效
                    if (window.PromptGen._sfx) {
                        window.PromptGen._sfx.playSuccess();
                    }
                }
                closeModal();
            });
        }

        // 複製按鈕
        if (btnCopy) {
            btnCopy.addEventListener('click', function () {
                const text = resultBox.textContent;
                if (!text) return;
                navigator.clipboard.writeText(text).then(function () {
                    const origHTML = btnCopy.innerHTML;
                    btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> 已複製';
                    setTimeout(function () { btnCopy.innerHTML = origHTML; }, 1500);
                    if (window.PromptGen._sfx) {
                        window.PromptGen._sfx.playSuccess();
                    }
                });
            });
        }

        // Settings 中的 API Key 輸入框同步
        const settingsKeyInput = document.getElementById('setting-gemini-key');
        if (settingsKeyInput) {
            settingsKeyInput.value = getApiKey();
        }

        // 處理檔案
        function handleFile(file) {
            if (!file.type.startsWith('image/')) {
                showError('請上傳圖片檔案（PNG, JPG, WEBP）');
                return;
            }
            // 限制 10MB
            if (file.size > 10 * 1024 * 1024) {
                showError('圖片大小不能超過 10MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                const dataUrl = e.target.result;
                currentImageMimeType = file.type;
                // 提取 base64 部分
                currentImageBase64 = dataUrl.split(',')[1];

                previewImg.src = dataUrl;
                previewContainer.classList.add('active');
                uploadZone.style.display = 'none';
                btnAnalyze.disabled = false;

                // 清除之前的結果
                resultArea.classList.remove('active');
                errorDiv.classList.remove('active');
                tokenInfo.classList.remove('active');
            };
            reader.readAsDataURL(file);
        }

        // 重置圖片
        function resetImage() {
            currentImageBase64 = null;
            currentImageMimeType = null;
            previewImg.src = '';
            previewContainer.classList.remove('active');
            uploadZone.style.display = '';
            btnAnalyze.disabled = true;
            resultArea.classList.remove('active');
            errorDiv.classList.remove('active');
            tokenInfo.classList.remove('active');
            fileInput.value = '';
        }

        // 分析圖片
        async function analyzeImage() {
            const apiKey = getApiKey();
            if (!apiKey) {
                apikeyHint.classList.add('active');
                showError('請先在「設定」中輸入 Gemini API Key');
                return;
            }
            if (!currentImageBase64) {
                showError('請先上傳圖片');
                return;
            }

            // UI: loading 狀態
            btnAnalyze.classList.add('loading');
            btnAnalyze.disabled = true;
            errorDiv.classList.remove('active');
            resultArea.classList.remove('active');
            tokenInfo.classList.remove('active');

            try {
                const requestBody = {
                    contents: [{
                        parts: [
                            { text: SYSTEM_PROMPT },
                            {
                                inline_data: {
                                    mime_type: currentImageMimeType,
                                    data: currentImageBase64
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 2048,
                        topP: 0.9
                    }
                };

                const response = await fetch(API_URL + '?key=' + apiKey, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    const errData = await response.json().catch(function () { return {}; });
                    const errMsg = (errData.error && errData.error.message) || response.statusText;
                    if (response.status === 400 && errMsg.includes('API key')) {
                        throw new Error('API Key 無效，請在「設定」中重新輸入');
                    }
                    throw new Error('API 錯誤 (' + response.status + '): ' + errMsg);
                }

                const data = await response.json();

                // 提取回應文字
                let resultText = '';
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    const parts = data.candidates[0].content.parts;
                    resultText = parts.map(function (p) { return p.text || ''; }).join('');
                }

                if (!resultText) {
                    throw new Error('API 未回傳有效內容');
                }

                // 清理結果：去除可能的 markdown code blocks
                resultText = resultText.replace(/```[\s\S]*?```/g, '').trim();
                resultText = resultText.replace(/^[\s\n]*/, '').replace(/[\s\n]*$/, '');

                resultBox.textContent = resultText;
                resultArea.classList.add('active');

                // Token info
                if (data.usageMetadata) {
                    const input = data.usageMetadata.promptTokenCount || 0;
                    const output = data.usageMetadata.candidatesTokenCount || 0;
                    tokenInfo.textContent = '📊 Input: ' + input + ' tokens | Output: ' + output + ' tokens | Total: ' + (input + output);
                    tokenInfo.classList.add('active');
                }

                // 音效
                if (window.PromptGen._sfx) {
                    window.PromptGen._sfx.playSuccess();
                }

            } catch (err) {
                showError(err.message);
            } finally {
                btnAnalyze.classList.remove('loading');
                btnAnalyze.disabled = !currentImageBase64;
            }
        }

        // 顯示錯誤
        function showError(msg) {
            errorDiv.textContent = '❌ ' + msg;
            errorDiv.classList.add('active');
        }

        // 關閉 Modal
        function closeModal() {
            modal.classList.remove('active');
            if (window.PromptGen.ModalRegistry) {
                window.PromptGen.ModalRegistry.unregister('image-analyzer-modal');
            }
        }
    }

    // ── Settings 儲存 hook（由 script.js 呼叫）──
    function saveApiKeyFromSettings() {
        const input = document.getElementById('setting-gemini-key');
        if (input) {
            setApiKey(input.value);
        }
    }

    // ── Settings 載入 hook ──
    function loadApiKeyToSettings() {
        const input = document.getElementById('setting-gemini-key');
        if (input) {
            input.value = getApiKey();
        }
    }

    // ── 公開 API ──
    return {
        init: init,
        getApiKey: getApiKey,
        setApiKey: setApiKey,
        saveApiKeyFromSettings: saveApiKeyFromSettings,
        loadApiKeyToSettings: loadApiKeyToSettings
    };
})();
