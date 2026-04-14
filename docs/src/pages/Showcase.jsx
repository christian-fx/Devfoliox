import React, { useEffect } from 'react';
import ShowcaseCard from '../components/showcase/ShowcaseCard';
import { SHOWCASE_DATA } from '../data/showcaseData';

export default function Showcase() {
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.showcase-card, .cta-panel');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main>
        {/* Consistent Hero Mapping matching previous files */}
        <section className="section hero text-center" id="showcase-hero">
          <div className="hero-bg-grid"></div>
          <div className="container">
            <div className="badge" style={{ marginBottom: '16px' }}>
                <iconify-icon icon="lucide:star" style={{ color: '#fbbf24', marginRight: '6px' }}></iconify-icon>
                Community Hall of Fame
            </div>
            <h1 className="title-md">Discover Devfolio in the wild</h1>
            <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '48px' }}>
              Explore how top engineers are utilizing Devfolio architectures to construct stunning, high-performance portfolios deeply integrated with the GitHub REST API ecosystem.
            </p>
          </div>
        </section>

        {/* Gallery Grid Engine */}
        <section className="section section-light">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1100px', margin: '0 auto' }}>
              {SHOWCASE_DATA.map(item => (
                <ShowcaseCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Submit to Showcase CTA */}
        <section className="cta-section">
          <div className="cta-shell">
            <div className="cta-panel" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div className="cta-eyebrow">
                <iconify-icon icon="lucide:rocket" style={{ fontSize: '14px' }}></iconify-icon>
                Got something to show?
              </div>
              <h2 className="cta-title">Submit your portfolio to the Showcase</h2>
              <p className="cta-text" style={{ maxWidth: '600px', margin: '16px auto 32px' }}>
                We're always looking for beautifully customized architectures utilizing the Devfolio CLI. Submit your live repository to be featured globally.
              </p>
              <div className="cta-actions" style={{ justifyContent: 'center' }}>
                <a href="https://github.com/christian-fx/devfolio/issues" target="_blank" rel="noopener noreferrer" className="btn btn-cta-light" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <iconify-icon icon="lucide:github"></iconify-icon>
                  Submit URL via Issue
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
