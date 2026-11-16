/* Runs before first paint: enables reveal styles and the embedded-preview mode */
document.documentElement.classList.add('js');
if (location.hash === '#vp-embed') document.documentElement.classList.add('is-embed');
