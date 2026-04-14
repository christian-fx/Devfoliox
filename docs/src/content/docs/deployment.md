# Deployment

Because Devfolio generates a completely standard Vite React application, deploying it to production takes literal seconds entirely for free.

## Deploying to Vercel (Recommended)

Vercel offers the absolute best native experience for Vite applications.

1. Push your generated `portfolio-xyz` folder to a new repository on GitHub.
2. Log into Vercel and click **Add New Project**.
3. Import your new GitHub repository.
4. Leave all build settings as their defaults (Vercel automatically detects Vite).
5. Click **Deploy**.

## Deploying to Netlify

Netlify is equally powerful.
1. Connect your GitHub repository to Netlify.
2. Override the Build Command to `npm run build`.
3. Set the Publish Directory to `dist`.
4. Click **Deploy Site**.

## Deploying to GitHub Pages

If you want to host your portfolio natively on GitHub:
1. Open your `vite.config.js` and add a `base` property pointing to your repo name: `base: '/portfolio-repo-name/'`
2. Push your code.
3. Use the official GitHub Actions workflow for static HTML pages to target your `dist/` artifact.

> [!TIP]
> Ensure you update your `vite.config.js` base URL *only* if you are using GitHub Pages! Vercel and Netlify expect the base to remain `/`.