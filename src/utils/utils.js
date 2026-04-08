const fs = require('fs-extra');
const path = require('path');

async function generateConfig(username, outputPath, stack) {
    let configPath;
    let fileContent;

    if (stack === 'Vanilla') {
        configPath = path.join(outputPath, 'js', 'config.js');
        fileContent = `window.GITHUB_USERNAME = ${JSON.stringify(username)};\n`;
    } else {
        // Default to React
        configPath = path.join(outputPath, 'src', 'config.js');
        fileContent = `export const GITHUB_USERNAME = ${JSON.stringify(username)};\n`;
    }

    try {
        await fs.outputFile(configPath, fileContent);
        console.log('Config generated successfully!');
    } catch (err) {
        console.error('Error generating config:', err);
    }
}

module.exports = generateConfig;
