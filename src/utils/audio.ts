// Web Audio API Synthesizer for Rosary Prayer Chimes & Ambient Sanctuary Atmosphere

class AudioSynth {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft Tibetan / Church bell chime for bead transition
  playBeadChime(highPitch = false) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Frequencies for warm metallic bell harmonics
      const baseFreq = highPitch ? 523.25 : 329.63; // C5 or E4
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(baseFreq * 2.76, now); // Metallic overtone ratio

      // Envelope: soft bell attack, long quiet exponential decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 1.9);
      oscHarmonic.stop(now + 1.9);
    } catch {
      // Ignore audio context errors if user hasn't interacted
    }
  }

  // Completion chime (warmer resonant chord)
  playCompletionChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [261.63, 329.63, 392.00, 523.25]; // C major chord
      freqs.forEach((f, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.1);

        gain.gain.setValueAtTime(0.001, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 2.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 2.6);
      });
    } catch {
      // Ignore
    }
  }

  // Ambient Drone (Sacred Chapel Hum)
  setAmbient(type: 'none' | 'chime_drone' | 'gentle_rain' | 'soft_waves', volume = 0.2) {
    this.initCtx();
    if (!this.ctx) return;

    this.stopAmbient();

    if (type === 'none') return;

    try {
      const now = this.ctx.currentTime;
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.linearRampToValueAtTime(volume * 0.15, now + 2);
      this.ambientGain.connect(this.ctx.destination);

      if (type === 'chime_drone') {
        // Deep warm 108Hz / 162Hz binaural sanctuary drone
        this.ambientOsc1 = this.ctx.createOscillator();
        this.ambientOsc2 = this.ctx.createOscillator();

        this.ambientOsc1.type = 'sine';
        this.ambientOsc1.frequency.setValueAtTime(108, now); // Low A

        this.ambientOsc2.type = 'sine';
        this.ambientOsc2.frequency.setValueAtTime(162, now); // Perfect fifth E

        this.ambientOsc1.connect(this.ambientGain);
        this.ambientOsc2.connect(this.ambientGain);

        this.ambientOsc1.start(now);
        this.ambientOsc2.start(now);
        this.isAmbientPlaying = true;
      }
    } catch {
      // Ignore
    }
  }

  stopAmbient() {
    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        this.ambientOsc1?.stop();
        this.ambientOsc2?.stop();
        this.ambientOsc1?.disconnect();
        this.ambientOsc2?.disconnect();
        this.ambientGain?.disconnect();
        this.isAmbientPlaying = false;
      }, 1050);
    }
  }
}

export const audioSynth = new AudioSynth();
