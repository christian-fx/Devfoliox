const CONFIG = {
    username: window.GITHUB_USERNAME || 'username',
    repo_limit: 6
};

async function initPortfolio() {
    try {
        const [user, repos] = await Promise.all([
            fetch(`https://api.github.com/users/${CONFIG.username}`).then(res => res.json()),
            fetch(`https://api.github.com/users/${CONFIG.username}/repos?sort=updated`).then(res => res.json())
        ]);

        if (!user || user.message) {
            throw new Error('Invalid GitHub user response');
        }

        const displayName = user.name || user.login || CONFIG.username;
        const username = user.login || CONFIG.username;
        const email = user.email || username + '@users.noreply.github.com';

        document.title = `${displayName} | Portfolio`;
        document.getElementById('nav-logo').innerText = username;
        document.getElementById('user-name').innerText = displayName;
        document.getElementById('footer-name').innerText = displayName;
        document.getElementById('user-bio').innerText = user.bio || 'A minimal portfolio powered by GitHub.';
        document.getElementById('repo-count').innerText = user.public_repos;
        document.getElementById('follower-count').innerText = user.followers;
        document.getElementById('following-count').innerText = user.following;

        const avatar = document.getElementById('user-avatar');
        avatar.src = user.avatar_url;
        avatar.alt = `${displayName} GitHub avatar`;

        const contactBtn = document.getElementById('contact-btn');
        contactBtn.href = `mailto:${email}`;

        const displayRepos = repos
            .filter(repo => !repo.fork)
            .slice(0, CONFIG.repo_limit);

        document.getElementById('project-grid').innerHTML = displayRepos.map(repo => `
            <article class="project-card">
                <div class="project-card-meta">${repo.language || 'Project'}</div>
                <h3>${repo.name.replace(/-/g, ' ')}</h3>
                <p>${repo.description || 'A focused project from the GitHub profile.'}</p>
                <a href="${repo.html_url}" target="_blank" rel="noreferrer" class="project-card-link">View repository →</a>
            </article>
        `).join('');
    } catch (error) {
        console.error('GitHub API failed:', error);
    }
}

initPortfolio();