let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Background sounds (Continuous)
export class BackgroundSound {
  constructor(type) {
    this.type = type;
    this.nodes = [];
    this.gainNode = null;
    this.isPlaying = false;
  }

  play(volume = 0.5) {
    if (this.isPlaying) return;
    const ctx = initAudio();
    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = volume;
    this.gainNode.connect(ctx.destination);
    this.isPlaying = true;

    if (this.type === 'noise') {
      // White noise
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;
      
      // Filter it a bit to make it softer
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1000;
      
      whiteNoise.connect(filter);
      filter.connect(this.gainNode);
      whiteNoise.start();
      this.nodes.push(whiteNoise);
    } else if (this.type === 'sea') {
      // Brown noise with wave LFO
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      const brownNoise = ctx.createBufferSource();
      brownNoise.buffer = buffer;
      brownNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;

      const waveGain = ctx.createGain();
      waveGain.gain.value = 0;
      
      // LFO for wave simulation
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15; // Slow wave
      lfo.type = 'sine';
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.5;

      lfo.connect(lfoGain);
      lfoGain.connect(waveGain.gain);
      
      brownNoise.connect(filter);
      filter.connect(waveGain);
      waveGain.connect(this.gainNode);
      
      brownNoise.start();
      lfo.start();
      this.nodes.push(brownNoise, lfo);
    } else if (this.type === 'wind') {
      // Pink noise
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // roughly compensate for gain
        b6 = white * 0.115926;
      }
      const pinkNoise = ctx.createBufferSource();
      pinkNoise.buffer = buffer;
      pinkNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;

      pinkNoise.connect(filter);
      filter.connect(this.gainNode);
      pinkNoise.start();
      this.nodes.push(pinkNoise);
    } else if (this.type === 'bird') {
      // Realistic bird chirps with frequency modulation
      const playBird = () => {
        if (!this.isPlaying) return;
        
        const chirp = (startTime, freq, duration) => {
          const osc = ctx.createOscillator();
          const bGain = ctx.createGain();
          osc.type = 'sine';
          
          osc.frequency.setValueAtTime(freq, startTime);
          osc.frequency.exponentialRampToValueAtTime(freq + 1500, startTime + duration);
          
          bGain.gain.setValueAtTime(0, startTime);
          bGain.gain.linearRampToValueAtTime(0.3, startTime + duration * 0.2);
          bGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
          
          osc.connect(bGain);
          bGain.connect(this.gainNode);
          
          osc.start(startTime);
          osc.stop(startTime + duration);
        };

        const numChirps = Math.floor(Math.random() * 3) + 1; // 1 to 3 chirps
        const baseFreq = 2500 + Math.random() * 1500;
        
        for (let i = 0; i < numChirps; i++) {
          chirp(ctx.currentTime + i * 0.15, baseFreq + i * 300, 0.1);
        }
        
        setTimeout(playBird, Math.random() * 5000 + 2000);
      };
      playBird();
    }
  }

  setVolume(vol) {
    if (this.gainNode) {
      this.gainNode.gain.value = vol;
    }
  }

  stop() {
    this.isPlaying = false;
    this.nodes.forEach(node => {
      try { node.stop(); } catch(e){}
    });
    this.nodes = [];
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
  }
}

// Alarm sounds (One-shot or sequenced)
let activeAlarmTimeouts = [];
export const playAlarm = (type) => {
  const ctx = initAudio();
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.6;
  masterGain.connect(ctx.destination);
  
  stopAlarm(); // stop previous

  const playNote = (freq, startTime, duration, type='sine') => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(1, startTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    osc.connect(gain);
    gain.connect(masterGain);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const now = ctx.currentTime;

  if (type === 'bowl') {
    // Singing bowl: Long sustaining sine wave with slightly detuned harmonics
    playNote(432, now, 10, 'sine');
    playNote(434, now, 10, 'sine');
    playNote(864, now, 8, 'sine');
    
    // Repeat every 10 seconds for 30s
    let t1 = setTimeout(() => { playNote(432, ctx.currentTime, 10, 'sine'); playNote(434, ctx.currentTime, 10, 'sine'); }, 10000);
    let t2 = setTimeout(() => { playNote(432, ctx.currentTime, 10, 'sine'); playNote(434, ctx.currentTime, 10, 'sine'); }, 20000);
    activeAlarmTimeouts.push(t1, t2);

  } else if (type === 'peace') {
    // Peaceful music: gentle arpeggio
    const sequence = [261.63, 329.63, 392.00, 523.25]; // C E G C
    const playSeq = () => {
      sequence.forEach((freq, i) => {
        playNote(freq, ctx.currentTime + i * 0.5, 2, 'sine');
      });
      activeAlarmTimeouts.push(setTimeout(playSeq, 4000));
    };
    playSeq();
    
  } else if (type === 'fanfare') {
    // Fanfare: bright chords
    const playFanfare = () => {
      const c = ctx.currentTime;
      playNote(392.00, c, 0.3, 'triangle'); // G
      playNote(392.00, c + 0.3, 0.3, 'triangle');
      playNote(392.00, c + 0.6, 0.3, 'triangle');
      playNote(523.25, c + 0.9, 1.0, 'triangle'); // C
      playNote(392.00, c + 2.0, 0.5, 'triangle'); // G
      playNote(523.25, c + 2.5, 1.5, 'triangle'); // C
      
      activeAlarmTimeouts.push(setTimeout(playFanfare, 5000));
    };
    playFanfare();
  }
};

export const stopAlarm = () => {
  activeAlarmTimeouts.forEach(clearTimeout);
  activeAlarmTimeouts = [];
};
