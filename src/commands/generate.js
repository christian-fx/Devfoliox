async function generate(username, options) {
    console.log(`Generating portfolio for: ${username}`);
    console.log(`Template: ${options.template || 'not specified yet'}`);
}

module.exports = generate;