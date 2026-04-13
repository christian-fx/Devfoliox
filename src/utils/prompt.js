const { input, select } = require('@inquirer/prompts');


const runInteractiveGenerate = async () => {
    const username = await input({
        message: 'Enter your GitHub username:',
        validate: (input) => input.trim() ? true : 'GitHub username is required.'
    });
    const stack = await select({
        message: 'Choose a tech stack:',
        choices: [
            { name: 'Vanilla (HTML/CSS/JS)', value: 'Vanilla' },
            { name: 'React.js', value: 'React.js' },
            { name: 'Next.js', value: 'Next.js' }
        ],
        default: 'React.js'
    });
    const template = await select({
        message: 'Choose a template:',
        choices: ['minimal', 'modern'],
        default: 'minimal'
    });
    return { username: username.trim(), template, stack };
}

module.exports = runInteractiveGenerate;
