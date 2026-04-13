# Commands

The Devfolio CLI is designed to be highly intuitive. It provides both an interactive guided wizard for beginners and a robust suite of parameterized commands for power users and CI/CD environments.

## The Interactive Wizard

Running the `init` command boots up the prompt-driven wizard. This is the recommended way for new users to scaffold their first portfolio.

```bash
npx devfolio init
```

**Wizard Flow:**
1. **GitHub Prompt:** `? What is your GitHub username? (e.g., christian-fx)`
2. **Stack Prompt:** `? Choose a tech stack: [Vanilla / React / Next.js]`
3. **Template Prompt:** `? Which template would you like to use? [Minimal / Modern]`

## Command Discovery & Help

Running Devfolio without any subcommands (or using the `--help` flag) displays the help manual, which lists all available commands and global options.

```bash
npx devfolio --help
```

## The `generate` Command

If you want to completely bypass the interactive prompts (useful for rapid scaffolding or automated bash scripts), use the direct `generate` operator.

```bash
npx devfolio generate <username> [options]
```

### Practical Examples

**Standard generation:**
```bash
npx devfolio generate your-github-handle
```

**Generation with specific strict templates:**
```bash
npx devfolio generate your-github-handle --template modern
```

npx devfolio generate your-github-handle --force
```

## The `list-templates` Command

Use this command to quickly see all available portfolio templates before running an initialization.

```bash
npx devfolio list-templates
```

> [!INFO]
> If you omit the template flag during the `generate` command, Devfolio will automatically default to the **minimal** template profile in the background.