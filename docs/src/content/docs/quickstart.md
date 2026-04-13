# Quick Start

Get your portfolio running locally in under 5 minutes with our step-by-step interactive guide.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
* **Node.js** (v18.0.0 or higher)
* **npm** or **yarn** or **pnpm**
* A valid GitHub account holding public repositories.

## 1. Run the Initialization CLI

Open your terminal and run the standard npx command. This fetches the most recent stable release of Devfolio directly from the npm registry.

```bash
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