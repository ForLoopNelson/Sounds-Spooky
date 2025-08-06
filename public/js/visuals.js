document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const visualizerContainer = document.getElementById('visualizer');

  if (!audio || !visualizerContainer) return;


  // Create analyzer and connect audio
  const audioMotion = new AudioMotionAnalyzer(visualizerContainer, {
    source: audio,
    height: 200,
    mode: 1,
    barSpace: 0.5,
    barWidth: 8,
    gradient: 'rainbow',
    showScaleX: false,
    showScaleY: false
  });



    // Show visualizer only when user starts playback
  audio.addEventListener("play", () => {
    visualizerContainer.style.display = "block";
  });

  // Optional: Hide visualizer when audio is paused or ended
  audio.addEventListener("pause", () => {
    visualizerContainer.style.display = "none";
  });

  audio.addEventListener("ended", () => {
    visualizerContainer.style.display = "none";
  });
});

