# hunnids*

A resource hub for video editors. Plugins, extensions, guides, and tools — all curated and verified.

**Live site:** [hunnids.cc](https://hunnids.cc)

---

## File Structure

```
index.html       — main page (HTML structure only)
style.css        — all styling
script.js        — all JavaScript (if split out)
resources.js     — plugin/extension data
guides.js        — guide card data
tutorials.html   — tutorials gallery page
CNAME            — custom domain config
assets/          — mascot images and GIFs
```

---

## Adding a Plugin

Open `resources.js` and add an object to the `resources` array.

**Featured card** (shows in the main grid with description):
```js
{
  name: "Plugin Name",
  desc: "What it does in one sentence.",
  soft: "ae",        // "ae" or "pr"
  src: "GD",         // "GD" (Google Drive), "WEB", or "GH" (GitHub)
  featured: true,
  link: "https://drive.google.com/..."
},
```

**Show-all chip** (appears in the expandable list only):
```js
{ name: "Plugin Name", soft: "ae", src: "GD", link: "https://..." },
```

**Dual-OS chip** (Win + Mac badge):
```js
{ name: "Plugin Name", soft: "ae", src: "GD", os: ["Win","Mac"], link: "https://..." },
```

**Extension** (shows EXT badge):
```js
{ name: "Extension Name", soft: "ae", src: "GD", ext: true, link: "https://..." },
```

Save and push — cards, counts, and filters update automatically.

---

## Adding a Guide

Open `guides.js` and add an object to the `guides` array:

```js
{ id: "YOUTUBE_ID", title: "Video Title", tag: "AE" },
```

Tags: `"AE"`, `"PR"`, or `"GEN"`

The guide cards, numbering, thumbnails, featured banner, and sidebar count all update automatically. The first entry in the array is always the featured banner video.

---

## Adding a Tutorial (tutorials.html)

Add a card inside the `#video-grid` div:

```html
<div class="video-card" data-cat="basics" onclick="openModal('YOUTUBE_ID','Video Title')">
  <div class="video-thumb">
    <img src="https://img.youtube.com/vi/YOUTUBE_ID/mqdefault.jpg" loading="lazy" />
    <div class="video-thumb-overlay"><div class="video-play">▶</div></div>
    <div class="video-soft-tag">AE</div>
  </div>
  <div class="video-info">
    <div class="video-title">Video Title</div>
    <div class="video-cat">Basics</div>
  </div>
</div>
```

**Categories:** `basics` · `color` · `motion` · `3d` · `effects-create` · `manga` · `premiere` · `plugins`

---

## Password

Plugin zips are password protected. Password is displayed in the site banner (`h100`).

---

*Built by kashmoney for the hunnids Discord community.*
