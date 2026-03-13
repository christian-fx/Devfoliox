const axios = require('axios');

async function validateUsername(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error(`GitHub user "${username}" not found.`);
        }
        throw new Error(`Could not reach GitHub API. Check your internet connection.`);
    }
}

module.exports = { validateUsername };