// hunnids* — script.js

// Dark mode
function toggleDark() {
  const isDark = document.body.classList.toggle('dark-mode');
  document.getElementById('dark-toggle').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('hunnids-theme', isDark ? 'dark' : 'light');
}

// Restore theme on load
if (localStorage.getItem('hunnids-theme') === 'dark') {
  document.body.classList.add('dark-mode');
  document.getElementById('dark-toggle').textContent = '☀️';
}

// Hero carousel - crossfade
let currentSlide = 0;
const totalSlides = 3;

function goToSlide(n) {
  document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === n));
  document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === n));
  currentSlide = n;
}

function moveSlide(dir) {
  goToSlide((currentSlide + dir + totalSlides) % totalSlides);
}

// Auto-advance every 6 seconds
setInterval(() => moveSlide(1), 6000);

function openAbout() {
  document.getElementById('about-modal').classList.add('open');
}
function closeAbout() {
  document.getElementById('about-modal').classList.remove('open');
}

function copyPW() {
  navigator.clipboard.writeText('h100').then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'copied!';
    setTimeout(() => { btn.textContent = 'copy'; }, 2000);
  });
}

function filterPlugins(type, btn) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const cards = document.querySelectorAll('.plugin-card');
  const labels = document.querySelectorAll('.plugin-section-label');

  cards.forEach(card => {
    const soft = card.dataset.soft;
    let show = true;
    if (type === 'ae' || type === 'pr') show = soft === type;
    card.style.display = show ? '' : 'none';
  });

  labels.forEach(label => {
    const grid = label.nextElementSibling;
    if (!grid || !grid.classList.contains('plugin-grid')) return;
    const visible = Array.from(grid.children).some(c => c.style.display !== 'none');
    label.style.display = visible ? '' : 'none';
    grid.style.display = visible ? '' : 'none';
  });
}

function filterPluginChips(input, flowId) {
  const q = input.value.toLowerCase().trim();
  const flow = document.getElementById(flowId);
  flow.querySelectorAll('.all-plugins-link, .all-plugins-chip-dual').forEach(chip => {
    const nameEl = chip.classList.contains('all-plugins-chip-dual') ? chip.querySelector('.all-plugins-chip-name') : chip;
    const match = nameEl.textContent.toLowerCase().includes(q);
    chip.classList.toggle('hidden-by-search', !match);
  });
}

function toggleAllPlugins(btn, panelId) {
  btn.classList.toggle('open');
  const panel = document.getElementById(panelId);
  panel.classList.toggle('open');
  const isOpen = panel.classList.contains('open');
  const label = btn.querySelector('.show-more-label');
  label.textContent = isOpen
    ? label.textContent.replace('show all', 'hide')
    : label.textContent.replace('hide', 'show all');
}

