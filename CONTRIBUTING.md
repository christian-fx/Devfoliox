# Contributing to Devfoliox

First off, thank you for considering contributing to Devfoliox! Whether you are submitting a new template architecture, fixing a bug in the CLI, or refining the documentation, your help is incredibly appreciated.

## Branching Rules & Workflow

To maintain a highly stable core engine, we enforce a strict branching strategy.

1. **Never commit directly to `main`**. All development must occur on isolated branches.
2. **Fork and Clone**: Fork the repository to your own GitHub account and clone it locally.
3. **Create a Feature Branch**: Branch off the latest `main` using standard naming conventions:
   - `feat/your-feature-name` (e.g., `feat/add-vue-template`)
   - `fix/your-bug-fix` (e.g., `fix/github-api-timeout`)
   - `docs/your-docs-update` (e.g., `docs/update-showcase-readme`)

## Coding Standards

Devfoliox templates and the core CLI engine rely on clean, modern JavaScript. Ensure your contributions adhere to the following constraints:
- **Syntax**: Use modern ES6+ features across the board.
- **Frontend Templates**: If submitting a new portfolio template, construct it utilizing functional React/Next.js components and **Tailwind CSS**. Avoid arbitrary inline CSS unless dynamically bound to state or physics (like `IntersectionObserver`).
- **Formatting & Linting**: Ensure your code passes standard ESLint requirements and builds successfully locally (`npm run build`) before pushing.

## Creating a New Template

If you are adding a new portfolio template to the Devfoliox generator:
1. Construct the template logic flawlessly inside the `templates/` directory.
2. Ensure it maps exactly to the `src/config.js` data pipeline utilized by existing templates.
3. Update the Documentation UI (`docs/src/data/templatesData.js`) to showcase the new template.

## Pull Requests (PRs) & Code Reviews

When you are ready to merge your work back into the Devfoliox ecosystem:

1. **Open a PR**: Point your feature branch PR toward the `main` branch (or `docs` branch if editing the documentation SPA).
2. **Contextualize**: Describe precisely what changes were made. If you built a new template or altered UI layouts, **attach screenshots** or recordings demonstrating the layout.
3. **Code Review**: A maintainer will manually review the pull request to ensure it adheres to safety protocols and styling constraints. 
4. **Merge**: Once approved, your PR will be successfully squashed and merged upstream to keep the commit timeline perfectly clean.
