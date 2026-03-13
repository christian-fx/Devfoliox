const generate = require('../commands/generate');

const runGenerate = async (username, options = {}) => {
    await generate(username, options);
};

module.exports = runGenerate;
