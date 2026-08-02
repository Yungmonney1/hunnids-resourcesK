/**
 * continue-editing.js
 * --------------------
 * "Recently viewed" and "recently downloaded" stay per-browser via
 * localStorage - genuinely no backend needed, ever, for those.
 *
 * "Bookmarks" now sync to the logged-in account (via the bot's
 * /api/bookmarks/* routes) so they follow you between devices. Logged-out
 * visitors still get bookmarks, just stored locally in that browser only,
 * same as before. The first time someone who already had local bookmarks
 * logs in, those get pushed up to their account once, then local storage
 * is cleared (server becomes the source of truth from then on).
 *
 * HOW TO WIRE THIS UP ON OTHER PAGES:
 *   window.HunnidsContinueEditing.trackView('tutorial', 'guide-12', { title: 'HUNNIDS Guide 12' });
 *   window.HunnidsContinueEditing.trackDownload('plugin', 'newton-4', { title: 'Newton 4' });
 *   window.HunnidsContinueEditing.toggleBookmarkButton(buttonEl, 'tutorial', 'guide-12', { title: '...', href: '...' });
 */

const BOOKMARKS_API = 'https://hunnids-discord-bot.onrender.com/api/bookmarks';
const CE_TOKEN_KEY = 'hunnids_token'; // same key profile-data.js uses
const LOCAL_BOOKMARKS_KEY = 'hunnids_bookmarks'; // legacy/guest-mode storage

const MAX_RECENT = 10;
const KEYS = {
  viewed: 'hunnids_recently_viewed',
  downloaded: 'hunnids_recently_downloaded',
};

let _bookmarksCache = []; // in-memory, so isBookmarked() can stay synchronous

function _getToken() {
  return localStorage.getItem(CE_TOKEN_KEY);
}

function readList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}

function pushRecent(key, type, id, meta) {
  let list = readList(key).filter((item) => item.id !== id);
  list.unshift({ type, id, meta, at: Date.now() });
  list = list.slice(0, MAX_RECENT);
  writeList(key, list);
}

function trackView(type, id, meta) {
  pushRecent(KEYS.viewed, type, id, meta);
}

function trackDownload(type, id, meta) {
  pushRecent(KEYS.downloaded, type, id, meta);
}

/**
 * Loads bookmarks once on page load - from the account if logged in
 * (migrating any pre-login local bookmarks up to the account first),
 * or from localStorage for guests. Call this once, early.
 */
