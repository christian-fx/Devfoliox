const fs = require('fs-extra');
const path = require('path');

async function generateConfig(username, outputPath) {
    const configPath = path.join(outputPath, 'src', 'config.js');
    
    
    const fileContent = `export const GITHUB_USERNAME = ${JSON.stringify(username)};\n`;

    try {
        await fs.outputFile(configPath, fileContent);
        console.log('Config generated successfully!');
    } catch (err) {
        console.error('Error generating config:', err);
    }
}

module.exports = generateConfig;
