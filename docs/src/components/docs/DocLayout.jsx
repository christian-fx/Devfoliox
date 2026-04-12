import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../shared/Header';
import Sidebar from './Sidebar';
import SearchModal from './SearchModal';

export default function DocLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Header />
      <div className="docs-layout" style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="main-content" style={{ flex: 1, marginLeft: window.innerWidth > 1024 ? '280px' : '0' }}>
          <div className="content-wrapper" style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 32px' }}>
            
            {/* Mobile Sidebar Toggle Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '24px' }}>
              <button 
                className="btn btn-secondary mobile-sidebar-trigger"
                onClick={() => setIsSidebarOpen(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', fontSize: '13px', border: 'none' }}
              >
                <iconify-icon icon="lucide:layout-sidebar"></iconify-icon>
                Docs Menu
              </button>
            </div>
            <style>{`
              @media (min-width: 1025px) {
                .mobile-sidebar-trigger { display: none !important; }
              }
            `}</style>
            
            <Outlet />
            
            {/* Automatic Footer for Docs */}
            <footer className="doc-footer" style={{ marginTop: '64px', borderTop: '1px solid var(--border)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', color: 'var(--muted-foreground)', fontSize: '14px' }}>
              <div className="footer-links" style={{ display: 'flex', gap: '16px' }}>
                <a href="https://github.com/christian-fx/Devfolio" target="_blank" rel="noopener noreferrer">Edit this page</a>
                <a href="https://github.com/christian-fx/Devfolio" target="_blank" rel="noopener noreferrer">View on GitHub</a>
              </div>
              <div>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
