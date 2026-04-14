import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ShowcaseCard from '../components/showcase/ShowcaseCard';
import { SHOWCASE_DATA } from '../data/showcaseData';

export default function Showcase() {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const nameInputRef = useRef(null);
  const roleInputRef = useRef(null);

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

    const elements = document.querySelectorAll('.cta-panel, .submission-card, .showcase-card');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [step]);

  // Step 1: Validate URL
  const handleNext = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!url.trim()) {
      setErrorMsg('Please enter a valid portfolio URL.');
      return;
    }

    try {
      new URL(url);
    } catch (_) {
      setErrorMsg('Please enter a complete URL (e.g., https://...).');
      return;
    }

    setStep(2);
    setTimeout(() => nameInputRef.current?.focus(), 300);
  };

  // Step 2: Validate Name
  const handleNextName = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setStep(3);
    setTimeout(() => roleInputRef.current?.focus(), 300);
  };

  // Step 3: Submit everything
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!role.trim()) {
      setErrorMsg('Please enter your professional role (e.g., Full Stack Engineer).');
      return;
    }

    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_role: role,
          portfolio_url: url,
          message: `New showcase submission from ${name} (${role}): ${url}`,
          reply_to: 'akabuezechris432@gmail.com'
        },
        PUBLIC_KEY
      );

      setStep(4);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setErrorMsg('Submission failed. Please check your network or try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main>
        <section className="section hero text-center" id="showcase-hero">
          <div className="hero-bg-grid"></div>
          <div className="container">
            <div className="badge" style={{ marginBottom: '16px' }}>
              <iconify-icon icon="lucide:star" style={{ color: '#fbbf24', marginRight: '6px' }}></iconify-icon>
              Community Hall of Fame
            </div>
            <h1 className="title-md">Discover Devfoliox in the wild</h1>
            <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '48px' }}>
              Explore how top engineers are utilizing Devfoliox architectures to construct stunning, high-performance portfolios.
            </p>
          </div>
        </section>

        {/* Interactive Submission Form */}
        <section className="section section-light" style={{ paddingBottom: '60px' }}>
          <div className="container">
            <div className="submission-card" style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}>
              {step < 4 ? (
                <form onSubmit={step === 1 ? handleNext : step === 2 ? handleNextName : handleSubmit}>
                  <div style={{ marginBottom: '24px' }}>
                    {/* Step progress dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                      {[1, 2, 3].map(s => (
                        <div key={s} style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: step >= s ? 'var(--primary)' : 'var(--border)',
                          transition: 'background 0.3s ease'
                        }} />
                      ))}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Step {step} of 3
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
                      {step === 1 ? 'Start with your URL' : step === 2 ? 'Introduce yourself' : 'What do you do?'}
                    </h2>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '15px' }}>
                      {step === 1
                        ? 'Paste the live link to your Devfoliox portfolio.'
                        : step === 2
                        ? "We'll use this name for your showcase card."
                        : "Tell the world your role (e.g., Full Stack Engineer)."}
                    </p>
                  </div>

                  <div style={{ position: 'relative', minHeight: '140px' }}>
                    {/* Step 1: URL */}
                    <div style={{
                      transition: 'all 0.4s ease',
                      opacity: step === 1 ? 1 : 0.4,
                      pointerEvents: step === 1 ? 'auto' : 'none'
                    }}>
                      <div style={{ position: 'relative' }}>
                        <iconify-icon icon="lucide:link" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}></iconify-icon>
                        <input
                          type="url"
                          placeholder="https://your-portfolio.vercel.app"
                          required
                          value={url}
                          onChange={(e) => { setUrl(e.target.value); setErrorMsg(''); }}
                          style={{
                            width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px',
                            border: errorMsg && step === 1 ? '1px solid #ef4444' : '1px solid var(--border)',
                            fontSize: '16px', background: 'white', outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Step 2: Name (slides in) */}
                    <div style={{
                      marginTop: '12px',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      maxHeight: step >= 2 ? '80px' : '0',
                      opacity: step >= 2 ? 1 : 0,
                      visibility: step >= 2 ? 'visible' : 'hidden'
                    }}>
                      <div style={{ position: 'relative' }}>
                        <iconify-icon icon="lucide:user" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}></iconify-icon>
                        <input
                          ref={nameInputRef}
                          type="text"
                          placeholder="Your Full Name"
                          value={name}
                          onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
                          style={{
                            width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px',
                            border: errorMsg && step === 2 ? '1px solid #ef4444' : '1px solid var(--border)',
                            fontSize: '16px', background: 'white', outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    {/* Step 3: Role (slides in) */}
                    <div style={{
                      marginTop: '12px',
                      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      maxHeight: step >= 3 ? '80px' : '0',
                      opacity: step >= 3 ? 1 : 0,
                      visibility: step >= 3 ? 'visible' : 'hidden'
                    }}>
                      <div style={{ position: 'relative' }}>
                        <iconify-icon icon="lucide:briefcase" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }}></iconify-icon>
                        <input
                          ref={roleInputRef}
                          type="text"
                          placeholder="e.g. Full Stack Engineer"
                          value={role}
                          onChange={(e) => { setRole(e.target.value); setErrorMsg(''); }}
                          style={{
                            width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px',
                            border: errorMsg && step === 3 ? '1px solid #ef4444' : '1px solid var(--border)',
                            fontSize: '16px', background: 'white', outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Inline Error */}
                  {errorMsg && (
                    <div style={{
                      color: '#ef4444', fontSize: '14px', marginTop: '12px',
                      textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                      <iconify-icon icon="lucide:alert-circle"></iconify-icon>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ marginTop: '24px' }}>
                    {step < 3 ? (
                      <button type="submit" disabled={step === 1 ? !url.trim() : !name.trim()} className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                        Next Step
                        <iconify-icon icon="lucide:arrow-right" style={{ marginLeft: '8px' }}></iconify-icon>
                      </button>
                    ) : (
                      <button type="submit" disabled={isSubmitting || !role.trim()} className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                        {isSubmitting
                          ? <iconify-icon icon="lucide:loader-2" style={{ animation: 'spin 1s linear infinite' }}></iconify-icon>
                          : <><span>Share with the World</span><iconify-icon icon="lucide:rocket" style={{ marginLeft: '8px' }}></iconify-icon></>
                        }
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div className="success-state" style={{ padding: '20px 0' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%', background: '#22c55e',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px', fontSize: '32px'
                  }}>
                    <iconify-icon icon="lucide:check"></iconify-icon>
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Submission Received!</h2>
                  <p style={{ color: 'var(--muted-foreground)', marginBottom: '32px' }}>
                    Your site has been queued for review. We'll reach out once it's live on the hall of fame.
                  </p>
                  <button onClick={() => { setStep(1); setUrl(''); setName(''); setRole(''); setErrorMsg(''); }} className="btn btn-secondary">
                    Submit Another
                  </button>
                </div>
              )}

            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', opacity: 0.6, fontSize: '13px' }}>
              <p>Powered by EmailJS · Submissions are reviewed manually.</p>
            </div>
          </div>
        </section>

        {/* Community Gallery Grid - Only shows if there is data */}
        {SHOWCASE_DATA.length > 0 && (
          <section className="section section-light" style={{ paddingTop: '0' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h2 className="title-sm">Current Hall of Famers</h2>
                <div style={{ width: '60px', height: '4px', background: 'var(--primary)', margin: '16px auto', borderRadius: '2px' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1100px', margin: '0 auto' }}>
                {SHOWCASE_DATA.map(item => (
                  <ShowcaseCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Documentation CTA preserved as requested */}
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
                <a href="https://github.com/christian-fx/devfoliox/issues" target="_blank" rel="noopener noreferrer" className="btn btn-cta-light" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
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
