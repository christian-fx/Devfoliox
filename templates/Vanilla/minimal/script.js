const CONFIG = {
    username: window.GITHUB_USERNAME || 'christian-fx', // Local fallback
    repo_limit: 6
};

const ICON_MAP = {
    'JavaScript': 'logos:javascript',
    'TypeScript': 'logos:typescript-icon',
    'Python': 'logos:python',
    'HTML': 'logos:html-5',
    'CSS': 'logos:css-3',
    'C++': 'logos:c-plusplus',
    'C#': 'logos:c-sharp',
    'Java': 'logos:java',
    'PHP': 'logos:php',
    'Ruby': 'logos:ruby',
    'Swift': 'logos:swift',
    'Go': 'logos:go',
    'Rust': 'logos:rust',
    'Dart': 'logos:dart',
    'Shell': 'logos:bash-icon',
    'Vue': 'logos:vue',
    'React': 'logos:react',
    'Svelte': 'logos:svelte-icon'
};

async function initPortfolio() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    try {
        // Fetch User Data
        const user = await fetch(`https://api.github.com/users/${CONFIG.username}`).then(res => res.json());
        if (!user || user.message === 'Not Found') throw new Error('Invalid GitHub user');

        // Fetch All Repositories (handling pagination)
        let repos = [];
        let page = 1;
        let fetchMore = true;

        while (fetchMore && page <= 10) { // Limit to 1000 repos for safety
            const pageRepos = await fetch(`https://api.github.com/users/${CONFIG.username}/repos?sort=updated&per_page=100&page=${page}`).then(res => res.json());
            if (pageRepos.length === 0) {
                fetchMore = false;
            } else {
                repos = [...repos, ...pageRepos];
                if (pageRepos.length < 100) fetchMore = false;
                page++;
            }
        }

        // 1. Populate Hero & Header
        const displayName = user.name || user.login;
        const initials = displayName.split(' ').map(n => n[0]).join('.');
        
        document.title = `${displayName} | Portfolio`;
        
        // Populate names
        document.querySelectorAll('.full-name').forEach(el => el.innerText = displayName);
        document.querySelectorAll('.abbr-name').forEach(el => el.innerText = initials + (initials.includes('.') ? '' : '.'));
        
        document.getElementById('user-name').innerText = displayName;
        document.getElementById('user-bio').innerText = user.bio || 'Architecting digital experiences.';
        document.getElementById('user-avatar').src = user.avatar_url;

        // 2. Populate Meta Links
        const metaLinks = document.getElementById('meta-links');
        const links = [
            { icon: 'lucide:map-pin', text: user.location || 'Distributed' },
            { icon: 'lucide:github', text: `github.com/${user.login}`, url: user.html_url },
            { icon: 'lucide:link', text: user.blog ? user.blog.replace(/https?:\/\//, '') : 'portfolio.dev', url: user.blog }
        ];

        metaLinks.innerHTML = links.map(link => `
            <${link.url ? 'a href="' + link.url + '" target="_blank"' : 'div'} class="meta-link">
                <iconify-icon icon="${link.icon}"></iconify-icon>
                ${link.text}
            </${link.url ? 'a' : 'div'}>
        `).join('');

        // 3. Populate Tech Stack (Calculated from ALL Repo Languages)
        const languageStats = {};
        let totalSize = 0;
        
        repos.forEach(repo => {
            if (repo.language) {
                languageStats[repo.language] = (languageStats[repo.language] || 0) + (repo.size || 1);
                totalSize += (repo.size || 1);
            }
        });

        const sortedLanguages = Object.entries(languageStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4);

        const stackContainer = document.getElementById('stack-container');
        stackContainer.innerHTML = sortedLanguages.map(([lang, size], index) => {
            const percent = Math.round((size / totalSize) * 100);
            const icon = ICON_MAP[lang] || 'lucide:code-2';
            return `
                <div class="stack-item">
                    <div class="stack-top">
                        <div class="stack-name">
                            <iconify-icon icon="${icon}"></iconify-icon>
                            ${lang}
                        </div>
                        <div class="stack-percent">${percent}%</div>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: 0%;" data-percent="${percent}"></div>
                    </div>
                </div>
            `;
        }).join('');

        // 4. Populate Repositories & Filters
        const displayRepos = repos
            .filter(repo => !repo.fork)
            .slice(0, CONFIG.repo_limit);

        const languages = ['All', ...new Set(displayRepos.map(r => r.language).filter(Boolean))];
        const filterContainer = document.getElementById('repo-filters');
        
        filterContainer.innerHTML = languages.map(lang => `
            <button class="filter-btn ${lang === 'All' ? 'active' : ''}" data-lang="${lang}">
                ${lang}
            </button>
        `).join('');

        const repoList = document.getElementById('project-list');
        renderRepos(displayRepos, repoList);

        // Filter Logic
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const selectedLang = e.target.dataset.lang;
                
                // Update buttons
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                // Filter data
                const filtered = selectedLang === 'All' 
                    ? displayRepos 
                    : displayRepos.filter(r => r.language === selectedLang);
                
                renderRepos(filtered, repoList);
            }
        });

        // CTA & Footer
        document.getElementById('contact-link').href = `mailto:${user.email || user.login + '@users.noreply.github.com'}`;
        document.getElementById('view-more-github').href = user.html_url + '?tab=repositories';
        document.getElementById('footer-copyright').innerText = `© ${new Date().getFullYear()} ${displayName}.`;
        
        // Social Fallbacks
        document.getElementById('footer-twitter').href = user.twitter_username ? `https://twitter/${user.twitter_username}` : '#';
        document.getElementById('footer-github').href = user.html_url;
        document.getElementById('footer-linkedin').href = '#';

        // Animate progress bars after rendering
        setTimeout(() => {
            document.querySelectorAll('.progress-fill').forEach(fill => {
                fill.style.width = fill.dataset.percent + '%';
            });
        }, 100);

        // Mobile Menu Logic
        const menuToggle = document.getElementById('menu-toggle');
        const closeMenu = document.getElementById('close-menu');
        const overlay = document.getElementById('mobile-overlay');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        const toggleMenu = () => {
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };

        menuToggle.addEventListener('click', toggleMenu);
        closeMenu.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    } catch (error) {
        console.error('Portfolio initialization failed:', error);
    } finally {
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }
}

function renderRepos(repos, container) {
    container.innerHTML = repos.map(repo => `
        <a href="${repo.html_url}" target="_blank" class="repo-item">
            <div class="repo-header">
                <div class="repo-name">${repo.name.replace(/-/g, ' ')}</div>
                <div class="repo-badge">Public</div>
            </div>
            ${repo.description ? `<p class="repo-desc">${repo.description}</p>` : ''}
            <div class="repo-meta">
                ${repo.language ? `
                    <div class="repo-stat">
                        <iconify-icon icon="lucide:code-2"></iconify-icon>
                        ${repo.language}
                    </div>
                ` : ''}
                <div class="repo-stat">
                    <iconify-icon icon="lucide:star"></iconify-icon>
                    ${repo.stargazers_count}
                </div>
                <div class="repo-stat">
                    <iconify-icon icon="lucide:git-fork"></iconify-icon>
                    ${repo.forks_count}
                </div>
            </div>
        </a>
    `).join('');
}

initPortfolio();
