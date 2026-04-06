const fs = require('fs');

const width = 600;
const height = 400;
const period = 10;
const frames = 5;
const stripWidth = period / frames; // 2px

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\n<defs>\n`;

// Generate clip paths for each frame
for (let i = 0; i < frames; i++) {
  svg += `  <clipPath id="clip${i}">\n`;
  for (let x = i * stripWidth; x < width; x += period) {
    // each slice is 2px wide, repeating every 10px
    svg += `    <rect x="${x}" y="0" width="${stripWidth}" height="${height}" />\n`;
  }
  svg += `  </clipPath>\n`;
}
svg += `</defs>\n\n`;

// Generate the 5 frames of the cat animation
for (let i = 0; i < frames; i++) {
  const phase = (i / frames) * Math.PI * 2;
  const bounce = Math.sin(phase * 2) * 5; // Body bounce
  
  // Leg swings
  const swingFront1 = Math.sin(phase) * 20;
  const swingFront2 = Math.sin(phase + Math.PI) * 20;
  const swingBack1 = Math.sin(phase + Math.PI) * 20;
  const swingBack2 = Math.sin(phase) * 20;
  
  svg += `<g clip-path="url(#clip${i})">\n`;
  
  // Scale cat by 2.5x and position it centrally (shifted right to prevent tail crop)
  svg += `  <g transform="translate(340, 200) scale(2.5) translate(-220, -200)">\n`;
  
  // Body
  svg += `    <rect x="150" y="${180 + bounce}" width="100" height="40" rx="20" fill="#72056e" />\n`;
  // Head
  svg += `    <circle cx="260" cy="${170 + bounce}" r="25" fill="#72056e" />\n`;
  // Ears
  svg += `    <polygon points="250,${150+bounce} 255,${130+bounce} 265,${145+bounce}" fill="#72056e" />\n`;
  svg += `    <polygon points="265,${145+bounce} 275,${130+bounce} 280,${150+bounce}" fill="#72056e" />\n`;
  
  // Tail
  const tailTipX = 110 + Math.cos(phase)* 15;
  const tailTipY = 150 + bounce + Math.sin(phase)* 20;
  svg += `    <path d="M 160 ${190+bounce} Q 130 ${150+bounce} ${tailTipX} ${tailTipY}" fill="none" stroke="#72056e" stroke-width="8" stroke-linecap="round" />\n`;
  
  // Legs
  const legY = 210 + bounce;
  svg += `    <line x1="240" y1="${legY}" x2="${240 + swingFront1}" y2="${legY + 45}" stroke="#72056e" stroke-width="8" stroke-linecap="round" />\n`;
  svg += `    <line x1="220" y1="${legY}" x2="${220 + swingFront2}" y2="${legY + 45}" stroke="#72056e" stroke-width="8" stroke-linecap="round" />\n`;
  svg += `    <line x1="170" y1="${legY}" x2="${170 + swingBack1}" y2="${legY + 45}" stroke="#72056e" stroke-width="8" stroke-linecap="round" />\n`;
  svg += `    <line x1="190" y1="${legY}" x2="${190 + swingBack2}" y2="${legY + 45}" stroke="#72056e" stroke-width="8" stroke-linecap="round" />\n`;
  
  svg += `  </g>\n</g>\n`;
}

svg += `</svg>`;

fs.writeFileSync('public/schrodinger-moire.svg', svg);
console.log('Successfully generated public/schrodinger-moire.svg');
