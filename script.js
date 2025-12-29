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

// Generate background once (mobile-friendly)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 400; i++) {
  const div = document.createElement('div');
  div.className = 'circle';
  div.style.backgroundColor = circleColors[i % 4];
  fragment.appendChild(div);
}
background.appendChild(fragment);

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
