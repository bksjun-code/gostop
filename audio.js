// Improved Web Audio API card drop synthesis (Slap/Snap sound)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function playCardSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    // 1. A short, sharp oscillator click
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.05);

    oscGain.gain.setValueAtTime(1, audioCtx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);

    // 2. A burst of white noise for the "slap" texture
    const bufferSize = audioCtx.sampleRate * 0.1; // 100ms
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 8000;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(1, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    // Play both
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.05);

    noise.start(audioCtx.currentTime);
    noise.stop(audioCtx.currentTime + 0.1);
}
