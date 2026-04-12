import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  const sections = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Introduction', slug: 'introduction', icon: 'lucide:book-open' },
        { name: 'Quick Start', slug: 'quickstart', icon: 'lucide:zap' },
        { name: 'Installation', slug: 'installation', icon: 'lucide:download' },
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { name: 'Configuration', slug: 'configuration', icon: 'lucide:settings' },
        { name: 'Templates', slug: 'templates', icon: 'lucide:layout-template' },
        { name: 'GitHub Integration', slug: 'github-integration', icon: 'lucide:github' },
        { name: 'Deployment', slug: 'deployment', icon: 'lucide:rocket' },
      ]
    },
    {
      title: 'CLI Reference',
      items: [
        { name: 'Commands', slug: 'commands', icon: 'lucide:terminal' },
        { name: 'Options & Flags', slug: 'options', icon: 'lucide:sliders' },
        { name: 'Environment Variables', slug: 'environment', icon: 'lucide:environment' },
      ]
    },
    {
      title: 'Advanced',
      items: [
        { name: 'Customization', slug: 'customization', icon: 'lucide:palette' },
        { name: 'API Reference', slug: 'api', icon: 'lucide:code-2' },
        { name: 'Troubleshooting', slug: 'troubleshooting', icon: 'lucide:help-circle' },
      ]
    }
  ];

  return (
    <>
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose} id="overlay"></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar" style={{ transform: isOpen ? 'translateX(0)' : '' }}>
        <div className="sidebar-header">
          <div className="sidebar-title">Documentation</div>
          <div className="sidebar-version">Version 1.0.0</div>
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
