import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="logo">
            <iconify-icon icon="lucide:terminal" style={{ fontSize: '24px' }}></iconify-icon>
            Devfolio
          </Link>
          
          <nav className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Overview</Link>
            <Link to="/templates" className={`nav-link ${location.pathname === '/templates' ? 'nav-link-active' : ''}`}>Templates</Link>
            <Link to="/showcase" className={`nav-link ${location.pathname === '/showcase' ? 'nav-link-active' : ''}`}>Show Case</Link>
            <Link to="/documentation" className={`nav-link ${location.pathname.startsWith('/documentation') ? 'nav-link-active' : ''}`}>Documentation</Link>
          </nav>

          <div className="header-actions">
            <a href="https://github.com/christian-fx/devfolio" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <iconify-icon icon="lucide:github" style={{ fontSize: '16px', marginRight: '6px' }}></iconify-icon>
              Star on GitHub
            </a>
            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
              <iconify-icon icon={isMenuOpen ? "lucide:x" : "lucide:menu"} style={{ fontSize: '24px' }}></iconify-icon>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <Link onClick={closeMenu} to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Overview</Link>
        <Link onClick={closeMenu} to="/templates" className={`nav-link ${location.pathname === '/templates' ? 'nav-link-active' : ''}`}>Templates</Link>
        <Link onClick={closeMenu} to="/showcase" className={`nav-link ${location.pathname === '/showcase' ? 'nav-link-active' : ''}`}>Showcase</Link>
        <Link onClick={closeMenu} to="/documentation" className={`nav-link ${location.pathname.startsWith('/documentation') ? 'nav-link-active' : ''}`}>Documentation</Link>
        <a onClick={closeMenu} href="https://github.com/christian-fx/devfolio" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
          <iconify-icon icon="lucide:github" style={{ fontSize: '18px', marginRight: '8px' }}></iconify-icon>
          Star on GitHub
        </a>
      </div>
    </>
  );
}
