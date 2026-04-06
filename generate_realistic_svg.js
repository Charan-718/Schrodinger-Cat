const fs = require('fs');

const width = 600;
const height = 400;
const period = 10;
const frames = 5;
const stripWidth = period / frames; // 2px

// Single place to modify the cat's base color
const CAT_COLOR = '#9333ea';

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\n<defs>\n`;

for (let i = 0; i < frames; i++) {
  svg += `  <clipPath id="clip${i}">\n`;
  for (let x = i * stripWidth; x < width; x += period) {
    svg += `    <rect x="${x}" y="0" width="${stripWidth}" height="${height}" />\n`;
  }
  svg += `  </clipPath>\n`;
}
svg += `</defs>\n\n`;

function drawLeg(x, y, thighAngle, calfAngle, isBack) {
  let s = `<g transform="translate(${x}, ${y}) rotate(${thighAngle})">\n`;
  if (isBack) {
    // Back leg
    s += `  <ellipse cx="0" cy="20" rx="18" ry="35" fill="${CAT_COLOR}"/>\n`; // Thigh
    s += `  <g transform="translate(-10, 45) rotate(${calfAngle})">\n`;
    s += `    <rect x="-6" y="0" width="12" height="35" rx="6" fill="${CAT_COLOR}"/>\n`; // Calf
    s += `    <ellipse cx="2" cy="35" rx="12" ry="6" fill="${CAT_COLOR}"/>\n`; // Paw
    s += `  </g>\n`;
  } else {
    // Front leg
    s += `  <ellipse cx="0" cy="15" rx="10" ry="25" fill="${CAT_COLOR}"/>\n`; // Upper arm
    s += `  <g transform="translate(0, 35) rotate(${calfAngle})">\n`;
    s += `    <rect x="-5" y="0" width="10" height="30" rx="5" fill="${CAT_COLOR}"/>\n`; // Lower arm
    s += `    <ellipse cx="2" cy="30" rx="10" ry="6" fill="${CAT_COLOR}"/>\n`; // Paw
    s += `  </g>\n`;
  }
  s += `</g>\n`;
  return s;
}

for (let i = 0; i < frames; i++) {
  const phase = (i / frames) * Math.PI * 2;
  const bounce = Math.sin(phase * 4) * 2; 

  const frontThigh1 = Math.sin(phase) * 25;
  const frontCalf1 = Math.max(0, Math.sin(phase - 1.0)) * 30; 
  
  const frontThigh2 = Math.sin(phase + Math.PI) * 25;
  const frontCalf2 = Math.max(0, Math.sin(phase + Math.PI - 1.0)) * 30;

  const backThigh1 = Math.sin(phase + Math.PI/2) * 25;
  const backCalf1 = Math.max(0, Math.sin(phase + Math.PI/2 + 1.2)) * -30; 
  
  const backThigh2 = Math.sin(phase + Math.PI/2 + Math.PI) * 25;
  const backCalf2 = Math.max(0, Math.sin(phase + Math.PI/2 + Math.PI + 1.2)) * -30;

  svg += `<g clip-path="url(#clip${i})">\n`;
  svg += `  <g transform="translate(300, 200) scale(1.8) translate(-190, -200)">\n`;
  
  // Background Legs
  svg += drawLeg(150, 190 + bounce, backThigh2, backCalf2, true);
  svg += drawLeg(250, 200 + bounce, frontThigh2, frontCalf2, false);

  // Tail attached firmly to torso, shortened to 3/4 length to prevent clipping
  const tailBaseX = 145;
  const tailBaseY = 185 + bounce;
  
  // Shorter tail that stays safely within the 600px frame bounds
  const tailTipX = 85 + Math.cos(phase)*20;
  const tailTipY = 140 + Math.sin(phase)*25;
  
  // Adjusted control points for a naturally shorter swept curve
  const tailCtrl1X = 115 - Math.sin(phase)*10;
  const tailCtrl1Y = 175 + bounce;
  const tailCtrl2X = 100 + Math.cos(phase)*15;
  const tailCtrl2Y = 150 + bounce;
  
  svg += `    <path d="M ${tailBaseX} ${tailBaseY} C ${tailCtrl1X} ${tailCtrl1Y}, ${tailCtrl2X} ${tailCtrl2Y}, ${tailTipX} ${tailTipY}" fill="none" stroke="${CAT_COLOR}" stroke-width="12" stroke-linecap="round" />\n`;

  // True Feline Body Primitive Silhouette (Flawless simple geometry)
  svg += `    <ellipse cx="200" cy="${195 + bounce}" rx="65" ry="32" fill="${CAT_COLOR}" />\n`;
  
  // Natural neck taper
  svg += `    <polygon points="230,${175+bounce} 265,${155+bounce} 275,${185+bounce} 230,${215+bounce}" fill="${CAT_COLOR}" />\n`;

  // Accurate Cartoon-Fidelity Head
  const hx = 275;
  const hy = 150 + bounce;
  svg += `    <polygon points="${hx-10},${hy-10} ${hx-5},${hy-30} ${hx+5},${hy-15}" fill="${CAT_COLOR}" />\n`; // background ear
  svg += `    <circle cx="${hx}" cy="${hy}" r="22" fill="${CAT_COLOR}" />\n`; // main head sphere
  svg += `    <ellipse cx="${hx+12}" cy="${hy+8}" rx="14" ry="10" transform="rotate(20 ${hx+12} ${hy+8})" fill="${CAT_COLOR}" />\n`; // snout
  svg += `    <polygon points="${hx-20},${hy-5} ${hx-15},${hy-35} ${hx+2},${hy-18}" fill="${CAT_COLOR}" />\n`; // foreground ear

  // Foreground Legs
  svg += drawLeg(140, 195 + bounce, backThigh1, backCalf1, true);
  svg += drawLeg(240, 205 + bounce, frontThigh1, frontCalf1, false);

  svg += `  </g>\n</g>\n`;
}

svg += `</svg>`;

fs.writeFileSync('public/realistic-moire-cat.svg', svg);
console.log('Successfully generated public/realistic-moire-cat.svg');
