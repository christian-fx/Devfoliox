const path = require('path');
const { validateUsername } = require('../utils/github');
const { scaffoldPortfolio } = require('../utils/scaffold');

async function generate(username, options = {}) {
    try {
        if (!username || typeof username !== 'string' || !username.trim()) {
            throw new Error('GitHub username is required and must be a non-empty string.');
        }
        if (!options.template) {
            throw new Error('Invalid template.');
        }


        const selectedTemplate = options.template || 'minimal';

        console.log(`Checking GitHub user: ${username}`);
        const user = await validateUsername(username);
        if (!user) {
            throw new Error(`GitHub user "${username}" not found.`);
        }
        console.log(`Found user: ${user.login}`);

        console.log(`Scaffolding Project, template: ${selectedTemplate}, stack: ${options.stack}`);
        const outputPath = await scaffoldPortfolio(user.login, selectedTemplate, options.stack);
        if (!outputPath) {
            throw new Error('Failed to scaffold portfolio.');
        }

        console.log('\nPortfolio generated successfully.');
        console.log(`Location: ${outputPath}`);
        console.log('\nNext steps:');
        console.log(`1. cd ${path.basename(outputPath)}`);
        console.log('2. npm install');
        console.log('3. npm run dev');
    } catch (error) {
        console.error('Error generating portfolio:', error.message);
        throw error;
    }
}

module.exports = generate;
