document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const visualizerContainer = document.getElementById('visualizer');
  const mirrorBtn = document.getElementById('mirrorToggle');
  const radialBtn = document.getElementById('radialToggle');
  const gradientBtn = document.getElementById('gradientBtn');
  const gradientSelect = document.getElementById('gradientSelect');

  if (!audio || !visualizerContainer) return;


  // Create analyzer and connect audio
  const audioMotion = new AudioMotionAnalyzer(visualizerContainer, {
    source: audio,
    height: 200,
    mode: 4,
    barSpace: 0.6,
    gradient: 'prism',
    colorMode: 'bar-level',
    peakHoldTime: 800,
    frequencyScale: 'log',
    roundBars: true,
    showScaleX: false,
    showScaleY: false,


    
   
  });

  //User changing UI settings logic

document.getElementById('barSpace').addEventListener('input', (e) => {
  audioMotion.barSpace = parseFloat(e.target.value);
});

// toggle mirror
mirrorBtn.addEventListener('click', () => {
  mirrorBtn.classList.toggle('active');
  audioMotion.mirror = !audioMotion.mirror; // toggle setting
});

// toggle radial
radialBtn.addEventListener('click', () => {
  radialBtn.classList.toggle('active');
  audioMotion.radial = !audioMotion.radial; 
  
});

gradientBtn.addEventListener('click', () => {
  gradientSelect.selectedIndex =
    (gradientSelect.selectedIndex + 1) % gradientSelect.options.length;

  gradientSelect.dispatchEvent(new Event('change'));
});

gradientSelect.addEventListener('change', () => {
  audioMotion.setOptions({
    gradient: gradientSelect.value
  });
});



    // Show visualizer only when user starts playback
  audio.addEventListener("play", () => {
    visualizerContainer.style.display = "block";

    //mobile use test!
     if (audioMotion.audioCtx.state === "suspended") {
    audioMotion.audioCtx.resume();
  }
  });

  // Hide visualizer when audio is paused or ends
  audio.addEventListener("pause", () => {
    visualizerContainer.style.display = "none";
  });

  audio.addEventListener("ended", () => {
    visualizerContainer.style.display = "none";
  });
});



