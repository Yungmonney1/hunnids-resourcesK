/**
 * profile-data.js
 * ----------------
 * The ONLY file that knows *how* profile data is obtained. Real backend
 * now wired up - reads a JWT from localStorage (put there by
 * captureOAuthToken() below, right after Discord's OAuth redirect lands)
 * and calls the actual Flask API for rank/rep/join date.
 *
 * THE CONTRACT - this is what /api/profile/me on the bot's Render app
 * returns, matching what render.js expects:
 * {
 *   discord_id: string,
 *   username: string,
 *   avatar_url: string,
 *   rank: number | null,
 *   reputation: number,
 *   join_date: string | null   // ISO date, or null if lookup failed
 * }
 */

const PROFILE_API = 'https://hunnids-discord-bot.onrender.com/api/profile/me';
const TOKEN_KEY = 'hunnids_token';

/**
 * Called once on every page load (see dashboard-init.js). If Discord's
 * OAuth redirect just landed with ?token=... in the URL, stash it in
 * localStorage and strip it from the URL so it doesn't stay bookmarked
 * or shared accidentally.
 */
function captureOAuthToken() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (!token) return;

  localStorage.setItem(TOKEN_KEY, token);

  params.delete('token');
  params.delete('auth_error');
  const cleanUrl = window.location.pathname + (params.toString() ? `?${params}` : '');
  window.history.replaceState({}, '', cleanUrl);
}

/**
 * Returns a profile object, or null if nobody is logged in / the token
 * is invalid or expired.
 */
async function getProfile() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const res = await fetch(PROFILE_API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.warn('Could not reach profile API', err);
    return null;
  }
}

window.HunnidsProfileData = { getProfile, captureOAuthToken };
