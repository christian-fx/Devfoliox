export const TEMPLATE_DATA = [
  {
    id: 'react-minimal',
    framework: 'React',
    title: 'React Minimal',
    description: 'A deeply clean, typography-focused layout designed for professional clarity. Built with React 18, Vite, and Framer Motion for subtle, high-performance interactions.',
    bestFor: 'Software engineers and product-focused developers who value clean typography, readability, and a structured, document-style presentation.',
    image: '/images/minimal.png',
    heroImage: '/images/templates/reactMinimal.png',
    gallery: [
      '/images/templates/reactMinimal.png',
      '/images/templates/reactMinimal1.png',
      '/images/templates/reactMinimal2.png',
      '/images/templates/reactMinimal3.png'
    ],
    command: 'npx devfoliox generate your-github-handle --template minimal --stack React.js',
    previewUrl: '#',
    stack: [
      { name: 'React', icon: 'logos:react' },
      { name: 'Vite', icon: 'logos:vitejs' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
      { name: 'Framer Motion', icon: 'logos:framer' }
    ],
    features: [
      'Intelligent Mobile Initials: Automatically abbreviates branding for smaller screens',
      'Staggered Entry Animations: Framer Motion fadeInUp patterns for all sections',
      'Dynamic GitHub Stats: Live followers, repo counts, and contribution metrics',
      'Polished Skeleton States: Seamless loading transitions for all data-driven components',
      'Hybrid Typography: Orchestrated Serif/Sans-serif pairings for readable engineering lore'
    ]
  },
  {
    id: 'react-modern',
    framework: 'React',
    title: 'React Modern',
    description: 'A high-impact, visually engaging layout utilizing glassmorphism, floating grids, and speed-optimized marquee tracks driving React state.',
    bestFor: 'Creative developers and UI/UX enthusiasts who want to showcase their work with high-fidelity animations, vibrant accents, and a futuristic dark-mode aesthetic.',
    image: '/images/modern.png',
    heroImage: '/images/templates/reactModern.png',
    gallery: [
      '/images/templates/reactModern1.png',
      '/images/templates/reactModern2.png',
      '/images/templates/reactModern3.png',
      '/images/templates/reactModern4.png'
    ],
    command: 'npx devfoliox generate your-github-handle --template modern --stack React.js',
    previewUrl: '#',
    stack: [
      { name: 'React', icon: 'logos:react' },
      { name: 'Framer Motion', icon: 'logos:framer' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' }
    ],
    features: [
      'Interactive Skills Marquee: Infinite animated track of your primary technologies',
      'Dynamic Language Bars: Visual proficiency breakdown aggregated from all repositories',
      'Live "Open to Work" Badge: Integrated status indicator with pulse physics',
      'Bento-Grid Statistics: High-contrast dashboard for Stars, Repos, and Followers',
      'Real-time Repo Filtering: Instant, state-driven project sorting by language'
    ]
  },
  {
    id: 'vanilla-minimal',
    framework: 'Vanilla JS',
    title: 'Vanilla Minimal',
    description: 'High-fidelity, 1440px-optimized portfolio built with native Web Standards. Extreme performance combined with professional glassmorphic aesthetics.',
    bestFor: 'Backend-leaning developers and performance purists who desire an ultra-lightweight portfolio with zero build overhead and instantaneous load times.',
    image: '/images/minimal.png',
    heroImage: '/images/vanillaMinimal.png',
    gallery: [
      '/images/templates/vanillaMinimal1.png',
      '/images/templates/vanillaMinimal2.png'
    ],
    command: 'npx devfoliox generate your-github-handle --template minimal --stack Vanilla',
    previewUrl: '#',
    stack: [
      { name: 'JavaScript', icon: 'logos:javascript' },
      { name: 'HTML5', icon: 'logos:html-5' },
      { name: 'CSS3', icon: 'logos:css-3' },
      { name: 'Iconify', icon: 'logos:iconify' }
    ],
    features: [
      'Fixed Glassmorphic Header: Persistent navigation with backdrop blur and border isolation',
      'Universal Tech Ranking: Aggregates proficiency across up to 1000 GitHub repositories',
      'Visual Tech Stack: Official brand icons matched to your primary languages automatically',
      'Mobile-First Navigation: Dedicated full-screen overlay menu and branding abbreviations',
      'Native Performance: Pure DOM-driven logic with near-zero bundle overhead'
    ]
  },
  {
    id: 'vanilla-modern',
    framework: 'Vanilla JS',
    title: 'Vanilla Modern',
    description: 'Native DOM-driven animations matching the physics of React. Features a bento-style layout and high-performance intersection observers.',
    bestFor: 'Frontend engineers looking for a bento-style layout with high-performance native animations, contribution graphs, and a tech-forward look.',
    image: '/images/modern.png',
    heroImage: '/images/vanillaModern.png',
    gallery: [
      '/images/templates/vanillaModern1.png',
      '/images/templates/vanillaModern2.png',
      '/images/templates/vanillaModern3.png',
      '/images/templates/vanillaModern4.png'
    ],
    command: 'npx devfoliox generate your-github-handle --template modern --stack Vanilla',
    previewUrl: '#',
    stack: [
      { name: 'JavaScript', icon: 'logos:javascript' },
      { name: 'HTML5', icon: 'logos:html-5' },
      { name: 'CSS3', icon: 'logos:css-3' }
    ],
    features: [
      'Contribution Heatmap: Embedded live GitHub activity graph for visual proof of work',
      'Native Intersection Observer: High-performance scroll-reveal animations for all UI cards',
      'Statistical Counters: Native JS-driven incremental counters for repo and star metrics',
      'Visual Language Ratios: Segmented color bar reflecting exact technology usage',
      'Auto-generated Skill Tags: Dynamic extraction of tech labels from GitHub topics'
    ]
  },
  {
    id: 'next-minimal',
    framework: 'Next.js',
    title: 'Next.js Minimal',
    description: 'Server-Side Rendered (SSR) typographic portfolio fetching GitHub APIs purely on the server for unparalleled SEO results.',
    bestFor: 'Full-stack developers who want a production-grade portfolio with the best possible SEO and PageSpeed Insights performance.',
    image: '/images/nextMinimal.png',
    heroImage: '/images/nextMinimal.png',
    gallery: [
      '/images/templates/nextMinimal1.png',
      '/images/templates/nextMinimal2.png'
    ],
    command: 'npx devfoliox generate your-github-handle --template minimal --stack Next.js',
    previewUrl: '#',
    stack: [
      { name: 'Next.js', icon: 'logos:nextjs-icon' },
      { name: 'React', icon: 'logos:react' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' }
    ],
    features: [
      'Aggressive Server-Side Rendering (SSR): Faster First Contentful Paint (FCP)',
      'Optimal SEO payload mapping: Automatic metadata generation for social sharing',
      'App Router Architecture: Clean directory structure with shared layouts',
      'Infinite Persistence: Server-side caching of GitHub API response buffers',
      'Zero-Latency Typographic Rendering: Hybrid system font stacks'
    ]
  },
  {
    id: 'next-modern',
    framework: 'Next.js',
    title: 'Next.js Modern',
    description: 'The ultimate enterprise-grade layout. Server components mixed tightly with client-side Framer Motion aesthetics and vibrant glassmorphism.',
    bestFor: 'Enterprise-level engineers who want to demonstrate their proficiency with the React/Next.js ecosystem and high-end creative coding.',
    image: '/images/nextModern.png',
    heroImage: '/images/nextModern.png',
    gallery: [
      '/images/templates/nextModern1.png',
      '/images/templates/nextModern2.png',
      '/images/templates/nextModern3.png'
    ],
    command: 'npx devfoliox generate your-github-handle --template modern --stack Next.js',
    previewUrl: '#',
    stack: [
      { name: 'Next.js', icon: 'logos:nextjs-icon' },
      { name: 'React', icon: 'logos:react' },
      { name: 'Framer Motion', icon: 'logos:framer' }
    ],
    features: [
      'App Router architecture mapping: Modern Next.js patterns throughout',
      'Server-Client Component Hybrid: Fast initial loads with rich client-side interactivity',
      'Advanced structural glassmorphic UI surfaces: Complex layout rendering',
      'Responsive native hover physics on repository cards: Premium micro-interactions',
      'Vibrant localized gradient backgrounds: High-fidelity visual presentation'
    ]
  }
];
