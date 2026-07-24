/**
 * continue-editing.js
 * --------------------
 * "Recently viewed", "recently downloaded", and "bookmarks" — all tracked
 * per-browser via localStorage. This never needs a backend, even in the
 * future: it's about what THIS browser looked at, not who's logged in.
 *
 * HOW TO WIRE THIS UP ON OTHER PAGES:
 * On your tutorial/plugin detail pages, call these when relevant:
 *   window.HunnidsContinueEditing.trackView('tutorial', 'guide-12', { title: 'HUNNIDS Guide 12: Shatter Rigs' });
 *   window.HunnidsContinueEditing.trackDownload('plugin', 'newton-4', { title: 'Newton 4' });
 *   window.HunnidsContinueEditing.toggleBookmark('tutorial', 'guide-12', { title: 'HUNNIDS Guide 12' });
 *
 * Each entry stores its own small "meta" object (title, thumbnail, etc.)
 * so the dashboard can render a card without needing to re-look-up the
 * full item — just pass whatever the card needs to display.
 */

const MAX_RECENT = 10;
const KEYS = {
  viewed: 'hunnids_recently_viewed',
  downloaded: 'hunnids_recently_downloaded',
  bookmarks: 'hunnids_bookmarks',
};

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

function isBookmarked(id) {
  return readList(KEYS.bookmarks).some((item) => item.id === id);
}

function toggleBookmark(type, id, meta) {
  const list = readList(KEYS.bookmarks);
  const idx = list.findIndex((item) => item.id === id);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.unshift({ type, id, meta, at: Date.now() });
  }
  writeList(KEYS.bookmarks, list);
  return !(idx >= 0); // returns new bookmarked state
}

function renderCard(item) {
  const title = item.meta?.title || item.id;
  return `
    <a class="ce-card" href="/${item.type}s/${item.id}">
      <span class="ce-card__type">${item.type}</span>
      <span class="ce-card__title">${title}</span>
    </a>
  `;
}

function renderSection(containerId, list, emptyMessage) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `<p class="ce-empty">${emptyMessage}</p>`;
    return;
  }

  container.innerHTML = list.map(renderCard).join('');
}

function refreshContinueEditing() {
  renderSection('hunnids-recently-viewed', readList(KEYS.viewed), 'Nothing viewed yet — go check out a tutorial!');
  renderSection('hunnids-recently-downloaded', readList(KEYS.downloaded), "You haven't downloaded any plugins yet.");
  renderSection('hunnids-bookmarks', readList(KEYS.bookmarks), 'No bookmarks yet — tap the bookmark icon on any resource.');
}

window.HunnidsContinueEditing = {
  trackView,
  trackDownload,
  toggleBookmark,
  isBookmarked,
  refreshContinueEditing,
};
