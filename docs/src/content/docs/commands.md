# Commands

The Devfoliox CLI is designed to be highly intuitive. It provides both an interactive guided wizard for beginners and a robust suite of parameterized commands for power users and CI/CD environments.

## The Interactive Wizard

Running the `init` command boots up the prompt-driven wizard. This is the recommended way for new users to scaffold their first portfolio.

```bash
npx devfoliox init
```

**Wizard Flow:**
1. **GitHub Prompt:** `? What is your GitHub username? (e.g., christian-fx)`
2. **Stack Prompt:** `? Choose a tech stack: [Vanilla / React / Next.js]`
3. **Template Prompt:** `? Which template would you like to use? [Minimal / Modern]`

## Command Discovery & Help

Running Devfoliox without any subcommands (or using the `--help` flag) displays the help manual, which lists all available commands and global options.

```bash
npx devfoliox --help
```

## The `generate` Command

If you want to completely bypass the interactive prompts (useful for rapid scaffolding or automated bash scripts), use the direct `generate` operator.

```bash
npx devfoliox generate <username> [options]
```

### Practical Examples

**Standard generation:**
```bash
npx devfoliox generate your-github-handle
```

**Generation with specific strict templates:**
```bash
npx devfoliox generate your-github-handle --template modern
```

**Force an overwrite of an existing project:**
```bash
npx devfoliox generate your-github-handle --force
```

**Generate with specific stack and template:**
```bash
npx devfoliox generate your-github-handle --stack Next.js --template modern
```

## The `list-templates` Command

Use this command to quickly see all available portfolio templates before running an initialization.

```bash
npx devfoliox list-templates
```

> [!INFO]
> If you omit the template flag during the `generate` command, Devfoliox will automatically default to the **minimal** template profile in the background.