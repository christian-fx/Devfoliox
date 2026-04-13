import React from 'react';
import { NavLink } from 'react-router-dom';
import { sections } from '../../data/docsData';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose} id="overlay"></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar" style={{ transform: isOpen ? 'translateX(0)' : '' }}>
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="sidebar-title">Documentation</div>
            <div className="sidebar-version">Version 1.0.0</div>
          </div>
          <button 
            onClick={onClose} 
            className="mobile-only" 
            style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'var(--foreground)', marginTop: '-4px' }}
            aria-label="Close menu"
          >
            <iconify-icon icon="lucide:x" style={{ fontSize: '24px' }}></iconify-icon>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {sections.map((section, idx) => (
            <div className="nav-section" key={idx}>
              <div className="nav-section-title">{section.title}</div>
              <ul className="nav-items">
                {section.items.map((item, itemIdx) => (
                  <li className="nav-item" key={itemIdx}>
                    <NavLink
                      to={`/documentation/${item.slug}`}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        if (window.innerWidth <= 1024) onClose();
                      }}
                    >
                      <iconify-icon icon={item.icon} className="nav-icon"></iconify-icon>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
