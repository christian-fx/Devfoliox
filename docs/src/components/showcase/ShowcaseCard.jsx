import React from 'react';

export default function ShowcaseCard({ item }) {
  return (
    <div className="showcase-card" style={{
      background: 'var(--card-bg, rgba(255, 255, 255, 0.02))',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden', background: '#0d1117' }}>
        <img 
          src={item.image} 
          alt={`${item.name} Portfolio Layout`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Template Architecture Tag */}
        <div style={{ 
          position: 'absolute', 
          top: '16px', 
          right: '16px', 
          background: 'rgba(0,0,0,0.7)', 
          backdropFilter: 'blur(4px)', 
          padding: '6px 12px', 
          borderRadius: '16px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          fontSize: '12px', 
          fontWeight: 600, 
          color: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px' 
        }}>
          <iconify-icon icon="lucide:layers"></iconify-icon>
          {item.templateBadge}
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
        {/* Avatar Scraped cleanly traversing component threshold */}
        <div style={{ 
          position: 'absolute', 
          top: '-24px', 
          left: '24px', 
          width: '56px', 
          height: '56px', 
          borderRadius: '50%', 
          border: '4px solid var(--background)', 
          overflow: 'hidden', 
          background: '#000',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <img src={`https://github.com/${item.githubHandle}.png`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3 className="title-sm" style={{ marginBottom: '4px' }}>{item.name}</h3>
          <p className="color-dim" style={{ fontSize: '14px', margin: 0 }}>{item.role}</p>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <iconify-icon icon="lucide:external-link" style={{ fontSize: '18px' }}></iconify-icon>
            Visit Live Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
