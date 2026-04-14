# Configuration

Devfoliox is designed to be a "Zero Config" tool. Out of the box, it requires absolutely no manual mapping. However, under the hood, Devfoliox generates a strict configuration file that powers the application.

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

# Customization & Styling

The ultimate magic of Devfoliox is that we enforce absolutely **zero vendor lock-in**. 

Once the CLI finishes generating your portfolio, you natively own every single file. The entire localized project is standard React and Tailwind CSS. You do not need to learn a proprietary "Devfoliox system".

## Global Color System

We built Devfoliox entirely on Tailwind utility classes mapped strictly to CSS Variables. To dramatically change your site's color scheme in 10 seconds, open your generated `index.css` file:

# Environment Variables

You **do not** strictly need any environment variables to run Devfoliox locally, nor do you need them in production for moderate traffic.