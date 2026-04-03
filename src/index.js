const { program } = require('commander');
const runInteractiveGenerate = require('./utils/prompt');
const runGenerate = require('./utils/execute');

program
    .name('devfolio')
    .description('Generate a developer portfolio from your GitHub profile')
    .version('1.0.0');



// INTERACTIVE SETUP
program
    .command('init')
    .description('Run interactive setup to generate a portfolio')
    .action(async () => {
        const { username, template, stack } = await runInteractiveGenerate();
        await runGenerate(username, { template, stack });
    });



// ONE-LINER FOR NON-INTERACTIVE USAGE (eg: npx devfolio generate <username> -t <template> -s <stack>)
program
    .command('generate')
    .description('Generate a portfolio for the given GitHub username in a one-line command')
    .argument('<username>', 'GitHub username to generate portfolio for')
    .option('-s, --stack <stack>', 'Stack to use (Vanilla, React.js, or Next.js)', 'React.js')
    .option('-t, --template <template>', 'Template to use (minimal or modern)', 'minimal')
    .action(async (username, options) => {
        await runGenerate(username, { template: options.template, stack: options.stack });
    });


program
    .command('list-templates')
    .description('List available portfolio templates')
    .action(() => {
        console.log('Available templates:');
        console.log('1. minimal - A clean and simple portfolio template');
        console.log('2. modern - A sleek and stylish portfolio template');
    });


program.parseAsync().catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
});
