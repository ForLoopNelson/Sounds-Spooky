document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const visualizerContainer = document.getElementById('visualizer');

  if (!audio || !visualizerContainer) return;


  // Create analyzer and connect audio
  const audioMotion = new AudioMotionAnalyzer(visualizerContainer, {
    source: audio,
    height: 200,
    mode: 4,
    barSpace: 0.3,
    gradient: 'prism',
    colorMode: 'bar-level',
    peakHoldTime: 800,
    frequencyScale: 'log',
    showScaleX: false,
    showScaleY: false,
   
  });



    // Show visualizer only when user starts playback
  audio.addEventListener("play", () => {
    visualizerContainer.style.display = "block";
  });

  // Hide visualizer when audio is paused or ends
  audio.addEventListener("pause", () => {
    visualizerContainer.style.display = "none";
  });

  audio.addEventListener("ended", () => {
    visualizerContainer.style.display = "none";
  });
});

