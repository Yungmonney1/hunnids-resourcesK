/**
 * auth.js
 * -------
 * The ONLY file that knows how "logging in" actually happens.
 * The login button just calls loginWithDiscord() and doesn't care
 * whether that's a demo stub or a real Discord OAuth redirect.
 */

/**
 * TODO: BACKEND — replace this with the real redirect once the Flask
 * OAuth endpoint exists:
 *
 *   function loginWithDiscord() {
 *     const clientId = 'YOUR_DISCORD_CLIENT_ID';
 *     const redirectUri = encodeURIComponent('https://hunnids.cc/auth/callback');
 *     window.location.href =
 *       `https://discord.com/api/oauth2/authorize?client_id=${clientId}` +
 *       `&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
 *   }
 *
 * For now, this just fakes a login with placeholder data so you can
 * build and test the Welcome Card without the backend existing yet.
 */
function loginWithDiscord() {
  window.HunnidsProfileData.setDemoProfile({
    discord_id: '000000000000000000',
    username: 'hunnido',
    avatar_url: 'https://cdn.discordapp.com/embed/avatars/0.png',
    rank: 4,
    reputation: 1280,
    join_date: '2023-06-14',
  });
  window.HunnidsDashboard.refreshProfileCard();
}

/**
 * TODO: BACKEND — once real tokens exist, also do:
 *   localStorage.removeItem('hunnids_token');
 */
function logout() {
  window.HunnidsProfileData.clearDemoProfile();
  window.HunnidsDashboard.refreshProfileCard();
}

window.HunnidsAuth = { loginWithDiscord, logout };
