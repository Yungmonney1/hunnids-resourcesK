/**
 * render.js
 * ---------
 * Draws the compact nav profile into #hunnids-nav-profile based on
 * whatever profile-data.js hands it. Knows nothing about auth or
 * fetching - this file shouldn't need to change when the backend swap
 * happens.
 *
 * Logged out: small pill button matching the other nav tabs.
 * Logged in: avatar + username; click it to open a small dropdown
 * with rank/rep/join date and a log out button.
 */

function renderLoginButton(container) {
  container.innerHTML = `
    <button class="nav-profile__login-btn" onclick="window.HunnidsAuth.loginWithDiscord()">
      Log in with Discord
    </button>
  `;
}

function renderProfile(container, profile) {
  const joinDate = new Date(profile.join_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const roles = profile.roles || [];
  const rolesHTML = roles.length
    ? `<div class="nav-profile__roles">${roles
        .map((r) => `<span class="nav-profile__role-pill" style="${r.color ? `background:${r.color}22;color:${r.color};border-color:${r.color}55;` : ''}">${r.name}</span>`)
        .join('')}</div>`
    : '';

  container.innerHTML = `
    <div class="nav-profile__wrap">
      <button class="nav-profile__trigger" onclick="window.HunnidsDashboard.toggleNavDropdown()">
        <img class="nav-profile__avatar" src="${profile.avatar_url}" alt="${profile.username}'s avatar" />
        <span class="nav-profile__username">${profile.username}</span>
      </button>
      <div class="nav-profile__dropdown" id="nav-profile-dropdown">
        <div class="nav-profile__rank">Rank #${profile.rank}</div>
        <div class="nav-profile__rep">${profile.reputation.toLocaleString()} rep</div>
        <div class="nav-profile__joined">Joined ${joinDate}</div>
        ${rolesHTML}
        <button class="nav-profile__logout-btn" onclick="window.HunnidsAuth.logout()">Log out</button>
      </div>
    </div>
  `;
}

function toggleNavDropdown() {
  const dropdown = document.getElementById('nav-profile-dropdown');
  if (!dropdown) return;
  dropdown.classList.toggle('nav-profile__dropdown--open');
}

// Close the dropdown when clicking anywhere outside it
document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.nav-profile__wrap');
  const dropdown = document.getElementById('nav-profile-dropdown');
  if (!wrap || !dropdown) return;
  if (!wrap.contains(e.target)) {
    dropdown.classList.remove('nav-profile__dropdown--open');
  }
});

async function refreshProfileCard() {
  const container = document.getElementById('hunnids-nav-profile');
  if (!container) return;

  const profile = await window.HunnidsProfileData.getProfile();
  if (profile) {
    renderProfile(container, profile);
  } else {
    renderLoginButton(container);
  }
}

window.HunnidsDashboard = window.HunnidsDashboard || {};
window.HunnidsDashboard.refreshProfileCard = refreshProfileCard;
window.HunnidsDashboard.toggleNavDropdown = toggleNavDropdown;
