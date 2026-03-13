const fs = require('fs-extra');
const path = require('path');
const generateConfig = require('./utils');

async function scaffoldPortfolio(username, template) {
    const templatePath = path.join(__dirname, '../../templates/react', template);
    const outputPath = path.join(process.cwd(), `portfolio-${username}`);

    if (!fs.pathExistsSync(templatePath)) {
        throw new Error(`Template "${template}" not found.`);
    }

    if (fs.pathExistsSync(outputPath)) {
        fs.rmSync(outputPath, { recursive: true });
    }
    fs.mkdirSync(outputPath, { recursive: true });

    await fs.copy(templatePath, outputPath);

    await generateConfig(username, outputPath);
    return outputPath;
}

module.exports = { scaffoldPortfolio };
