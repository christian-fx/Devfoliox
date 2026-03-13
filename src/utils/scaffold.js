const fs = require('fs-extra');
const path = require('path');

async function scaffoldPortfolio(username, template) {
    const templatePath = path.join(__dirname, '../../templates/react', template);
    const outputPath = path.join(process.cwd(), `portfolio-${username}`);

    // Check template exists
    if (!await fs.pathExists(templatePath)) {
        throw new Error(`Template "${template}" not found.`);
    }

    // Check output folder doesn't already exist
    if (await fs.pathExists(outputPath)) {
        throw new Error(`Folder "portfolio-${username}" already exists.`);
    }

    // Copy template to destination
    await fs.copy(templatePath, outputPath);

    // Inject username into config.js
    const configPath = path.join(outputPath, 'src', 'config.js');
    const configContent = `export const GITHUB_USERNAME = "${username}";\n`;
    await fs.outputFile(configPath, configContent);

    return outputPath;
}

module.exports = { scaffoldPortfolio };
