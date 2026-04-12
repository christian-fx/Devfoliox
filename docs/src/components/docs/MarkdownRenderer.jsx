import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Custom component for <pre> code blocks to match doc.html style
const CustomPre = ({ node: _NODE, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  
  // ReactMarkdown passes the <code> element as the child of <pre>
  const codeElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === 'code'
  );

  const codeContent = codeElement?.props?.children || '';
  const language = codeElement?.props?.className?.replace('language-', '') || 'text';

  const handleCopy = () => {
    navigator.clipboard.writeText(String(codeContent).trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-language">{language}</span>
        <div className="code-actions">
          <button 
            className="code-action" 
            onClick={handleCopy}
            style={copied ? { backgroundColor: '#238636', borderColor: '#238636', color: '#fff' } : {}}
          >
            <iconify-icon icon={copied ? "lucide:check" : "lucide:copy"} style={{ fontSize: '12px' }}></iconify-icon>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="code-content">
        <pre {...props} style={{ margin: 0, fontFamily: 'var(--font-family-mono)', fontSize: '13px', lineHeight: '1.6', color: '#c9d1d9' }}>
          {codeElement ? codeElement.props.children : children}
        </pre>
      </div>
    </div>
  );
};

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({node: _NODE, ...props}) => <h1 className="page-title" {...props} />,
        h2: ({node: _NODE, ...props}) => {
          const id = String(props.children).toLowerCase().replace(/\s+/g, '-');
          return (
            <h2 className="section-title" id={id} {...props}>
              {props.children}
              <a href={`#${id}`} className="anchor-link">#</a>
            </h2>
          );
        },
        h3: ({node: _NODE, ...props}) => <h3 className="subsection-title" {...props} />,
        p: ({node: _NODE, ...props}) => <p className="paragraph" {...props} />,
        ul: ({node: _NODE, ...props}) => <ul className="content-list" {...props} />,
        ol: ({node: _NODE, ...props}) => <ol className="content-list" style={{ listStyleType: 'decimal' }} {...props} />,
        table: ({node: _NODE, ...props}) => (
          <div className="table-wrapper">
            <table className="content-table" {...props} />
          </div>
        ),
        code: ({node: _NODE, inline, ...props}) => 
          inline ? <code className="inline-code" {...props} /> : <code {...props} />,
        pre: CustomPre,
        blockquote: ({node: _NODE, children}) => {
          // Parse github alerts like > [!TIP]
          const childrenArray = React.Children.toArray(children);
          let type = 'info';
          let title = 'Info';
          let icon = 'lucide:info';
          
          let firstParagraph = childrenArray.find(c => React.isValidElement(c) && c.type === 'p');
          
          if(firstParagraph && firstParagraph.props.children) {
            const innerStr = String(firstParagraph.props.children[0] || firstParagraph.props.children);
            if (innerStr.includes('[!TIP]')) { type = 'tip'; title = 'Pro Tip'; icon = 'lucide:lightbulb'; }
            if (innerStr.includes('[!WARNING]')) { type = 'warning'; title = 'Warning'; icon = 'lucide:alert-triangle'; }
            if (innerStr.includes('[!SUCCESS]')) { type = 'success'; title = 'Success!'; icon = 'lucide:check-circle'; }
          }
          
          const cleanChildren = React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === 'p') {
              const text = String(child.props.children[0] || child.props.children);
              return React.cloneElement(child, {}, typeof child.props.children === 'string' ? text.replace(/\[!.*?\]/g, '') : child.props.children);
            }
            return child;
          });

          return (
            <div className={`callout callout-${type}`}>
              <iconify-icon icon={icon} className="callout-icon"></iconify-icon>
              <div className="callout-content">
                <div className="callout-title">{title}</div>
                <div className="callout-text">{cleanChildren}</div>
              </div>
            </div>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