async function initBookmarks() {
  const token = _getToken();

  if (!token) {
    _bookmarksCache = readList(LOCAL_BOOKMARKS_KEY);
    return;
  }

  try {
    const res = await fetch(`${BOOKMARKS_API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('bookmarks fetch failed');
    const data = await res.json();
    let serverBookmarks = data.bookmarks || [];

    const localBookmarks = readList(LOCAL_BOOKMARKS_KEY);
    const toMigrate = localBookmarks.filter(
      (local) => !serverBookmarks.some((server) => server.id === local.id)
    );

    for (const item of toMigrate) {
      try {
        const toggleRes = await fetch(`${BOOKMARKS_API}/toggle`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: item.type, id: item.id, meta: item.meta }),
        });
        const toggleData = await toggleRes.json();
        serverBookmarks = toggleData.bookmarks || serverBookmarks;
      } catch {
        // one bad migration entry shouldn't sink the rest
      }
    }
    if (toMigrate.length > 0) {
      localStorage.removeItem(LOCAL_BOOKMARKS_KEY);
    }

    _bookmarksCache = serverBookmarks;
  } catch (err) {
    console.warn('Could not load bookmarks from account, using local copy for now', err);
    _bookmarksCache = readList(LOCAL_BOOKMARKS_KEY);
  }

  refreshContinueEditing();
  _refreshAllBookmarkButtonsOnPage();
}

function isBookmarked(id) {
  return _bookmarksCache.some((item) => item.id === id);
}

/** Adds/removes a bookmark, syncing to the account if logged in, else localStorage. Returns the new bookmarked state (boolean). */
async function toggleBookmark(type, id, meta) {
  const token = _getToken();

  if (!token) {
    const idx = _bookmarksCache.findIndex((item) => item.id === id);
    if (idx >= 0) {
      _bookmarksCache.splice(idx, 1);
    } else {
      _bookmarksCache.unshift({ type, id, meta, at: Date.now() });
    }
    writeList(LOCAL_BOOKMARKS_KEY, _bookmarksCache);
    return idx < 0;
  }

  try {
    const res = await fetch(`${BOOKMARKS_API}/toggle`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id, meta }),
    });
    const data = await res.json();
    _bookmarksCache = data.bookmarks || _bookmarksCache;
    return !!data.bookmarked;
  } catch (err) {
    console.warn('Could not save bookmark', err);
    return isBookmarked(id); // unchanged, request failed
  }
}

async function toggleBookmarkAndRefresh(type, id, meta) {
  await toggleBookmark(type, id, meta);
  refreshContinueEditing();
}

// Used by the bookmark button drawn directly on guide/plugin/tutorial
// cards (not just inside the dashboard's Continue Editing lists).
// Updates the clicked button optimistically, then reconciles with
// whatever the server (or localStorage) actually ended up with.
async function toggleBookmarkButton(btnEl, type, id, meta) {
  const wasActive = btnEl.classList.contains('hunnids-bookmark-toggle--active');
  btnEl.textContent = wasActive ? '☆' : '★';
  btnEl.classList.toggle('hunnids-bookmark-toggle--active', !wasActive);

  const nowBookmarked = await toggleBookmark(type, id, meta);

  btnEl.textContent = nowBookmarked ? '★' : '☆';
  btnEl.classList.toggle('hunnids-bookmark-toggle--active', nowBookmarked);
  refreshContinueEditing();
}

// After bookmarks load from the account (which happens async, after the
// page's cards already rendered once), this corrects any bookmark button
// on the page that guessed wrong before the account data arrived.
function _refreshAllBookmarkButtonsOnPage() {
  document.querySelectorAll('[data-bookmark-id]').forEach((btn) => {
    const id = btn.getAttribute('data-bookmark-id');
    const active = isBookmarked(id);
    btn.textContent = active ? '★' : '☆';
    btn.classList.toggle('hunnids-bookmark-toggle--active', active);
  });
}

function renderCard(item) {
  const title = item.meta?.title || item.id;
  const href = item.meta?.href || '#';
  const filled = isBookmarked(item.id);
  return `
    <div class="ce-card">
      <a class="ce-card__link" href="${href}" target="_blank">
        <span class="ce-card__type">${item.type}</span>
        <span class="ce-card__title">${title}</span>
      </a>
      <button class="ce-bookmark-btn ${filled ? 'ce-bookmark-btn--active' : ''}"
        onclick="event.stopPropagation(); window.HunnidsContinueEditing.toggleBookmarkAndRefresh('${item.type}', '${item.id}', ${JSON.stringify(item.meta || {}).replace(/"/g, '&quot;')})">
        ${filled ? '★' : '☆'}
      </button>
    </div>
  `;
}

const EXPAND_THRESHOLD = 4;

function renderSection(containerId, list, emptyMessage) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<p class="ce-empty">${emptyMessage}</p>`;
    return;
  }

  // Preserve whatever expand/collapse state this section was already in
  // (e.g. if the user had it expanded, a re-render from a bookmark
  // toggle shouldn't snap it back closed).
  const wasExpanded = container.dataset.ceExpanded === '1';
  const overflowCount = list.length - EXPAND_THRESHOLD;
  const visibleList = wasExpanded ? list : list.slice(0, EXPAND_THRESHOLD);

  container.innerHTML = visibleList.map(renderCard).join('');

  const existingBtn = container.parentElement?.querySelector('.ce-expand-btn');
  if (existingBtn) existingBtn.remove();

  if (overflowCount > 0) {
    container.classList.toggle('ce-collapsed', !wasExpanded);
    const btn = document.createElement('button');
    btn.className = 'ce-expand-btn';
    btn.textContent = wasExpanded ? 'Show less' : `Show ${overflowCount} more`;
    btn.addEventListener('click', () => {
      container.dataset.ceExpanded = wasExpanded ? '' : '1';
      renderSection(containerId, list, emptyMessage);
    });
    container.insertAdjacentElement('afterend', btn);
  } else {
    container.classList.remove('ce-collapsed');
  }
}

function refreshContinueEditing() {
  renderSection('hunnids-recently-viewed', readList(KEYS.viewed), 'Nothing viewed yet — go check out a tutorial!');
  renderSection('hunnids-recently-downloaded', readList(KEYS.downloaded), "You haven't downloaded any plugins yet.");
  renderSection('hunnids-bookmarks', _bookmarksCache, 'No bookmarks yet — tap the bookmark icon on any resource.');
}

window.HunnidsContinueEditing = {
  trackView,
  trackDownload,
  initBookmarks,
  toggleBookmark,
  toggleBookmarkAndRefresh,
  toggleBookmarkButton,
  isBookmarked,
  refreshContinueEditing,
};
