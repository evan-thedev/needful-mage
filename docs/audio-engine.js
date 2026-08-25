// Web Audio Engine - No audio files needed
class AudioEngine {
    constructor() {
        this.ctx = null;
        this.muted = localStorage.getItem('needfulMage_muted') === 'true';
        this.unlocked = false;
    }

    unlock() {
        if (this.unlocked) return;
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        this.unlocked = true;
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('needfulMage_muted', this.muted);
        return this.muted;
    }

    playTone(freq, duration, type = 'sine', volume = 0.3) {
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + duration);
    }

    craftHum() {
        this.unlock();
        this.playTone(220, 0.1, 'triangle', 0.2);
        setTimeout(() => this.playTone(330, 0.1, 'triangle', 0.2), 50);
    }

    castFire() {
        this.unlock();
        this.playTone(400, 0.3, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(350, 0.2, 'sawtooth', 0.2), 100);
    }

    castIce() {
        this.unlock();
        this.playTone(800, 0.2, 'sine', 0.25);
        setTimeout(() => this.playTone(600, 0.15, 'sine', 0.2), 80);
    }

    castLightning() {
        this.unlock();
        this.playTone(1200, 0.1, 'square', 0.2);
        setTimeout(() => this.playTone(800, 0.1, 'square', 0.15), 50);
    }

    castShield() {
        this.unlock();
        this.playTone(300, 0.4, 'sine', 0.2);
    }

    castHeal() {
        this.unlock();
        this.playTone(523, 0.2, 'sine', 0.25);
        setTimeout(() => this.playTone(659, 0.2, 'sine', 0.2), 100);
    }

    castArcane() {
        this.unlock();
        this.playTone(440, 0.3, 'triangle', 0.25);
    }

    fizzle() {
        this.unlock();
        this.playTone(150, 0.3, 'sawtooth', 0.15);
        setTimeout(() => this.playTone(100, 0.2, 'sawtooth', 0.1), 100);
    }
}
