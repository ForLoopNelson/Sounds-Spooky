// This file is currently not being used. keep around if I want to add Vite and use more widely across the project



import { VFX } from '@vfx-js/core';

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('#index-page');

    if (img) {
        const vfx = new VFX();
        // Add a glitch effect with some overflow space
        vfx.add(img, { shader: "glitch", overflow: 100 });
    }
});
