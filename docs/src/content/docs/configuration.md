# Configuration

Devfolio is designed to be a "Zero Config" tool. Out of the box, it requires absolutely no manual mapping. However, under the hood, Devfolio generates a strict configuration file that powers the React application.

### The `config.js` File
Inside your generated portfolio, navigate to `src/config.js`. This acts as the centralized brain for your application's data.

```javascript
export const config = {
  githubUsername: "christian-fx",
  themeTemplate: "modern",
  fallbackAvatar: "/assets/default-avatar.png",
  socialLinks: {
    twitter: "https://twitter.com/christian-fx",
    linkedin: "https://linkedin.com/in/christian-fx"
  }
}
```

### Available Options

| Option | Type | Required | Description |
|---|---|---|---|
| `githubUsername` | string | Yes | The GitHub handle the API will target |
| `themeTemplate` | string | Yes | Internal reference for component mounting |
| `socialLinks` | object | No | Static overrides for links not found on GitHub |

> [!TIP]
> If you change your GitHub username later, you do not need to regenerate your portfolio! Simply update the `githubUsername` string in your `config.js` file and restart the development server.