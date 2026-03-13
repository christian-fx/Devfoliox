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
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Devfolio is a Node.js CLI tool that scaffolds a fully functional, GitHub-powered portfolio website for developers. Run a single command, answer two quick questions, and you get a production-ready React application that automatically pulls your repositories, programming languages, star counts, and profile information directly from the GitHub API — no manual updates ever required.

---

## Features

- 🚀 **One-command scaffolding** — `npx devfolio` and you're done.
- 🔄 **Live GitHub data** — repos, stars, languages, bio, and avatar are fetched at runtime from the GitHub API, so your portfolio stays current automatically.
- 🎨 **Multiple templates** — choose from pre-built portfolio templates during setup.
- ⚡ **Vite-powered** — lightning-fast dev server and optimised production builds.
- 💨 **Tailwind CSS** — utility-first styling that's easy to customise.
- ✨ **Optional animations** — smooth entrance and scroll animations out of the box.
- 📦 **Zero config needed** — the generated project is ready to run with `npm install && npm run dev`.
- 🌐 **Instantly deployable** — drop the build folder onto Vercel, Netlify, or GitHub Pages.

---

## Tech Stack

| Layer | Technology |
|---|---|
| CLI | Node.js, [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) |
| Frontend framework | [React](https://react.dev/) |
| Build tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) *(optional)* |
| Data source | [GitHub REST API](https://docs.github.com/en/rest) |

---

## Quick Start

> **Prerequisite:** Node.js ≥ 18 and npm ≥ 9.

```bash
npx devfolio
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
npx devfolio generate your-username --template minimal
```

A new project folder is created in your current directory. Navigate into it and start the dev server:

```bash
cd portfolio-your-username
npm install
npm run dev
```

Open `http://localhost:5173` to preview your portfolio. 🎉

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
│  • Copies template files        │
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

The CLI copies the chosen template into a new directory named `portfolio-<username>`, then writes a small config file (`src/config.js`) with the GitHub username. When the React app loads in the browser, it reads this config and queries the GitHub REST API to populate every section of the portfolio dynamically.

---

## Templates

| Template | Description |
|---|---|
| **Minimal** | Clean, single-page layout focused on readability. |
| **Modern** | Contemporary layout with richer visual hierarchy. |

More templates are in development. Community contributions are welcome — see [Contributing](#contributing).

---

## Project Structure

After running `npx devfolio`, the generated project looks like this:

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

All other visual changes are made by editing the React components and Tailwind classes directly — no special build step required.

---

## Contributing

Contributions, bug reports, and new template ideas are very welcome!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-new-template`.
3. Commit your changes: `git commit -m "feat: add my-new-template"`.
4. Push to the branch: `git push origin feat/my-new-template`.
5. Open a Pull Request.

Please make sure your code follows the existing style and that any new template is placed under `templates/<template-name>/`.

---

## License

Distributed under the [MIT License](LICENSE).  
Copyright © 2026 [Christian Akabueze](https://github.com/christian-fx).
