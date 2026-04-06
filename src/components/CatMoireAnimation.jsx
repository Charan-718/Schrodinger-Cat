import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="cards-wrapper">
        <div className="card card-back"></div>
        <div className="card card-front">
          <svg className="overlay" width="100%" height="100%">
            <defs>
              <pattern id="stripes" width="10" height="100%" patternUnits="userSpaceOnUse">
                {/* White = Violet Bar visible, Black = Slit showing Moiré bg */}
                {/* A 10px wide pattern: 8px violet bar, 2px slit */}
                <rect width="8" height="100%" fill="white" />
                <rect width="2" height="100%" fill="black" />
              </pattern>
              <mask id="stripMask">
                <rect width="100%" height="100%" fill="url(#stripes)" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="#9333ea" mask="url(#stripMask)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;



