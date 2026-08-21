const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

async function loadRepos() {
  const box = document.getElementById('repo-list');
  try {
    const response = await fetch('https://api.github.com/users/deepeshspatil/repos?sort=updated&per_page=6');
    if (!response.ok) throw new Error('GitHub API unavailable');
    const repos = await response.json();
    box.innerHTML = repos.map(repo => `
      <a class="repo" href="${repo.html_url}" target="_blank" rel="noreferrer">
        <b>${repo.name.replaceAll('-', ' ')}</b>
        <small>${repo.description || 'GitHub repository'} · ${repo.language || 'Code'} · ★ ${repo.stargazers_count}</small>
      </a>
    `).join('');
  } catch (error) {
    box.innerHTML = '<p class="loading">GitHub repositories are available on my profile ↗</p>';
  }
}
loadRepos();
