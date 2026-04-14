import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function TemplateCard({ template }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(template.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="template-card" style={{ 
      background: 'var(--card-bg, rgba(255, 255, 255, 0.03))', 
      border: '1px solid var(--border)', 
      borderRadius: '8px', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s ease',
      opacity: template.isComingSoon ? 0.7 : 1,
      pointerEvents: template.isComingSoon ? 'none' : 'auto',
      position: 'relative'
    }}>
      {template.isComingSoon && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 10,
          background: 'var(--primary)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <iconify-icon icon="lucide:clock" style={{ fontSize: '13px' }}></iconify-icon>
          Coming Soon
        </div>
      )}
      
      <div className="template-image-wrapper" onClick={() => !template.isComingSoon && navigate(`/templates/${template.id}`)} style={{ cursor: template.isComingSoon ? 'default' : 'pointer', height: '240px', overflow: 'hidden', background: '#0d1117' }}>
        <img 
          src={template.heroImage || template.image} 
          alt={template.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            transition: 'transform 0.4s ease',
            filter: template.isComingSoon ? 'grayscale(0.5) blur(1px)' : 'none'
          }} 
          onMouseOver={(e) => !template.isComingSoon && (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseOut={(e) => !template.isComingSoon && (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>
      
      <div className="template-content" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 className="title-sm" style={{ marginBottom: '8px' }}>{template.title}</h3>
        <p className="color-dim" style={{ fontSize: '15px', marginBottom: 'auto', lineHeight: 1.6 }}>{template.description}</p>
        
        {/* Tech Stack rendered dynamically right before the footer */}
        <div className="template-tech-stack" style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
          {template.stack.map(tech => (
            <div key={tech.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
              <iconify-icon icon={tech.icon}></iconify-icon>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        <div className="template-actions" style={{ display: 'flex', gap: '12px', marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <button 
            disabled={template.isComingSoon}
            onClick={handleCopyCommand} 
            className="btn btn-primary" 
            style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 16px',
              opacity: template.isComingSoon ? 0.5 : 1,
              cursor: template.isComingSoon ? 'not-allowed' : 'pointer'
            }}
          >
            {copied ? (
              <>
                <iconify-icon icon="lucide:check"></iconify-icon>
                Copied!
              </>
            ) : (
              <>
                <iconify-icon icon="lucide:terminal-square"></iconify-icon>
                Use Template
              </>
            )}
          </button>
          <Link 
            to={template.isComingSoon ? '#' : `/templates/${template.id}`} 
            className="btn btn-secondary" 
            style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              opacity: template.isComingSoon ? 0.5 : 1,
              pointerEvents: template.isComingSoon ? 'none' : 'auto'
            }}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
