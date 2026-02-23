// ============================================
// AI Prompt Generator — Fate Wheel Modal
// openFateWheelModal() 函式
// 模組化自 demos/fate-wheel-v8-demo.html
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.FateWheelModal = (function () {
    // Dependencies injected via setup()
    let appState, sfx, generatePrompt, generatePromptPlain, saveState, renderTabContent;

    function setup(deps) {
        appState = deps.state;
        sfx = deps.sfx;
        generatePrompt = deps.generatePrompt;
        generatePromptPlain = deps.generatePromptPlain;
        saveState = deps.saveState;
        renderTabContent = deps.renderTabContent;
    }

    // ========================================
    // SECTIONS DATA (中文化 {tag, display})
    // ========================================
    const SECTIONS = {
        outer: [
            {
                id: 'race', title: '種族', stateKey: 'race', avg: 3.9, bonus: true,
                options: [
                    { tag: 'elf, pointed ears, ethereal beauty', display: '精靈' },
                    { tag: 'vampire, pale skin, fangs, red eyes', display: '吸血鬼' },
                    { tag: 'demon, horns, dark aura, tail', display: '惡魔' },
                    { tag: 'angel, halo, white wings, divine', display: '天使' },
                    { tag: 'human', display: '人類' },
                    { tag: 'dwarf, short, stocky, beard', display: '矮人' },
                    { tag: 'orc, green skin, tusks, muscular', display: '獸人' },
                    { tag: 'catgirl, cat ears, cat tail, playful', display: '貓娘' },
                    { tag: 'fox spirit, fox ears, fox tail, mystical', display: '狐仙' },
                    { tag: 'dragon, horns, scales, dragon wings, tail', display: '龍人' }
                ]
            },
            {
                id: 'job', title: '職業', stateKey: 'job', avg: 3.0, bonus: true,
                options: [
                    { tag: 'knight, armor, sword', display: '騎士' },
                    { tag: 'mage, robes, magical staff', display: '魔法師' },
                    { tag: 'assassin, dark cloak, dagger', display: '刺客' },
                    { tag: 'priest, holy robes, staff', display: '牧師' },
                    { tag: 'archer, bow, quiver', display: '弓箭手' },
                    { tag: 'samurai, katana, hakama', display: '武士' },
                    { tag: 'pirate, captain coat, cutlass', display: '海盜' },
                    { tag: 'alchemist, goggles, potions', display: '煉金術士' },
                    { tag: 'necromancer, dark magic, skeleton', display: '死靈法師' },
                    { tag: 'paladin, holy armor, divine sword', display: '聖騎士' }
                ]
            },
            {
                id: 'hairstyle', title: '髮型', stateKey: 'hairstyle', avg: 1.0, bonus: true,
                options: [
                    { tag: 'long hair', display: '長髮' },
                    { tag: 'short hair', display: '短髮' },
                    { tag: 'twin tails', display: '雙馬尾' },
                    { tag: 'ponytail', display: '馬尾' },
                    { tag: 'braid', display: '辮子' },
                    { tag: 'bob cut', display: '鮑伯頭' },
                    { tag: 'wavy hair', display: '波浪捲' },
                    { tag: 'straight hair', display: '直髮' },
                    { tag: 'messy hair', display: '亂髮' },
                    { tag: 'side ponytail', display: '側馬尾' }
                ]
            },
            {
                id: 'bodyType', title: '身材', stateKey: 'bodyType', avg: 1.3,
                options: [
                    { tag: 'slim body', display: '纖細' },
                    { tag: 'athletic body', display: '健美' },
                    { tag: 'petite body', display: '嬌小' },
                    { tag: 'muscular body', display: '筋肉' },
                    { tag: 'tall body', display: '高大' },
                    { tag: 'curvy body', display: '豐腴' },
                    { tag: 'slender body', display: '修長' },
                    { tag: 'average body', display: '標準' }
                ]
            },
            {
                id: 'hairColor', title: '髮色', stateKey: 'hairColor', avg: 1.0,
                options: [
                    { tag: 'blonde hair', display: '金髮' },
                    { tag: 'silver hair', display: '銀髮' },
                    { tag: 'black hair', display: '黑髮' },
                    { tag: 'red hair', display: '紅髮' },
                    { tag: 'blue hair', display: '藍髮' },
                    { tag: 'pink hair', display: '粉髮' },
                    { tag: 'white hair', display: '白髮' },
                    { tag: 'brown hair', display: '棕髮' },
                    { tag: 'green hair', display: '綠髮' },
                    { tag: 'purple hair', display: '紫髮' },
                    { tag: 'gradient hair', display: '漸層髮' }
                ]
            },
            {
                id: 'eyeColor', title: '眼色', stateKey: 'eyeColor', avg: 1.0,
                options: [
                    { tag: 'blue eyes', display: '藍眼' },
                    { tag: 'red eyes', display: '紅眼' },
                    { tag: 'green eyes', display: '綠眼' },
                    { tag: 'golden eyes', display: '金眼' },
                    { tag: 'purple eyes', display: '紫眼' },
                    { tag: 'heterochromia', display: '異色瞳' },
                    { tag: 'silver eyes', display: '銀眼' }
                ]
            },
            {
                id: 'outfit', title: '服裝', stateKey: 'outfit', avg: 2.7, bonus: true,
                options: [
                    { tag: 'school uniform, sailor collar', display: '水手服' },
                    { tag: 'gothic lolita dress, frills', display: '哥德蘿莉' },
                    { tag: 'kimono, obi, traditional', display: '和服' },
                    { tag: 'armor, plate armor', display: '盔甲' },
                    { tag: 'maid outfit, apron', display: '女僕裝' },
                    { tag: 'wedding dress, white gown', display: '婚紗' },
                    { tag: 'casual clothes, t-shirt, jeans', display: '便服' },
                    { tag: 'military uniform, medals', display: '軍裝' },
                    { tag: 'chinese dress, cheongsam', display: '旗袍' },
                    { tag: 'cyberpunk outfit, neon accents', display: '賽博龐克' }
                ]
            },
            {
                id: 'headwear', title: '頭飾', stateKey: 'headwear', avg: 2.6, bonus: true,
                options: [
                    { tag: 'crown, tiara', display: '皇冠' },
                    { tag: 'witch hat, pointed', display: '巫師帽' },
                    { tag: 'hair ribbon, bow', display: '髮帶' },
                    { tag: 'flower crown, floral', display: '花冠' },
                    { tag: 'cat ears headband', display: '貓耳' },
                    { tag: 'horns, demon horns', display: '角飾' },
                    { tag: 'beret, cute hat', display: '貝雷帽' },
                    { tag: 'maid headband, lace', display: '蕾絲頭飾' }
                ]
            },
            {
                id: 'expression', title: '表情', stateKey: 'expression', avg: 2.9,
                options: [
                    { tag: 'warm smile, kind expression, gentle eyes', display: '溫柔微笑' },
                    { tag: 'yandere smile, unsettling smile, crazy eyes', display: '病嬌笑容' },
                    { tag: 'cold stare, indifferent gaze, detached', display: '冷漠凝視' },
                    { tag: 'blushing, red cheeks, embarrassed', display: '害羞臉紅' },
                    { tag: 'crying, tears streaming, sad', display: '流淚哭泣' },
                    { tag: 'wide eyes, surprised, shocked', display: '驚訝震撼' },
                    { tag: 'smirking, confident, smug', display: '自信壞笑' },
                    { tag: 'expressionless, blank face, poker face', display: '面無表情' }
                ]
            },
            {
                id: 'mood', title: '心情', stateKey: 'mood', avg: 2.2,
                options: [
                    { tag: 'happy, joyful', display: '開心' },
                    { tag: 'confident, smug', display: '自信' },
                    { tag: 'shy, blushing', display: '害羞' },
                    { tag: 'angry, furious', display: '憤怒' },
                    { tag: 'sad, crying, tears', display: '悲傷' },
                    { tag: 'excited, energetic', display: '興奮' },
                    { tag: 'calm', display: '平靜' },
                    { tag: 'romantic, love', display: '浪漫' },
                    { tag: 'lonely, alone', display: '孤獨' }
                ]
            },
            {
                id: 'pose', title: '姿勢', stateKey: 'pose', avg: 3.2,
                options: [
                    { tag: 'standing, front view, upright posture', display: '站立正面' },
                    { tag: 'sitting cross-legged, indian style, lotus position', display: '盤腿而坐' },
                    { tag: 'holding weapon, battle ready, combat stance with weapon', display: '持武戰姿' },
                    { tag: 'running, sprinting, running pose, dynamic movement', display: '奔跑衝刺' },
                    { tag: 'arms crossed, crossed arms, standing with folded arms', display: '雙手交叉' },
                    { tag: 'looking over shoulder, turning to look back, glance behind', display: '回眸一望' },
                    { tag: 'hands on hips, confident standing pose', display: '叉腰站立' },
                    { tag: 'sitting on throne, royal seat, king on throne', display: '端坐王座' }
                ]
            },
            {
                id: 'atmosphere', title: '氛圍', stateKey: 'atmosphere', avg: 1.7,
                options: [
                    { tag: 'sunny, clear sky', display: '晴空萬里' },
                    { tag: 'heavy rain, storm', display: '暴風雨' },
                    { tag: 'snowing, winter', display: '飄雪冬景' },
                    { tag: 'foggy, mist', display: '迷霧瀰漫' },
                    { tag: 'lightning, thunder', display: '雷電交加' },
                    { tag: 'sunset, golden hour', display: '金色夕陽' },
                    { tag: 'midnight, moon', display: '月夜深邃' },
                    { tag: 'dawn, sunrise', display: '破曉晨光' }
                ]
            },
            {
                id: 'lighting', title: '光影', stateKey: 'lighting', avg: 1.0,
                options: [
                    { tag: 'natural light', display: '自然光' },
                    { tag: 'cinematic lighting', display: '電影光' },
                    { tag: 'volumetric lighting', display: '體積光' },
                    { tag: 'rim lighting', display: '輪廓光' },
                    { tag: 'backlighting', display: '逆光' },
                    { tag: 'neon lights', display: '霓虹光' },
                    { tag: 'soft lighting', display: '柔光' }
                ]
            },
            {
                id: 'focalLength', title: '焦段', stateKey: 'focalLength', avg: 1.0,
                options: [
                    { tag: 'standard lens', display: '標準鏡頭' },
                    { tag: 'wide angle', display: '廣角' },
                    { tag: 'telephoto', display: '長焦' },
                    { tag: 'medium telephoto', display: '中長焦' },
                    { tag: 'ultra wide angle', display: '超廣角' }
                ]
            },
            {
                id: 'lensEffect', title: '鏡效', stateKey: 'lensEffect', avg: 1.1,
                options: [
                    { tag: 'depth of field, bokeh', display: '景深散景' },
                    { tag: 'motion blur', display: '動態模糊' },
                    { tag: 'lens flare', display: '鏡頭光暈' },
                    { tag: 'film grain', display: '膠片顆粒' },
                    { tag: 'sharp focus', display: '銳利對焦' },
                    { tag: 'chromatic aberration', display: '色差效果' }
                ]
            },
            {
                id: 'quality', title: '品質', stateKey: 'quality', avg: 1.3, isMulti: true,
                options: [
                    { tag: 'masterpiece', display: '傑作' },
                    { tag: 'masterpiece, best quality', display: '傑作+精品' },
                    { tag: 'masterpiece, highres', display: '傑作+高解析' },
                    { tag: 'best quality, 8k', display: '精品 8K' },
                    { tag: 'masterpiece, best quality, highres', display: '傑作+精品+高解析' }
                ]
            }
        ],
        inner: [
            {
                id: 'animeStyle', title: '動漫風', stateKey: 'animeStyle',
                options: [
                    { tag: 'studio ghibli style, by hayao miyazaki', display: '吉卜力風' },
                    { tag: 'by makoto shinkai', display: '新海誠風' },
                    { tag: 'kyoto animation style', display: '京阿尼風' },
                    { tag: 'ufotable style', display: '飛碟社風' },
                    { tag: 'by koyoharu gotouge, demon slayer style', display: '鬼滅風' }
                ]
            },
            {
                id: 'handItems', title: '手持', stateKey: 'handItem', bonus: true,
                options: [
                    { tag: 'sword, holding weapon', display: '持劍' },
                    { tag: 'magic staff, glowing orb', display: '法杖' },
                    { tag: 'book, reading', display: '書本' },
                    { tag: 'umbrella, holding umbrella', display: '撐傘' },
                    { tag: 'guitar, playing music', display: '吉他' },
                    { tag: 'dual swords, glowing blade, flame sword', display: '雙刀' },
                    { tag: 'bow and arrow, quiver', display: '弓箭' },
                    { tag: 'gun, pistol, revolver', display: '手槍' }
                ]
            },
            {
                id: 'aperture', title: '光圈', stateKey: 'aperture',
                options: [
                    { tag: 'large aperture, f/1.8, shallow depth of field, bokeh', display: '大光圈 f/1.8' },
                    { tag: 'medium aperture, f/8', display: '中光圈 f/8' },
                    { tag: 'small aperture, f/16, deep depth of field', display: '小光圈 f/16' }
                ]
            },
            {
                id: 'cameraAngle', title: '角度', stateKey: 'cameraAngle',
                options: [
                    { tag: 'eye level', display: '平視' },
                    { tag: 'from above, high angle', display: '俯角' },
                    { tag: 'from below, low angle', display: '仰角' },
                    { tag: 'from side, profile', display: '側面' },
                    { tag: 'dynamic angle', display: '動態角度' },
                    { tag: 'from behind, back view', display: '背面' }
                ]
            },
            {
                id: 'scene', title: '場景', stateKey: 'scene',
                options: [
                    { tag: 'cherry blossom, school, sunset', display: '櫻花校園' },
                    { tag: 'magical forest, glowing plants', display: '魔法森林' },
                    { tag: 'city street, neon lights, night', display: '霓虹夜街' },
                    { tag: 'castle, fantasy', display: '奇幻城堡' },
                    { tag: 'post-apocalyptic ruins', display: '廢墟末世' },
                    { tag: 'beach, ocean, sunset', display: '黃昏海灘' }
                ]
            },
            {
                id: 'shotSize', title: '鏡頭', stateKey: 'shotSize',
                options: [
                    { tag: 'cowboy shot', display: '牛仔鏡頭' },
                    { tag: 'full shot', display: '全身鏡頭' },
                    { tag: 'close-up', display: '特寫' },
                    { tag: 'medium close-up shot', display: '中特寫' },
                    { tag: 'extreme close-up', display: '超特寫' }
                ]
            },
            {
                id: 'artist', title: '畫家', stateKey: 'artist',
                options: [
                    { tag: 'by greg rutkowski', display: 'Rutkowski' },
                    { tag: 'by wlop', display: 'WLOP' },
                    { tag: 'by artgerm', display: 'Artgerm' },
                    { tag: 'by ilya kuvshinov', display: 'Kuvshinov' },
                    { tag: 'by alphonse mucha', display: 'Mucha' }
                ]
            },
            {
                id: 'artStyle', title: '藝術風', stateKey: 'artStyle',
                options: [
                    { tag: 'realistic, photorealistic', display: '寫實風' },
                    { tag: 'watercolor medium, soft edges', display: '水彩風' },
                    { tag: 'oil painting style, thick impasto', display: '油畫風' },
                    { tag: 'cyberpunk style, neon lights', display: '賽博龐克' },
                    { tag: 'pixel art, 16-bit', display: '像素風' },
                    { tag: 'ink wash painting, sumi-e', display: '水墨風' }
                ]
            }
        ],
        center: { id: 'gender', title: '性別' }
    };

    // ========================================
    // 動態選項池：從 options-data.js 讀取
    // 硬編碼 options 作為 fallback
    // ========================================
    const DATA_SOURCES = {
        race: 'RACES',
        job: 'JOBS',
        hairstyle: ['HAIRSTYLES_FEMALE', 'HAIRSTYLES_MALE'],
        bodyType: ['BODY_TYPES_FEMALE', 'BODY_TYPES_MALE'],
        hairColor: 'HAIR_COLORS',
        eyeColor: 'EYE_COLORS',
        outfit: 'OUTFITS',
        headwear: 'HEADWEAR',
        expression: 'EXPRESSIONS',
        mood: 'MOODS',
        pose: 'POSES',
        atmosphere: 'WEATHER',
        lighting: 'LIGHTING',
        focalLength: 'FOCAL_LENGTHS',
        lensEffect: 'LENS_EFFECTS',
        aperture: 'APERTURES',
        cameraAngle: 'CAMERA_ANGLES',
        shotSize: 'SHOT_SIZES',
        scene: 'SCENES',
        artist: 'ARTISTS',
        artStyle: 'ART_STYLES',
        animeStyle: 'ANIME_STYLES',
        handItems: 'HAND_ITEMS'
        // quality 保留硬編碼（輪盤使用複合值如 "masterpiece, best quality"）
    };

    function getOptionsPool(section) {
        const Data = window.PromptGen && window.PromptGen.Data;
        if (!Data) return section.options;

        const source = DATA_SOURCES[section.id];
        if (!source) return section.options;

        let items;
        if (Array.isArray(source)) {
            // 合併多個陣列（如男女髮型）
            items = source.reduce((acc, key) => acc.concat(Data[key] || []), []);
        } else {
            items = Data[source];
        }

        if (!items || !items.length) return section.options;

        return items.map(item => ({
            tag: item.value,
            display: item.label || item.en
        }));
    }

    // Grid positions
    const OUTER_PATH = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 4], [2, 4], [3, 4],
        [4, 4], [4, 3], [4, 2], [4, 1], [4, 0],
        [3, 0], [2, 0], [1, 0]
    ];
    const INNER_PATH = [
        [1, 1], [2, 1], [3, 1],
        [3, 2], [3, 3],
        [2, 3], [1, 3],
        [1, 2]
    ];
    const CENTER_POS = [2, 2];
    const BONUS_EXTRA_TAGS = 5;
    const GENDERS = ['1girl', '1boy'];
    const DIMENSIONS = ['anime', 'fantasy', 'sci-fi', 'dark fantasy', 'cyberpunk', 'steampunk'];

    // Star weights: 10★=1%, 9★=3%, 8★=6%, 7★=10%, 6★=15%, 5★=20%, 4-1★=11.25%
    const STAR_WEIGHTS = [0, 11.25, 11.25, 11.25, 11.25, 20, 15, 10, 6, 3, 1];
    const TAG_RANGES = [
        null,
        [10, 21], [22, 26], [27, 31], [32, 36], [37, 41],
        [42, 46], [47, 52], [53, 58], [59, 66], [67, 85]
    ];
    const STAR_TITLES = ['', '凡人', '見習生', '冒險者', '勇者', '精英', '英雄', '傳說', '神話', '創世', '次元之神'];
    const STAR_COLORS = ['', '#64748b', '#94a3b8', '#10b981', '#22d3ee', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#fbbf24'];

    // ========================================
    // openFateWheelModal — 主入口
    // ========================================
    function openFateWheelModal() {
        // 清除舊 modal（如果有的話）
        const existing = document.getElementById('fw-overlay');
        if (existing) existing.remove();

        // 內部 state
        const ws = {
            phase: 'idle',
            cells: new Array(25).fill(null),
            currentLight: 0,
            speed: 30,
            timer: null,
            locksRemaining: 3,
            totalTags: 0,
            autoStopTimer: null,
            pregenResults: null,
            pregenStars: 0,
            pregenTotalTags: 0
        };

        // === 建立 DOM ===
        const overlay = document.createElement('div');
        overlay.id = 'fw-overlay';
        overlay.className = 'fate-wheel-overlay';

        overlay.innerHTML = `
            <button class="fw-close-btn" id="fw-close-btn"><i class="fa-solid fa-xmark"></i></button>
            <h1 class="fw-title">☸ 運命の輪盤</h1>
            <p class="fw-subtitle">轉動命運，隨機生成角色設定</p>
            <div class="fw-game-container" id="fw-gameContainer">
                <div class="fw-grid" id="fw-grid"></div>
                <div class="fw-controls">
                    <div class="fw-phase-indicator">
                        <div class="fw-phase-dot" id="fw-phase1Dot"></div>
                        <span class="fw-phase-label">外圈</span>
                        <div class="fw-phase-dot" id="fw-phase2Dot"></div>
                        <span class="fw-phase-label">內圈</span>
                        <div class="fw-phase-dot" id="fw-phase3Dot"></div>
                        <span class="fw-phase-label">中心</span>
                    </div>
                    <div class="fw-lever-container">
                        <button class="fw-lever-btn" id="fw-leverBtn">
                            <i class="fa-solid fa-play"></i> 啟動輪盤
                        </button>
                    </div>
                    <div class="fw-hint">按 <kbd>Space</kbd> 或點按鈕停止轉盤</div>
                </div>
                <div class="fw-star-section" id="fw-starSection">
                    <div class="fw-tag-count" id="fw-tagCount"></div>
                    <div class="fw-star-row" id="fw-starRow"></div>
                    <div class="fw-star-title" id="fw-starTitle"></div>
                </div>
                <div class="fw-lock-section" id="fw-lockSection">
                    <div class="fw-lock-info">
                        選擇最多 <span class="fw-lock-count">3</span> 格鎖定（剩餘 <span id="fw-lockRemain">3</span> 格）
                    </div>
                    <div class="fw-lock-actions">
                        <button class="fw-btn-skip" id="fw-btnSkip">跳過鎖定</button>
                        <button class="fw-btn-confirm" id="fw-btnConfirm">
                            <i class="fa-solid fa-check"></i> 確認使用
                        </button>
                    </div>
                </div>
            </div>
            <div class="fw-particles" id="fw-particles"></div>
            <div class="fw-flash-overlay" id="fw-flashOverlay"></div>
        `;

        document.body.appendChild(overlay);

        // Play open sound
        if (sfx) sfx.playClick();

        // === Build Grid ===
        buildGrid();

        // === Event Bindings ===
        document.getElementById('fw-leverBtn').addEventListener('click', handleLever);
        document.getElementById('fw-close-btn').addEventListener('click', closeModal);
        document.getElementById('fw-btnSkip').addEventListener('click', handleSkipLock);
        document.getElementById('fw-btnConfirm').addEventListener('click', handleConfirm);

        // Overlay click to close (only when idle)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay && (ws.phase === 'idle' || ws.phase === 'lock')) {
                closeModal();
            }
        });

        // === Konami Code 秘密指令 ===
        const KONAMI_SEQUENCE = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiProgress = 0;

        function activateKonami() {
            ws.konamiActive = true;
            konamiProgress = 0;

            // 音效：神秘解鎖音
            if (sfx && sfx.initialized && !sfx.isMuted) {
                if (sfx.ctx.state === 'suspended') sfx.ctx.resume();
                const t = sfx.ctx.currentTime;
                const mg = sfx.masterGain;
                // 上行琶音（C5 → E5 → G5 → C6）
                [523, 659, 784, 1047].forEach((f, i) => {
                    const o = sfx.ctx.createOscillator();
                    const g = sfx.ctx.createGain();
                    o.type = 'triangle';
                    o.frequency.setValueAtTime(f, t + i * 0.08);
                    g.gain.setValueAtTime(0.2, t + i * 0.08);
                    g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
                    o.connect(g); g.connect(mg);
                    o.start(t + i * 0.08); o.stop(t + i * 0.08 + 0.3);
                });
                // 最後一個加強音
                const o2 = sfx.ctx.createOscillator();
                const g2 = sfx.ctx.createGain();
                o2.type = 'sine';
                o2.frequency.setValueAtTime(1047, t + 0.35);
                g2.gain.setValueAtTime(0.3, t + 0.35);
                g2.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
                o2.connect(g2); g2.connect(mg);
                o2.start(t + 0.35); o2.stop(t + 0.9);
            }

            // 視覺回饋：短暫金色閃光 + 文字提示
            const overlay = document.getElementById('fw-overlay');
            if (overlay) {
                const hint = document.createElement('div');
                hint.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
                    'font-size:28px;font-weight:900;color:#fbbf24;text-shadow:0 0 20px #fbbf24,0 0 40px #a855f7;' +
                    'pointer-events:none;z-index:100000;opacity:0;transition:opacity 0.3s;font-family:monospace;';
                hint.textContent = '★ SECRET MODE ★';
                document.body.appendChild(hint);
                requestAnimationFrame(() => {
                    hint.style.opacity = '1';
                    setTimeout(() => {
                        hint.style.opacity = '0';
                        setTimeout(() => hint.remove(), 400);
                    }, 1200);
                });
            }
        }

        // Keyboard handler
        function keyHandler(e) {
            // 星級動畫播放中禁止任何按鍵操作
            if (ws.phase === 'stars' || ws.phase === 'center' || ws.phase === 'revealing-outer' || ws.phase === 'revealing-inner') {
                e.preventDefault();
                return;
            }

            // Konami Code 序列偵測
            if (e.code === KONAMI_SEQUENCE[konamiProgress]) {
                konamiProgress++;
                if (konamiProgress === KONAMI_SEQUENCE.length) {
                    activateKonami();
                }
            } else {
                // 允許重新開始（如果按的是序列第一個）
                konamiProgress = (e.code === KONAMI_SEQUENCE[0]) ? 1 : 0;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                handleLever();
            }
            if (e.code === 'Escape') {
                if (ws.phase === 'idle' || ws.phase === 'lock') {
                    closeModal();
                }
            }
        }
        document.addEventListener('keydown', keyHandler);

        // === Audio ===
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        let audioCtx;
        function initAudio() {
            if (!audioCtx) audioCtx = new AudioCtx();
        }

        function playTick(pitch = 800) {
            try {
                initAudio();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain); gain.connect(audioCtx.destination);
                osc.frequency.value = pitch;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
                osc.start(); osc.stop(audioCtx.currentTime + 0.08);
            } catch (e) { }
        }

        function playReveal() {
            try {
                initAudio();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain); gain.connect(audioCtx.destination);
                osc.frequency.setValueAtTime(600, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
                osc.type = 'triangle';
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc.start(); osc.stop(audioCtx.currentTime + 0.15);
            } catch (e) { }
        }

        function playBonus() {
            try {
                initAudio();
                [800, 1000, 1200].forEach((f, i) => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain); gain.connect(audioCtx.destination);
                    osc.frequency.value = f;
                    osc.type = 'sine';
                    const t = audioCtx.currentTime + i * 0.1;
                    gain.gain.setValueAtTime(0.08, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
                    osc.start(t); osc.stop(t + 0.15);
                });
            } catch (e) { }
        }

        function playStarSound(stars) {
            try {
                initAudio();
                const baseFreq = 400 + stars * 50;
                for (let i = 0; i < Math.min(stars, 5); i++) {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain); gain.connect(audioCtx.destination);
                    osc.frequency.value = baseFreq + i * 100;
                    osc.type = stars >= 7 ? 'triangle' : 'sine';
                    const t = audioCtx.currentTime + i * 0.08;
                    gain.gain.setValueAtTime(0.1, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                    osc.start(t); osc.stop(t + 0.3);
                }
            } catch (e) { }
        }

        function playVictory() {
            try {
                initAudio();
                const notes = [523, 659, 784, 1047, 784, 1047];
                notes.forEach((f, i) => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain); gain.connect(audioCtx.destination);
                    osc.frequency.value = f;
                    osc.type = 'triangle';
                    const t = audioCtx.currentTime + i * 0.12;
                    gain.gain.setValueAtTime(0.12, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                    osc.start(t); osc.stop(t + 0.2);
                });
            } catch (e) { }
        }

        // === Build Grid ===
        function buildGrid() {
            const grid = document.getElementById('fw-grid');
            grid.innerHTML = '';
            const allSections = [...SECTIONS.outer, ...SECTIONS.inner];
            const allPaths = [...OUTER_PATH, ...INNER_PATH];

            for (let r = 0; r < 5; r++) {
                for (let c = 0; c < 5; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'fw-cell';
                    cell.id = `fw-cell-${r}-${c}`;

                    if (r === CENTER_POS[0] && c === CENTER_POS[1]) {
                        // Center cell
                        cell.classList.add('fw-center-cell');
                        cell.dataset.ring = 'center';
                        cell.innerHTML = `
                            <div class="fw-cell-title">★ ${SECTIONS.center.title}</div>
                            <div class="fw-cell-value" id="fw-centerValue">?</div>
                        `;
                    } else {
                        // Find which section
                        const outerIdx = OUTER_PATH.findIndex(p => p[0] === r && p[1] === c);
                        const innerIdx = INNER_PATH.findIndex(p => p[0] === r && p[1] === c);

                        if (outerIdx !== -1) {
                            const sec = SECTIONS.outer[outerIdx];
                            cell.dataset.ring = 'outer';
                            cell.dataset.idx = outerIdx;
                            cell.innerHTML = `
                                <div class="fw-cell-title">${sec.title}</div>
                                <div class="fw-cell-value" id="fw-val-${sec.id}">—</div>
                            `;
                            cell.addEventListener('click', () => handleCellClick(r, c));
                        } else if (innerIdx !== -1) {
                            const sec = SECTIONS.inner[innerIdx];
                            cell.classList.add('fw-inner-cell');
                            cell.dataset.ring = 'inner';
                            cell.dataset.idx = innerIdx;
                            cell.innerHTML = `
                                <div class="fw-cell-title">${sec.title}</div>
                                <div class="fw-cell-value" id="fw-val-${sec.id}">—</div>
                            `;
                            cell.addEventListener('click', () => handleCellClick(r, c));
                        } else {
                            cell.classList.add('fw-empty-cell');
                        }
                    }
                    grid.appendChild(cell);
                }
            }
        }

        // === Star Roll ===
        function rollStars(lockedTagBoost) {
            // Konami Code 秘密模式：保證 10 星
            if (ws.konamiActive) return 10;

            const roll = Math.random() * 100;
            let boost = Math.min(lockedTagBoost * 0.5, 15);
            let cumulative = 0;
            for (let i = 10; i >= 1; i--) {
                let w = STAR_WEIGHTS[i];
                if (i >= 7) w += boost * (i / 10);
                cumulative += w;
                if (roll < cumulative) return i;
            }
            return 1;
        }

        // === Pregenerate ===
        function pregenerateResults() {
            const allSections = [...SECTIONS.outer, ...SECTIONS.inner];
            const allPaths = [...OUTER_PATH, ...INNER_PATH];

            let lockedTags = 0;
            const lockedIndices = new Set();
            allPaths.forEach((pos, i) => {
                const cell = document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`);
                if (cell && cell.classList.contains('fw-locked') && ws.cells[i]) {
                    lockedTags += ws.cells[i].tagCount || 0;
                    lockedIndices.add(i);
                }
            });

            const starLevel = rollStars(lockedTags);
            const [targetMin, targetMax] = TAG_RANGES[starLevel];

            let results = allSections.map((sec, i) => {
                if (lockedIndices.has(i)) {
                    return { ...ws.cells[i] };
                }
                const pool = getOptionsPool(sec);
                const opt = pool[Math.floor(Math.random() * pool.length)];
                return {
                    id: sec.id, title: sec.title, stateKey: sec.stateKey,
                    value: opt.tag,
                    display: opt.display,
                    tagCount: opt.tag.split(',').length,
                    isNone: false, isBonus: false,
                    bonus: !!sec.bonus,
                    isMulti: !!sec.isMulti
                };
            });

            let total = results.reduce((s, r) => s + r.tagCount, 0) + 1;

            // 太多 → 設為「無」
            if (total > targetMax) {
                const shuffled = [...Array(24).keys()]
                    .filter(i => !lockedIndices.has(i))
                    .sort(() => Math.random() - 0.5);
                for (const idx of shuffled) {
                    if (total <= targetMax) break;
                    total -= results[idx].tagCount;
                    results[idx].value = '無';
                    results[idx].display = '無';
                    results[idx].isNone = true;
                    results[idx].tagCount = 0;
                }
            }

            // 太少 → bonus 格加分
            if (total < targetMin) {
                const eligible = results
                    .map((r, i) => ({ r, i }))
                    .filter(x => !lockedIndices.has(x.i) && !x.r.isNone && x.r.bonus)
                    .sort(() => Math.random() - 0.5);
                for (const { r, i } of eligible) {
                    if (total >= targetMin) break;
                    results[i].isBonus = true;
                    results[i].tagCount += BONUS_EXTRA_TAGS;
                    total += BONUS_EXTRA_TAGS;
                }
            }

            ws.pregenResults = results;
            ws.pregenStars = starLevel;
            ws.pregenTotalTags = total; // 粗估值作為 fallback，實際計數在 showStarRating 時精確計算
        }

        // === SPIN LOGIC ===
        function handleLever() {
            initAudio();
            // 星級動畫播放中不可操作
            if (ws.phase === 'stars' || ws.phase === 'center' || ws.phase === 'revealing-outer' || ws.phase === 'revealing-inner') return;
            switch (ws.phase) {
                case 'idle':
                case 'lock':
                    startOuterSpin();
                    break;
                case 'spinning-outer':
                    stopOuterSpin();
                    break;
                case 'spinning-inner':
                    stopInnerSpin();
                    break;
            }
        }

        function startOuterSpin() {
            ws.phase = 'spinning-outer';
            ws.currentLight = 0;
            ws.speed = 30;

            const btn = document.getElementById('fw-leverBtn');
            btn.innerHTML = '<i class="fa-solid fa-stop"></i> 停止！';
            btn.classList.add('fw-spinning');
            document.getElementById('fw-phase1Dot').classList.add('fw-active');

            // Clear non-locked outer cells
            OUTER_PATH.forEach((pos, i) => {
                const cell = document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`);
                if (!cell.classList.contains('fw-locked')) {
                    const sec = SECTIONS.outer[i];
                    const valEl = document.getElementById(`fw-val-${sec.id}`);
                    if (valEl) { valEl.textContent = '—'; valEl.classList.remove('fw-revealed'); }
                    cell.classList.remove('fw-result-none', 'fw-result-bonus', 'fw-result-filled');
                }
            });

            // Clear non-locked inner cells
            INNER_PATH.forEach((pos, i) => {
                const cell = document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`);
                if (!cell.classList.contains('fw-locked')) {
                    const sec = SECTIONS.inner[i];
                    const valEl = document.getElementById(`fw-val-${sec.id}`);
                    if (valEl) { valEl.textContent = '—'; valEl.classList.remove('fw-revealed'); }
                    cell.classList.remove('fw-result-none', 'fw-result-bonus', 'fw-result-filled');
                }
            });

            // Clear center
            const centerVal = document.getElementById('fw-centerValue');
            if (centerVal) { centerVal.textContent = '?'; centerVal.classList.remove('fw-revealed'); }

            // Hide star and lock sections
            document.getElementById('fw-starSection').classList.remove('fw-visible');
            document.getElementById('fw-starTitle').classList.remove('fw-visible');
            document.getElementById('fw-lockSection').classList.remove('fw-visible');

            // Reset phase dots
            ['fw-phase1Dot', 'fw-phase2Dot', 'fw-phase3Dot'].forEach(id => {
                document.getElementById(id).classList.remove('fw-active', 'fw-done');
            });

            pregenerateResults();
            runOuterLight();

            ws.autoStopTimer = setTimeout(() => {
                if (ws.phase === 'spinning-outer') stopOuterSpin();
            }, 2000);
        }

        function runOuterLight() {
            if (ws.phase !== 'spinning-outer' && ws.phase !== 'stopping-outer') return;

            OUTER_PATH.forEach(pos => {
                document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`).classList.remove('fw-highlight');
            });

            const pos = OUTER_PATH[ws.currentLight];
            document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`).classList.add('fw-highlight');
            playTick(600 + ws.currentLight * 30);

            ws.currentLight = (ws.currentLight + 1) % 16;

            if (ws.phase === 'stopping-outer') {
                ws.speed = Math.round(ws.speed * 1.15);
                if (ws.speed > 350) { finishOuterSpin(); return; }
            }
            ws.timer = setTimeout(runOuterLight, ws.speed);
        }

        function stopOuterSpin() {
            if (ws.autoStopTimer) { clearTimeout(ws.autoStopTimer); ws.autoStopTimer = null; }
            ws.phase = 'stopping-outer';
            const btn = document.getElementById('fw-leverBtn');
            btn.innerHTML = '<i class="fa-solid fa-hourglass"></i> 減速中...';
            btn.classList.remove('fw-spinning');
        }

        function finishOuterSpin() {
            ws.phase = 'revealing-outer';
            clearTimeout(ws.timer);
            OUTER_PATH.forEach(pos => {
                document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`).classList.remove('fw-highlight');
            });
            document.getElementById('fw-phase1Dot').classList.remove('fw-active');
            document.getElementById('fw-phase1Dot').classList.add('fw-done');

            revealRingResults('outer', OUTER_PATH, SECTIONS.outer, () => {
                setTimeout(() => startInnerSpin(), 600);
            });
        }

        function startInnerSpin() {
            ws.phase = 'spinning-inner';
            ws.currentLight = 0;
            ws.speed = 30;

            const btn = document.getElementById('fw-leverBtn');
            btn.innerHTML = '<i class="fa-solid fa-stop"></i> 停止！';
            btn.classList.add('fw-spinning');
            document.getElementById('fw-phase2Dot').classList.add('fw-active');

            runInnerLight();

            ws.autoStopTimer = setTimeout(() => {
                if (ws.phase === 'spinning-inner') stopInnerSpin();
            }, 2000);
        }

        function runInnerLight() {
            if (ws.phase !== 'spinning-inner' && ws.phase !== 'stopping-inner') return;

            INNER_PATH.forEach(pos => {
                document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`).classList.remove('fw-highlight');
            });

            const pos = INNER_PATH[ws.currentLight];
            document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`).classList.add('fw-highlight');
            playTick(800 + ws.currentLight * 40);

            ws.currentLight = (ws.currentLight + 1) % 8;

            if (ws.phase === 'stopping-inner') {
                ws.speed = Math.round(ws.speed * 1.18);
                if (ws.speed > 350) { finishInnerSpin(); return; }
            }
            ws.timer = setTimeout(runInnerLight, ws.speed);
        }

        function stopInnerSpin() {
            if (ws.autoStopTimer) { clearTimeout(ws.autoStopTimer); ws.autoStopTimer = null; }
            ws.phase = 'stopping-inner';
            const btn = document.getElementById('fw-leverBtn');
            btn.innerHTML = '<i class="fa-solid fa-hourglass"></i> 減速中...';
            btn.classList.remove('fw-spinning');
        }

        function finishInnerSpin() {
            ws.phase = 'revealing-inner';
            clearTimeout(ws.timer);
            INNER_PATH.forEach(pos => {
                document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`).classList.remove('fw-highlight');
            });
            document.getElementById('fw-phase2Dot').classList.remove('fw-active');
            document.getElementById('fw-phase2Dot').classList.add('fw-done');

            revealRingResults('inner', INNER_PATH, SECTIONS.inner, () => {
                setTimeout(() => revealCenter(), 500);
            });
        }

        // === REVEAL ===
        function revealRingResults(ring, path, sections, onComplete) {
            let i = 0;
            function revealNext() {
                if (i >= path.length) { if (onComplete) onComplete(); return; }

                const pos = path[i];
                const cell = document.getElementById(`fw-cell-${pos[0]}-${pos[1]}`);
                const pregenIdx = i + (ring === 'inner' ? 16 : 0);

                if (cell.classList.contains('fw-locked')) { i++; revealNext(); return; }

                const result = ws.pregenResults[pregenIdx];
                ws.cells[pregenIdx] = { ...result, ring };

                const valEl = document.getElementById(`fw-val-${result.id}`);
                if (result.isNone) {
                    valEl.textContent = '無';
                    cell.classList.add('fw-result-none');
                } else {
                    const displayText = result.display || result.value;
                    valEl.textContent = result.isBonus ? '🌟 ' + displayText : displayText;
                    cell.classList.add('fw-result-filled');
                    if (result.isBonus) {
                        cell.classList.add('fw-result-bonus');
                        playBonus();
                    }
                }
                valEl.classList.add('fw-revealed');
                playReveal();

                i++;
                setTimeout(revealNext, 75);
            }
            revealNext();
        }

        function revealCenter() {
            ws.phase = 'center';
            document.getElementById('fw-phase3Dot').classList.add('fw-active');

            const cell = document.getElementById(`fw-cell-${CENTER_POS[0]}-${CENTER_POS[1]}`);
            const valEl = document.getElementById('fw-centerValue');

            const gender = GENDERS[Math.floor(Math.random() * GENDERS.length)];
            const age = Math.floor(Math.random() * 27) + 14;
            const dim = DIMENSIONS[Math.floor(Math.random() * DIMENSIONS.length)];
            const centerValue = `${gender}, ${age}歲, ${dim}`;

            valEl.textContent = `${gender === '1girl' ? '♀' : '♂'} ${age}歲`;
            valEl.classList.add('fw-revealed');

            ws.cells[24] = {
                id: 'gender', value: centerValue, tagCount: 3, ring: 'center',
                gender: gender, age: age, dimension: dim
            };

            cell.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.8)';
            setTimeout(() => { cell.style.boxShadow = ''; }, 500);

            document.getElementById('fw-phase3Dot').classList.remove('fw-active');
            document.getElementById('fw-phase3Dot').classList.add('fw-done');
            playReveal();

            setTimeout(showStarRating, 800);
        }

        // === STAR RATING ===
        function showStarRating() {
            ws.phase = 'stars';
            const btn = document.getElementById('fw-leverBtn');
            btn.innerHTML = '<i class="fa-solid fa-play"></i> 啟動輪盤';
            btn.classList.remove('fw-spinning');

            // 精確計算 tag 數量：此時所有格子（含中心）已揭曉，可暗中套用 state
            let totalTags = ws.pregenTotalTags; // fallback
            if (generatePromptPlain) {
                try {
                    // 儲存原始 state
                    const savedSelections = JSON.parse(JSON.stringify(appState.selections));
                    const savedGender = appState.gender;
                    const savedAge = appState.age;
                    const savedDimension = appState.dimension;
                    const savedBodyAdv = appState.bodyAdvanced;
                    const savedHairAdv = appState.hairAdvanced;
                    const savedHairMagic = appState.hairMagicPrompts;
                    const savedHetero = appState.heterochromia;
                    const savedExprAdv = appState.expressionAdvanced;
                    const savedPoseAdv = appState.poseAdvanced;
                    const savedAtmAdv = appState.atmosphereAdvanced;
                    const savedRaceAdv = appState.raceAdvanced;
                    const savedJobAdv = appState.jobAdvanced;
                    const savedOutfitAdv = appState.outfitAdvanced;
                    const savedHeadwearAdv = appState.headwearAdvanced;
                    const savedHandItemsAdv = appState.handItemsAdvanced;
                    const savedSceneAdv = appState.sceneAdvanced;
                    const savedCustomInputs = appState.customInputs ? JSON.parse(JSON.stringify(appState.customInputs)) : {};
                    const savedCustomFields = appState.customFields ? JSON.parse(JSON.stringify(appState.customFields)) : [];

                    // 暫時清空並套用輪盤結果
                    appState.selections = {};
                    appState.bodyAdvanced = null;
                    appState.hairAdvanced = null;
                    appState.hairMagicPrompts = null;
                    appState.heterochromia = false;
                    appState.expressionAdvanced = null;
                    appState.poseAdvanced = null;
                    appState.atmosphereAdvanced = null;
                    appState.raceAdvanced = null;
                    appState.jobAdvanced = null;
                    appState.outfitAdvanced = null;
                    appState.headwearAdvanced = null;
                    appState.handItemsAdvanced = null;
                    appState.sceneAdvanced = null;
                    appState.customInputs = {};
                    appState.customFields = [];

                    for (let i = 0; i < 24; i++) {
                        const r = ws.cells[i];
                        if (!r || r.isNone) continue;
                        const stateKey = r.stateKey;
                        if (!stateKey) continue;
                        if (r.isMulti) {
                            appState.selections[stateKey] = r.value.split(',').map(s => s.trim());
                        } else {
                            appState.selections[stateKey] = r.value;
                        }
                    }

                    // 中心格
                    const center = ws.cells[24];
                    if (center) {
                        appState.gender = center.gender === '1girl' ? 'female' : 'male';
                        appState.age = center.age;
                        const dimMap2 = { 'anime': 'anime', 'fantasy': 'fantasy', 'sci-fi': 'realistic', 'dark fantasy': 'fantasy', 'cyberpunk': 'realistic', 'steampunk': 'fantasy' };
                        appState.dimension = dimMap2[center.dimension] || 'anime';
                    }

                    // 計算精確 tag 數
                    const plainText = generatePromptPlain();
                    totalTags = plainText.split(',').filter(t => t.trim().length > 0).length;

                    // 還原所有 state
                    appState.selections = savedSelections;
                    appState.gender = savedGender;
                    appState.age = savedAge;
                    appState.dimension = savedDimension;
                    appState.bodyAdvanced = savedBodyAdv;
                    appState.hairAdvanced = savedHairAdv;
                    appState.hairMagicPrompts = savedHairMagic;
                    appState.heterochromia = savedHetero;
                    appState.expressionAdvanced = savedExprAdv;
                    appState.poseAdvanced = savedPoseAdv;
                    appState.atmosphereAdvanced = savedAtmAdv;
                    appState.raceAdvanced = savedRaceAdv;
                    appState.jobAdvanced = savedJobAdv;
                    appState.outfitAdvanced = savedOutfitAdv;
                    appState.headwearAdvanced = savedHeadwearAdv;
                    appState.handItemsAdvanced = savedHandItemsAdv;
                    appState.sceneAdvanced = savedSceneAdv;
                    appState.customInputs = savedCustomInputs;
                    appState.customFields = savedCustomFields;
                } catch (e) {
                    // fallback 使用 pregenTotalTags
                }
            }

            ws.totalTags = totalTags;
            const stars = ws.pregenStars;

            const section = document.getElementById('fw-starSection');
            section.classList.add('fw-visible');
            document.getElementById('fw-tagCount').textContent = `${totalTags} tags`;

            const starRow = document.getElementById('fw-starRow');
            starRow.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                const star = document.createElement('span');
                star.className = 'fw-star';
                star.textContent = '★';
                starRow.appendChild(star);
            }

            const starEls = starRow.querySelectorAll('.fw-star');
            let count = 0;
            const starInterval = setInterval(() => {
                if (count >= stars) {
                    clearInterval(starInterval);
                    const titleEl = document.getElementById('fw-starTitle');
                    titleEl.textContent = `${stars}★ ${STAR_TITLES[stars]}`;
                    titleEl.style.color = STAR_COLORS[stars];
                    titleEl.className = 'fw-star-title';
                    if (stars >= 8) titleEl.classList.add('fw-legendary-star');
                    else if (stars >= 6) titleEl.classList.add('fw-high-star');
                    titleEl.classList.add('fw-visible');

                    playStarSound(stars);

                    if (stars >= 10) {
                        setTimeout(() => { playVictory(); triggerReward10(); }, 500);
                    } else if (stars >= 7) {
                        triggerRewardHigh(stars);
                    }

                    setTimeout(() => showLockPhase(), stars >= 10 ? 3000 : 1500);
                    return;
                }
                starEls[count].classList.add('fw-lit');
                starEls[count].style.animation = 'fwStarBounce 0.3s ease forwards';
                playTick(400 + count * 60);
                count++;
            }, 200);
        }

        // === REWARDS ===
        function triggerRewardHigh(stars) {
            const overlay = document.getElementById('fw-flashOverlay');
            overlay.style.background = stars >= 9
                ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(251,191,36,0.3))'
                : 'rgba(251,191,36,0.15)';
            overlay.style.opacity = '1';
            setTimeout(() => { overlay.style.opacity = '0'; }, 600);
            spawnParticles(stars * 5, ['#fbbf24', '#a855f7', '#22d3ee']);
        }

        function triggerReward10() {
            const container = document.getElementById('fw-gameContainer');
            container.classList.add('fw-reward-10');
            setTimeout(() => container.classList.remove('fw-reward-10'), 2000);

            const overlay = document.getElementById('fw-flashOverlay');
            overlay.style.background = 'linear-gradient(135deg, rgba(251,191,36,0.4), rgba(168,85,247,0.4), rgba(34,211,238,0.4))';
            overlay.style.backgroundSize = '200% 200%';
            overlay.style.animation = 'fwRainbowBg 1s ease infinite';
            overlay.style.opacity = '1';
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.style.animation = '';
            }, 2000);

            spawnParticles(80, ['#fbbf24', '#a855f7', '#22d3ee', '#ef4444', '#10b981', '#f59e0b']);

            container.style.animation = 'fwShake 0.5s ease-in-out';
            setTimeout(() => { container.style.animation = ''; }, 500);
        }

        function spawnParticles(count, colors) {
            const container = document.getElementById('fw-particles');
            for (let i = 0; i < count; i++) {
                const p = document.createElement('div');
                p.className = 'fw-particle';
                const size = Math.random() * 8 + 4;
                const x = Math.random() * window.innerWidth;
                const dur = Math.random() * 2 + 1;
                const color = colors[Math.floor(Math.random() * colors.length)];
                p.style.cssText = `
                    width: ${size}px; height: ${size}px;
                    left: ${x}px; top: -10px;
                    background: ${color};
                    animation-duration: ${dur}s;
                    animation-delay: ${Math.random() * 0.5}s;
                `;
                container.appendChild(p);
                setTimeout(() => p.remove(), (dur + 0.5) * 1000);
            }
        }

        // === LOCK PHASE ===
        function showLockPhase() {
            ws.phase = 'lock';
            // 計算已鎖定格數，正確設定剩餘數
            const alreadyLocked = document.querySelectorAll('.fw-cell.fw-locked').length;
            ws.locksRemaining = Math.max(0, 3 - alreadyLocked);
            document.getElementById('fw-lockSection').classList.add('fw-visible');
            document.getElementById('fw-lockRemain').textContent = ws.locksRemaining;

            // 所有非中心格都設為 lockable（含已鎖定的，才能點擊解鎖）
            document.querySelectorAll('.fw-cell[data-ring]').forEach(cell => {
                if (cell.dataset.ring !== 'center') {
                    cell.classList.add('fw-lockable');
                }
            });
        }

        function handleCellClick(r, c) {
            if (ws.phase !== 'lock') return;
            const cell = document.getElementById(`fw-cell-${r}-${c}`);
            if (!cell.classList.contains('fw-lockable')) return;
            if (cell.classList.contains('fw-locked')) {
                cell.classList.remove('fw-locked');
                ws.locksRemaining++;
            } else if (ws.locksRemaining > 0) {
                cell.classList.add('fw-locked');
                ws.locksRemaining--;
                playTick(1000);
            }
            document.getElementById('fw-lockRemain').textContent = ws.locksRemaining;
        }

        function handleSkipLock() {
            // 跳過鎖定步驟：清除所有鎖定，套用結果，回到 idle（可再轉）
            document.querySelectorAll('.fw-cell.fw-locked').forEach(c => c.classList.remove('fw-locked'));
            document.querySelectorAll('.fw-cell.fw-lockable').forEach(c => c.classList.remove('fw-lockable'));
            ws.locksRemaining = 3;
            document.getElementById('fw-lockSection').classList.remove('fw-visible');
            applyResultsToMainState();
            ws.phase = 'idle';
        }

        function handleConfirm() {
            // 收集被更改的 stateKeys
            const changedKeys = new Set();
            for (let i = 0; i < 24; i++) {
                const result = ws.cells[i];
                if (!result || result.isNone) continue;
                if (result.stateKey) changedKeys.add(result.stateKey);
            }
            applyResultsToMainState();
            closeModal();
            // 延遲 250ms 等 modal 淡出完成後開始動畫
            setTimeout(() => playConfirmAnimation(changedKeys), 250);
        }

        // ============================================
        // 確認使用 — 華麗三階段動畫 + 音效
        // ============================================

        // stateKey → 所屬 tab 對映
        const STATE_KEY_TO_TAB = {
            race: 'base', job: 'base', hairstyle: 'base', bodyType: 'base',
            hairColor: 'appearance', eyeColorLeft: 'appearance', eyeColorRight: 'appearance',
            outfit: 'appearance', headwear: 'appearance', handItem: 'appearance', handItems: 'appearance',
            expression: 'action', mood: 'action', pose: 'action',
            animeStyle: 'style', artStyle: 'style', artist: 'style', quality: 'style',
            scene: 'environment', atmosphere: 'environment', lighting: 'environment',
            cameraAngle: 'camera', shotSize: 'camera', focalLength: 'camera',
            aperture: 'camera', lensEffect: 'camera'
        };

        function playConfirmAnimation(changedKeys) {
            playPulseWave();
            playCenterFlash();
            playBurstStars();
            playConfirmSfx_pulse();
            setTimeout(() => flyParticlesToSections(changedKeys), 600);
        }

        function playPulseWave() {
            const wave1 = document.createElement('div');
            wave1.className = 'fw-pulse-wave';
            document.body.appendChild(wave1);
            wave1.addEventListener('animationend', () => wave1.remove());
            setTimeout(() => { if (wave1.parentNode) wave1.remove(); }, 1200);
            const wave2 = document.createElement('div');
            wave2.className = 'fw-pulse-wave-2';
            document.body.appendChild(wave2);
            wave2.addEventListener('animationend', () => wave2.remove());
            setTimeout(() => { if (wave2.parentNode) wave2.remove(); }, 1200);
        }

        function playCenterFlash() {
            const flash = document.createElement('div');
            flash.className = 'fw-center-flash';
            document.body.appendChild(flash);
            flash.addEventListener('animationend', () => flash.remove());
            setTimeout(() => { if (flash.parentNode) flash.remove(); }, 700);
        }

        function playBurstStars() {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            for (let i = 0; i < 12; i++) {
                const star = document.createElement('div');
                star.className = 'fw-burst-star';
                const angle = (Math.PI * 2 * i / 12) + (Math.random() - 0.5) * 0.5;
                const dist = 80 + Math.random() * 120;
                star.style.left = cx + 'px';
                star.style.top = cy + 'px';
                document.body.appendChild(star);
                setTimeout(() => {
                    star.style.transition = `all ${500 + Math.random() * 300}ms cubic-bezier(0.22,1,0.36,1)`;
                    star.style.left = (cx + Math.cos(angle) * dist) + 'px';
                    star.style.top = (cy + Math.sin(angle) * dist) + 'px';
                }, 30 + i * 20);
                setTimeout(() => { if (star.parentNode) star.remove(); }, 1000);
            }
        }

        function playConfirmSfx_pulse() {
            if (!sfx || !sfx.initialized) { if (sfx) sfx.init(); else return; }
            if (sfx.isMuted) return;
            if (sfx.ctx.state === 'suspended') sfx.ctx.resume();
            const t = sfx.ctx.currentTime;
            const mg = sfx.masterGain;
            // 低頻衝擊
            const o1 = sfx.ctx.createOscillator();
            const g1 = sfx.ctx.createGain();
            o1.type = 'sine';
            o1.frequency.setValueAtTime(80, t);
            o1.frequency.exponentialRampToValueAtTime(40, t + 0.8);
            g1.gain.setValueAtTime(0.4, t);
            g1.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
            o1.connect(g1); g1.connect(mg);
            o1.start(t); o1.stop(t + 0.8);
            // 魔法和弦
            [311.1, 369.99, 466.16].forEach((f, i) => {
                const o = sfx.ctx.createOscillator();
                const g = sfx.ctx.createGain();
                o.type = 'sine';
                o.frequency.setValueAtTime(f, t + 0.1);
                o.frequency.exponentialRampToValueAtTime(f * 1.5, t + 0.6);
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.12, t + 0.15);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
                o.connect(g); g.connect(mg);
                o.start(t + i * 0.05); o.stop(t + 0.7);
            });
            // Shimmer
            const bsz = sfx.ctx.sampleRate * 0.3;
            const buf = sfx.ctx.createBuffer(1, bsz, sfx.ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < bsz; i++) d[i] = Math.random() * 2 - 1;
            const ns = sfx.ctx.createBufferSource();
            ns.buffer = buf;
            const fl = sfx.ctx.createBiquadFilter();
            fl.type = 'highpass';
            fl.frequency.setValueAtTime(4000, t);
            fl.frequency.exponentialRampToValueAtTime(8000, t + 0.2);
            const ng = sfx.ctx.createGain();
            ng.gain.setValueAtTime(0.08, t);
            ng.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            ns.connect(fl); fl.connect(ng); ng.connect(mg);
            ns.start(t);
        }

        function playConfirmSfx_hit(index) {
            if (!sfx || !sfx.initialized || sfx.isMuted) return;
            if (sfx.ctx.state === 'suspended') sfx.ctx.resume();
            const t = sfx.ctx.currentTime;
            const mg = sfx.masterGain;
            const bf = 800 + index * 150;
            const o = sfx.ctx.createOscillator();
            const g = sfx.ctx.createGain();
            o.type = 'sine';
            o.frequency.setValueAtTime(bf, t);
            o.frequency.exponentialRampToValueAtTime(bf * 1.2, t + 0.05);
            g.gain.setValueAtTime(0.25, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
            o.connect(g); g.connect(mg);
            o.start(t); o.stop(t + 0.15);
            const o2 = sfx.ctx.createOscillator();
            const g2 = sfx.ctx.createGain();
            o2.type = 'sine';
            o2.frequency.setValueAtTime(bf * 2, t);
            g2.gain.setValueAtTime(0.08, t);
            g2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
            o2.connect(g2); g2.connect(mg);
            o2.start(t); o2.stop(t + 0.1);
        }

        function flyParticlesToSections(changedKeys) {
            const currentTab = appState.activeTab;
            const tabContent = document.getElementById('tab-content');
            if (!tabContent) return;
            const keysInTab = [];
            changedKeys.forEach(key => {
                if (STATE_KEY_TO_TAB[key] === currentTab) keysInTab.push(key);
            });
            if (keysInTab.length === 0) return;
            const allSections = tabContent.querySelectorAll('.section-block');
            const tabSectionDefs = window.PromptGen.Data.TAB_SECTIONS[currentTab] || [];
            const sectionMap = {};
            tabSectionDefs.forEach((def, idx) => {
                if (allSections[idx]) sectionMap[def.id] = allSections[idx];
            });
            const targetSections = [];
            tabSectionDefs.forEach(def => {
                const matched = keysInTab.some(k =>
                    k === def.id || (k === 'handItem' && def.id === 'handItems')
                );
                if (matched && sectionMap[def.id]) targetSections.push(sectionMap[def.id]);
            });
            if (targetSections.length === 0) return;
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;

            targetSections.forEach((sectionEl, i) => {
                setTimeout(() => {
                    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        const titleEl = sectionEl.querySelector('.section-block-title') || sectionEl;
                        const rect = titleEl.getBoundingClientRect();
                        const tx = rect.left + rect.width / 2;
                        const ty = rect.top + rect.height / 2;
                        for (let p = 0; p < 6; p++) {
                            const particle = document.createElement('div');
                            particle.className = 'fw-confirm-particle';
                            // 起點：離中心較遠的隨機位置
                            const sx = cx + (Math.random() - 0.5) * 200;
                            const sy = cy + (Math.random() - 0.5) * 200;
                            particle.style.left = sx + 'px';
                            particle.style.top = sy + 'px';
                            const size = 8 + Math.random() * 8;
                            particle.style.width = size + 'px';
                            particle.style.height = size + 'px';
                            document.body.appendChild(particle);

                            // Phase 1: 聚合到中心（120ms）
                            setTimeout(() => {
                                particle.style.left = cx + (Math.random() - 0.5) * 30 + 'px';
                                particle.style.top = cy + (Math.random() - 0.5) * 30 + 'px';
                            }, p * 40 + 20);

                            // Phase 2: 蓄力脈動（+300ms 停頓）
                            setTimeout(() => {
                                particle.classList.add('fw-charging');
                            }, 200 + p * 40);

                            // Phase 3: 加速發射！（+250ms 後爆發飛出）
                            setTimeout(() => {
                                particle.classList.remove('fw-charging');
                                particle.classList.add('fw-launching');
                                particle.style.left = tx + (Math.random() - 0.5) * 40 + 'px';
                                particle.style.top = ty + (Math.random() - 0.5) * 20 + 'px';
                                particle.style.opacity = '0';
                                particle.style.transform = 'scale(0.2)';
                            }, 500 + p * 30);

                            // 清除
                            setTimeout(() => { if (particle.parentNode) particle.remove(); }, 1100);
                        }
                        // 命中效果（延遲配合新時序）
                        setTimeout(() => {
                            playConfirmSfx_hit(i);
                            sectionEl.classList.add('fw-section-glow');
                            setTimeout(() => sectionEl.classList.remove('fw-section-glow'), 1400);
                            spawnHitSparks(tx, ty);
                        }, 700);
                    }, 180);
                }, i * 500);
            });
        }

        function spawnHitSparks(x, y) {
            const colors = ['#fbbf24', '#a855f7', '#22d3ee', '#fff', '#f59e0b'];
            for (let i = 0; i < 8; i++) {
                const spark = document.createElement('div');
                spark.className = 'fw-hit-spark';
                spark.style.background = colors[Math.floor(Math.random() * colors.length)];
                spark.style.boxShadow = '0 0 6px ' + spark.style.background;
                spark.style.left = x + 'px';
                spark.style.top = y + 'px';
                document.body.appendChild(spark);
                const angle = (Math.PI * 2 * i / 8) + (Math.random() - 0.5) * 0.8;
                const dist = 20 + Math.random() * 40;
                setTimeout(() => {
                    spark.style.transition = 'all 350ms ease-out';
                    spark.style.left = (x + Math.cos(angle) * dist) + 'px';
                    spark.style.top = (y + Math.sin(angle) * dist) + 'px';
                }, 20);
                setTimeout(() => { if (spark.parentNode) spark.remove(); }, 500);
            }
        }

        // === 寫入主頁 state ===
        function applyResultsToMainState() {
            // 清除所有舊選擇
            appState.selections = {};
            appState.bodyAdvanced = null;
            appState.hairAdvanced = null;
            appState.hairMagicPrompts = null;
            appState.heterochromia = false;
            appState.expressionAdvanced = null;
            appState.poseAdvanced = null;
            appState.atmosphereAdvanced = null;
            appState.raceAdvanced = null;
            appState.jobAdvanced = null;
            appState.outfitAdvanced = null;
            appState.headwearAdvanced = null;
            appState.handItemsAdvanced = null;
            appState.sceneAdvanced = null;
            appState.customInputs = {};
            appState.customInputVisible = {};
            appState.customFields = [];

            // === 輔助：用 Fate Wheel tag 查找主頁資料陣列的正確 value ===
            const Data = window.PromptGen && window.PromptGen.Data;

            // stateKey → 主頁資料陣列映射（涵蓋所有 Fate Wheel section）
            const dataLookup = {};
            if (Data) {
                dataLookup['race'] = Data.RACES || [];
                dataLookup['job'] = Data.JOBS || [];
                // 髮型/身材：合併男女兩組
                dataLookup['hairstyle'] = [].concat(Data.HAIRSTYLES_FEMALE || [], Data.HAIRSTYLES_MALE || []);
                dataLookup['bodyType'] = [].concat(Data.BODY_TYPES_FEMALE || [], Data.BODY_TYPES_MALE || []);
                dataLookup['hairColor'] = Data.HAIR_COLORS || [];
                dataLookup['eyeColor'] = Data.EYE_COLORS || [];
                dataLookup['outfit'] = Data.OUTFITS || [];
                dataLookup['headwear'] = Data.HEADWEAR || [];
                dataLookup['expression'] = Data.EXPRESSIONS || [];
                dataLookup['mood'] = Data.MOODS || [];
                dataLookup['handItem'] = Data.HAND_ITEMS || [];
                dataLookup['atmosphere'] = Data.WEATHER || [];
                dataLookup['lighting'] = Data.LIGHTING || [];
                dataLookup['focalLength'] = Data.FOCAL_LENGTHS || [];
                dataLookup['lensEffect'] = Data.LENS_EFFECTS || [];
                dataLookup['aperture'] = Data.APERTURES || [];
                dataLookup['cameraAngle'] = Data.CAMERA_ANGLES || [];
                dataLookup['scene'] = Data.SCENES || [];
                dataLookup['shotSize'] = Data.SHOT_SIZES || [];
                dataLookup['artist'] = Data.ARTISTS || [];
                dataLookup['artStyle'] = Data.ART_STYLES || [];
                dataLookup['animeStyle'] = Data.ANIME_STYLES || [];
                dataLookup['quality'] = Data.QUALITY_TAGS || [];
            }

            function findMainValue(tag, list) {
                if (!list || !list.length) return tag;
                // 先嘗試精確匹配
                const exact = list.find(item => item.value === tag);
                if (exact) return exact.value;
                // 模糊匹配：比較第一個 tag 關鍵字
                const tagFirst = tag.split(',')[0].trim().toLowerCase();
                const fuzzy = list.find(item => {
                    const itemFirst = item.value.split(',')[0].trim().toLowerCase();
                    return itemFirst === tagFirst;
                });
                return fuzzy ? fuzzy.value : tag;
            }

            // 寫入非「無」的格子
            for (let i = 0; i < 24; i++) {
                const result = ws.cells[i];
                if (!result || result.isNone) continue;

                const stateKey = result.stateKey;
                if (!stateKey) continue;

                if (result.isMulti) {
                    // 品質等多選欄位 → 拆為陣列，每個 tag 也要查找正確 value
                    appState.selections[stateKey] = result.value.split(',').map(s => s.trim());
                } else {
                    // 查找主頁資料陣列的正確 value
                    const lookupList = dataLookup[stateKey];
                    if (lookupList && lookupList.length > 0) {
                        appState.selections[stateKey] = findMainValue(result.value, lookupList);
                    } else {
                        // 無對應陣列（如 pose）→ 直接寫入 tag
                        appState.selections[stateKey] = result.value;
                    }
                }
            }

            // 中心格：性別、年齡、維度
            const center = ws.cells[24];
            if (center) {
                appState.gender = center.gender === '1girl' ? 'female' : 'male';
                appState.age = center.age;
                // 維度映射
                const dimMap = {
                    'anime': 'anime',
                    'fantasy': 'fantasy',
                    'sci-fi': 'realistic',
                    'dark fantasy': 'fantasy',
                    'cyberpunk': 'realistic',
                    'steampunk': 'fantasy'
                };
                appState.dimension = dimMap[center.dimension] || 'anime';
            }

            // 觸發主頁更新
            if (renderTabContent) renderTabContent();
            if (generatePrompt) generatePrompt();
            if (saveState) saveState();
        }

        // === Close ===
        function closeModal() {
            // Clean up timers
            if (ws.timer) clearTimeout(ws.timer);
            if (ws.autoStopTimer) clearTimeout(ws.autoStopTimer);

            // 重置 Konami Code 秘密模式
            ws.konamiActive = false;
            konamiProgress = 0;

            // Remove keyboard handler
            document.removeEventListener('keydown', keyHandler);

            // Remove overlay with fade
            const overlay = document.getElementById('fw-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.2s';
                setTimeout(() => overlay.remove(), 200);
            }
        }
    }

    return {
        setup,
        openFateWheelModal
    };
})();
