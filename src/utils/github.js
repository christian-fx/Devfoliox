const axios = require('axios');

async function validateUsername(username) {
    try {
        if (!username || typeof username !== 'string' || !username.trim()) {
            throw new Error('GitHub username is required and must be a non-empty string.');
        }
        const response = await axios.get(`https://api.github.com/users/${username}`);
        if (response.status !== 200) {
            throw new Error(`GitHub user "${username}" not found. Status code: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.status !== 404) {
            throw new Error(`Unable to validate GitHub username "${username}". Status code: ${error.response.status}`);
        }
        if (error.response && error.response.status === 404) {
            throw new Error(`GitHub user "${username}" not found.`);
        }
        throw new Error(`Could not reach GitHub API. Check your internet connection.`);
    }
}


// SHAPE OF RETURN DATA FROM GITHUB API FOR A USER FOR Y'ALL TO USE FOR THE TEMPLATES...
/* 
{
	login: 'GFrosh',
	id: 110903404,
	node_id: 'U_kgDOBpxAbA',
	avatar_url: 'https://avatars.githubusercontent.com/u/110903404?v=4',
	gravatar_id: '',
	url: 'https://api.github.com/users/GFrosh',
	html_url: 'https://github.com/GFrosh',
	followers_url: 'https://api.github.com/users/GFrosh/followers',
	following_url: 'https://api.github.com/users/GFrosh/following{/other_user}',
	gists_url: 'https://api.github.com/users/GFrosh/gists{/gist_id}',
	starred_url: 'https://api.github.com/users/GFrosh/starred{/owner}{/repo}',
	subscriptions_url: 'https://api.github.com/users/GFrosh/subscriptions',
	organizations_url: 'https://api.github.com/users/GFrosh/orgs',
	repos_url: 'https://api.github.com/users/GFrosh/repos',
	events_url: 'https://api.github.com/users/GFrosh/events{/privacy}',
	received_events_url: 'https://api.github.com/users/GFrosh/received_events',
	type: 'User',
	user_view_type: 'public',
	site_admin: false,
	name: 'Gideon Onyegbula',
	company: null,
	blog: 'https://portfolio-beta-ashy-57.vercel.app/',
	location: 'Lagos, Nigeria.',
	email: null,
	hireable: true,
	bio: 'FullStack Mobile & Web App Developer',
	twitter_username: null,
	public_repos: 23,
	public_gists: 0,
	followers: 17,
	following: 36,
	created_at: '2022-08-09T10:53:30Z',
	updated_at: '2026-03-29T20:58:04Z'
}
*/

module.exports = { validateUsername };
