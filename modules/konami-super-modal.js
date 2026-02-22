// ═══════════════════════════════════════════════════════════════
// 🎮 Konami Super Modal — 通用 Konami Code 偵測 + 華麗過場特效
// ═══════════════════════════════════════════════════════════════
// 用途：在任何 Magic Modal 開啟中輸入 Konami Code (↑↑↓↓←→←→BA)
//       → 觸發華麗過場特效 → 解鎖對應的 Super Modal
//
// API：
//   KonamiSuperModal.attach(overlayEl, onUnlock)
//     - overlayEl: Magic Modal 的 overlay DOM 元素
//     - onUnlock:  全序列正確後的回呼函數，由它開啟 Super Modal
//
//   KonamiSuperModal.detach()
//     - 手動移除監聽（通常不需要，overlay 關閉時自動清理）
// ═══════════════════════════════════════════════════════════════

window.PromptGen = window.PromptGen || {};

window.PromptGen.KonamiSuperModal = (function () {
    'use strict';

    // Konami Code 序列
    const KONAMI_SEQUENCE = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    let currentIndex = 0;
    let activeOverlay = null;
    let onUnlockCallback = null;
    let keyHandler = null;
    let resetTimer = null;

    // === 每次正確按鍵的微閃光提示 ===
    function flashHint(overlayEl, progress) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed; inset: 0; z-index: 100000;
            background: radial-gradient(circle at center,
                rgba(139, 92, 246, ${0.05 + progress * 0.08}) 0%,
                transparent 70%);
            pointer-events: none;
            animation: konami-hint-flash .4s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 400);

        // 隨進度增加，在 overlay 四周加上微光
        if (overlayEl) {
            const container = overlayEl.querySelector('[class*="-container"]');
            if (container) {
                const glow = Math.min(progress * 3, 20);
                container.style.boxShadow = `0 0 ${glow}px rgba(251, 191, 36, ${progress * 0.15})`;
            }
        }
    }

    // === 完整序列正確 → 華麗過場特效 ===
    function playTransitionEffect(overlayEl, callback) {
        // 1. 在 overlay 上建立過場層
        const transLayer = document.createElement('div');
        transLayer.className = 'konami-transition-layer';
        transLayer.style.cssText = `
            position: fixed; inset: 0; z-index: 99999;
            pointer-events: none;
            overflow: hidden;
        `;
        document.body.appendChild(transLayer);

        // 2. 金色♦紫色光芒擴散
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: absolute;
            top: 50%; left: 50%;
            width: 0; height: 0;
            border-radius: 50%;
            background: radial-gradient(circle,
                rgba(251, 191, 36, .6) 0%,
                rgba(168, 85, 247, .4) 40%,
                rgba(99, 102, 241, .2) 70%,
                transparent 100%);
            transform: translate(-50%, -50%);
            animation: konami-burst .8s cubic-bezier(.16, 1, .3, 1) forwards;
        `;
        transLayer.appendChild(burst);

        // 3. 粒子爆發
        const colors = ['#fbbf24', '#a855f7', '#6366f1', '#22d3ee', '#ec4899', '#f97316'];
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            const angle = (i / 40) * Math.PI * 2;
            const distance = 150 + Math.random() * 300;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const size = 3 + Math.random() * 6;
            particle.style.cssText = `
                position: absolute;
                top: 50%; left: 50%;
                width: ${size}px; height: ${size}px;
                border-radius: 50%;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                transform: translate(-50%, -50%);
                animation: konami-particle .7s ${i * 15}ms cubic-bezier(.16, 1, .3, 1) forwards;
                --dx: ${dx}px; --dy: ${dy}px;
                opacity: 0;
            `;
            transLayer.appendChild(particle);
        }

        // 4. ⚡ SUPER MODE 閃字
        const text = document.createElement('div');
        text.style.cssText = `
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            font-size: 2.2rem;
            font-weight: 900;
            letter-spacing: 6px;
            background: linear-gradient(135deg, #fbbf24, #f97316, #ec4899, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(251, 191, 36, .3);
            animation: konami-text .6s .2s cubic-bezier(.16, 1, .3, 1) forwards;
            white-space: nowrap;
            z-index: 2;
        `;
        text.textContent = '⚡ SUPER MODE ⚡';
        transLayer.appendChild(text);

        // 5. 音效（電影級升級感）
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;

            // === Layer 1: 低頻震撼衝擊波 (Sub Bass Hit) ===
            const subBass = ctx.createOscillator();
            const subGain = ctx.createGain();
            subBass.connect(subGain).connect(ctx.destination);
            subBass.type = 'sine';
            subBass.frequency.setValueAtTime(60, now);
            subBass.frequency.exponentialRampToValueAtTime(25, now + 0.8);
            subGain.gain.setValueAtTime(0.25, now);
            subGain.gain.linearRampToValueAtTime(0.18, now + 0.1);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
            subBass.start(now);
            subBass.stop(now + 0.8);

            // === Layer 2: 反向衝擊音 (Reverse Cymbal Effect) ===
            const noiseLen = 1.2;
            const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * noiseLen, ctx.sampleRate);
            const noiseData = noiseBuffer.getChannelData(0);
            for (let i = 0; i < noiseData.length; i++) {
                noiseData[i] = (Math.random() * 2 - 1) * 0.3;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = noiseBuffer;
            const noiseFilter = ctx.createBiquadFilter();
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.setValueAtTime(2000, now);
            noiseFilter.frequency.exponentialRampToValueAtTime(800, now + 0.6);
            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0, now);
            noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.5);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
            noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
            noise.start(now);
            noise.stop(now + noiseLen);

            // === Layer 3: 電影級上行和弦 (Cinematic Rising Chord) ===
            const chordNotes = [
                { freq: 261.63, delay: 0.05, type: 'sine' },      // C4
                { freq: 329.63, delay: 0.08, type: 'triangle' },   // E4
                { freq: 392.00, delay: 0.12, type: 'sine' },       // G4
                { freq: 523.25, delay: 0.18, type: 'triangle' },   // C5
                { freq: 659.25, delay: 0.25, type: 'sine' },       // E5
                { freq: 783.99, delay: 0.32, type: 'triangle' },   // G5
                { freq: 1046.50, delay: 0.40, type: 'sine' },      // C6
                { freq: 1318.51, delay: 0.48, type: 'triangle' },  // E6
            ];
            chordNotes.forEach(n => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.connect(g).connect(ctx.destination);
                osc.type = n.type;
                osc.frequency.value = n.freq;
                const t = now + n.delay;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.08, t + 0.03);
                g.gain.setValueAtTime(0.08, t + 0.15);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
                osc.start(t);
                osc.stop(t + 0.6);
            });

            // === Layer 4: 金屬閃亮收尾音 (Metallic Shimmer) ===
            setTimeout(() => {
                const ctx2 = new (window.AudioContext || window.webkitAudioContext)();
                const t = ctx2.currentTime;
                // 高頻閃亮
                [2093, 2637, 3136, 3520].forEach((freq, i) => {
                    const osc = ctx2.createOscillator();
                    const g = ctx2.createGain();
                    osc.connect(g).connect(ctx2.destination);
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    const start = t + i * 0.02;
                    g.gain.setValueAtTime(0.06, start);
                    g.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
                    osc.start(start);
                    osc.stop(start + 0.5);
                });
                // 低頻共鳴收尾
                const pad = ctx2.createOscillator();
                const padG = ctx2.createGain();
                pad.connect(padG).connect(ctx2.destination);
                pad.type = 'sine';
                pad.frequency.value = 130.81; // C3
                padG.gain.setValueAtTime(0.06, t);
                padG.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
                pad.start(t);
                pad.stop(t + 0.8);
            }, 500);
        } catch (e) { /* 靜音環境也不出錯 */ }

        // 6. 隱藏 Magic Modal → 觸發回呼
        setTimeout(() => {
            if (overlayEl) {
                overlayEl.style.transition = 'opacity .3s';
                overlayEl.style.opacity = '0';
                setTimeout(() => overlayEl.remove(), 300);
            }
        }, 300);

        // 7. 清除過場層 → 開啟 Super Modal
        setTimeout(() => {
            transLayer.style.transition = 'opacity .3s';
            transLayer.style.opacity = '0';
            setTimeout(() => transLayer.remove(), 300);
            if (callback) callback();
        }, 900);
    }

    // === 注入全域動畫 CSS（只注入一次） ===
    function injectStyles() {
        if (document.getElementById('konami-super-styles')) return;
        const style = document.createElement('style');
        style.id = 'konami-super-styles';
        style.textContent = `
            @keyframes konami-hint-flash {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes konami-burst {
                from { width: 0; height: 0; opacity: 1; }
                to { width: 200vmax; height: 200vmax; opacity: 0; }
            }
            @keyframes konami-particle {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0);
                }
            }
            @keyframes konami-text {
                from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // === 鍵盤監聽 ===
    function handleKey(e) {
        // 如果 overlay 已被移除，自動清理
        if (activeOverlay && !document.body.contains(activeOverlay)) {
            detach();
            return;
        }

        // 把 key 轉成可比對格式
        const expected = KONAMI_SEQUENCE[currentIndex];
        const pressed = e.code; // 'ArrowUp', 'KeyB', 'KeyA' etc.

        if (pressed === expected) {
            currentIndex++;
            const progress = currentIndex / KONAMI_SEQUENCE.length;
            flashHint(activeOverlay, progress);

            // 清除超時重設
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => { currentIndex = 0; }, 3000);

            // 全部正確！
            if (currentIndex >= KONAMI_SEQUENCE.length) {
                currentIndex = 0;
                clearTimeout(resetTimer);
                e.preventDefault();
                e.stopPropagation();
                playTransitionEffect(activeOverlay, onUnlockCallback);
                detach();
            }
        } else {
            // 錯誤 → 重設（但如果按的是序列的第一鍵則從頭開始）
            currentIndex = (pressed === KONAMI_SEQUENCE[0]) ? 1 : 0;
        }
    }

    // === 公開 API ===
    function attach(overlayEl, onUnlock) {
        detach(); // 先清理舊的
        injectStyles();
        activeOverlay = overlayEl;
        onUnlockCallback = onUnlock;
        currentIndex = 0;
        keyHandler = handleKey;
        document.addEventListener('keydown', keyHandler);
    }

    function detach() {
        if (keyHandler) {
            document.removeEventListener('keydown', keyHandler);
            keyHandler = null;
        }
        activeOverlay = null;
        onUnlockCallback = null;
        currentIndex = 0;
        clearTimeout(resetTimer);
    }

    return { attach, detach };
})();
