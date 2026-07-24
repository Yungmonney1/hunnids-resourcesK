# Dashboard integration — what actually changed

## Files
- `index.html` — updated: dashboard stylesheet link, the Welcome Card /
  Continue Editing / What's New markup (right after the Challenge Card,
  before Tutorials), the 6 dashboard script tags, and tracking hooks
  wired into `openGuideModal()` and the plugin card renderers.
- `tutorials.html` — updated: loads `dashboard/continue-editing.js` and
  tracks a view every time someone opens a tutorial from the full gallery.
- `dashboard/` — the 6 new files (profile-data.js, auth.js, render.js,
  continue-editing.js, whats-new.js, dashboard.css, dashboard-init.js).

Everything else (art-wall.html, guides.js, resources.js, tutorials-data.js,
art-wall-data.json) is untouched — didn't need to be.

## How to install
1. Drop the `dashboard/` folder into your repo root, alongside `index.html`.
2. Replace your `index.html` and `tutorials.html` with these versions
   (or diff them against yours if you've made changes since you sent
   these over — the dashboard bits are clearly marked with comments).

## What I found while going through your files
- **`script.js` and `style.css` aren't linked from any of your pages.**
  `index.html`, `tutorials.html`, and `art-wall.html` are all fully
  self-contained with inline `<style>`/`<script>` blocks. Those two
  files look like leftovers from an earlier version of the site — worth
  deleting if nothing else references them, just so they don't confuse
  future-you.
- Your homepage "Tutorials" section actually renders from `guides.js`
  (the curated ~10-video set), while the full `tutorials.html` gallery
  pulls from the much bigger `tutorials-data.js`. What's New uses
  `guides` for that reason — it's the "featured/curated" list, so its
  last few entries are more meaningful as "what's new" than the tail of
  the full catalog.

## Try it right now
Open the site, open the console, run:
```js
window.HunnidsAuth.loginWithDiscord()
```
That fakes a login so you can see and style the Welcome Card. Continue
Editing and What's New need no login — go click a guide or a plugin
link, then check the dashboard, and you'll see it show up.

## One honest limitation: "What's New" isn't date-sorted
None of your data files (`guides.js`, `resources.js`, `tutorials-data.js`)
have a date field — so "newest" is approximated as "closest to the end
of the array," matching your own README convention of pasting new
entries at the end. That's accurate as long as that convention holds.
If you ever want a real date-based sort, the fix is small: add a
`date: "2026-07-20"` field to new entries going forward — I didn't
want to silently pretend to sort by date when there's no date to sort by.

## What changes when the Discord backend shows up
Same as before — only `profile-data.js` and `auth.js`. The TODO
comments in both now point at `https://hunnids-discord-bot.onrender.com`
directly, since that's already your bot's live Render URL (same one
serving `/api/events` for the Challenge Card).