function openGuide(card, panelId) {
  const allCards = document.querySelectorAll('.guide-card');
  const allPanels = document.querySelectorAll('.guide-detail-panel');
  const panel = document.getElementById(panelId);
  const alreadyOpen = panel.classList.contains('open') && card.classList.contains('active');

  allCards.forEach(c => c.classList.remove('active'));
  allPanels.forEach(p => p.classList.remove('open'));

  if (!alreadyOpen) {
    card.classList.add('active');
    panel.classList.add('open');
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function closeGuide(panelId) {
  document.getElementById(panelId).classList.remove('open');
  document.querySelectorAll('.guide-card').forEach(c => c.classList.remove('active'));
}

function playYT(card, videoId) {
  const wrap = document.createElement('div');
  wrap.className = 'yt-embed-wrap';
  wrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  card.replaceWith(wrap);
}

function toggleFAQ(el) {
  el.closest('.faq-item').classList.toggle('open');
}

// Sidebar scroll with offset for fixed header
let scrolling = false;
function scrollToSection(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = 160;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  // Set active state immediately
  document.querySelectorAll('.sidebar-icon').forEach(i => i.classList.remove('active'));
  const target = document.querySelector(`.sidebar-icon[href="#${id}"]`);
  if (target) target.classList.add('active');
  // Pause observer so it doesn't override during smooth scroll
  scrolling = true;
  window.scrollTo({ top, behavior: 'smooth' });
  setTimeout(() => { scrolling = false; }, 900);
}


function openGuideModal(videoId, title) {
  let modal = document.getElementById('guide-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'guide-modal-overlay';
    modal.style.cssText = 'display:flex;position:fixed;inset:0;z-index:9999;background:rgba(10,12,22,0.75);backdrop-filter:blur(8px);align-items:center;justify-content:center;';
    modal.innerHTML = `<div style="background:rgba(20,24,40,0.97);border:1px solid rgba(255,255,255,0.12);border-radius:24px;width:760px;max-width:92vw;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.6);">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 22px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <div id="gmod-title" style="font-family:'Quicksand',sans-serif;font-size:15px;font-weight:700;color:#fff;flex:1;margin-right:12px;"></div>
        <div onclick="closeGuideModal()" style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,0.5);cursor:pointer;padding:4px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);">close ✕</div>
      </div>
      <div id="gmod-embed" style="position:relative;width:100%;padding-top:56.25%;"></div>
    </div>`;
    modal.addEventListener('click', e => { if (e.target === modal) closeGuideModal(); });
    document.body.appendChild(modal);
  }
  document.getElementById('gmod-title').textContent = title;
  document.getElementById('gmod-embed').innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:none;"></iframe>`;
  modal.style.display = 'flex';
}

function closeGuideModal() {
  const modal = document.getElementById('guide-modal-overlay');
  if (modal) { modal.style.display = 'none'; document.getElementById('gmod-embed').innerHTML = ''; }
}

// ── INITIALIZATION ──────────────────────────
document.addEventListener('DOMContentLoaded', function() {

  // Active sidebar icon on scroll
  const sections = document.querySelectorAll('.section[id]');
  const icons = document.querySelectorAll('.sidebar-icon');
  
  const obs = new IntersectionObserver((entries) => {
    if (scrolling) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        icons.forEach(i => i.classList.remove('active'));
        const active = document.querySelector(`.sidebar-icon[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  
  sections.forEach(s => obs.observe(s));
  
  const searchIndex = [
    { label: 'Flow', category: 'Plugin · AE', target: '#plugins' },
    { label: 'Newton 4', category: 'Plugin · AE', target: '#plugins' },
    { label: 'FxConsole', category: 'Plugin · AE', target: '#plugins' },
    { label: 'DataMosh 2', category: 'Plugin · AE', target: '#plugins' },
    { label: 'TextEvo', category: 'Plugin · AE', target: '#plugins' },
    { label: 'Matrix', category: 'Plugin · AE', target: '#plugins' },
    { label: 'CRT Emulator', category: 'Plugin · AE', target: '#plugins' },
    { label: 'Uwu2x', category: 'Plugin · AE', target: '#plugins' },
    { label: 'TheAnimeScripter', category: 'Plugin · AE', target: '#plugins' },
    { label: 'Captioneer', category: 'Plugin · PR', target: '#plugins' },
    { label: 'FastFx', category: 'Plugin · PR', target: '#plugins' },
    { label: 'Excalibur', category: 'Plugin · PR', target: '#plugins' },
    { label: 'Easify 2 Pro', category: 'Plugin · PR', target: '#plugins' },
    { label: 'After Effects Beginners Guide', category: 'Guide · AE', target: '#guides' },
    { label: 'Changing After Effects Version', category: 'Guide · AE', target: '#guides' },
    { label: 'After Effects Installation Paths', category: 'Guide · AE', target: '#guides' },
    { label: 'Installing Plugins', category: 'Guide · AE', target: '#guides' },
    { label: 'Optimizing After Effects Performance', category: 'Guide · AE', target: '#guides' },
    { label: 'Premiere Pro Setup Guide', category: 'Guide · PR', target: '#guides' },
    { label: 'Exporting Settings Guide', category: 'Guide · PR', target: '#guides' },
    { label: 'Workspace Customization', category: 'Guide · PR', target: '#guides' },
    { label: 'How to Extract Zip/7z Files', category: 'Guide · General', target: '#guides' },
    { label: 'Installing Scripts & Extensions', category: 'Guide · General', target: '#guides' },
    { label: 'FAQ', category: 'Section', target: '#faq' },
    { label: 'Helpful Websites', category: 'Section', target: '#helpful' },
  ];
  
  let searchActive = -1;
  
  function openSearch() {
    const modal = document.getElementById('search-modal');
    modal.style.display = 'flex';
    setTimeout(() => document.getElementById('search-input').focus(), 50);
    doSearch('');
  }
  
  function closeSearch() {
    document.getElementById('search-modal').style.display = 'none';
    document.getElementById('search-input').value = '';
    searchActive = -1;
  }
  
  function doSearch(q) {
    const results = q.trim() === ''
      ? searchIndex.slice(0, 8)
      : searchIndex.filter(i => i.label.toLowerCase().includes(q.toLowerCase()) || i.category.toLowerCase().includes(q.toLowerCase()));
  
    const container = document.getElementById('search-results');
    searchActive = -1;
  
    if (results.length === 0) {
      container.innerHTML = `<div style="padding:20px; text-align:center; font-family:'JetBrains Mono',monospace; font-size:12px; color:#a4acb8;">// no results found</div>`;
      return;
    }
  
    container.innerHTML = results.map((r, i) => `
      <div class="search-result-item" data-target="${r.target}" data-index="${i}"
        style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-radius:12px; cursor:pointer; transition:background 0.1s;"
        onmouseenter="setSearchActive(${i})"
        onclick="jumpTo('${r.target}')">
        <span style="font-size:13.5px; color:#2c313a; font-weight:600;">${r.label}</span>
        <span style="font-family:'JetBrains Mono',monospace; font-size:10px; color:#6b7280; background:rgba(0,0,0,0.04); border:1px solid rgba(140,150,165,0.25); border-radius:8px; padding:2px 8px;">${r.category}</span>
      </div>
    `).join('');
  }
  
  function setSearchActive(i) {
    searchActive = i;
    document.querySelectorAll('.search-result-item').forEach((el, idx) => {
      el.style.background = idx === i ? 'rgba(58,63,74,0.08)' : '';
    });
  }
  
  function searchKeyNav(e) {
    const items = document.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') { e.preventDefault(); setSearchActive(Math.min(searchActive + 1, items.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSearchActive(Math.max(searchActive - 1, 0)); }
    if (e.key === 'Enter') {
      const active = document.querySelector('.search-result-item[data-index="' + searchActive + '"]');
      if (active) jumpTo(active.dataset.target);
      else if (items.length > 0) jumpTo(items[0].dataset.target);
    }
    if (e.key === 'Escape') closeSearch();
  }
  
  function jumpTo(target) {
    closeSearch();
    const el = document.querySelector(target);
    if (!el) return;
    const headerOffset = 160;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
  
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') { closeSearch(); closeAbout(); }
  });
  
  document.getElementById('search-modal').addEventListener('click', function(e) {
    if (e.target === this) closeSearch();
  });

  renderPlugins();
});

// ── PLUGIN RENDERER ──────────────────────────
function renderPlugins() {
  const target = document.getElementById('plugin-render-target');
  if (!target || typeof resources === 'undefined') return;

  const ae = resources.filter(r => r.soft === 'ae');
  const pr = resources.filter(r => r.soft === 'pr');

  function chipHTML(r) {
    const ext = r.ext ? ` <span class="chip-ext-tag">EXT</span>` : '';
    const src = r.src ? ` <span class="chip-src-tag">${r.src}</span>` : '';
    if (r.os) {
      return `<a class="all-plugins-chip-dual" href="${r.link}" target="_blank">
        <span class="all-plugins-chip-name">${r.name}${ext}</span>
        ${r.os.map(o => `<span class="all-plugins-chip-os">${o}</span>`).join('')}
      </a>`;
    }
    return `<a class="all-plugins-link" href="${r.link}" target="_blank">${r.name}${ext}${src}</a>`;
  }

  function featuredCardHTML(r) {
    const tag = r.soft.toUpperCase();
    return `<a class="plugin-card" data-soft="${r.soft}" href="${r.link}" target="_blank">
      <div class="plugin-card-top"><span class="plugin-name">${r.name}</span></div>
      <div class="plugin-desc">${r.desc || ''}</div>
      <div class="plugin-card-bottom">
        <span class="plugin-tag">${tag}</span>
        <span class="verified-badge">verified</span>
        <span class="plugin-arrow">→</span>
      </div>
    </a>`;
  }

  function sectionHTML(label, softKey, items) {
    const featured = items.filter(r => r.featured);
    const all = items.filter(r => !r.featured);
    const panelId = `${softKey}-plugins-panel`;
    const flowId = `${softKey}-plugins-flow`;
    return `
    <div class="plugin-section-label">${label}</div>
    <div class="plugin-grid" id="plugin-grid-${softKey}">
      ${featured.map(featuredCardHTML).join('\n      ')}
    </div>
    <button class="show-more-btn" onclick="toggleAllPlugins(this, '${panelId}')">
      <span class="show-more-label">show all ${label} plugins</span>
      <span class="show-more-chevron">▾</span>
    </button>
    <div class="all-plugins-panel" id="${panelId}">
      <input type="text" class="all-plugins-search" placeholder="Filter ${label} plugins..."
        oninput="filterPluginChips(this, '${flowId}')" />
      <div class="all-plugins-flow" id="${flowId}">
        ${all.map(chipHTML).join('\n        ')}
      </div>
    </div>`;
  }

  target.innerHTML =
    sectionHTML('After Effects', 'ae', ae) +
    sectionHTML('Premiere Pro', 'pr', pr) +
    `<div class="coming-soon">// more plugins dropping soon — stay tuned</div>`;

  const total = resources.filter(r => r.featured).length;
  const countEl = document.querySelector('#plugins .section-count');
  if (countEl) countEl.textContent = `// ${total} plugins`;
}
