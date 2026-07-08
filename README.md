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
tutorials-data.js — tutorial video data
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

Open `guides.js` and add an object to the `guides` array.

**YouTube (default, no extra fields needed):**
```js
{ id: "YOUTUBE_ID", title: "Video Title", tag: "AE" },
```

**TikTok:**
```js
{ source: "tiktok", embedId: "7123456789012345678", url: "https://www.tiktok.com/@user/video/7123456789012345678", thumb: "assets/hunnids%20shape%20files/thumbs/name.jpg", title: "Video Title", tag: "AE" },
```
`embedId` is the numeric ID from the TikTok URL. `thumb` is a screenshot you take yourself and upload — TikTok doesn't give an auto-thumbnail like YouTube does.

**Local/other video file (hosted on Catbox or similar):**
```js
{ source: "file", url: "https://files.catbox.moe/xxxxx.mp4", thumb: "assets/hunnids%20shape%20files/thumbs/name.jpg", title: "Video Title", tag: "AE" },
```
Same deal — `thumb` is a manual screenshot since there's no auto-thumbnail service for a raw file.

Tags: `"AE"`, `"PR"`, or `"GEN"`

The guide cards, numbering, thumbnails, featured banner, and sidebar count all update automatically. The first entry in the array is always the featured banner video.

---

## Adding a Tutorial

Open `tutorials-data.js` and add an object to the `tutorials` array.

**YouTube (default):**
```js
{ id: "YOUTUBE_ID", title: "Video Title", cat: "basics", soft: "ae" },
```

**TikTok:**
```js
{ source: "tiktok", embedId: "7123456789012345678", url: "https://www.tiktok.com/@user/video/7123456789012345678", thumb: "assets/hunnids%20shape%20files/thumbs/name.jpg", title: "Video Title", cat: "basics", soft: "ae" },
```

**Local/other video file (hosted on Catbox or similar):**
```js
{ source: "file", url: "https://files.catbox.moe/xxxxx.mp4", thumb: "assets/hunnids%20shape%20files/thumbs/name.jpg", title: "Video Title", cat: "basics", soft: "ae" },
```

For TikTok/file entries, `thumb` needs to be a manual screenshot you take yourself — there's no free auto-thumbnail service for those the way YouTube provides.

`soft` is `"ae"` or `"pr"` — shows as the small badge on the thumbnail.

**Categories:** `basics` · `color` · `motion` · `3d` · `effects-create` · `manga` · `premiere` · `plugins`

Save and push — cards, the "show all" filters, search, and pagination all update automatically. No HTML editing required.

---

## Password

Plugin zips are password protected. Password is displayed in the site banner (`h100`).

---

## Discord Announcements

The Discord bot has an `/announce` command group for posting new-drop announcements. Locked to one channel per server so it can't be fired off in the wrong place by accident.

**One-time setup:**
```
/announce setchannel
```
Run this in whatever channel you want announcements posted in (e.g. `#new-drops`). Only needs to be done once — it's remembered from then on.

**Announcing a new plugin/extension** (run once per item):
```
/announce plugin name:"Flow" software:"After Effects" description:"Smooth, intuitive easing for your keyframes."
```
Check the `extension` option if it's an extension rather than a plugin.

**Announcing a batch of new tutorials** (one combined post):
```
/announce tutorials count:10 highlights:"datamosh, manga compositing, camera tricks"
```
`highlights` is optional — leave it off for a generic "fresh guides just went up" message.

Both commands require the **Manage Server** permission to run.

---

*Built by hunnido for the hunnids Discord community.*
