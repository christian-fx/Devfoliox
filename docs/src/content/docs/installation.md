# Installation

Because Devfolio executes as an NPX command runner, you generally do not need to install it locally. Running `npx devfolio` guarantees you are always executing the latest iteration.

## Global Installation (Alternative)
If you are generating portfolios frequently or operating in an offline/cached environment, you might prefer installing Devfolio globally on your machine.

```bash
npm install -g devfolio
```

Once installed globally, you no longer need the `npx` prefix. You can invoke the tool natively from anywhere:

```bash
devfolio
```

## Upgrading

If you installed Devfolio globally and wish to grab the newest templates and features, simply run:

```bash
npm update -g devfolio
```

> [!WARNING]
> Do not attempt to install Devfolio locally into an existing application via `npm install devfolio --save`. Devfolio is a scaffolding tool designed to *generate* projects, not to run as a dependency inside them.