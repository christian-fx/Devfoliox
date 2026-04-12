# Devfolio

> **Generate a ready-to-run portfolio website straight from your GitHub username — in seconds.**

[![npm version](https://img.shields.io/npm/v/devfolio.svg)](https://www.npmjs.com/package/devfolio)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Templates](#templates)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Documentation & Showcase](#documentation--showcase)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Devfolio is a Node.js CLI tool that scaffolds a fully functional, GitHub-powered portfolio website for developers. Run a single command, answer two quick questions, and you get a production-ready application that automatically pulls your repositories, programming languages, star counts, and profile information directly from the GitHub API — no manual updates ever required.

---

## Features

- **One-command scaffolding** — `npx devfolio` and you're done.
- **Live GitHub data** — repos, stars, languages, bio, and avatar are fetched at runtime from the GitHub API, so your portfolio stays current automatically.
- **Multiple architectures** — choose from React, Next.js, and Vanilla JS portfolio templates.
- **Vite-powered** — lightning-fast dev server and optimised production builds.
- **Tailwind CSS** — utility-first styling that's easy to customise.
- **Optional animations** — smooth entrance and scroll animations out of the box.
- **Zero config needed** — the generated project is ready to run right after scaffolding.
- **Instantly deployable** — deploy the frontend seamlessly to Vercel, Netlify, or GitHub Pages.

---

## Tech Stack

| Layer | Technology |
|---|---|
| CLI Engine | Node.js, [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) |
| Core Frameworks | [React](https://react.dev/), [Next.js](https://nextjs.org/) |
| Build tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) *(optional)* |
| Data source | [GitHub REST API](https://docs.github.com/en/rest) |

---

## Quick Start

> **Prerequisite:** Node.js ≥ 18 and npm ≥ 9.

```bash
npx devfolio init
```

The CLI will ask two questions:

```
? Enter your GitHub username: › your-username
? Choose a template: › (use arrow keys)
  ❯ minimal
    modern
```

You can also run it non-interactively:

```bash
npx devfolio generate your-username --template react-minimal
```

A new project folder is created in your current directory. Navigate into it and start the dev server:

```bash
cd portfolio-your-username
npm install
npm run dev
```

Open `http://localhost:5173` to preview your portfolio.

---

## How It Works

```
npx devfolio
     │
     ▼
┌─────────────────────────────────┐
│  CLI (Node.js)                  │
│  • Prompts for GitHub username  │
│  • Prompts for template choice  │
│  • Copies layout constraints    │
│  • Injects username config      │
└──────────────┬──────────────────┘
               │ scaffolds
               ▼
┌─────────────────────────────────┐
│  Generated React App (Vite)     │
│  • Fetches GitHub API at runtime│
│  • Renders repos, languages,    │
│    stars, bio, avatar, etc.     │
│  • Styled with Tailwind CSS     │
│  • Animated with Framer Motion  │
└─────────────────────────────────┘
```

The CLI tightly orchestrates the chosen framework template into a new directory named `portfolio-<username>`, then writes a small config file (`src/config.js`) binding the GitHub user path. When the application mounts into the browser, it reads this configuration and fetches securely from the GitHub REST API to populate the UI dynamically.

---

## Templates

| Template | Framework | Description |
|---|---|---|
| **Minimal** | React, Vanilla JS, Next.js | Clean, single-page layout focused tightly on structural readability. |
| **Modern** | React, Vanilla JS, Next.js | Contemporary layout with rich visual components and deep typography hierarchy. |

More templates are in development. Community contributions are welcome — see [Contributing](#contributing).

---

## Project Structure

After running `npx devfolio`, a standard React generated layout looks like this:

```
portfolio-your-username/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Languages.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useGitHub.js        # fetches data from the GitHub API
│   ├── config.js               # generated GitHub username config
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Configuration

Open `src/config.js` in the generated project to update the GitHub username:

```js
// src/config.js
export const GITHUB_USERNAME = "your-github-username";
```

All other visual adjustments can be directly handled inside the generated native layout components.

---

## Documentation & Showcase

Full architectural guides, CLI command charts, and a Community Showcase gallery of live implementations can be found within the `/docs` directory. This is a standalone React SPA dedicated to tracking Devfolio updates.

To spin up the docs:
```bash
cd docs
npm install
npm run dev
```

---

## Contributing

Contributions, bug reports, and new template ideas are very welcome!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-new-template`.
3. Commit your changes: `git commit -m "feat: add my-new-template"`.
4. Push to the branch: `git push origin feat/my-new-template`.
5. Open a Pull Request.

Ensure custom designs respect the internal global stylesheet constraints and are stored cleanly within `templates/<framework>-<type>`.

---

## License

Distributed under the [MIT License](LICENSE).  
Copyright © 2026 [Christian Akabueze](https://github.com/christian-fx).
