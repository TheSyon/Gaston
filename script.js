// Elements
const phraseEl = document.getElementById('phrase');
const buttonEl = document.getElementById('actionButton');
const background = document.getElementById('background');

// Initial state
let buttonText = Math.random() < 0.5 ? 'Speel!' : 'Joue !';
buttonEl.textContent = buttonText;

// Data
const group1SetA = ['Duim', 'Wijsvinger', 'Middelvinger', 'Ringvinger', 'Pink'];
const group1SetB = ['Pouce', 'Index', 'Majeur', 'Annulaire', 'Auriculaire'];

const group2SetA = ['blauw', 'geel', 'rood', 'groen'];
const group2SetB = ['blue', 'jaune', 'rouge', 'vert'];

const circleColors = ['#1D9A4E', '#2E5CA8', '#E09E2A', '#C63737'];

/**
 * Helper to read numeric CSS custom properties (e.g., --circle-gap).
 */
function getComputedNumber(el, prop, fallback) {
  const v = getComputedStyle(el).getPropertyValue(prop).trim();
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Read the current column count from :root --cols (updated by media queries).
 */
function getCols() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--cols').trim();
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 8; // default fallback
}

/**
 * Render just enough circles to fill the viewport-sized grid.
 * Considers current columns and the grid gap.
 */
function renderCircles() {
  const cols = getCols();
  const gap = getComputedNumber(background, '--circle-gap', 8);

  const containerWidth = background.clientWidth;
  const containerHeight = background.clientHeight;

  // Column width = (width - total gaps) / columns
  const totalGapWidth = Math.max(0, cols - 1) * gap;
  const colWidth = (containerWidth - totalGapWidth) / cols;

  // Each circle has aspect-ratio: 1 → its height equals colWidth.
  const rowStride = colWidth + gap; // circle height + vertical gap
  const rows = Math.ceil(containerHeight / rowStride);

  const needed = cols * rows;
  const current = background.childElementCount;

  // If counts match, nothing to do.
  if (current === needed) return;

  // Remove extra circles
  if (current > needed) {
    for (let i = current - 1; i >= needed; i--) {
      background.removeChild(background.lastChild);
    }
    return;
  }

  // Add missing circles
  const fragment = document.createDocumentFragment();
  for (let i = current; i < needed; i++) {
    const div = document.createElement('div');
    div.className = 'circle';
    // cycle through your palette
    div.style.backgroundColor = circleColors[i % circleColors.length];
    fragment.appendChild(div);
  }
  background.appendChild(fragment);
}

// Run once on load, and again whenever the viewport changes.
window.addEventListener('load', renderCircles);
window.addEventListener('resize', renderCircles);

// In case the background element itself changes size due to CSS/layout:
const bgResizeObserver = new Resizeconst bgResizeObserver = new ResizeObserver(() => renderCircles());


// Button handler
buttonEl.addEventListener('click', () => {
  // Toggle button text
  buttonText = buttonText === 'Speel!' ? 'Joue !' : 'Speel!';
  buttonEl.textContent = buttonText;

  const useOption1 = Math.random() < 0.5;
  let finger, color;

  if (useOption1) {
    finger = group1SetA[Math.floor(Math.random() * group1SetA.length)];
    color = group2SetB[Math.floor(Math.random() * group2SetB.length)];
  } else {
    finger = group1SetB[Math.floor(Math.random() * group1SetB.length)];
    color = group2SetA[Math.floor(Math.random() * group2SetA.length)];
  }

  phraseEl.textContent = `${finger} - ${color}`;
});
