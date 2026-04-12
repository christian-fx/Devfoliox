import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import TemplateCard from '../components/templates/TemplateCard';
import { TEMPLATE_DATA } from '../data/templatesData';

export default function Templates() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'React', 'Vanilla JS', 'Next.js'];

  const filteredTemplates = TEMPLATE_DATA.filter(template => {
    if (activeFilter === 'All') return true;
    return template.framework === activeFilter;
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.template-card');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <>
      <Header />
      
      <main>
        {/* Consistent Hero Spacing matching Home.jsx */}
        <section className="section hero text-center" id="templates-hero">
          <div className="hero-bg-grid"></div>
          <div className="container">
            <h1 className="title-md">Architectural Templates</h1>
            <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '48px' }}>
              Choose from our professionally engineered layout structures. Every template is strictly typed, highly accessible, and categorised by your preferred tech stack.
            </p>

            {/* Interactive Desktop / Mobile Filter System */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`btn ${activeFilter === f ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ 
                    padding: '8px 24px', 
                    borderRadius: '24px', 
                    fontSize: '14px',
                    borderColor: activeFilter === f ? 'transparent' : 'var(--border)'
                  }}
                >
                  {f === 'All' ? 'All Stacks' : f}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Cards Grid */}
        <section className="section section-light" id="templates-grid">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
              {filteredTemplates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Marquee */}
        <div style={{ width: '100%', overflow: 'hidden', padding: '32px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card-bg, rgba(255, 255, 255, 0.02))' }}>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee-scroll 25s linear infinite', width: 'max-content' }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', paddingRight: '48px', fontSize: '14px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-dim, #8b949e)' }}>
                <iconify-icon icon="lucide:sparkles" style={{ color: '#fbbf24', fontSize: '16px' }}></iconify-icon>
                More Templates Coming Soon
              </div>
            ))}
          </div>
          <style>
            {`
              @keyframes marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}
          </style>
        </div>

        {/* Explore Showcase CTA */}
        <section className="cta-section">
          <div className="cta-shell">
            <div className="cta-panel" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div className="cta-eyebrow">
                <iconify-icon icon="lucide:compass" style={{ fontSize: '14px' }}></iconify-icon>
                View Live Integrations
              </div>
              <h2 className="cta-title">See them in action</h2>
              <p className="cta-text" style={{ maxWidth: '600px', margin: '16px auto 32px' }}>
                Want to see what elite developers are building with these template architectures globally? Discover beautifully customized live implementations in the Devfolio Community Showcase.
              </p>
              <div className="cta-actions" style={{ justifyContent: 'center' }}>
                <Link to="/showcase" className="btn btn-cta-light" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <iconify-icon icon="lucide:star"></iconify-icon>
                  Explore the Hall of Fame
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
