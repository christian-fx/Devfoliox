import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Parent actually controls opening this, so we rely on parent's listener too,
          // but we manage it if it's open.
        }
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setTimeout(() => setSearchTerm(''), 0);
    }
  }, [isOpen]);

  const handleLinkClick = (slug) => {
    navigate(`/documentation/${slug}`);
    onClose();
  };

  const allDocs = [
    { name: 'Introduction', slug: 'introduction', desc: 'Devfolio overview', icon: 'lucide:book-open' },
    { name: 'Quick Start', slug: 'quickstart', desc: 'Get up and running in 5 minutes', icon: 'lucide:zap' },
    { name: 'Configuration', slug: 'configuration', desc: 'Customize your portfolio settings', icon: 'lucide:settings' },
    { name: 'Commands', slug: 'commands', desc: 'CLI reference', icon: 'lucide:terminal' },
  ];

  const results = allDocs.filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={`search-modal ${isOpen ? 'active' : ''}`} onClick={(e) => { if (e.target.classList.contains('search-modal')) onClose() }}>
      <div className="search-container">
        <div className="search-input-wrapper">
          <iconify-icon icon="lucide:search" className="search-icon"></iconify-icon>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search documentation..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
            autoComplete="off" 
          />
          <span className="search-shortcut-modal" style={{ cursor: 'pointer' }} onClick={onClose}>ESC</span>
        </div>
        <div className="search-results">
          {results.map((item, idx) => (
            <div className="search-result" key={idx} onClick={() => handleLinkClick(item.slug)} style={{ cursor: 'pointer' }}>
              <iconify-icon icon={item.icon} className="search-result-icon"></iconify-icon>
              <div className="search-result-content">
                <div className="search-result-title">{item.name}</div>
                <div className="search-result-desc">{item.desc}</div>
              </div>
            </div>
          ))}
          {results.length === 0 && (
             <div className="search-result-content" style={{ padding: '20px', textAlign: 'center', opacity: 0.6 }}>
               No results found.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
