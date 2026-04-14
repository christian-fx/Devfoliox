const FAQ_DATA = [
  {
    category: 'General',
    questions: [
      {
        id: 'what-is-devfolio',
        question: 'What is Devfoliox?',
        answer: 'Devfoliox is a high-performance CLI tool designed to generate professional developer portfolios directly from your GitHub data. It automates the fetching of your bio, repositories, tech stack, and contribution metrics, then wraps them in premium, pre-designed templates.'
      },
      {
        id: 'is-it-free',
        question: 'Is it free to use?',
        answer: 'Yes! Devfoliox is 100% open-source (MIT licensed) and free to use for personal and commercial projects. You can generate as many portfolios as you like.'
      }
    ]
  },
  {
    category: 'Usage & Commands',
    questions: [
      {
        id: 'how-to-start',
        question: 'How do I get started?',
        answer: 'The fastest way to start is by running `npx devfoliox init` in your terminal. This will launch an interactive setup wizard that guides you through choosing your GitHub username, template, and technology stack.'
      },
      {
        id: 'command-usage',
        question: 'Can I generate a portfolio without prompts?',
        answer: 'Yes. You can use the non-interactive command: `npx devfoliox generate <username> --template <template> --stack <stack>`. For example: `npx devfoliox generate octane --template modern --stack React.js`.'
      },
      {
        id: 'supported-stacks',
        question: 'What technology stacks are supported?',
        answer: 'We currently support **Vanilla JS**, **React.js** (Vite-based), and high-performance **Next.js** templates using the latest App Router architecture.'
      }
    ]
  },
  {
    category: 'GitHub & API',
    questions: [
      {
        id: 'rate-limits',
        question: 'I hit a "Rate Limit" error. What do I do?',
        answer: 'GitHub limits unauthenticated API requests to 60 per hour. If you have many repositories or run the command frequently, you might hit this limit. To resolve this, create a **Personal Access Token (PAT)** on GitHub and add it to your environment as `GITHUB_TOKEN`. This increases your limit to 5,000 requests per hour.'
      },
      {
        id: 'private-repos',
        question: 'Can I include my private repositories?',
        answer: 'By default, Devfoliox only fetches public data. To include private repositories, you must provide a `GITHUB_TOKEN` with the `repo` scope. The CLI will then be able to aggregate data from your private work while still keeping your source code secure.'
      }
    ]
  },
  {
    category: 'Customization',
    questions: [
      {
        id: 'how-to-customize',
        question: 'How do I customize the generated portfolio?',
        answer: 'Once generated, you own the source code. For Vanilla templates, you can edit `style.css` and `index.html`. For React templates, you can modify the components in `src/` and customize the `tailwind.config.js` to match your personal brand.'
      },
      {
        id: 'add-manual-projects',
        question: 'Can I add projects that aren\'t on GitHub?',
        answer: 'Absolutely. While the generator automates the GitHub sync, you can manually add new project cards to the generated HTML or React components. The code is structured to be easily extendable.'
      }
    ]
  },
  {
    category: 'Deployment',
    questions: [
      {
        id: 'where-to-deploy',
        question: 'Where should I deploy my portfolio?',
        answer: 'You can deploy to any static hosting provider. We recommend **GitHub Pages** for Vanilla templates, and **Vercel** or **Netlify** for React and Next.js projects. Simply push your generated code to a new repo and connect it to your host.'
      }
    ]
  }
];

export { FAQ_DATA };
