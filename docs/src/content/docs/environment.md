# Environment Variables

You **do not** strictly need any environment variables to run Devfoliox locally, nor do you need them in production for moderate traffic.

However, to bypass GitHub's 60-request-per-hour Rate Limit on popular portfolios, you can inject a Personal Access Token backing your API requests.

## Setting Up Your Token

1. Go to your **GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic)**.
2. Generate a new token. **It requires ZERO scopes (no checkboxes clicked) since we are only reading public data.**
3. Copy the token string.

## Injecting the Token Locally

Create a `.env` file in the root of your generated portfolio directory.

```env
# .env
VITE_GITHUB_TOKEN=ghp_your_secure_token_sequence_here
```

Now, automatically restart your `npm run dev` server. The `useGitHub.js` hook is natively programmed to detect `import.meta.env.VITE_GITHUB_TOKEN` and will attach an Authorization Header to all traffic, securely boosting your rate limit to **5,000 requests per hour!**

> [!WARNING]
> Because Vite embeds `VITE_` prefixed variables into your client side bundle, your token *will* be visible to technical users inspecting your site. This is exactly why you strictly must never assign any scopes or write-permissions to this specific token.