# Troubleshooting

Running into issues? Here are the most common solutions to CLI and portfolio environment problems.

### Vite `npm run dev` immediately crashes
Ensure your native machine is running **Node.js Version 18** or strictly higher. Vite has fully deprecated older Node pipelines. Run `node -v` to check.

### Portfolio renders a blank "API Rate Limit Exceeded" screen
GitHub aggressively limits endpoints. Wait exactly 60 minutes for your IP address cache to clear, or connect your application to a Personal Access Token locally following the steps in the [Environment Variables](/documentation/environment) page.

### The CLI says "User not found"
Ensure your GitHub privacy settings have not been explicitly set to block API queries, and verify you haven't misspelled the handle. The Devfoliox CLI checks the GitHub API validator before scaffolding to prevent building empty architectures.

### Changes to `tailwind.config.js` aren't appearing
If you drastically modified your Tailwind configuration, Vite's aggressive browser caching might not pick it up instantly. Stop the server using `Ctrl + C` and run:

```bash
npm run dev -- --force
```

### "ReferenceError: config is not defined"
If you manually updated your `src/config.js` following outdated tutorials, you might have tried to use a `config` object. Devfoliox v1.0 uses direct exports. Ensure your file looks like this:
`export const GITHUB_USERNAME = "your-handle";`

> [!CAUTION]
> Manually modifying the variable names in the configuration file beyond just the string value will likely break the data-fetching hooks.

### WebSocket Connection Failed / 504 (Outdated Optimize Dep)
If you have multiple Devfoliox projects running (e.g., the Docs site and your portfolio) or if the browser cache is out of sync, Vite may fail to connect the HMR websocket.

**Solution:**
1. Stop all local servers (Docs and Portfolio) using `Ctrl + C`.
2. Clear the Vite cache in your portfolio folder:
   - **macOS / Linux:** `rm -rf node_modules/.vite`
   - **Windows (PowerShell):** `Remove-Item -Recurse -Force node_modules/.vite`
3. Restart the server with a clean force re-optimization:
   ```bash
   npm run dev -- --force
   ```

> [!INFO]
> Sticking encountering catastrophic bugs? You can always open a formal issue tightly outlining your console errors on our core structural repository!