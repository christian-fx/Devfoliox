# Command Options

When executing Devfoliox commands inside terminal scripts or CI pipelines, you can chain multiple configuration flags.

## Usage

These flags can be appended to almost any Devfoliox command.

| Option | Shorthand | Description |
| :--- | :--- | :--- |
| `--help` | `-h` | Display help for the current command |
| `--version` | `-v` | Outputs the current Devfoliox software version |
| `--stack <name>` | `-s` | Defines the underlying tech stack (Accepts: `React.js`, `Vanilla`, `Next.js`) |
| `--template <name>` | `-t` | Defines the visual template (Accepts: `minimal`, `modern`) |
| `--force` | `-f` | Force overwrite an existing project directory |
| `--no-install` | `-n` | Skip the automatic `npm install` post-scaffold |

## Complex Scenario Example

Running a headless, forced generation for a Next.js modern portfolio:

```bash
npx devfoliox generate christian-fx -t modern -s Next.js -f -n
```