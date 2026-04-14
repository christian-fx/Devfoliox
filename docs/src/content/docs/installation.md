# Installation

> [!IMPORTANT]
> **Devfolio is currently in early access.** We haven't published the package to the official npm registry yet (Coming Soon). For now, please clone the repository and run the CLI tool locally using the steps below.

## Cloning the Repository

To use Devfolio, you need to clone the repository to your machine, install dependencies, and then run the CLI script directly.

1. **Clone the repo:**
   ```bash
   git clone https://github.com/christian-fx/Devfolio.git
   ```

2. **Navigate to the directory:**
   ```bash
   cd Devfolio
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the CLI

Once dependencies are installed, you can invoke the Devfolio initialization wizard by running:

```bash
npx devfolio init
```

## Global Link (Alternative)

If you want to use the `devfolio` command from anywhere on your system without typing the full path to the script, you can link the package locally:

```bash
npm link
```

Once linked, you can run `devfolio init` in any directory.

> [!WARNING]
> Do not attempt to install Devfolio into an existing application via `npm install devfolio --save`. Devfolio is a scaffolding tool designed to *generate* projects, not to run as a dependency inside them.