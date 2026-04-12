# Commands

The Devfolio CLI is designed to be highly intuitive. It provides both an interactive guided wizard for beginners and a robust suite of parameterized commands for power users and CI/CD environments.

## The Interactive Wizard (Default)

Running Devfolio without any arguments boots up the prompt-driven wizard.

```bash
npx devfolio
```

**Wizard Flow:**
1. **GitHub Prompt:** `? What is your GitHub username? (e.g., christian-fx)`
2. **Template Prompt:** `? Which template would you like to use? [Minimal / Modern]`
3. **Confirmation:** `? Scaffold portfolio in ./portfolio-[username]? (Y/n)`

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

**Bypass collision warnings (Force Overwrite):**
If a directory with that name already exists, Devfolio safely aborts. You can override this behavior using force.
```bash
npx devfolio generate your-github-handle --force
```

> [!INFO]
> If you omit the template flag during the `generate` command, Devfolio will automatically default to the **minimal** template profile in the background.