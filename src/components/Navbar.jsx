import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Technology', href: '#technology' },
  { label: 'Platform', href: '#platform' },
  { label: 'Research', href: '#research' },
  { label: 'About', href: '#about' },
];

const Navbar = ({ isCodeMode, onToggleCodeMode }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">

        {/* Logo */}
        <a href="/" className="navbar__logo" aria-label="ARP Quantum home">
          <span className="navbar__logo-mark">
            <span className="logo-q">Q</span>
          </span>
          <span className="navbar__logo-wordmark">
            <span className="logo-arp">ARP</span>
            <span className="logo-tagline">QUANTUM</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="navbar__links" aria-label="Primary navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`navbar__link${activeLink === href ? ' navbar__link--active' : ''}`}
              onClick={() => setActiveLink(href)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Theme toggle */}
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="theme-icon">
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </span>
          </button>

          {/* IDE / Code Mode toggle */}
          <button
            className={`navbar__theme-btn ${isCodeMode ? 'is-active' : ''}`}
            onClick={onToggleCodeMode}
            aria-label="Toggle Code Mode IDE"
            style={{ width: 'auto', padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, borderColor: isCodeMode ? 'var(--accent-primary)' : '' }}
          >
            {isCodeMode ? 'Exit IDE' : '</> codemode'}
          </button>

          <a href="#contact" className="navbar__cta">
            <span>Request Demo</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          {/* Hamburger */}
          <button
            className={`navbar__burger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="navbar__drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="navbar__drawer-cta">Request Demo</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;