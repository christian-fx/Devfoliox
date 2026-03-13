const { program } = require('commander');

program
    .name('devfolio')
    .description('Generate a developer portfolio from your GitHub profile')
    .version('1.0.0');

program
    .command('generate <username>')
    .description('Generate a portfolio for a GitHub username')
    .option('-t, --template <template>', 'Template to use (modern | minimal)')
    .action((username, options) => {
        const generate = require('./commands/generate');
        generate(username, options);
    });

program.parse();