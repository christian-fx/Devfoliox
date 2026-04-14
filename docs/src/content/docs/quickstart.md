# Quick Start

> [!IMPORTANT]
> **Devfolio is currently in early access.** We haven't published the package to the official npm registry yet (Coming Soon). For now, please clone the repository to run the CLI tool locally.

Get your portfolio running locally in under 5 minutes with our step-by-step interactive guide.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
* **Node.js** (v18.0.0 or higher)
* **npm** or **yarn** or **pnpm**
* **Git**
* A valid GitHub account holding public repositories.

## 1. Clone and Run the CLI

Since Devfolio is not yet on npm, you need to clone the repository and run it locally.

```bash
git clone https://github.com/christian-fx/Devfolio.git
cd Devfolio
npm install
npx devfolio init
```

You will be greeted by the Devfolio Wizard, which will ask you three simple questions:
1. What is your GitHub username?
2. Which tech stack would you like to use? (React, Vanilla JS, or Next.js)
3. Which starting template would you like to use? (Minimal or Modern)

## 2. Start Developing

The CLI will scaffold a new Vite application in your current directory named `portfolio-<your-username>`.

```bash
cd portfolio-<username>
npm install
npm run dev
```

> [!SUCCESS]
> Congratulations! Your portfolio is now running locally at `http://localhost:5173`. Open it in your browser to see your live data reacting in real-time.