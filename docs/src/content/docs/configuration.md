# Configuration

Devfolio is designed to be a "Zero Config" tool. Out of the box, it requires absolutely no manual mapping. However, under the hood, Devfolio generates a strict configuration file that powers the application.

### The `config.js` File

Inside your generated portfolio, navigate to `src/config.js` (React/Next.js) or `js/config.js` (Vanilla). This acts as the centralized brain for your application's data.

**For React / Next.js:**
```javascript
export const GITHUB_USERNAME = "christian-fx";
```

**For Vanilla JS:**
```javascript
window.GITHUB_USERNAME = "christian-fx";
```

### Manual Configuration

While the CLI handles this for you, you can manually update the `GITHUB_USERNAME` string at any time to point your portfolio to a different account.

| Stack | Variable Location | Global Name | Description |
| :--- | :--- | :--- | :--- |
| **React** | `src/config.js` | `GITHUB_USERNAME` | The exported string constant |
| **Vanilla** | `js/config.js` | `window.GITHUB_USERNAME` | Attached to the global window object |

> [!IMPORTANT]
> If you change your GitHub username later, you do not need to regenerate your portfolio! Simply update the configuration file and restart the development server.