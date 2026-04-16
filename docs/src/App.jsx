import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import DocLayout from './components/docs/DocLayout';
import DocPage from './pages/DocPage';
import Templates from './pages/Templates';
import TemplateDetails from './pages/TemplateDetails';
import Showcase from './pages/Showcase';
import FAQ from './pages/FAQ';
import ScrollManager from './components/shared/ScrollManager';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { sections } from './data/docsData';

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculate current page name for the Docs Breadcrumb in the Header
  const slug = location.pathname.split('/').pop();
  const currentPageName = sections
    .flatMap(section => section.items)
    .find(item => item.slug === slug)?.name || 'Documentation';

  return (
    <>
      <ScrollManager />
      
      {/* Global Header sits outside the animation container */}
      <Header 
        onDocsMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        docsMenuLabel={location.pathname.startsWith('/documentation') ? currentPageName : null}
        isSidebarOpen={isSidebarOpen}
      />

      {/* 
        Keying logic: We use a group-based key for documentation to prevent the 
        entire layout (and sidebar) from re-animating on sub-route changes. 
      */}
      <div 
        key={location.pathname.startsWith('/documentation') ? 'documentation' : location.key} 
        className="page-animate" 
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/:id" element={<TemplateDetails />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/documentation" element={<DocLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}>
              <Route index element={<Navigate to="/documentation/introduction" replace />} />
              <Route path=":slug" element={<DocPage />} />
            </Route>
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
      </div>

      {/* Global Footer also sits outside the animation container, hidden on docs pages */}
      {!location.pathname.startsWith('/documentation') && <Footer />}
      
      {/* Vercel Web Analytics */}
      <Analytics />
    </>
  );
}

export default App;
