# Installation & Setup

Devfoliox is designed for two types of users: developers who just want to generate a portfolio, and contributors who want to help build the engine.

## 1. For General Users (Project Scaffolding)

If you just want to build your own portfolio, you do not need to install the core engine manually. Simply run the following in your terminal:

```bash
npx devfoliox init
```

The wizard will guide you through choosing your stack and template. No cloning is required.

---

## 2. For Contributors (Manual Installation)

If you want to contribute new templates or fix bugs in the core CLI, you can clone the source code and link it locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/christian-fx/devfoliox.git
   ```

2. **Install core dependencies:**
   ```bash
   cd devfoliox && npm install
   ```

3. **Link the CLI locally:**
   This allows you to test the `devfoliox` command globally while developing:
   ```bash
   npm link
   ```

Now you can run `devfoliox init` from any folder, and it will use your local modified source code.

> [!WARNING]
> Do not attempt to install Devfoliox into an existing application via `npm install devfoliox --save`. Devfoliox is a scaffolding tool designed to *generate* projects, not to run as a dependency inside them.