# <p align="center"><img src="https://raw.githubusercontent.com/christian-fx/devfoliox/main/docs/public/images/devfoliox-icon.svg" width="100" alt="Devfoliox Logo" /><br/>Devfoliox</p>

> **Generate a ready-to-run portfolio website straight from your GitHub username — in seconds.**

[![npm version](https://img.shields.io/npm/v/devfoliox.svg)](https://www.npmjs.com/package/devfoliox)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/christian-fx/devfoliox/blob/main/LICENSE)

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
- [Contributors](#contributors)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Devfoliox is a Node.js CLI tool that scaffolds a fully functional, GitHub-powered portfolio website for developers. Run a single command, answer two quick questions, and you get a production-ready application that automatically pulls your repositories, programming languages, star counts, and profile information directly from the GitHub API — no manual updates ever required.

---

## Features

- **One-command scaffolding** — Clone and run `npx devfoliox init` and you're done.
- **Live GitHub data** — repos, stars, languages, bio, and avatar are fetched at runtime from the GitHub API, so your portfolio stays current automatically.
- **Multiple architectures** — choose from React, Next.js, Vanilla JS, and HTML/CSS portfolio templates.
- **Vite-powered** — lightning-fast dev server and optimised production builds.
- **Tailwind CSS** — utility-first styling that's easy to customise.
- **Optional animations** — smooth entrance and scroll animations out of the box.
- **Zero config needed** — the generated project is ready to run right after scaffolding.
- **Instantly deployable** — deploy to Vercel, Netlify, or GitHub Pages.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| CLI Engine | Node.js, [Commander.js](https://github.com/tj/commander.js), [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) |
| Core Frameworks | [React](https://react.dev/), [Next.js](https://nextjs.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) *(modern template only)* |
| Data Source | [GitHub REST API](https://docs.github.com/en/rest) |

---

## Quick Start

> **Prerequisite:** Node.js ≥ 18 and npm ≥ 9.

The fastest way to get started is by running the Devfoliox wizard directly via `npx`:

```bash
npx devfoliox init
```

Alternatively, you can install the CLI globally on your machine:

```bash
# 1. Install globally
npm install -g devfoliox

# 2. Run the initialization wizard
devfoliox init
```

The CLI will prompt you:

```
? Enter your GitHub username: › your-username
? Choose a stack:    › react
? Choose a template: › modern
```

You can also skip the prompts entirely with flags:

```bash
npx devfoliox init your-username --stack react --template modern
npx devfoliox init your-username --stack vanilla --template minimal
npx devfoliox init your-username --stack next --template terminal
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
npx devfoliox init
         │
         ▼
┌─────────────────────────────────┐
│  CLI (Node.js)                  │
│  • Prompts for GitHub username  │
│  • Prompts for stack choice     │
│  • Prompts for template choice  │
│  • Copies template folder       │
│  • Injects username into config │
│  • Generates README             │
└──────────────┬──────────────────┘
               │ scaffolds
               ▼
┌─────────────────────────────────┐
│  Generated Portfolio App        │
│  • Fetches GitHub API at runtime│
│  • Renders repos, languages,    │
│    stars, bio, avatar, etc.     │
│  • Styled with Tailwind CSS     │
│  • Animated with Framer Motion  │
└─────────────────────────────────┘
```

The CLI copies the chosen template into a new directory named `portfolio-<username>`, then writes a small config file (`src/config.js`) with the GitHub username. When the app loads in the browser, it reads that config and fetches live data from the GitHub REST API to populate the entire UI dynamically.

---

## Templates

| Template | Description |
| --- | --- |
| **modern** | Dark mode, animated cards, filterable project grid, modal on click |
| **minimal** | Light mode, clean list layout, inline expand, no animation library |

More templates are in development. Community contributions are welcome — see [Contributing](#contributing).

---

## Project Structure

After running the Devfoliox CLI, a standard generated project layout looks like this:

```
portfolio-your-username/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Stats.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── config.js               # generated by CLI — your GitHub username lives here
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Configuration

The only file the CLI writes to is `src/config.js`:

```js
// src/config.js — generated by devfoliox
export const GITHUB_USERNAME = "your-github-username";
```

Change this to any GitHub username and the entire portfolio updates automatically. All other visual adjustments can be made directly inside the generated components.

---

## Documentation & Showcase

Full documentation, CLI reference, and a live template showcase can be found at:

**[devfolio-six-nu.vercel.app](https://devfolio-six-nu.vercel.app)**

To spin up the docs locally:

```bash
# From the root directory
cd docs
npm install
npm run dev
```

---

## Contributors

This project was built by a team. Big shoutout to everyone who made it happen:

| Name | Role | GitHub |
| --- | --- | --- |
| Gidoen Onyegbula | CLI Core & GitHub Data Layer | [@Gfrosh](https://github.com/Gfrosh) |
| Allwell Azubike | React Modern Template | [@allwellazubike](https://github.com/allwellazubike) |
| Maduka Jesse Nnamdi | React Minimal Template | [@Jesse-23](https://github.com/Jesse-23) |
| Okaekwu Kemdy Osmond | Vanilla (HTML/CSS/JS) Templates | [@OsmondJnr](https://github.com/OsmondJnr) |
| Jonaka Udu | Next.js Templates | [@Udu-Jonaka](https://github.com/Udu-Jonaka) |
| Christian Akabueze | Docs Website — Design, Content & Structure | [@Christian-fx](https://github.com/Christian-fx) |

---

## Contributing

Contributions, bug reports, and new template ideas are very welcome!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-new-template`.
3. Commit your changes: `git commit -m "feat: add my-new-template"`.
4. Push to the branch: `git push origin feat/my-new-template`.
5. Open a Pull Request.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before getting started — it covers the full team workflow, template specs, and dependency rules.

---

## License

Distributed under the [MIT License](LICENSE).  
Copyright © 2026 [Christian Akabueze](https://github.com/christian-fx).
