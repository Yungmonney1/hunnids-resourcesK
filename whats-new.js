/**
 * whats-new.js
 * ------------
 * Pulls the newest guides and plugins straight from the globals your
 * site already loads (guides.js / resources.js define `guides` and
 * `resources` as globals — no fetch needed, no backend involved).
 *
 * IMPORTANT: none of your data files have a date field, so "newest"
 * here means "closest to the end of the array" — which matches your
 * own README convention of pasting new entries at the end. If that
 * convention ever slips (someone inserts mid-array), this will be
 * wrong. The only real fix is adding a `date` field to new entries,
 * which is a bigger ask — flagging it here rather than faking a sort
 * that looks precise but isn't.
 */

const ITEMS_PER_TYPE = 3;

function renderItem(item) {
  return `
    <div class="whats-new__item">
      <span class="whats-new__tag whats-new__tag--${item.type}">${item.type}</span>
      <span class="whats-new__title">${item.title}</span>
    </div>
  `;
}

function refreshWhatsNew() {
  const container = document.getElementById('hunnids-whats-new');
  if (!container) return;

  const recentGuides = (typeof guides !== 'undefined' ? guides : [])
    .slice(-ITEMS_PER_TYPE)
    .reverse()
    .map((g) => ({ type: 'tutorial', title: g.title }));

  const recentPlugins = (typeof resources !== 'undefined' ? resources : [])
    .filter((r) => r.featured)
    .slice(-ITEMS_PER_TYPE)
    .reverse()
    .map((r) => ({ type: 'plugin', title: r.name }));

  const combined = [...recentGuides, ...recentPlugins];

  if (combined.length === 0) {
    container.innerHTML = `<p class="whats-new__empty">Nothing new to show yet.</p>`;
    return;
  }

  container.innerHTML = combined.map(renderItem).join('');
}

window.HunnidsWhatsNew = { refreshWhatsNew };
