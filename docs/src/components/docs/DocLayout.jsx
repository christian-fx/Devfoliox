import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../shared/Header';
import Sidebar from './Sidebar';
import SearchModal from './SearchModal';

export default function DocLayout({ isSidebarOpen, setIsSidebarOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const { slug } = useParams();

  // Track viewport width for dynamic top offset
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Also close sidebar on mobile after navigation
    if (isMobile) setIsSidebarOpen(false);
  }, [slug, isMobile, setIsSidebarOpen]);

  // Find the current page name from the shared sections data (now handled in App.jsx for header)
  
  // On mobile, the header is 64px (main row) + 44px (docs sub-row) = 108px tall
  const topOffset = isMobile ? '108px' : '64px';

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div
        className="docs-layout"
        style={{ marginTop: topOffset }}
      >
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="main-content">
          {/* key={slug} forces remount on page change, re-triggering the animation */}
          <div key={slug} className="content-wrapper page-animate">
            
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
