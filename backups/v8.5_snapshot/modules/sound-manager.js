// ============================================
// AI Prompt Generator — 音效管理器
// SoundManager 類別（合成科幻音效）
// ============================================
window.PromptGen = window.PromptGen || {};
window.PromptGen.SoundManager = (function() {
    class SoundManager {
        constructor() {
            this.ctx = null;
            this.masterGain = null;
            this.isMuted = localStorage.getItem('soundMuted') === 'true'; // Load saved mute state
            // Load saved volume (default 23)
            const savedVol = localStorage.getItem('soundVolume');
            this.volume = savedVol !== null ? parseInt(savedVol, 10) : 23;
            this.initialized = false;
        }

        init() {
            if (this.initialized) {
                if (this.ctx && this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
                return;
            }
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();
                this.masterGain = this.ctx.createGain();

                // Apply initial volume
                this.updateGain();

                this.masterGain.connect(this.ctx.destination);
                this.initialized = true;
            } catch (e) {
                console.warn("Web Audio API not supported", e);
            }
        }

        // Helper to set master gain based on mute and volume
        updateGain() {
            if (!this.masterGain) return;
            const targetGain = this.isMuted ? 0 : (this.volume / 100);
            this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
        }

        setVolume(val) {
            this.volume = val;
            localStorage.setItem('soundVolume', this.volume);
            if (this.initialized) {
                this.updateGain();
            }
        }

        toggleMute() {
            this.isMuted = !this.isMuted;
            localStorage.setItem('soundMuted', this.isMuted); // Save state

            if (this.initialized) {
                this.updateGain();
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
            }
            return this.isMuted;
        }

        // 1. Click/Select: High-tech blip
        playClick() {
            if (!this.initialized) this.init();
            if (this.isMuted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, t);
            osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);

            gain.gain.setValueAtTime(0.5, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(t);
            osc.stop(t + 0.05);
        }

        // 2. Hover: Very subtle tick
        playHover() {
            // Hover sounds only play if already initialized and running to avoid console warnings
            if (this.isMuted || !this.initialized || (this.ctx && this.ctx.state === 'suspended')) return;

            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(2000, t);

            gain.gain.setValueAtTime(0.05, t); // Very quiet
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(t);
            osc.stop(t + 0.02);
        }

        // 3. Success (Copy): Divine Blessing — Organ-like sustained chord
        playSuccess() {
            if (!this.initialized) this.init();
            if (this.isMuted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const t = this.ctx.currentTime;
            const mg = this.masterGain;

            // Organ-like sustained chord (C major: C4, E4, G4, C5)
            [261.6, 329.6, 392, 523.25].forEach(f => {
                // Fundamental tone with slow attack
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, t);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.15, t + 0.3);
                gain.gain.linearRampToValueAtTime(0.12, t + 0.8);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
                osc.connect(gain);
                gain.connect(mg);
                osc.start(t);
                osc.stop(t + 1.5);

                // 2nd harmonic (octave up, subtle)
                const osc2 = this.ctx.createOscillator();
                const gain2 = this.ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(f * 2, t + 0.1);
                gain2.gain.setValueAtTime(0.04, t + 0.1);
                gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
                osc2.connect(gain2);
                gain2.connect(mg);
                osc2.start(t + 0.1);
                osc2.stop(t + 1.3);
            });
        }

        // 4. Toggle/Expand: Whoosh filter sweep
        playToggle() {
            if (!this.initialized) this.init();
            if (this.isMuted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const t = this.ctx.currentTime;

            // White noise buffer
            const bufferSize = this.ctx.sampleRate * 0.2; // 0.2 seconds
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, t);
            filter.frequency.exponentialRampToValueAtTime(2000, t + 0.15); // Sweep up

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);

            noise.start(t);
        }

        // 5. Delete/Reset: Descending tone
        playDelete() {
            if (!this.initialized) this.init();
            if (this.isMuted) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, t);
            osc.frequency.exponentialRampToValueAtTime(50, t + 0.3);

            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(t);
            osc.stop(t + 0.3);
        }
    }
    return SoundManager;
})();

