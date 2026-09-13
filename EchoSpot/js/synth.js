// Deterministic "demo echo" audio synthesizer based on a string seed.
// Used to generate audio for the simulated nearby echoes, avoiding any real copyrighted music.
function hashSeed(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PENTATONIC = [0, 2, 4, 7, 9, 12, 14, 16, 19];
export const MOOD_CATEGORY = {
  '🎸': 'melodic',
  '🎹': 'melodic',
  '🎤': 'melodic',
  '🎧': 'melodic',
  '🌊': 'pad',
  '🌙': 'pad',
  '✨': 'pad',
  '🥁': 'percussive',
  '🔥': 'percussive',
};

function noteFreq(root, semitone) {
  return root * Math.pow(2, semitone / 12);
}

function buildMelodic(ctx, rng, duration) {
  const root = 220 * Math.pow(2, Math.floor(rng() * 3) / 12 - 0.5);
  const wave = ['sine', 'triangle', 'square'][Math.floor(rng() * 3)];
  const stepTime = 0.28 + rng() * 0.15;
  const steps = Math.floor(duration / stepTime);
  const master = ctx.createGain();
  master.gain.value = 0.22;
  master.connect(ctx.destination);
  for (let i = 0; i < steps; i++) {
    const semitone = PENTATONIC[Math.floor(rng() * PENTATONIC.length)];
    const osc = ctx.createOscillator();
    osc.type = wave;
    osc.frequency.value = noteFreq(root, semitone);
    const g = ctx.createGain();
    const t0 = i * stepTime;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.9, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + stepTime * 0.95);
    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + stepTime);
  }
}

function buildPad(ctx, rng, duration) {
  const root = 110 * Math.pow(2, Math.floor(rng() * 4) / 12);
  const master = ctx.createGain();
  master.gain.value = 0.18;
  master.connect(ctx.destination);
  const chord = [0, 4, 7, 11].map((s) => noteFreq(root, s));
  chord.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05 + rng() * 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 40;
    lfo.connect(lfoGain).connect(osc.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, 0);
    g.gain.linearRampToValueAtTime(0.25, 1.2);
    g.gain.linearRampToValueAtTime(0.15, duration - 1.2);
    g.gain.linearRampToValueAtTime(0, duration);
    osc.connect(g).connect(master);
    osc.start(0);
    osc.stop(duration);
    lfo.start(0);
    lfo.stop(duration);
  });
}

function buildPercussive(ctx, rng, duration) {
  const master = ctx.createGain();
  master.gain.value = 0.3;
  master.connect(ctx.destination);
  const stepTime = 0.2 + rng() * 0.1;
  const steps = Math.floor(duration / stepTime);
  for (let i = 0; i < steps; i++) {
    if (rng() < 0.35) continue;
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let j = 0; j < bufferSize; j++) {
      data[j] = (rng() * 2 - 1) * (1 - j / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 150 + rng() * 2500;
    bp.Q.value = 1.2;
    const g = ctx.createGain();
    g.gain.value = 0.8;
    noise.connect(bp).connect(g).connect(master);
    const t0 = i * stepTime;
    noise.start(t0);
  }
}

export async function synthBuffer(seed, mood, duration = 6) {
  const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  const sampleRate = 44100;
  const offline = new OfflineCtx(2, Math.ceil(sampleRate * duration), sampleRate);
  const rng = mulberry32(hashSeed(seed));
  const category = MOOD_CATEGORY[mood] || 'melodic';
  if (category === 'pad') buildPad(offline, rng, duration);
  else if (category === 'percussive') buildPercussive(offline, rng, duration);
  else buildMelodic(offline, rng, duration);
  return offline.startRendering();
}

// Encode an AudioBuffer as a standard PCM16 WAV Blob so it can be played back with <audio> like any uploaded file
export function audioBufferToWavBlob(buffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = numFrames * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  const writeStr = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bytesPerSample * 8, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);

  const channels = [];
  for (let c = 0; c < numChannels; c++) channels.push(buffer.getChannelData(c));

  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

// Generate a demo echo's audio Blob in one step
export async function synthDemoAudioBlob(seed, mood, duration = 6) {
  const buffer = await synthBuffer(seed, mood, duration);
  return audioBufferToWavBlob(buffer);
}
