const { program } = require('commander');
const runInteractiveGenerate = require('./utils/prompt');
const runGenerate = require('./utils/execute');

program
    .name('devfolio')
    .description('Generate a developer portfolio from your GitHub profile')
    .version('1.0.0');



// INTERACTIVE SETUP
program
    .command('setup')
    .description('Run interactive setup to generate a portfolio')
    .action(async () => {
        const { username, template } = await runInteractiveGenerate();
        await runGenerate(username, { template });
    });



// ONE-LINER FOR NON-INTERACTIVE USAGE (eg: npx devfolio generate <username> --template modern)
program
    .command('generate')
    .description('Generate a portfolio for the given GitHub username in one command')
    .argument('<username>', 'GitHub username to generate portfolio for')
    .option('-t, --template <template>', 'Template to use (modern | minimal)', 'minimal')
    .action(async (username, options) => {
        await runGenerate(username, options);
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
