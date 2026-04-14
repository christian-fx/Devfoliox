import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { TEMPLATE_DATA } from '../data/templatesData';

export default function TemplateDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  
  const template = TEMPLATE_DATA.find(t => t.id === id);

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(template.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeImage]);


  return (
    <>
      <style>
        {`
          .gallery-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.3);
            border-color: var(--primary) !important;
          }

          @media (max-width: 640px) {
            .gallery-grid {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }
            .section {
              padding: 40px 0 !important;
            }
          }
        `}
      </style>
      <main style={{ paddingBottom: '80px', marginTop: '64px' }}>
        
        {/* Breadcrumbs and Hero */}
        <section className="section hero">
          <div className="container">
            <Link to="/templates" className="color-dim" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', textDecoration: 'none' }}>
              <iconify-icon icon="lucide:arrow-left"></iconify-icon>
              Back to Catalog
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <h1 className="title-md" style={{ margin: 0 }}>{template.title}</h1>
              <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '24px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <iconify-icon icon="lucide:layers"></iconify-icon>
                {template.framework} Build
              </span>
            </div>
            
            <p className="subtitle" style={{ maxWidth: '800px', margin: '0' }}>{template.description}</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', maxWidth: '1000px', margin: '0 auto' }}>
              
              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }}>
                <img src={template.heroImage || template.image} alt={template.title} style={{ width: '100%', display: 'block' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <div className="template-features">
                    <h3 className="title-sm" style={{ marginBottom: '20px' }}>Key Characteristics</h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {template.features.map((feature, i) => (
                        <li key={i} style={{ display: 'flex', gap: '12px' }}>
                          <iconify-icon icon="lucide:check-circle-2" style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}></iconify-icon>
                          <span className="color-dim">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {template.bestFor && (
                    <div style={{ padding: '24px', background: 'rgba(56, 189, 248, 0.03)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
                      <h3 className="title-sm" style={{ marginBottom: '12px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <iconify-icon icon="lucide:user-check"></iconify-icon>
                        Perfect Alignment
                      </h3>
                      <p className="color-dim" style={{ fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{template.bestFor}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="title-sm" style={{ marginBottom: '20px' }}>CLI Architecture</h3>
                  <div style={{ background: '#0d1117', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase' }}>Launch Command</div>
                      <code style={{ fontSize: '14px', color: '#58a6ff', fontFamily: 'monospace', wordBreak: 'break-all' }}>{template.command}</code>
                    </div>
                    <button onClick={handleCopyCommand} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
                      {copied ? <><iconify-icon icon="lucide:check"></iconify-icon>Copied securely</> : <><iconify-icon icon="lucide:copy"></iconify-icon>Copy Command</>}
                    </button>
                    <a href={template.previewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
                      <iconify-icon icon="lucide:external-link"></iconify-icon>
                      Launch Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {template.gallery && template.gallery.length > 0 && (
          <section className="section" style={{ borderTop: '1px solid var(--border)', marginTop: '48px', paddingTop: '64px' }}>
            <div className="container">
              <div style={{ marginBottom: '40px' }}>
                <h2 className="title-sm" style={{ marginBottom: '12px' }}>Visual Workspace</h2>
                <p className="color-dim">A deep dive into the component architecture and layout patterns of this template.</p>
              </div>
              
              <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '32px' }}>
                {template.gallery.map((img, i) => (
                  <div 
                    key={i} 
                    className="gallery-item" 
                    onClick={() => setActiveImage(img)}
                    style={{ 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      border: '1px solid var(--border)', 
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'zoom-in'
                    }}
                  >
                    <img src={img} alt={`${template.title} Gallery ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Lightbox Overlay */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            backdropFilter: 'blur(8px)',
            cursor: 'zoom-out',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}
          </style>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveImage(null); }}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '24px'
            }}
          >
            <iconify-icon icon="lucide:x"></iconify-icon>
          </button>
          <img 
            src={activeImage} 
            alt="Expanded view" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              borderRadius: '8px', 
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
              transform: 'scale(1)',
              animation: 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }} 
          />
          <style>
            {`
              @keyframes zoomIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
}
