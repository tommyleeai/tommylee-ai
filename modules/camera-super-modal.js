// ═══════════════════════════════════════════════════════════════
// ⚡ Camera Super Modal — 推桿版運鏡選擇器（Super Mode = Demo 2）
// ═══════════════════════════════════════════════════════════════
// 啟動方式：透過 KonamiSuperModal.attach() 在 Camera Magic Modal 中
//           輸入 Konami Code (↑↑↓↓←→←→BA) 後觸發
//
// API：
//   CameraSuperModal.setup({ state, sfx, generatePrompt, saveState, renderTabContent })
//   CameraSuperModal.open()  ← 由 Konami Code 回呼觸發
// ═══════════════════════════════════════════════════════════════

window.PromptGen = window.PromptGen || {};

window.PromptGen.CameraSuperModal = (function () {
    'use strict';

    let deps = {};

    function setup(dependencies) {
        deps = dependencies;
    }

    // ═══════════════════════════════════════════
    // 📸 Slider + Chip 資料
    // ═══════════════════════════════════════════
    const SLIDERS = {
        distance: {
            icon: '📏', label: '鏡頭距離', labelEn: 'Shot Distance',
            stops: [
                { zh: '大特寫', en: 'ECU', fun: '只看到眼睛在燃燒 🔥', prompt: 'extreme close-up, macro detail, partial face filling the frame' },
                { zh: '特寫', en: 'Close-Up', fun: '看清你眼中的決意', prompt: 'close-up portrait, head and shoulders framing' },
                { zh: '中特寫', en: 'Medium CU', fun: '展現上半身的氣場', prompt: 'medium close-up, bust shot, chest up framing' },
                { zh: '中景', en: 'Medium', fun: '標準對話距離，剛好看到雙手', prompt: 'medium shot, waist-up, conversational framing' },
                { zh: '牛仔鏡頭', en: 'Cowboy', fun: '西部決鬥！手要摸到槍套的距離 🤠', prompt: 'cowboy shot, mid-thigh framing, american shot' },
                { zh: '全身', en: 'Full Shot', fun: '從頭到腳，完整展現你的戰鬥姿態', prompt: 'full body shot, head to toe visible, feet on ground' },
                { zh: '遠景', en: 'Wide', fun: '人物變小，世界開始接管畫面 🌄', prompt: 'wide shot, figure small in frame, environment-dominant' },
                { zh: '大遠景', en: 'Extreme Wide', fun: '渺小如螞蟻，被世界吞噬的感覺', prompt: 'extreme wide shot, tiny figure in vast landscape, dwarfed by environment' }
            ]
        },
        vAngle: {
            icon: '📐', label: '垂直角度', labelEn: 'Vertical Angle',
            stops: [
                { zh: '蟲視', en: "Worm's Eye", fun: '匍匐在地仰望巨人！連鞋底都看得到 🐛', prompt: "worm's-eye view, ultra low angle, looking straight up, dramatic foreshortening" },
                { zh: '低角度', en: 'Low Angle', fun: '仰望英雄的崇拜視角 🦸', prompt: 'dramatic low angle shot, looking up at, imposing perspective' },
                { zh: '平視', en: 'Eye Level', fun: '平起平坐，最自然的對話角度', prompt: 'eye-level shot, natural neutral angle' },
                { zh: '高角度', en: 'High Angle', fun: '從上方俯視，掌控一切的支配感 👑', prompt: 'high angle shot, looking down at, diminishing perspective' },
                { zh: '鳥瞰', en: "Bird's Eye", fun: '如同神明俯瞰眾生，萬物盡收眼底', prompt: "bird's-eye view, top-down aerial view, overhead perspective" }
            ]
        },
        lens: {
            icon: '🔭', label: '鏡頭焦距', labelEn: 'Focal Length',
            stops: [
                { zh: '魚眼 8mm', en: 'Fisheye', fun: '扭曲世界的魔眼！180°全視界 🐟', prompt: 'fisheye lens, extreme barrel distortion, 180 degree view' },
                { zh: '超廣角 14mm', en: 'Ultra-Wide', fun: '把整個世界硬塞進一張畫裡', prompt: '14mm ultra-wide angle, exaggerated perspective, strong converging lines' },
                { zh: '廣角 35mm', en: 'Wide 35mm', fun: '街頭攝影師的秘密武器 📸', prompt: '35mm wide-angle lens, natural but wide perspective' },
                { zh: '標準 50mm', en: 'Nifty Fifty', fun: '最接近你肉眼看到的真實世界 👁️', prompt: '50mm standard lens, natural human eye perspective' },
                { zh: '人像 85mm', en: '85mm Portrait', fun: '人像攝影之王 👑 奶油般的散景', prompt: '85mm portrait lens, beautiful face compression, creamy bokeh' },
                { zh: '中望遠 135mm', en: '135mm Tele', fun: '進階人像殺手，背景融化消失', prompt: '135mm telephoto, strong background compression, dreamy bokeh' },
                { zh: '望遠 200mm+', en: '200mm+', fun: '狙擊手的視角 🎯 隧道般的壓縮感', prompt: '200mm telephoto lens, extreme compression, tunnel effect, stacked layers' },
                { zh: '微距', en: 'Macro 1:1', fun: '放大到能看見毛孔與灰塵的世界 🔬', prompt: 'macro lens, 1:1 magnification, extreme detail, paper-thin depth of field' }
            ]
        },
        dof: {
            icon: '🎯', label: '景深控制', labelEn: 'Depth of Field',
            stops: [
                { zh: 'f/1.2 極淺', en: 'f/1.2', fun: '只有瞳孔是清楚的，夢幻到犯規 ✨', prompt: 'f/1.2 aperture, paper-thin depth of field, only eyes in focus' },
                { zh: 'f/1.8 淺景深', en: 'f/1.8', fun: '主角清楚，背景化為迷幻光點 🌸', prompt: 'f/1.8, shallow depth of field, beautiful bokeh, subject isolation' },
                { zh: 'f/2.8 柔和', en: 'f/2.8', fun: '柔和的背景虛化，舒適的人像感', prompt: 'f/2.8, moderate shallow DOF, gentle background blur, subject isolation' },
                { zh: 'f/5.6 均衡', en: 'f/5.6', fun: '小團體都能拍清楚的萬用光圈', prompt: 'f/5.6, moderate depth of field, environmental portrait, balanced focus' },
                { zh: 'f/8 銳利', en: 'f/8', fun: '風景攝影的黃金光圈 🏔️', prompt: 'f/8, sharp throughout, optimal sharpness, landscape photography' },
                { zh: 'f/16 全域清晰', en: 'f/16', fun: '從鼻尖到天邊，全！部！銳！利！', prompt: 'f/16, deep focus, everything razor sharp from near to far' }
            ]
        }
    };

    const CHIP_SECTIONS = [
        {
            icon: '🔄', label: '水平角度', labelEn: 'Horizontal Angle',
            items: [
                { id: 'front', zh: '正面', en: 'Front View', fun: '直視鏡頭的壓迫感', prompt: 'front view, facing camera, looking at viewer' },
                { id: 'three_quarter', zh: '3/4 側臉', en: 'Three-Quarter', fun: '最經典的角度，臉部超立體 💎', prompt: 'three-quarter view, face turned 30-45 degrees' },
                { id: 'profile', zh: '完全側面', en: 'Profile', fun: '硬幣上的王者輪廓', prompt: 'profile view, perfect side angle, one eye visible' },
                { id: 'back', zh: '背影', en: 'Back View', fun: '走向未知的孤獨背影 🚶', prompt: 'back view, from behind, facing away from camera, rear perspective' },
                { id: 'dutch', zh: '荷蘭角', en: 'Dutch Angle', fun: '歪斜的世界！不安感爆表 😵‍💫', prompt: 'Dutch angle, tilted 20-30 degrees, canted angle, disorienting perspective' },
                { id: 'ots', zh: '過肩', en: 'Over-the-Shoulder', fun: '偷窺別人對話的視角', prompt: 'over-the-shoulder shot, foreground shoulder blurred' },
                { id: 'pov', zh: '第一人稱', en: 'POV', fun: '你就是主角！看到自己的手 🎮', prompt: "POV shot, first-person perspective, character's hands visible" }
            ]
        },
        {
            icon: '🎥', label: '鏡頭運動', labelEn: 'Camera Movement',
            items: [
                { id: 'dolly_in', zh: '推進', en: 'Dolly-In', fun: '逼近真相的緊張感', prompt: 'dolly-in effect, approaching perspective, increasingly intimate framing, shallow DOF' },
                { id: 'dolly_out', zh: '拉遠', en: 'Dolly-Out', fun: '揭露全局的震撼退場 🌌', prompt: 'pull-back reveal composition, subject small in expanding environment, wide context visible' },
                { id: 'orbit', zh: '環繞', en: 'Orbit', fun: '繞著主角轉的英雄時刻 💫', prompt: 'three-quarter angle suggesting orbital motion, dynamic wraparound perspective, subject from angled side' },
                { id: 'crane', zh: '起重機', en: 'Crane', fun: '由低升高的史詩級運鏡 🏗️', prompt: 'elevated sweeping perspective, dramatic high vantage point, overhead composition' },
                { id: 'handheld', zh: '手持晃動', en: 'Handheld', fun: '紀錄片般的生猛真實感 📰', prompt: 'handheld camera, slight shake, documentary style, film grain' },
                { id: 'tracking', zh: '追蹤', en: 'Tracking', fun: '緊跟主角奔跑的速度感 🏃', prompt: 'tracking shot, following subject, background motion blur' },
                { id: 'whip_pan', zh: '甩鏡', en: 'Whip Pan', fun: '極速甩頭！畫面全部模糊 💨', prompt: 'whip pan, speed blur, swish pan, extreme motion' }
            ]
        },
        {
            icon: '🖼️', label: '構圖技巧', labelEn: 'Composition',
            items: [
                { id: 'thirds', zh: '三分法', en: 'Rule of Thirds', fun: '把主角放在交叉點上', prompt: 'rule of thirds, subject at intersection point' },
                { id: 'centered', zh: '中心構圖', en: 'Centered', fun: '完美對稱的強迫症快感 ⊕', prompt: 'centered composition, symmetrical framing' },
                { id: 'leading', zh: '引導線', en: 'Leading Lines', fun: '道路和河流帶著視線走', prompt: 'leading lines, converging lines guiding the eye' },
                { id: 'frame', zh: '框中框', en: 'Frame in Frame', fun: '透過門窗偷看的窺探感 🪟', prompt: 'natural framing, framed by doorway or arch' },
                { id: 'negative', zh: '負空間', en: 'Negative Space', fun: '大片留白，孤獨美學', prompt: 'negative space, minimalist composition, vast emptiness' },
                { id: 'golden', zh: '黃金比例', en: 'Golden Ratio', fun: '文藝復興大師的構圖密碼 🐚', prompt: 'golden ratio composition, fibonacci spiral framing' },
                { id: 'layered', zh: '前中後景', en: 'Layered', fun: '三層景深，立體到像能走進去', prompt: 'layered composition: foreground, midground, background' }
            ]
        }
    ];

    const BONUS_TRAITS = [
        { icon: '💨', zh: '背景動態模糊', en: 'motion blur in background, streaked environment' },
        { icon: '🌫️', zh: '大氣透視層次', en: 'atmospheric haze, aerial perspective, depth layers' },
        { icon: '🎬', zh: '電影感調色', en: 'cinematic color grading, film look' },
        { icon: '✨', zh: '奶油散景光點', en: 'creamy bokeh, beautiful light orbs in background' },
        { icon: '🗜️', zh: '背景壓縮效果', en: 'compressed background, stacked visual layers' },
        { icon: '📐', zh: '透視誇張感', en: 'exaggerated perspective, strong convergence lines' },
        { icon: '🌿', zh: '前景元素', en: 'foreground elements adding depth, shooting through foliage, layered framing' },
        { icon: '⚡', zh: '速度感線條', en: 'dynamic motion blur, radial blur, sense of kinetic energy' }
    ];

    // ═══════════════════════════════════════════
    // 🚧 衝突規則
    // ═══════════════════════════════════════════
    const CAMERA_CONFLICTS = [
        // ── Chip × Chip：方向互斥 ──
        { type: 'chip_chip', a: 'front', b: 'back', msg: '正面與背影方向互斥' },
        { type: 'chip_chip', a: 'front', b: 'profile', msg: '正面與完全側面方向互斥' },
        { type: 'chip_chip', a: 'back', b: 'profile', msg: '背影與完全側面方向互斥' },
        // ── Chip × Chip：運動互斥 ──
        { type: 'chip_chip', a: 'dolly_in', b: 'dolly_out', msg: '推進與拉遠方向互斥' },
        // ── Chip × Chip：構圖互斥 ──
        { type: 'chip_chip', a: 'centered', b: 'thirds', msg: '中心構圖與三分法互斥' },
        // ── Slider × Chip：提示詞矛盾 ──
        { type: 'slider_chip', slider: 'distance', value: 7, chip: 'pov', msg: '大遠景與 POV 提示詞矛盾' },
        // ── Slider × Slider：物理距離矛盾 ──
        // 微距 (lens=7) 與中景以上 (distance ≥ 3) 衝突
        { type: 'slider_slider', sliderA: 'lens', valueA: 7, sliderB: 'distance', minB: 3, msg: '微距鏡頭無法拍攝中景以上距離' },
        // ── Slider × Bonus：物理特性矛盾 ──
        { type: 'slider_bonus', slider: 'dof', value: 5, bonusEn: 'creamy bokeh, beautiful light orbs in background', msg: '奶油散景與 f/16 全域清晰矛盾' },
        { type: 'slider_bonus', slider: 'lens', values: [0, 1], bonusEn: 'compressed background, stacked visual layers', msg: '背景壓縮效果是望遠特徵，廣角做不到' },
        { type: 'slider_bonus', slider: 'lens', values: [6], bonusEn: 'exaggerated perspective, strong convergence lines', msg: '透視誇張感是廣角特徵，望遠做不到' }
    ];

    /**
     * 檢查一個 chip 是否與當前狀態衝突
     * @param {string} chipId - 要檢查的 chip ID
     * @param {Set} currentChips - 目前已選的 chips
     * @param {Object} sliders - { key: value } 已啟用的推桿值
     * @returns {string|null} 衝突訊息，無衝突回傳 null
     */
    function getChipConflict(chipId, currentChips, sliders) {
        for (const rule of CAMERA_CONFLICTS) {
            if (rule.type === 'chip_chip') {
                if (chipId === rule.a && currentChips.has(rule.b)) return rule.msg;
                if (chipId === rule.b && currentChips.has(rule.a)) return rule.msg;
            } else if (rule.type === 'slider_chip') {
                if (chipId === rule.chip && sliders[rule.slider] === rule.value) return rule.msg;
            }
        }
        return null;
    }

    /**
     * 檢查兩個推桿之間是否衝突
     * @returns {string|null}
     */
    function getSliderConflict(enabledSliders, sliderVals) {
        for (const rule of CAMERA_CONFLICTS) {
            if (rule.type === 'slider_slider') {
                if (enabledSliders[rule.sliderA] && enabledSliders[rule.sliderB]
                    && sliderVals[rule.sliderA] === rule.valueA
                    && sliderVals[rule.sliderB] >= rule.minB) {
                    return rule;
                }
            }
        }
        return null;
    }

    /**
     * 檢查一個 bonus 是否與當前推桿衝突
     * @param {string} bonusEn - bonus 的 en 字串
     * @param {Object} sliders - { key: value } 已啟用的推桿值
     * @returns {string|null}
     */
    function getBonusConflict(bonusEn, sliders) {
        for (const rule of CAMERA_CONFLICTS) {
            if (rule.type === 'slider_bonus' && rule.bonusEn === bonusEn) {
                const sliderVal = sliders[rule.slider];
                if (sliderVal === undefined) continue;
                // 支援 value（單值）和 values（多值）
                if (rule.value !== undefined && sliderVal === rule.value) return rule.msg;
                if (rule.values && rule.values.includes(sliderVal)) return rule.msg;
            }
        }
        return null;
    }

    // ═══════════════════════════════════════════
    // State
    // ═══════════════════════════════════════════
    let sliderValues = { distance: 3, vAngle: 2, lens: 4, dof: 1 };
    let sliderEnabled = { distance: false, vAngle: false, lens: false, dof: false };
    let selectedChips = new Set();
    let selectedBonuses = new Set();

    function resetState() {
        sliderValues = { distance: 3, vAngle: 2, lens: 4, dof: 1 };
        sliderEnabled = { distance: false, vAngle: false, lens: false, dof: false };
        selectedChips = new Set();
        selectedBonuses = new Set();
    }

    // 嘗試從 state.cameraAdvanced._superState 還原先前的設定
    function restoreState() {
        const adv = deps.state?.cameraAdvanced;
        if (adv?.superMode && adv._superState) {
            const s = adv._superState;
            sliderValues = { ...s.sliderValues };
            sliderEnabled = { ...s.sliderEnabled };
            selectedChips = new Set(s.selectedChips);
            selectedBonuses = new Set(s.selectedBonuses);
        } else {
            resetState();
        }
    }

    // ═══════════════════════════════════════════
    // CSS 注入（只注入一次）
    // ═══════════════════════════════════════════
    function injectCSS() {
        if (document.getElementById('camera-super-modal-css')) return;
        const style = document.createElement('style');
        style.id = 'camera-super-modal-css';
        style.textContent = `
/* === Camera Super Modal START === */
.csm-overlay {
    position: fixed; inset: 0; z-index: 10001;
    background: rgba(5, 5, 15, .92);
    backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    animation: csm-fadeIn .4s ease;
}
.csm-overlay.closing { animation: csm-fadeOut .3s ease forwards; }
.csm-particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.csm-particle { position: absolute; border-radius: 50%; animation: csm-float 6s ease-in-out infinite; }
.csm-magic-circle {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, .12);
    animation: csm-rotate 25s linear infinite;
    top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 0;
}
.csm-container {
    position: relative; z-index: 1;
    width: 92vw; max-width: 700px; max-height: 88vh;
    background: linear-gradient(160deg, #12121f 0%, #0d0d1a 100%);
    border: 1px solid rgba(139, 92, 246, .3);
    border-radius: 20px; display: flex; flex-direction: column;
    box-shadow: 0 20px 60px rgba(0,0,0,.7), 0 0 30px rgba(139, 92, 246, .08);
    overflow: hidden; animation: csm-slideUp .5s cubic-bezier(.16, 1, .3, 1);
}
.csm-header { padding: 14px 20px 0; flex-shrink: 0; }
.csm-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.csm-title {
    font-size: 1.25rem; font-weight: 800;
    background: linear-gradient(135deg, #fbbf24, #f97316, #ec4899, #a855f7);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.csm-super-badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 8px; font-size: .6rem; font-weight: 800;
    background: linear-gradient(135deg, #fbbf24, #f97316);
    -webkit-background-clip: padding-box; background-clip: padding-box;
    -webkit-text-fill-color: #000; color: #000; letter-spacing: 1px; margin-left: 8px;
    animation: csm-pulse 2s ease-in-out infinite;
}
.csm-toolbar button {
    background: rgba(139, 92, 246, .15); border: 1px solid rgba(139, 92, 246, .2);
    color: #c4b5fd; padding: 5px 12px; border-radius: 8px; cursor: pointer;
    font-size: .72rem; transition: all .2s; margin-left: 6px;
}
.csm-toolbar button:hover { background: rgba(139, 92, 246, .3); border-color: rgba(139, 92, 246, .4); }
.csm-body { flex: 1; overflow-y: auto; padding: 10px 20px 16px; scrollbar-width: none; -ms-overflow-style: none; }
.csm-body::-webkit-scrollbar { display: none; }
.csm-section { margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid rgba(139, 92, 246, .1); }
.csm-section:last-child { border-bottom: none; margin-bottom: 0; }
.csm-section-title {
    font-size: .78rem; font-weight: 700; color: #a855f7;
    margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
}
.csm-section-title .pro-tag {
    font-size: .55rem; padding: 2px 6px; border-radius: 4px;
    background: rgba(251, 191, 36, .15); color: #fbbf24;
    border: 1px solid rgba(251, 191, 36, .2); font-weight: 600;
}
/* Slider Group */
.csm-slider-group {
    margin-bottom: 14px; padding: 12px 14px; border-radius: 12px;
    background: rgba(30, 30, 60, .4); border: 1px solid rgba(139, 92, 246, .12);
    transition: all .3s; opacity: .5;
}
.csm-slider-group.active { opacity: 1; border-color: rgba(139, 92, 246, .35); box-shadow: 0 0 20px rgba(99, 102, 241, .06); }
.csm-slider-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
.csm-slider-label { font-size: .78rem; font-weight: 700; color: #8b8ba0; display: flex; align-items: center; gap: 6px; transition: color .3s; }
.csm-slider-group.active .csm-slider-label { color: #e2e0f0; }
.csm-slider-status { display: flex; align-items: center; gap: 6px; }
.csm-slider-value { font-size: .72rem; color: #a78bfa; font-weight: 600; }
.csm-slider-reset {
    font-size: .6rem; padding: 2px 6px; border-radius: 4px; cursor: pointer;
    border: 1px solid rgba(239, 68, 68, .2); background: rgba(239, 68, 68, .1);
    color: #f87171; opacity: 0; pointer-events: none; transition: all .2s;
}
.csm-slider-group.active .csm-slider-reset { opacity: 1; pointer-events: auto; }
.csm-slider-reset:hover { background: rgba(239, 68, 68, .25); border-color: #f87171; }
.csm-slider-desc { font-size: .72rem; color: #8b8ba0; margin-bottom: 4px; min-height: 16px; transition: all .3s; }
.csm-slider-desc .fun { color: #fbbf24; font-weight: 600; }
.csm-slider-desc .pro { color: #6366f1; font-size: .65rem; display: none; }
.csm-slider-group.active .csm-slider-desc .pro { display: inline; }
.csm-slider-track { position: relative; height: 32px; margin: 2px 0; }
.csm-slider-track input[type="range"] {
    width: 100%; height: 6px; -webkit-appearance: none; appearance: none;
    background: rgba(139, 92, 246, .15); border-radius: 3px;
    outline: none; position: relative; z-index: 2; transition: background .3s;
}
.csm-slider-group.active .csm-slider-track input[type="range"] {
    background: linear-gradient(90deg, rgba(99, 102, 241, .4), rgba(139, 92, 246, .4));
}
.csm-slider-track input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; width: 32px; height: 32px;
    border-radius: 50%; border: 3px solid rgba(255, 255, 255, .15);
    background: linear-gradient(135deg, #6366f1, #a855f7);
    box-shadow: 0 0 16px rgba(139, 92, 246, .5); cursor: pointer;
}
.csm-slider-group:not(.active) .csm-slider-track input[type="range"]::-webkit-slider-thumb {
    background: rgba(100, 100, 140, .4); box-shadow: none; border-color: rgba(255, 255, 255, .1);
}
.csm-slider-stops {
    position: absolute; top: 50%; left: 0; right: 0;
    display: flex; justify-content: space-between; padding: 0 14px;
    z-index: 1; transform: translateY(-50%);
}
.csm-slider-stop { width: 4px; height: 4px; border-radius: 50%; background: rgba(139, 92, 246, .3); }
.csm-slider-endpoints {
    display: flex; justify-content: space-between; font-size: .6rem; color: #6b7280;
    padding: 0 2px; margin-top: -2px;
}
.csm-slider-endpoints .ep { cursor: pointer; transition: color .2s; }
.csm-slider-endpoints .ep:hover { color: #a78bfa; }
/* Chip Grid */
.csm-chip-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 6px; }
.csm-chip {
    padding: 8px 10px; border-radius: 10px; cursor: pointer; position: relative;
    background: rgba(30, 30, 60, .4); border: 1px solid rgba(139, 92, 246, .12);
    transition: all .25s;
}
.csm-chip:hover { border-color: rgba(139, 92, 246, .4); background: rgba(40, 40, 80, .5); }
.csm-chip.selected { border-color: rgba(34, 211, 238, .6); background: rgba(34, 211, 238, .08); box-shadow: 0 0 12px rgba(34, 211, 238, .1); }
.csm-chip-zh { font-size: .78rem; font-weight: 700; color: #e2e0f0; display: block; }
.csm-chip-en { font-size: .6rem; color: #6b7280; }
.csm-chip-fun {
    position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%) translateY(4px);
    font-size: .62rem; color: #fbbf24; font-weight: 600;
    background: rgba(20, 20, 40, .95); border: 1px solid rgba(251, 191, 36, .3);
    padding: 5px 10px; border-radius: 8px; white-space: nowrap;
    pointer-events: none; opacity: 0; transition: opacity .2s, transform .2s;
    z-index: 10; backdrop-filter: blur(8px);
    box-shadow: 0 4px 12px rgba(0,0,0,.4);
}
.csm-chip-fun::after {
    content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
    border: 5px solid transparent; border-top-color: rgba(251, 191, 36, .3);
}
.csm-chip:hover .csm-chip-fun { opacity: 1; transform: translateX(-50%) translateY(0); }
/* Bonus */
.csm-bonus { padding: 12px 20px; border-top: 1px solid rgba(139, 92, 246, .15); flex-shrink: 0; }
.csm-bonus-title { font-size: .72rem; font-weight: 700; color: #34d399; margin-bottom: 6px; }
.csm-bonus-tags { display: flex; flex-wrap: wrap; gap: 5px; }
.csm-bonus-tag {
    padding: 4px 10px; font-size: .68rem; border-radius: 14px; cursor: pointer;
    background: rgba(52, 211, 153, .08); border: 1px solid rgba(52, 211, 153, .2);
    color: #6ee7b7; transition: all .25s; font-weight: 500;
}
.csm-bonus-tag:hover { background: rgba(52, 211, 153, .15); border-color: rgba(52, 211, 153, .4); }
.csm-bonus-tag.selected { background: rgba(52, 211, 153, .2); border-color: #34d399; color: #34d399; font-weight: 700; }
/* Preview */
.csm-preview { padding: 8px 20px 10px; border-top: 1px solid rgba(139, 92, 246, .1); flex-shrink: 0; }
.csm-preview-label { font-size: .62rem; font-weight: 700; color: #fbbf24; margin-bottom: 4px; letter-spacing: 1px; }
.csm-preview-text { font-family: 'Fira Code', monospace; font-size: .68rem; color: #8b8ba0; line-height: 1.5; max-height: 36px; overflow: hidden; }
/* Footer */
.csm-footer {
    padding: 10px 20px; border-top: 1px solid rgba(139, 92, 246, .2);
    display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
}
.csm-footer-status { font-size: .72rem; color: #8b8ba0; }
.csm-footer-status .count { color: #a78bfa; font-weight: 700; }
.csm-footer-actions { display: flex; gap: 8px; }
.csm-btn {
    padding: 8px 20px; border-radius: 10px; font-size: .78rem; font-weight: 700;
    cursor: pointer; border: none; transition: all .2s;
}
.csm-btn-cancel { background: rgba(120, 120, 180, .15); color: #8b8ba0; }
.csm-btn-cancel:hover { background: rgba(120, 120, 180, .25); }
.csm-btn-apply {
    background: linear-gradient(135deg, #fbbf24, #f97316);
    color: #000; box-shadow: 0 4px 15px rgba(251, 191, 36, .3);
}
.csm-btn-apply:hover { box-shadow: 0 4px 20px rgba(251, 191, 36, .5); transform: translateY(-1px); }
/* Animations */
@keyframes csm-fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes csm-fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes csm-slideUp { from { opacity: 0; transform: translateY(30px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes csm-rotate { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
@keyframes csm-float { 0%,100% { transform: translateY(0) translateX(0); opacity: .3; } 50% { transform: translateY(-80px) translateX(20px); opacity: .7; } }
@keyframes csm-pulse { 0%,100% { opacity: 1; } 50% { opacity: .7; } }
/* === Conflict Toast === */
.csm-conflict-toast {
    position: fixed; top: 60px; left: 50%; transform: translateX(-50%) translateY(-20px);
    z-index: 10010; padding: 10px 20px; border-radius: 12px;
    background: rgba(239, 68, 68, .92); backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 100, 100, .5);
    color: #fff; font-size: .78rem; font-weight: 700;
    box-shadow: 0 8px 30px rgba(239, 68, 68, .4);
    opacity: 0; pointer-events: none;
    transition: opacity .3s, transform .3s;
    max-width: 90vw; text-align: center;
}
.csm-conflict-toast.visible { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
.csm-chip.conflict { border-color: rgba(239, 68, 68, .6) !important; box-shadow: 0 0 12px rgba(239, 68, 68, .2); }
.csm-bonus-tag.conflict { border-color: rgba(239, 68, 68, .6) !important; box-shadow: 0 0 8px rgba(239, 68, 68, .2); }
.csm-slider-group.conflict { border-color: rgba(239, 68, 68, .4) !important; box-shadow: 0 0 15px rgba(239, 68, 68, .1); }
@keyframes csm-conflictFlash { 0% { box-shadow: 0 0 0 rgba(239,68,68,0); } 50% { box-shadow: 0 0 20px rgba(239,68,68,.3); } 100% { box-shadow: 0 0 0 rgba(239,68,68,0); } }
/* === Camera Super Modal END === */
        `;
        document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════
    // 粒子效果
    // ═══════════════════════════════════════════
    function spawnParticles(container) {
        const colors = ['#fbbf24', '#a855f7', '#6366f1', '#ec4899', '#22d3ee'];
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'csm-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.animationDelay = Math.random() * 6 + 's';
            p.style.animationDuration = (4 + Math.random() * 4) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
            container.appendChild(p);
        }
    }

    // ═══════════════════════════════════════════
    // Prompt 組合
    // ═══════════════════════════════════════════
    function buildPromptParts() {
        const parts = [];
        for (const [key, slider] of Object.entries(SLIDERS)) {
            if (!sliderEnabled[key]) continue;
            parts.push({ text: slider.stops[sliderValues[key]].prompt, type: 'slider' });
        }
        const allChipItems = CHIP_SECTIONS.flatMap(s => s.items);
        for (const id of selectedChips) {
            const item = allChipItems.find(i => i.id === id);
            if (item) parts.push({ text: item.prompt, type: 'chip' });
        }
        for (const en of selectedBonuses) {
            parts.push({ text: en, type: 'bonus' });
        }
        return parts;
    }

    // ═══════════════════════════════════════════
    // 渲染
    // ═══════════════════════════════════════════
    function renderBody() {
        const body = document.getElementById('csmBody');
        if (!body) return;
        let html = '';

        // Slider sections
        html += '<div class="csm-section"><div class="csm-section-title">🎚️ 推桿控制區 <span class="pro-tag">滑動即啟用</span></div>';
        for (const [key, slider] of Object.entries(SLIDERS)) {
            const val = sliderValues[key];
            const enabled = sliderEnabled[key];
            const stop = slider.stops[val];
            const max = slider.stops.length - 1;
            html += `
            <div class="csm-slider-group ${enabled ? 'active' : ''}" id="csm-sg-${key}">
                <div class="csm-slider-header">
                    <span class="csm-slider-label">
                        ${slider.icon} ${slider.label}
                        <span style="font-size:.6rem;opacity:.5;">${slider.labelEn}</span>
                    </span>
                    <div class="csm-slider-status">
                        <span class="csm-slider-value">${enabled ? stop.zh + ' (' + stop.en + ')' : '拖動啟用 →'}</span>
                        <button class="csm-slider-reset" data-key="${key}" title="關閉此推桿">✕</button>
                    </div>
                </div>
                <div class="csm-slider-desc" id="csm-desc-${key}">
                    ${enabled ? '<span class="fun">' + stop.fun + '</span><span class="pro"> — ' + stop.prompt + '</span>' : '<span style="opacity:.35;">↔ 拖動推桿即可啟用</span>'}
                </div>
                <div class="csm-slider-track">
                    <div class="csm-slider-stops">${slider.stops.map(() => '<div class="csm-slider-stop"></div>').join('')}</div>
                    <input type="range" min="0" max="${max}" value="${val}" step="1"
                        data-slider-key="${key}">
                </div>
                <div class="csm-slider-endpoints">
                    <span class="ep" data-jump="${key}" data-pos="0">${slider.stops[0].zh}</span>
                    <span class="ep" data-jump="${key}" data-pos="${max}">${slider.stops[max].zh}</span>
                </div>
            </div>`;
        }
        html += '</div>';

        // Chip sections
        for (const section of CHIP_SECTIONS) {
            html += `<div class="csm-section"><div class="csm-section-title">${section.icon} ${section.label} <span style="font-size:.62rem;color:#8b8ba0;margin-left:4px;">${section.labelEn}</span></div>`;
            html += '<div class="csm-chip-grid">';
            for (const item of section.items) {
                const sel = selectedChips.has(item.id);
                html += `
                <div class="csm-chip ${sel ? 'selected' : ''}" data-chip-id="${item.id}">
                    <div class="csm-chip-text">
                        <span class="csm-chip-zh">${item.zh}</span>
                        <span class="csm-chip-en">${item.en}</span>
                        <span class="csm-chip-fun">${item.fun}</span>
                    </div>
                </div>`;
            }
            html += '</div></div>';
        }

        body.innerHTML = html;
        bindBodyEvents(body);
    }

    function bindBodyEvents(body) {
        // Slider input events
        body.querySelectorAll('input[data-slider-key]').forEach(input => {
            const key = input.dataset.sliderKey;
            input.addEventListener('input', () => onSlide(key, input.value));
            input.addEventListener('mousedown', () => autoEnable(key));
            input.addEventListener('touchstart', () => autoEnable(key));
        });
        // Slider reset
        body.querySelectorAll('.csm-slider-reset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                disableSlider(btn.dataset.key);
            });
        });
        // Jump endpoints
        body.querySelectorAll('[data-jump]').forEach(ep => {
            ep.addEventListener('click', () => {
                jumpSlider(ep.dataset.jump, parseInt(ep.dataset.pos));
            });
        });
        // Chip toggles
        body.querySelectorAll('[data-chip-id]').forEach(chip => {
            chip.addEventListener('click', () => toggleChip(chip.dataset.chipId));
        });
    }

    function renderBonus() {
        const container = document.getElementById('csmBonusTags');
        if (!container) return;
        container.innerHTML = BONUS_TRAITS.map(t =>
            `<span class="csm-bonus-tag ${selectedBonuses.has(t.en) ? 'selected' : ''}"
                data-bonus-en="${t.en.replace(/"/g, '&quot;')}">
                ${t.icon} ${t.zh}
            </span>`
        ).join('');
        container.querySelectorAll('.csm-bonus-tag').forEach(tag => {
            tag.addEventListener('click', () => toggleBonus(tag.dataset.bonusEn));
        });
    }

    function updatePreview() {
        const el = document.getElementById('csmPreview');
        const countEl = document.getElementById('csmCount');
        const parts = buildPromptParts();
        if (countEl) countEl.textContent = parts.length;
        if (el) {
            el.innerHTML = parts.length > 0
                ? parts.map(p => p.text).join(', ')
                : '移動推桿或點選格子...';
        }
    }

    // ═══════════════════════════════════════════
    // Slider 邏輯
    // ═══════════════════════════════════════════
    function autoEnable(key) {
        if (!sliderEnabled[key]) {
            sliderEnabled[key] = true;
            const group = document.getElementById(`csm-sg-${key}`);
            if (group) group.classList.add('active');
            const slider = SLIDERS[key];
            const stop = slider.stops[sliderValues[key]];
            const desc = document.getElementById(`csm-desc-${key}`);
            if (desc) desc.innerHTML = `<span class="fun">${stop.fun}</span><span class="pro"> — ${stop.prompt}</span>`;
            const valEl = group?.querySelector('.csm-slider-value');
            if (valEl) valEl.textContent = stop.zh + ' (' + stop.en + ')';
            updatePreview();
        }
    }

    function disableSlider(key) {
        sliderEnabled[key] = false;
        renderBody();
        updatePreview();
    }

    function jumpSlider(key, pos) {
        sliderEnabled[key] = true;
        sliderValues[key] = pos;
        renderBody();
        updatePreview();
    }

    function onSlide(key, val) {
        sliderValues[key] = parseInt(val);
        sliderEnabled[key] = true;
        const slider = SLIDERS[key];
        const stop = slider.stops[val];
        const desc = document.getElementById(`csm-desc-${key}`);
        if (desc) desc.innerHTML = `<span class="fun">${stop.fun}</span><span class="pro"> — ${stop.prompt}</span>`;
        const group = document.getElementById(`csm-sg-${key}`);
        if (group) group.classList.add('active');
        const valEl = group?.querySelector('.csm-slider-value');
        if (valEl) valEl.textContent = stop.zh + ' (' + stop.en + ')';
        updatePreview();
        checkAndShowConflicts();
    }

    // ═══════════════════════════════════════════
    // ⚠️ 自選衝突即時檢查
    // ═══════════════════════════════════════════
    let conflictToastTimer = null;

    function getActiveSliderMap() {
        const map = {};
        for (const key of Object.keys(SLIDERS)) {
            if (sliderEnabled[key]) map[key] = sliderValues[key];
        }
        return map;
    }

    function checkAndShowConflicts() {
        const activeSliders = getActiveSliderMap();
        const conflicts = [];

        // 清除之前的衝突高亮
        document.querySelectorAll('.csm-chip.conflict, .csm-bonus-tag.conflict, .csm-slider-group.conflict')
            .forEach(el => el.classList.remove('conflict'));

        // 1. Chip × Chip 衝突
        for (const rule of CAMERA_CONFLICTS) {
            if (rule.type === 'chip_chip') {
                if (selectedChips.has(rule.a) && selectedChips.has(rule.b)) {
                    conflicts.push(rule.msg);
                    // 高亮衝突 chips
                    document.querySelector(`[data-chip-id="${rule.a}"]`)?.classList.add('conflict');
                    document.querySelector(`[data-chip-id="${rule.b}"]`)?.classList.add('conflict');
                }
            }
        }

        // 2. Slider × Chip 衝突
        for (const rule of CAMERA_CONFLICTS) {
            if (rule.type === 'slider_chip') {
                if (activeSliders[rule.slider] === rule.value && selectedChips.has(rule.chip)) {
                    conflicts.push(rule.msg);
                    document.querySelector(`[data-chip-id="${rule.chip}"]`)?.classList.add('conflict');
                    document.getElementById(`csm-sg-${rule.slider}`)?.classList.add('conflict');
                }
            }
        }

        // 3. Slider × Slider 衝突
        for (const rule of CAMERA_CONFLICTS) {
            if (rule.type === 'slider_slider') {
                if (sliderEnabled[rule.sliderA] && sliderEnabled[rule.sliderB]
                    && sliderValues[rule.sliderA] === rule.valueA
                    && sliderValues[rule.sliderB] >= rule.minB) {
                    conflicts.push(rule.msg);
                    document.getElementById(`csm-sg-${rule.sliderA}`)?.classList.add('conflict');
                    document.getElementById(`csm-sg-${rule.sliderB}`)?.classList.add('conflict');
                }
            }
        }

        // 4. Slider × Bonus 衝突
        for (const rule of CAMERA_CONFLICTS) {
            if (rule.type === 'slider_bonus') {
                if (!selectedBonuses.has(rule.bonusEn)) continue;
                const sv = activeSliders[rule.slider];
                if (sv === undefined) continue;
                let hit = false;
                if (rule.value !== undefined && sv === rule.value) hit = true;
                if (rule.values && rule.values.includes(sv)) hit = true;
                if (hit) {
                    conflicts.push(rule.msg);
                    document.getElementById(`csm-sg-${rule.slider}`)?.classList.add('conflict');
                    document.querySelector(`[data-bonus-en="${CSS.escape(rule.bonusEn)}"]`)?.classList.add('conflict');
                }
            }
        }

        if (conflicts.length > 0) {
            showConflictToastCSM(conflicts);
            playConflictBeep();
        } else {
            hideConflictToast();
        }
    }

    function showConflictToastCSM(conflicts) {
        let toast = document.getElementById('csmConflictToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'csmConflictToast';
            toast.className = 'csm-conflict-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `⚠️ ${conflicts.join(' │ ')}`;
        toast.classList.add('visible');
        if (conflictToastTimer) clearTimeout(conflictToastTimer);
        conflictToastTimer = setTimeout(() => hideConflictToast(), 4000);
    }

    function hideConflictToast() {
        const toast = document.getElementById('csmConflictToast');
        if (toast) toast.classList.remove('visible');
    }

    function playConflictBeep() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.connect(g).connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.setValueAtTime(330, ctx.currentTime + 0.08);
            g.gain.setValueAtTime(0.06, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) { }
    }

    // ═══════════════════════════════════════════
    // Chip / Bonus 邏輯
    // ═══════════════════════════════════════════
    function toggleChip(id) {
        if (selectedChips.has(id)) selectedChips.delete(id);
        else selectedChips.add(id);
        renderBody();
        updatePreview();
        checkAndShowConflicts();
    }

    function toggleBonus(en) {
        if (selectedBonuses.has(en)) selectedBonuses.delete(en);
        else selectedBonuses.add(en);
        renderBonus();
        updatePreview();
        checkAndShowConflicts();
    }

    // ═══════════════════════════════════════════
    // Random / Reset
    // ═══════════════════════════════════════════
    function randomAll() {
        // ── Step 1: 隨機推桿 ──
        for (const key of Object.keys(SLIDERS)) {
            sliderEnabled[key] = Math.random() > 0.3;
            sliderValues[key] = Math.floor(Math.random() * SLIDERS[key].stops.length);
        }

        // ── Step 2: 修正推桿 × 推桿衝突 ──
        let sliderConflict = getSliderConflict(sliderEnabled, sliderValues);
        let retries = 10;
        while (sliderConflict && retries-- > 0) {
            // 隨機關閉衝突的其中一個推桿
            const disableKey = Math.random() > 0.5 ? sliderConflict.sliderA : sliderConflict.sliderB;
            sliderEnabled[disableKey] = false;
            sliderConflict = getSliderConflict(sliderEnabled, sliderValues);
        }

        // ── Step 3: 收集已啟用的推桿值 ──
        const activeSliders = {};
        for (const key of Object.keys(SLIDERS)) {
            if (sliderEnabled[key]) activeSliders[key] = sliderValues[key];
        }

        // ── Step 4: 約束感知選 Chip ──
        selectedChips.clear();
        for (const section of CHIP_SECTIONS) {
            if (Math.random() > 0.4) {
                // 打亂順序再逐一嘗試
                const shuffled = [...section.items].sort(() => Math.random() - 0.5);
                for (const item of shuffled) {
                    if (!getChipConflict(item.id, selectedChips, activeSliders)) {
                        selectedChips.add(item.id);
                        break; // 每 section 最多選一個
                    }
                }
            }
        }

        // ── Step 5: 約束感知選 Bonus ──
        selectedBonuses.clear();
        const numBonus = Math.floor(Math.random() * 3);
        const shuffledBonus = [...BONUS_TRAITS].sort(() => Math.random() - 0.5);
        let bonusCount = 0;
        for (const t of shuffledBonus) {
            if (bonusCount >= numBonus) break;
            if (!getBonusConflict(t.en, activeSliders)) {
                selectedBonuses.add(t.en);
                bonusCount++;
            }
        }

        renderBody();
        renderBonus();
        updatePreview();
    }

    function resetAll() {
        resetState();
        renderBody();
        renderBonus();
        updatePreview();
    }

    // ═══════════════════════════════════════════
    // 關閉 Modal
    // ═══════════════════════════════════════════
    function closeModal() {
        const o = document.getElementById('cameraSuperModal');
        if (!o) return;
        o.classList.add('closing');
        setTimeout(() => o.remove(), 300);
    }

    // ═══════════════════════════════════════════
    // 套用
    // ═══════════════════════════════════════════
    function applyAll() {
        const parts = buildPromptParts();
        if (parts.length === 0) { closeModal(); return; }

        const { state, generatePrompt, saveState, renderTabContent } = deps;

        // 收集 prompt 文字
        const promptTexts = parts.map(p => p.text);

        // 收集中文標籤（用於橫幅顯示）
        const zhLabels = [];
        for (const [key, slider] of Object.entries(SLIDERS)) {
            if (!sliderEnabled[key]) continue;
            const stop = slider.stops[sliderValues[key]];
            zhLabels.push(stop.zh);
        }
        const allChipItems = CHIP_SECTIONS.flatMap(s => s.items);
        for (const id of selectedChips) {
            const item = allChipItems.find(i => i.id === id);
            if (item) zhLabels.push(item.zh);
        }
        for (const en of selectedBonuses) {
            const t = BONUS_TRAITS.find(b => b.en === en);
            if (t) zhLabels.push(t.zh);
        }

        // 寫入 state
        state.cameraAdvanced = {
            bonusTraits: promptTexts,
            bonusTraitsZh: zhLabels,
            selectedCamera: { label: '⚡ Super Mode', en: 'Super Mode' },
            superMode: true,
            _superState: {
                sliderValues: { ...sliderValues },
                sliderEnabled: { ...sliderEnabled },
                selectedChips: [...selectedChips],
                selectedBonuses: [...selectedBonuses]
            }
        };
        state.selections.cameraAngle = promptTexts[0]; // 主選項

        // 清除被覆蓋的 sub-section 選取
        ['shotSize', 'focalLength', 'aperture', 'lensEffect'].forEach(k => delete state.selections[k]);

        closeModal();

        if (generatePrompt) generatePrompt();
        if (saveState) saveState();
        if (renderTabContent) renderTabContent();

        // 播放確認音效
        if (deps.sfx && deps.sfx.playSuccess) deps.sfx.playSuccess();
    }

    // ═══════════════════════════════════════════
    // 開啟 Modal
    // ═══════════════════════════════════════════
    function open() {
        injectCSS();
        restoreState();

        const overlay = document.createElement('div');
        overlay.className = 'csm-overlay';
        overlay.id = 'cameraSuperModal';
        overlay.innerHTML = `
        <div class="csm-magic-circle"></div>
        <div class="csm-particles" id="csmParticles"></div>
        <div class="csm-container">
            <div class="csm-header">
                <div class="csm-title-row">
                    <div class="csm-title">⚡ 超級魔法・運鏡大全 <span class="csm-super-badge">SUPER</span></div>
                    <div class="csm-toolbar">
                        <button id="csmRandomBtn"><i class="fa-solid fa-dice"></i> 隨機</button>
                        <button id="csmResetBtn"><i class="fa-solid fa-eraser"></i></button>
                    </div>
                </div>
            </div>
            <div class="csm-body" id="csmBody"></div>
            <div class="csm-bonus" id="csmBonus">
                <div class="csm-bonus-title">⭐ 追加特效修飾詞</div>
                <div class="csm-bonus-tags" id="csmBonusTags"></div>
            </div>
            <div class="csm-preview">
                <div class="csm-preview-label">⚡ 即時預覽 Prompt</div>
                <div class="csm-preview-text" id="csmPreview">移動推桿或點選格子...</div>
            </div>
            <div class="csm-footer">
                <div class="csm-footer-status">已選：<span class="count" id="csmCount">0</span> 項</div>
                <div class="csm-footer-actions">
                    <button class="csm-btn csm-btn-cancel" id="csmCancelBtn">取消</button>
                    <button class="csm-btn csm-btn-apply" id="csmApplyBtn">⚡ 超級套用</button>
                </div>
            </div>
        </div>`;

        document.body.appendChild(overlay);

        // 事件綁定
        overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        document.getElementById('csmRandomBtn').addEventListener('click', randomAll);
        document.getElementById('csmResetBtn').addEventListener('click', resetAll);
        document.getElementById('csmCancelBtn').addEventListener('click', closeModal);
        document.getElementById('csmApplyBtn').addEventListener('click', applyAll);

        spawnParticles(document.getElementById('csmParticles'));
        renderBody();
        renderBonus();
        updatePreview();
    }

    return { setup, open };
})();
