import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { TEMPLATE_DATA } from '../data/templatesData';

export default function TemplateDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  
  const template = TEMPLATE_DATA.find(t => t.id === id);

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(template.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
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
                <img src={template.image} alt={template.title} style={{ width: '100%', display: 'block' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
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

      </main>
    </>
  );
}
