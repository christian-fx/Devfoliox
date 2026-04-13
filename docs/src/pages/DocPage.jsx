import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import MarkdownRenderer from '../components/docs/MarkdownRenderer';

// Vite specific method to import all raw md files dynamically
const mdModules = import.meta.glob('../content/docs/*.md', { query: '?raw', import: 'default' });

// Defining ordered pages for Pagination logic
const DOC_PAGES = [
  { name: 'Introduction', slug: 'introduction' },
  { name: 'Quick Start', slug: 'quickstart' },
  { name: 'Installation', slug: 'installation' },
  { name: 'Configuration', slug: 'configuration' },
  { name: 'Templates', slug: 'templates' },
  { name: 'GitHub Integration', slug: 'github-integration' },
  { name: 'Deployment', slug: 'deployment' },
  { name: 'Commands', slug: 'commands' },
  { name: 'Options & Flags', slug: 'options' },
  { name: 'Environment Variables', slug: 'environment' },
  { name: 'Customization', slug: 'customization' },
  { name: 'API Reference', slug: 'api' },
  { name: 'Troubleshooting', slug: 'troubleshooting' }
];

export default function DocPage() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const currentIndex = DOC_PAGES.findIndex(p => p.slug === slug);
  const prevPage = currentIndex > 0 ? DOC_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex >= 0 && currentIndex < DOC_PAGES.length - 1 ? DOC_PAGES[currentIndex + 1] : null;

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      setLoading(true);
      try {
        const filePath = `../content/docs/${slug}.md`;
        
        if (!mdModules[filePath]) {
          if (isMounted) {
            setContent('# 404\nThe documentation page you requested does not exist.');
            setLoading(false);
          }
          return;
        }

        const rawContent = await mdModules[filePath]();
        if (isMounted) {
          setContent(rawContent);
          setLoading(false);
        }
      } catch (err) {
        console.error('Documentation load error:', err);
        if (isMounted) {
          setContent('# Error\nFailed to load documentation content.');
          setLoading(false);
        }
      }
    };

    loadContent();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!slug) {
    return <Navigate to="/documentation/introduction" replace />;
  }

  return (
    <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.2s', paddingBottom: '40px' }}>
      <MarkdownRenderer content={content} />
      
      {/* Pagination component */}
      {!loading && currentIndex !== -1 && (
        <nav className="pagination" style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
          {prevPage ? (
            <Link to={`/documentation/${prevPage.slug}`} className="pagination-link" style={{ flex: 1, textDecoration: 'none', padding: '24px', borderRadius: 'var(--radius-md)' }}>
              <span className="pagination-label" style={{ display: 'block', color: 'var(--muted-foreground)', fontSize: '13px', marginBottom: '8px' }}>Previous</span>
              <span className="pagination-title" style={{ display: 'block', fontSize: '16px', fontWeight: 600, color: 'var(--primary)' }}>&larr; {prevPage.name}</span>
            </Link>
          ) : <div style={{ flex: 1 }} />}
          
          {nextPage ? (
            <Link to={`/documentation/${nextPage.slug}`} className="pagination-link next" style={{ flex: 1, textDecoration: 'none', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'right' }}>
              <span className="pagination-label" style={{ display: 'block', color: 'var(--muted-foreground)', fontSize: '13px', marginBottom: '8px' }}>Next</span>
              <span className="pagination-title" style={{ display: 'block', fontSize: '16px', fontWeight: 600, color: 'var(--primary)' }}>{nextPage.name} &rarr;</span>
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </nav>
      )}
      <style>
        {`
          .doc-metadata-link {
            transition: color 0.2s ease, transform 0.2s ease;
          }
          .doc-metadata-link:hover {
            color: var(--primary) !important;
            transform: translateX(4px);
          }
        `}
      </style>
      
      {/* Footer Metadata */}
      {!loading && (
        <div style={{ marginTop: '64px', paddingTop: '24px', borderTop: '1px solid var(--border)', opacity: 0.8, fontSize: '13px', display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <a 
              href={`https://github.com/christian-fx/Devfolio/blob/main/docs/src/content/docs/${slug}.md`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="doc-metadata-link"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-foreground)', textDecoration: 'none' }}
            >
              <iconify-icon icon="lucide:github" style={{ fontSize: '16px' }}></iconify-icon>
              View on GitHub
            </a>
            <a 
              href={`https://github.com/christian-fx/Devfolio/edit/main/docs/src/content/docs/${slug}.md`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="doc-metadata-link"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted-foreground)', textDecoration: 'none' }}
            >
              <iconify-icon icon="lucide:pencil" style={{ fontSize: '16px' }}></iconify-icon>
              Edit this page
            </a>
          </div>
          <span style={{ color: 'var(--muted-foreground)' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      )}
    </div>
  );
}
