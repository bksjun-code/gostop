const hitSound = new Audio('sound/hwatu_hit.mp3');
const shuffleSound = new Audio('sound/hwatu_shuffle.mp3');

export function playCardSound() {
    // Reset and play for overlapping hits (optional, or just play)
    const sound = hitSound.cloneNode();
    sound.volume = 0.6;
    sound.play().catch(e => console.log('Audio play blocked:', e));
}

export function playShuffleSound() {
    shuffleSound.volume = 0.7;
    shuffleSound.currentTime = 0;
    shuffleSound.play().catch(e => console.log('Audio play blocked:', e));
}
