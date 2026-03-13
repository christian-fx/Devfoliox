const { input, select } = require('@inquirer/prompts');


const runInteractiveGenerate = async () => {
    const username = await input({
        message: 'Enter your GitHub username:',
        validate: (input) => input.trim() ? true : 'GitHub username is required.'
    });
    const template = await select({
        message: 'Choose a template:',
        choices: ['minimal', 'modern'],
        default: 'minimal'
    });
    return { username: username.trim(), template };
}

module.exports = runInteractiveGenerate;
