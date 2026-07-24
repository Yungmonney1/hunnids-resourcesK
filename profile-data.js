/**
 * profile-data.js
 * ----------------
 * The ONLY file in the dashboard that knows *how* profile data is obtained.
 * Everything else (render.js, auth.js) just calls getProfile() and doesn't
 * care whether the answer came from localStorage demo data or a real API.
 *
 * THE CONTRACT — this exact shape is what your future Flask endpoint
 * (/api/profile/me) and your future bot /profile command should both
 * return. Lock this in now so nothing downstream has to change later.
 *
 * {
 *   discord_id: string,
 *   username: string,
 *   avatar_url: string,
 *   rank: number,
 *   reputation: number,
 *   join_date: string   // ISO date, e.g. "2023-06-14"
 * }
 */

const DEMO_STORAGE_KEY = 'hunnids_demo_profile';

/**
 * Returns a profile object, or null if nobody is "logged in".
 * TODO: BACKEND — replace the body of this function with:
 *
 *   const token = localStorage.getItem('hunnids_token');
 *   if (!token) return null;
 *   const res = await fetch('https://hunnids-discord-bot.onrender.com/api/profile/me', {
 *     headers: { Authorization: `Bearer ${token}` }
 *   });
 *   // same Render app that already serves /api/events for the Challenge Card
 *   if (res.status === 401) {
 *     localStorage.removeItem('hunnids_token');
 *     return null;
 *   }
 *   return await res.json();
 *
 * Nothing calling getProfile() needs to change when you do this swap.
 */
async function getProfile() {
  const raw = localStorage.getItem(DEMO_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Corrupt demo profile data, clearing it', err);
    localStorage.removeItem(DEMO_STORAGE_KEY);
    return null;
  }
}

/**
 * Demo-only helper — simulates "logging in" by writing a fake profile
 * to localStorage so you can build/test the Welcome Card before the
 * real Discord OAuth + Flask backend exists.
 * Delete this function (and its one call site in auth.js) once the
 * real backend is live.
 */
function setDemoProfile(profile) {
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(profile));
}

function clearDemoProfile() {
  localStorage.removeItem(DEMO_STORAGE_KEY);
}

window.HunnidsProfileData = { getProfile, setDemoProfile, clearDemoProfile };
