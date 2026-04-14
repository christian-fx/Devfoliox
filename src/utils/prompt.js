const { input, select } = require('@inquirer/prompts');


const runInteractiveGenerate = async () => {
    const username = await input({
        message: 'Enter your GitHub username:',
        validate: (input) => input.trim() ? true : 'GitHub username is required.'
    });
    const stack = await select({
        message: 'Choose a tech stack:',
        choices: ['Vanilla (HTML/CSS/JS)', 'React.js', 'Next.js'],
        default: 'React.js'
    });
    const template = await select({
        message: 'Choose a template:',
        choices: ['minimal', 'modern'],
        default: 'minimal'
    });

    // Guy see LOGIC: If they chose minimal, ask which version
    // if (template === 'minimal' && stack === 'React.js') {
    //     template = await select({
    //         message: 'Which minimal style would you like?',
    //         choices: [
    //             { name: 'Light (Classic Serif)', value: 'minimal' },
    //             { name: 'Dark (Modern Gold)', value: 'minimal-dark' }
    //         ],
    //         default: 'minimal'
    //     });
    // }
    return { username: username.trim(), template, stack };
}

module.exports = runInteractiveGenerate;
