import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
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

    const elements = document.querySelectorAll('.feature-card, .workflow-step');
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
        {/* Hero */}
        <section className="section hero text-center" id="overview">
          <div className="hero-bg-grid"></div>
          <div className="container">
            <div className="badge">
              <span style={{ color: 'var(--primary)', marginRight: '8px', fontWeight: 700 }}>New</span>
              Devfolio v1.0
              <iconify-icon icon="lucide:arrow-right" style={{ fontSize: '14px', marginLeft: '4px' }}></iconify-icon>
            </div>

            <h1 className="title-lg">
              The GitHub-powered<br />developer portfolio.
            </h1>

            <p className="subtitle">
              A Node.js CLI tool that scaffolds a fully functional, stunning developer portfolio
              in one command. Fetches live data from GitHub to keep your site always up-to-date automatically.
            </p>

            <div className="hero-actions">
              <Link to="/documentation/quickstart" className="btn btn-primary">
                <iconify-icon icon="lucide:terminal-square" style={{ fontSize: '18px', marginRight: '8px' }}></iconify-icon>
                Get Started
              </Link>
              <Link to="/documentation" className="btn btn-secondary">View Documentation</Link>
            </div>

            <div className="terminal-mockup">
              <div className="terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="color-prompt">➜</span>
                  <span className="color-dim"> ~</span>
                  <span className="color-command"> git clone https://github.com/christian-fx/Devfolio.git</span>
                </div>
                <div className="terminal-line">
                  <span className="color-prompt">➜</span>
                  <span className="color-dim"> ~</span>
                  <span className="color-command"> cd Devfolio && npm install</span>
                </div>
                <div className="terminal-line">
                  <span className="color-prompt">➜</span>
                  <span className="color-dim"> ~</span>
                  <span className="color-command"> npx devfolio init</span>
                </div>

                <div className="terminal-line color-highlight" style={{ marginTop: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <iconify-icon icon="lucide:rocket"></iconify-icon>
                  Devfolio Initialization Wizard
                </div>

                <div className="terminal-line color-dim" style={{ marginTop: '12px' }}>
                  <span style={{ color: '#ffbd2e', marginRight: '6px' }}>?</span> What is your GitHub username? <span className="color-prompt">christian-fx</span>
                </div>
                <div className="terminal-line color-dim">
                  <span style={{ color: '#ffbd2e', marginRight: '6px' }}>?</span> Which template would you like to use? <span className="color-prompt">modern</span>
                </div>

                <div className="terminal-line color-dim" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <iconify-icon icon="eos-icons:loading" style={{ color: '#58a6ff' }}></iconify-icon>
                  Fetching GitHub public REST APIs...
                </div>
                <div className="terminal-line color-success" style={{ paddingLeft: '24px', opacity: 0.9 }}>
                  ✓ Secured profile data and repository history
                </div>
                <div className="terminal-line color-success" style={{ paddingLeft: '24px', opacity: 0.9 }}>
                  ✓ Cached top tech stack (JavaScript, React, Node.js)
                </div>

                <div className="terminal-line color-dim" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <iconify-icon icon="eos-icons:loading" style={{ color: '#d2a8ff' }}></iconify-icon>
                  Scaffolding React project...
                </div>
                <div className="terminal-line color-success" style={{ paddingLeft: '24px', opacity: 0.9 }}>
                  ✓ Created structural directory portfolio-christian-fx
                </div>
                <div className="terminal-line color-success" style={{ paddingLeft: '24px', opacity: 0.9 }}>
                  ✓ Configured Tailwind CSS utility engine
                </div>

                <div className="terminal-line wrap" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <iconify-icon icon="lucide:party-popper" style={{ color: '#d2a8ff' }}></iconify-icon>
                  <span className="color-highlight" style={{ fontWeight: 'bold' }}>Success!</span> <span className="color-command">Your developer portfolio is locked and loaded.</span>
                </div>

                <div className="terminal-line color-command" style={{ marginTop: '12px', paddingLeft: '28px' }}>cd <span style={{ color: '#c9d1d9' }}>portfolio-christian-fx</span></div>
                <div className="terminal-line color-command" style={{ paddingLeft: '28px' }}>npm <span style={{ color: '#c9d1d9' }}>install</span></div>
                <div className="terminal-line color-command" style={{ paddingLeft: '28px' }}>npm <span style={{ color: '#c9d1d9' }}>run dev</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section section-light" id="features">
          <div className="container">
            <div className="text-center">
              <h2 className="title-md">Everything you need for a modern portfolio</h2>
              <p className="subtitle">
                Built with the modern web stack to ensure your portfolio is fast, customizable, and always relevant.
              </p>
            </div>
            <div className="features-grid">

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <iconify-icon icon="lucide:github" style={{ fontSize: '24px' }}></iconify-icon>
                </div>
                <h3 className="feature-title">Live GitHub Integration</h3>
                <p className="feature-desc">Automatically fetches your public repositories, star counts, primary languages, bio, and profile picture directly from the GitHub API.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <iconify-icon icon="lucide:layout-template" style={{ fontSize: '24px' }}></iconify-icon>
                </div>
                <h3 className="feature-title">Multiple Templates</h3>
                <p className="feature-desc">Choose from professionally designed, production-ready templates. From minimal single-page layouts to complex multi-page portfolios.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <iconify-icon icon="lucide:wind" style={{ fontSize: '24px' }}></iconify-icon>
                </div>
                <h3 className="feature-title">Tailwind CSS Styling</h3>
                <p className="feature-desc">Fully styled with Tailwind CSS, making it incredibly easy to customize colors, typography, and layouts to match your personal brand.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <iconify-icon icon="lucide:zap" style={{ fontSize: '24px' }}></iconify-icon>
                </div>
                <h3 className="feature-title">Vite Powered</h3>
                <p className="feature-desc">Built on top of Vite for lightning-fast HMR during development and highly optimized static builds for deployment.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <iconify-icon icon="lucide:move" style={{ fontSize: '24px' }}></iconify-icon>
                </div>
                <h3 className="feature-title">Framer Motion</h3>
                <p className="feature-desc">Optional Framer Motion integration for smooth page transitions, scroll animations, and interactive elements right out of the box.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <iconify-icon icon="lucide:rocket" style={{ fontSize: '24px' }}></iconify-icon>
                </div>
                <h3 className="feature-title">Deploy Anywhere</h3>
                <p className="feature-desc">Generates a standard static site that can be deployed for free to Vercel, Netlify, GitHub Pages, or any static hosting provider.</p>
              </div>

            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section" id="workflow">
          <div className="container">
            <div className="text-center">
              <h2 className="title-md">Zero to Portfolio in 60 seconds</h2>
              <p className="subtitle">No manual data entry. No complex configuration. Just run the command and deploy.</p>
            </div>
            <div className="workflow-container">
              <div className="workflow-steps">
                <div className="workflow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Clone and Run</h3>
                    <p>Clone the repo, run <code style={{ fontFamily: 'monospace' }}>npm install</code>, then execute <code style={{ fontFamily: 'monospace' }}>npx devfolio init</code>. It will prompt you for your GitHub username and preferred template.</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Data is fetched automatically</h3>
                    <p>Devfolio connects to the GitHub REST API at runtime, pulling down your repositories, languages, bio, and avatar instantly.</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Customize and Deploy</h3>
                    <p>Tweak the generated Tailwind classes or modify the React components. Push to GitHub and connect to Vercel for instant deployment.</p>
                  </div>
                </div>
              </div>

              <div className="workflow-visual">
                <div className="profile-card">
                  <div className="profile-header"></div>
                  <div className="profile-body">
                    <img
                      src={`https://github.com/christian-fx.png`}
                      alt="Developer Avatar"
                      className="profile-avatar"
                      loading="lazy"
                    />
                    <h4 className="profile-name">Christian Akabueze</h4>
                    <p className="profile-bio">
                      Full-stack engineer building tools for the modern web. Open source enthusiast.
                    </p>
                    <div className="profile-tags">
                      <span className="profile-tag">JavaScript</span>
                      <span className="profile-tag">Node.js</span>
                      <span className="profile-tag">React</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="showcase">
          <div className="cta-shell">
            <div className="cta-panel">
              <div className="cta-eyebrow">
                <iconify-icon icon="lucide:sparkles" style={{ fontSize: '14px' }}></iconify-icon>
                Ready to launch your portfolio?
              </div>
              <h2 className="cta-title">Ship a live developer portfolio in one command.</h2>
              <p className="cta-text">
                Generate a production-ready site, pull in your latest GitHub data automatically, and customize it
                with templates powered by Tailwind and Vite.
              </p>
              <div className="cta-actions">
                <Link to="/documentation/quickstart" className="btn btn-cta-light">
                  <iconify-icon icon="lucide:terminal-square" style={{ fontSize: '18px', marginRight: '8px' }}></iconify-icon>
                  Get Started Now
                </Link>
                <Link to="/documentation" className="btn btn-cta-dark">Read the Docs</Link>
              </div>
              <p className="cta-note">Free, open source, and deploys in minutes.</p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
