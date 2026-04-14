# Devfoliox Documentation Site

The official documentation, template catalog, and showcase gallery for the **Devfoliox CLI** ecosystem.

This site is built with a minimal, high-performance dependency stack utilizing **React**, **Vite**, and **React Router**. It leverages the GitHub REST API to dynamically fetch, parse, and render live repository data—perfectly demonstrating the speed and capability of a Devfoliox-generated application.

## 🚀 Running Locally

To run the documentation site locally:

1. **Install Dependencies**
   Navigate into the `docs` directory and install the necessary React and Vite constraints:
   ```bash
   cd docs
   npm install
   ```

2. **Authenticate the GitHub API**
   Create a `.env` file at the root of the `docs` directory mapping your GitHub access token:
   ```env
   VITE_GITHUB_TOKEN=your_classic_personal_access_token_here
   ```
   > [!IMPORTANT]
   > Providing `VITE_GITHUB_TOKEN` is heavily recommended to bypass standard unauthenticated GitHub API rate limits (which cap at 60 requests/hour) and ensuring live templates and showcase avatars render flawlessly.

3. **Spin up the local server**
   ```bash
   npm run dev
   ```

## ⚡ Vercel Deployment Architecture

The `docs` layout has been pre-configured with a custom `vercel.json` SPA routing override, meaning Vercel's edge network natively handles React Router without returning 404 dead ends.

When deploying this project to Vercel:
1. **Target the Root Directory**: After importing the overarching `devfoliox` repository, you **must** configure the Vercel Root Directory manually to `docs`. 
2. **Framework Alignment**: Set the framework to **Vite**. Vercel will automatically configure the build command (`npm run build`) and output directory (`dist`).
3. **Environment Security**: Safely inject your `VITE_GITHUB_TOKEN` directly into Vercel's Environment Variables panel before clicking deploy.

## ✨ Core Architecture
- **`src/pages/`** - Robust top-level layouts (`Home.jsx`, `Templates.jsx`, `Showcase.jsx`).
- **`src/components/`** - Reusable UI elements, global footers, and native `IntersectionObserver` viewport physics.
- **`src/data/`** - Externalized data models ensuring UI components are rapidly scalable without hardcoding arrays.
- **`src/markdown/`** - Isolated text files supplying the entire inner-documentation engine natively.
