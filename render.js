/**
 * render.js
 * ---------
 * Draws the Welcome Card into #hunnids-welcome-card based on whatever
 * profile-data.js hands it. Knows nothing about auth or fetching —
 * this file shouldn't need to change when the backend swap happens.
 */

function renderLoginButton(container) {
  container.innerHTML = `
    <div class="welcome-card welcome-card--logged-out">
      <p class="welcome-card__prompt">Log in to see your profile, rank, and rep.</p>
      <button class="welcome-card__login-btn" onclick="window.HunnidsAuth.loginWithDiscord()">
        <i class="ti ti-brand-discord"></i> Log in with Discord
      </button>
    </div>
  `;
}

function renderWelcomeCard(container, profile) {
  const joinDate = new Date(profile.join_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  container.innerHTML = `
    <div class="welcome-card welcome-card--logged-in">
      <img class="welcome-card__avatar" src="${profile.avatar_url}" alt="${profile.username}'s avatar" />
      <div class="welcome-card__info">
        <h3 class="welcome-card__username">${profile.username}</h3>
        <p class="welcome-card__rank">Rank #${profile.rank}</p>
        <p class="welcome-card__rep">${profile.reputation.toLocaleString()} rep</p>
        <p class="welcome-card__joined">Joined ${joinDate}</p>
      </div>
      <button class="welcome-card__logout-btn" onclick="window.HunnidsAuth.logout()">
        Log out
      </button>
    </div>
  `;
}

async function refreshProfileCard() {
  const container = document.getElementById('hunnids-welcome-card');
  if (!container) return;

  const profile = await window.HunnidsProfileData.getProfile();
  if (profile) {
    renderWelcomeCard(container, profile);
  } else {
    renderLoginButton(container);
  }
}

window.HunnidsDashboard = window.HunnidsDashboard || {};
window.HunnidsDashboard.refreshProfileCard = refreshProfileCard;
