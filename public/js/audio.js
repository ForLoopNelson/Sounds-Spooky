// Get all audio elements
const audios = document.querySelectorAll('audio')

function pauseOtherAudios({target}) {
  for (const audio of audios) {
    if (audio !== target) {
      audio.pause()
    }
  }
}
// listen for play event
for (const audio of audios) {
  audio.addEventListener('play', pauseOtherAudios)
}

