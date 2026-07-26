/**
 * auth.js
 * -------
 * The ONLY file that knows how "logging in" actually happens.
 * The login button just calls loginWithDiscord() and doesn't care
 * that it's now a real redirect instead of the old demo stub.
 */

const DISCORD_CLIENT_ID = 'PASTE_YOUR_CLIENT_ID_HERE';
const DISCORD_REDIRECT_URI = 'https://hunnids-discord-bot.onrender.com/api/auth/discord/callback';

function loginWithDiscord() {
  const redirectUri = encodeURIComponent(DISCORD_REDIRECT_URI);
  window.location.href =
    `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}` +
    `&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
}

function logout() {
  localStorage.removeItem('hunnids_token');
  window.HunnidsDashboard.refreshProfileCard();
}

window.HunnidsAuth = { loginWithDiscord, logout };
