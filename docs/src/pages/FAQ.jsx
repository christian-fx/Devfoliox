import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  const categories = ['All', ...FAQ_DATA.map(cat => cat.category)];

  const filteredData = activeCategory === 'All' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(cat => cat.category === activeCategory);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <style>
        {`
          .faq-filter-bar {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 48px;
            flex-wrap: wrap;
          }
          .filter-pill {
            padding: 8px 20px;
            border-radius: 99px;
            border: 1px solid var(--border);
            background: transparent;
            color: var(--muted-foreground);
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
          }
          .filter-pill:hover {
            border-color: var(--primary);
            color: var(--foreground);
          }
          .filter-pill.active {
            background: var(--primary);
            color: var(--primary-foreground);
            border-color: var(--primary);
          }
          
          .faq-category-section {
            margin-bottom: 48px;
            animation: fadeIn 0.4s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .faq-accordion {
            background: #ffffff;
            border: 1px solid var(--border);
            border-radius: 12px;
            margin-bottom: 12px;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .faq-accordion.open {
            border-color: var(--primary);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .faq-header {
            width: 100%;
            padding: 20px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: none;
            border: none;
            cursor: pointer;
            text-align: left;
            gap: 16px;
          }
          .faq-question {
            font-size: 16px;
            font-weight: 700;
            color: var(--foreground);
            margin: 0;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .faq-icon {
            transition: transform 0.3s ease;
            color: var(--muted-foreground);
          }
          .open .faq-icon {
            transform: rotate(180px);
            color: var(--primary);
          }
          
          .faq-answer-wrapper {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s cubic-bezier(0, 1, 0, 1);
            background: #fafafa;
          }
          .open .faq-answer-wrapper {
            max-height: 1000px;
            transition: max-height 0.4s ease-in;
          }
          .faq-answer {
            padding: 0 24px 24px 56px;
            color: var(--secondary-foreground);
            font-size: 15px;
            line-height: 1.65;
          }
          .faq-answer code {
            background: var(--secondary);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.9em;
          }
          .cta-box {
            background: var(--muted);
            border-radius: 24px;
            padding: 48px;
            text-align: center;
            margin-top: 64px;
            border: 1px solid var(--border);
          }
        `}
      </style>

      <main style={{ paddingTop: '64px', paddingBottom: '100px' }}>
        {/* Hero Section */}
        <section className="section" style={{ background: 'var(--muted)', borderBottom: '1px solid var(--border)', marginBottom: '48px' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="badge">
              <iconify-icon icon="lucide:help-circle"></iconify-icon>
              Interactive Support
            </span>
            <h1 className="title-lg" style={{ marginBottom: '16px' }}>How can we help?</h1>
            <p className="subtitle">Search our knowledge base or browse by category to find the answers you need.</p>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '850px' }}>
            {/* Filter Bar */}
            <div className="faq-filter-bar">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => { setActiveCategory(cat); setOpenId(null); }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Questions List */}
            {filteredData.map((cat) => (
              <div key={cat.category} className="faq-category-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <h2 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '13px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                    {cat.category}
                  </h2>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border)', opacity: 0.5 }}></div>
                </div>

                <div className="faq-list">
                  {cat.questions.map((item) => (
                    <div key={item.id} className={`faq-accordion ${openId === item.id ? 'open' : ''}`}>
                      <button className="faq-header" onClick={() => toggleAccordion(item.id)}>
                        <h3 className="faq-question">
                          <iconify-icon icon="lucide:circle-help" style={{ color: openId === item.id ? 'var(--primary)' : 'var(--muted-foreground)', opacity: 0.7, fontSize: '18px' }}></iconify-icon>
                          {item.question}
                        </h3>
                        <iconify-icon 
                          icon={openId === item.id ? "lucide:chevron-up" : "lucide:chevron-down"} 
                          className="faq-icon"
                        ></iconify-icon>
                      </button>
                      <div className="faq-answer-wrapper">
                        <div className="faq-answer">
                          {item.answer.split('`').map((part, i) => 
                            i % 2 === 1 ? <code key={i}>{part}</code> : part
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Support CTA */}
            <div className="cta-box">
              <h2 className="title-md" style={{ marginBottom: '16px' }}>Still stuck?</h2>
              <p className="color-dim" style={{ marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
                Join our growing community of developers on GitHub and Discord for real-time help.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://github.com/christian-fx/devfoliox/discussions" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ gap: '8px' }}>
                  <iconify-icon icon="lucide:github"></iconify-icon>
                  Start Discussion
                </a>
                <a href="https://discord.gg/devfolio" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ gap: '8px' }}>
                  <iconify-icon icon="lucide:message-circle"></iconify-icon>
                  Community Discord
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
