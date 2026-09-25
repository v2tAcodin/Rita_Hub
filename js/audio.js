// Web Audio API Ambient Sound Synthesizer & Timer Chimes
// Completely self-contained, no external mp3 files required, works offline & zero CORS issues

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.tracks = {
      rain: { active: false, gain: null, node: null, volume: 0.4 },
      cafe: { active: false, gain: null, node: null, volume: 0.35 },
      typing: { active: false, gain: null, node: null, intervalId: null, volume: 0.25 },
      books: { active: false, gain: null, node: null, intervalId: null, volume: 0.3 }
    };
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  ensureContext() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- Rain Generator (Brown / Pink Noise with filter) ---
  startRain() {
    this.ensureContext();
    if (this.tracks.rain.active) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Brown noise approximation
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.tracks.rain.volume, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
    this.tracks.rain.node = whiteNoise;
    this.tracks.rain.gain = gain;
    this.tracks.rain.active = true;
  }

  stopRain() {
    if (!this.tracks.rain.active) return;
    try {
      this.tracks.rain.node.stop();
      this.tracks.rain.node.disconnect();
    } catch (e) {
      console.warn("Rain stop error:", e);
    }
    this.tracks.rain.active = false;
  }

  // --- Cafe Ambience (Warm ambient low hum & chatter simulation) ---
  startCafe() {
    this.ensureContext();
    if (this.tracks.cafe.active) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    const left = noiseBuffer.getChannelData(0);
    const right = noiseBuffer.getChannelData(1);

    for (let i = 0; i < bufferSize; i++) {
      left[i] = (Math.random() * 2 - 1) * 0.15;
      right[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // Resonant bandpass filter to simulate cafe room acoustics
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.tracks.cafe.volume, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    this.tracks.cafe.node = noise;
    this.tracks.cafe.gain = gain;
    this.tracks.cafe.active = true;
  }

  stopCafe() {
    if (!this.tracks.cafe.active) return;
    try {
      this.tracks.cafe.node.stop();
      this.tracks.cafe.node.disconnect();
    } catch (e) {
      console.warn("Cafe stop error:", e);
    }
    this.tracks.cafe.active = false;
  }

  // --- Soft Typing Generator ---
  startTyping() {
    this.ensureContext();
    if (this.tracks.typing.active) return;

    this.tracks.typing.active = true;

    // Play pleasant soft clicks at irregular realistic intervals
    const playClick = () => {
      if (!this.tracks.typing.active) return;
      this.triggerSingleKeyClick();

      // Random human typing delay: 100ms - 450ms
      const nextDelay = 100 + Math.random() * 350;
      this.tracks.typing.intervalId = setTimeout(playClick, nextDelay);
    };

    playClick();
  }

  triggerSingleKeyClick() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200 + Math.random() * 400, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280 + Math.random() * 60, now);

    const vol = (this.tracks.typing.volume || 0.2) * (0.6 + Math.random() * 0.4);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol * 0.4, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  stopTyping() {
    if (!this.tracks.typing.active) return;
    if (this.tracks.typing.intervalId) {
      clearTimeout(this.tracks.typing.intervalId);
      this.tracks.typing.intervalId = null;
    }
    this.tracks.typing.active = false;
  }

  // --- Book / Paper Turning Generator ---
  startBooks() {
    this.ensureContext();
    if (this.tracks.books.active) return;
    this.tracks.books.active = true;

    const schedulePageTurn = () => {
      if (!this.tracks.books.active) return;
      this.triggerPageTurn();
      const delay = 6000 + Math.random() * 9000; // gentle rustle every 6-15s
      this.tracks.books.intervalId = setTimeout(schedulePageTurn, delay);
    };
    schedulePageTurn();
  }

  triggerPageTurn() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.35);

    const gain = this.ctx.createGain();
    const vol = this.tracks.books.volume || 0.25;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(vol * 0.5, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.4);
  }

  stopBooks() {
    if (!this.tracks.books.active) return;
    if (this.tracks.books.intervalId) {
      clearTimeout(this.tracks.books.intervalId);
      this.tracks.books.intervalId = null;
    }
    this.tracks.books.active = false;
  }

  // --- Volume adjustment ---
  setTrackVolume(trackName, volume) {
    if (!this.tracks[trackName]) return;
    this.tracks[trackName].volume = volume;
    if (this.tracks[trackName].gain && this.ctx) {
      this.tracks[trackName].gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  // --- Pomodoro Soft Chime Notification ---
  playPomodoroChime(isBreak = false) {
    this.ensureContext();
    const now = this.ctx.currentTime;

    const notes = isBreak ? [523.25, 659.25, 783.99] : [783.99, 659.25, 523.25]; // C5, E5, G5 chords
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.16;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 1.5);
    });
  }

  toggleMasterMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}

export const soundEngine = new AmbientAudioEngine();
