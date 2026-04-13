# Options & Flags

When executing Devfolio commands inside terminal scripts or CI pipelines, you can chain multiple configuration flags.

## Global Flags

These flags can be appended to almost any Devfolio command.

| Flag | Shorthand | Description |
|---|---|---|
| `--help` | `-h` | Prints out the help manual and exits the program |
| `--version` | `-v` | Outputs the current Devfolio software version |
| `--template <name>` | `-t` | Dictates the architectural layout (Accepts: `minimal`, `modern`) |
| `--stack <name>` | `-s` | Defines the underlying tech stack (Accepts: `React.js`, `Vanilla`, `Next.js`) |
| `--force` | `-f` | Force-overwrites heavily populated directories without asking |
| `--no-install` | `-n` | Scaffolds the files but skips the `npm install` phase entirely |

## Example Usage

Combining flags to create a deeply automated scaffolding script that skips NPM installations to save execution time:

```bash
npx devfolio generate christian-fx -t modern -f -n
```