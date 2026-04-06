import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IdeView from './components/ide/IdeView';
import './styles/globals.css';

function App() {
  const [isCodeMode, setIsCodeMode] = useState(false);

  return (
    <ThemeProvider>
      <Navbar isCodeMode={isCodeMode} onToggleCodeMode={() => setIsCodeMode(!isCodeMode)} />
      {isCodeMode ? <IdeView /> : <HeroSection />}
    </ThemeProvider>
  );
}

export default App;
