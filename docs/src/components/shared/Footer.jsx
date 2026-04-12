import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo" style={{ marginBottom: '16px' }}>
              <iconify-icon icon="lucide:terminal" style={{ fontSize: '24px' }}></iconify-icon>
              Devfolio
            </div>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '14px', lineHeight: '1.6', maxWidth: '280px' }}>
              The fastest way to build and deploy a developer portfolio powered by your live GitHub data.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><Link to="/#features">Features</Link></li>
              <li><Link to="/templates">Templates</Link></li>
              <li><Link to="/showcase">Showcase</Link></li>
              <li><a href="https://github.com/christian-fx/devfolio/releases" target="_blank" rel="noopener noreferrer">Releases</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link to="/documentation">Documentation</Link></li>
              <li><Link to="/documentation/quickstart">Quick Start</Link></li>
              <li><Link to="/documentation/cli">CLI Reference</Link></li>
              <li><Link to="/documentation/api">GitHub API Setup</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Community</h4>
            <ul className="footer-links">
              <li><a href="https://github.com/christian-fx/devfolio/discussions" target="_blank" rel="noopener noreferrer">GitHub Discussions</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Discord Server</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="https://github.com/christian-fx/devfolio/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contribute</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Devfolio Open Source. MIT License.</div>
          <div className="social-links">
            <a href="https://github.com/christian-fx/devfolio" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <iconify-icon icon="lucide:github" style={{ fontSize: '20px' }}></iconify-icon>
            </a>
            <a href="#" aria-label="Twitter">
              <iconify-icon icon="lucide:twitter" style={{ fontSize: '20px' }}></iconify-icon>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
