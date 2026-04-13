# Troubleshooting

Running into issues? Here are the most common solutions to CLI and portfolio environment problems.

### Vite `npm run dev` immediately crashes
Ensure your native machine is running **Node.js Version 18** or strictly higher. Vite has fully deprecated older Node pipelines. Run `node -v` to check.

### Portfolio renders a blank "API Rate Limit Exceeded" screen
GitHub aggressively limits endpoints. Wait exactly 60 minutes for your IP address cache to clear, or connect your application to a Personal Access Token locally following the steps in the [Environment Variables](/documentation/environment) page.

### The CLI says "User not found"
Ensure your GitHub privacy settings have not been explicitly set to block API queries, and verify you haven't misspelled the handle. The Devfolio CLI checks the GitHub API validator before scaffolding to prevent building empty architectures.

### Changes to `tailwind.config.js` aren't appearing
If you drastically modified your Tailwind configuration, Vite's aggressive browser caching might not pick it up instantly. Stop the server using `Ctrl + C` and run:

```bash
npm run dev -- --force
```

### "ReferenceError: config is not defined"
If you manually updated your `src/config.js` following outdated tutorials, you might have tried to use a `config` object. Devfolio v1.0 uses direct exports. Ensure your file looks like this:
`export const GITHUB_USERNAME = "your-handle";`

> [!CAUTION]
> Manually modifying the variable names in the configuration file beyond just the string value will likely break the data-fetching hooks.

> [!INFO]
> Sticking encountering catastrophic bugs? You can always open a formal issue tightly outlining your console errors on our core structural repository!