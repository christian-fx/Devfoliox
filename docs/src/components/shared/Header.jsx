import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onDocsMenuClick, docsMenuLabel, isSidebarOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [stars, setStars] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/christian-fx/devfoliox')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.stargazers_count === 'number') {
          const count = data.stargazers_count;
          setStars(count > 999 ? (count/1000).toFixed(1) + 'k' : count);
        }
      })
      .catch(err => console.error('Error fetching stars:', err));
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
      <header className={`header ${isScrolled ? 'scrolled' : ''} ${docsMenuLabel ? 'has-docs-menu' : ''}`}>
        <div className="container header-container-inner">
          <div className="header-main-row">
            <Link to="/" className="logo">
              <img src="/images/devfoliox-icon.svg" alt="Devfoliox Logo" style={{ width: '24px', height: '24px', borderRadius: '6px' }} />
              Devfoliox
            </Link>
            
            <nav className="nav-links">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Overview</Link>
              <Link to="/templates" className={`nav-link ${location.pathname === '/templates' ? 'nav-link-active' : ''}`}>Templates</Link>
              <Link to="/showcase" className={`nav-link ${location.pathname === '/showcase' ? 'nav-link-active' : ''}`}>Show Case</Link>
              <Link to="/documentation" className={`nav-link ${location.pathname.startsWith('/documentation') ? 'nav-link-active' : ''}`}>Documentation</Link>
            </nav>

            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="https://github.com/christian-fx/devfoliox" target="_blank" rel="noopener noreferrer" className="btn btn-secondary desktop-only" style={{ padding: '8px 16px', fontSize: '13px', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <iconify-icon icon="lucide:github" style={{ fontSize: '16px' }}></iconify-icon>
                Star on GitHub
              </a>
              {stars !== null && (
                <span className="desktop-only" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--foreground)', fontSize: '13px', fontWeight: 600 }}>
                  <iconify-icon icon="lucide:star" style={{ fontSize: '14px', marginRight: '4px', color: '#fbbf24' }}></iconify-icon>
                  {stars}
                </span>
              )}

              <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                <iconify-icon icon={isMenuOpen ? "lucide:x" : "lucide:menu"} style={{ fontSize: '24px' }}></iconify-icon>
              </button>
            </div>
          </div>

          {docsMenuLabel && !isMenuOpen && (
            <div className="header-docs-row mobile-only">
              <button 
                onClick={onDocsMenuClick}
                className="docs-breadcrumb-btn"
                aria-label="Toggle documentation menu"
              >
                <iconify-icon icon={isSidebarOpen ? "lucide:x" : "lucide:more-horizontal"} style={{ fontSize: '20px' }}></iconify-icon>
                <span className="docs-breadcrumb-label">{docsMenuLabel}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <Link onClick={closeMenu} to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>Overview</Link>
        <Link onClick={closeMenu} to="/templates" className={`nav-link ${location.pathname === '/templates' ? 'nav-link-active' : ''}`}>Templates</Link>
        <Link onClick={closeMenu} to="/showcase" className={`nav-link ${location.pathname === '/showcase' ? 'nav-link-active' : ''}`}>Showcase</Link>
        <Link onClick={closeMenu} to="/documentation" className={`nav-link ${location.pathname.startsWith('/documentation') ? 'nav-link-active' : ''}`}>Documentation</Link>
        <a onClick={closeMenu} href="https://github.com/christian-fx/devfoliox" target="_blank" rel="noopener noreferrer" className="btn btn-primary nav-link-btn" style={{ width: '100%', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <iconify-icon icon="lucide:github" style={{ fontSize: '18px' }}></iconify-icon>
          Star on GitHub
        </a>
        {stars !== null && (
          <div style={{ textAlign: 'center', marginTop: '12px', color: 'var(--foreground)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iconify-icon icon="lucide:star" style={{ fontSize: '16px', marginRight: '6px', color: '#fbbf24' }}></iconify-icon>
            {stars}
          </div>
        )}
      </div>
    </>
  );
}
