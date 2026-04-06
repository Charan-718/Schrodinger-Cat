const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');
const appDir = path.join(__dirname, 'src');

// 1. Merge CSS Files
const cssFiles = [
  'HeroSection.css',
  'CatMoireAnimation.css',
  'Solutions.css',
  'Technology.css',
  'Platform.css',
  'Testimonials.css',
  'CTA.css',
  'Footer.css'
];

let mergedCss = '';
cssFiles.forEach(file => {
  const filePath = path.join(srcDir, file);
  if (fs.existsSync(filePath)) {
    mergedCss += `\n/* ==================== ${file} ==================== */\n`;
    mergedCss += fs.readFileSync(filePath, 'utf8');
    if (file !== 'HeroSection.css') {
      try { fs.unlinkSync(filePath); } catch(e) {}
    }
  }
});
fs.writeFileSync(path.join(srcDir, 'HeroSection.css'), mergedCss);
console.log("CSS files merged successfully into HeroSection.css.");

// 2. Merge JS Components
const components = ['Solutions', 'Technology', 'Platform', 'Research', 'Testimonials', 'CTA', 'Footer'];

let heroFile = fs.readFileSync(path.join(srcDir, 'HeroSection.js'), 'utf8');

// Strip old imports and the default export
heroFile = heroFile.replace(/import[\s\S]*?from[\s\S]*?['"].*?['"];?/g, '');
heroFile = heroFile.replace(/import\s+['"].*?['"];?/g, '');
heroFile = heroFile.replace(/export default Hero;/g, '');

// Insert CatMoireAnimation beside the hero__inner container
heroFile = heroFile.replace(
  '<div className="container hero__inner">', 
  '<CatMoireAnimation />\n      <div className="container hero__inner">'
);

// Begin compiling the new monolithic HeroSection.js
let mergedJS = `import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import CatMoireAnimation from './CatMoireAnimation';

` + heroFile.trim() + '\n';

components.forEach(comp => {
  let filePath = path.join(srcDir, `${comp}.jsx`);
  if (!fs.existsSync(filePath)) filePath = path.join(srcDir, `${comp}.js`);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Strip redundant imports
    content = content.replace(/import[\s\S]*?from[\s\S]*?['"].*?['"];?/g, '');
    content = content.replace(/import\s+['"].*?['"];?/g, '');
    content = content.replace(/export default [a-zA-Z0-9_]+;/g, '');
    mergedJS += `\n/* --- ${comp} --- */\n` + content.trim() + '\n';
    try { fs.unlinkSync(filePath); } catch(e) {}
  }
});

// Create the monolithic wrapper component
mergedJS += `\n
const HeroSection = () => {
  return (
    <main>
      <Hero />
      <Solutions />
      <Technology />
      <Platform />
      <Research />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default HeroSection;
`;

fs.writeFileSync(path.join(srcDir, 'HeroSection.js'), mergedJS);
console.log("All components mathematically squashed into HeroSection.js. Extraneous component files cleaned up.");

// 3. Restore App.js
const appJs = `import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <HeroSection />
    </ThemeProvider>
  );
}

export default App;
`;
fs.writeFileSync(path.join(appDir, 'App.js'), appJs);
console.log("App.js restored and securely wired to the monolithic HeroSection.");
