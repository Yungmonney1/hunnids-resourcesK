// ─────────────────────────────────────────────
//  hunnids* resources
//  To add a plugin: copy any object below,
//  paste it in the right section, fill in the fields.
//
//  Fields:
//    name        – display name
//    desc        – short description (featured cards only)
//    soft        – "ae" or "pr"
//    link        – download/external link
//    src         – "GD" (Google Drive), "WEB", or "GH" (GitHub)
//    ext         – true if it's an extension (shows EXT badge)
//    os          – omit for single link, or ["Win","Mac"] for dual-OS chip
//    featured    – true to show as a big card in the main grid
// ─────────────────────────────────────────────

const resources = [

  // ── AFTER EFFECTS — FEATURED ────────────────
  {
    name: "Flow",
    desc: "Smooth, intuitive easing for your keyframes. One of the best free animation tools out there.",
    soft: "ae", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/1MUuBVfXF1H9o9igxZn8ocF_pSah-0fl1/view?usp=drive_link"
  },
  {
    name: "Newton 4",
    desc: "Realistic 2D physics simulation right inside After Effects. Industry standard for bounce and collision.",
    soft: "ae", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/1iFzsuoV_y5kFrihze337dVqdVBxDF3wf/view?usp=drive_link"
  },
  {
    name: "FxConsole",
    desc: "Quickly search and apply any effect or preset by name without digging through panels.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://www.videocopilot.net/blog/2018/05/fx-console-updated-to-v1-0-3/"
  },
  {
    name: "DataMosh 2",
    desc: "Glitch and datamosh effects made simple — popular for music videos and transitions.",
    soft: "ae", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/1XsSQPcfZ6WvEC5e9qHlBZ7iinMjRDzCI/view?usp=drive_link"
  },
  {
    name: "TextEvo",
    desc: "Animated text presets that are easy to customize and drop into any project.",
    soft: "ae", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/1UKJH3FSq39jK5jevRBt_1qhlA6wpX4wH/view?usp=drive_link"
  },
  {
    name: "Matrix",
    desc: "Particle and matrix-style effects for sci-fi and digital aesthetics.",
    soft: "ae", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/1noIK3p75dxbMvEvO9vfGaHE06XZ2b25y/view?usp=drive_link"
  },
  {
    name: "CRT Emulator",
    desc: "Authentic retro CRT screen distortion, scanlines, and glow effects.",
    soft: "ae", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/1tdw9bCwz-48AW-wfYwWQz7xohKdqyAzW/view?usp=drive_link"
  },
  {
    name: "Uwu2x",
    desc: "AI-powered upscaling tool for cleaning up low-res footage right in your timeline.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://uwu2x.alixz.ovh/"
  },
  {
    name: "TheAnimeScripter",
    desc: "Frame interpolation, upscaling, and deduplication tools built for anime editors.",
    soft: "ae", src: "GH", featured: true,
    link: "https://github.com/NevermindNilas/TheAnimeScripter"
  },
  {
  name: "Liquid GLass",
  desc: "An Apple-inspired liquid glass effect for After Effects.",
  soft: "ae",        // "ae" or "pr"
  src: "WEB",         // "GD" (Google Drive), "WEB", or "GH" (GitHub)
  featured: true,
  link: "https://www.toolsformotion.com/liquid-glass"
},

  // ── AFTER EFFECTS — SHOW ALL ─────────────────
  { name: "Aescripts Motion Mosh v1.2.1", soft: "ae", src: "GD", link: "https://drive.google.com/file/d/1khI_ZSe0Bjj56U4MfdYQfYnJDcUAn_bT/view?usp=drive_link" },
  { name: "AndrewYang Bundle 260215 (Win)", soft: "ae", src: "GD", link: "https://drive.google.com/file/d/1C4lnXbWp2XRg5bSDTFQxR0avAFuNNf6W/view?usp=drive_link" },
  { name: "AutoSway v1.90", soft: "ae", src: "GD", link: "https://drive.google.com/file/d/1Rl5PvgzHaDxn_TLGarN8B8u1acby_zhe/view?usp=drive_link" },
  { name: "Crates Godrays + Light Wrap", soft: "ae", src: "GD", os: ["Win","Mac"], link: "https://drive.google.com/file/d/1WsYJyjXv9FscJ1BKaCzJ9hCQMgiiNV7M/view?usp=drive_link" },
  { name: "Crossphere Plugins Bundle (Win)", soft: "ae", src: "GD", link: "https://drive.google.com/file/d/1XtHhsDGd4__Z9FV4bK9Eel8qetF9HYmh/view?usp=drive_link" },
  { name: "FilmConvert Bundle Adobe OFX (Win)", soft: "ae", src: "GD", link: "https://drive.google.com/file/d/1DKR0n1DO-H2SHdWDnfmKavKcs8TKJnCA/view?usp=drive_link" },
  { name: "FilmConvert Nitrate v3.50 Adobe (Win)", soft: "ae", src: "GD", link: "https://drive.google.com/file/d/1jW08PrzhtCK_jTXaKozRpyPFZ_7gu2uO/view?usp=drive_link" },
  { name: "Signal 1.2.0", soft: "ae", src: "GD", link: "https://drive.google.com/file/d/1V8DsFYmLfFqdMyHbqLGSjK5hJDQgI5vg/view?usp=drive_link" },
  { name: "TV Distortion Bundle 2.7.5.1 (Win)", soft: "ae", src: "GD", link: "https://drive.google.com/file/d/1ClauK81p4VK4gBVvV19BLosvxegq3NE5/view?usp=drive_link" },
  { name: "Twixtor & Twixtor Pro v7.3.1", soft: "ae", src: "GD", os: ["Win","Mac"], link: "https://drive.google.com/file/d/1mCtgJhOx2T6i5H4NNDDvZMOGJ76nN_dC/view?usp=drive_link" },
  { name: "VC Optical Flares 1.3.8 Adobe", soft: "ae", src: "GD", os: ["Win","Mac"], link: "https://drive.google.com/file/d/1O9AzDt3wdEYiYQV6jiZOGPDWNEho3IYN/view?usp=drive_link" },
  { name: "BAO Plugins Bundle 2025.5", soft: "ae", src: "WEB", link: "https://pixeldrain.com/u/sj49MfsC" },
  { name: "Shadow Studio 3 v1.0.7", soft: "ae", src: "WEB", os: ["Win","Mac"], link: "https://pixeldrain.com/u/fnCdGqsd" },
  { name: "Furikake 1.0.5", soft: "ae", src: "GD", link: "https://pixeldrain.com/u/i9TB52YE" },
  { name: "L3tt3rM4pp3r2", soft: "ae", src: "GD", link: "https://pixeldrain.com/u/ZQfUESZZ" },
  { name: "Lenscare_ae_v1.5.5", soft: "ae", src: "GD", os: ["Win","Mac"], link: "https://pixeldrain.com/u/QhYU3KwE" },
  

  // ── AFTER EFFECTS — EXTENSIONS ───────────────
  { name: "Aescripts Liquids 1.0", soft: "ae", src: "GD", ext: true, link: "https://drive.google.com/file/d/17IHljr4_ZyFmoCwP0PD3R4BIkbqXsiQt/view?usp=drive_link" },
  { name: "Anubis 1.0.4", soft: "ae", src: "GD", ext: true, link: "https://drive.google.com/file/d/14ZE0-ICl8e1VZHO14Jg0MNVsb-DIkTiE/view?usp=drive_link" },
  { name: "BeatEdit Bundle 2", soft: "ae", src: "GD", ext: true, os: ["Win","Mac"], link: "https://drive.google.com/file/d/1O5RCRZP8frcH7WQBirsW9uGMAip0JJD4/view?usp=drive_link" },
  { name: "Cut'n'Pack 1.0.0", soft: "ae", src: "GD", ext: true, link: "https://drive.google.com/file/d/1hEEN1rt4ND56tf0ZO9FMz_rsCBxcVd4O/view?usp=drive_link" },
  { name: "DynamicShadow 2", soft: "ae", src: "GD", ext: true, os: ["Win","Mac"], link: "https://drive.google.com/file/d/1L7FNHVNzKDgjjzaKZiAA5T3nspG0Gykh/view?usp=drive_link" },
  { name: "kbar v3.1.1", soft: "ae", src: "GD", ext: true, os: ["Win","Mac"], link: "https://drive.google.com/file/d/1yWtAV0A0HMGcyNVbuTpNA5h9e8j5Lrcs/view?usp=drive_link" },
  { name: "Matte Tool v1.7", soft: "ae", src: "GD", ext: true, link: "https://drive.google.com/file/d/1VulVXOSbFEtzTHxTmheMNCMp6l-E0-TR/view?usp=drive_link" },
  { name: "Motion Tools Pro v2.0.15", soft: "ae", src: "GD", ext: true, link: "https://drive.google.com/file/d/1UOt4ATHSsa8C7XjTlGPFyWT_wLuZM1BK/view?usp=drive_link" },
  { name: "MoveAnchorPoint 4", soft: "ae", src: "GD", ext: true, os: ["Win","Mac"], link: "https://drive.google.com/file/d/1vk4MIPTYBF4tzTSzb0GFg11pMmFUbCBy/view?usp=drive_link" },
  { name: "Project Sorter 1.7.3.1", soft: "ae", src: "GD", ext: true, link: "https://drive.google.com/file/d/1zxICMs33iIYVJMwjxlQ_Fx8a7MqL1Sec/view?usp=drive_link" },
  { name: "Automation Toolkit", soft: "ae", src: "WEB", ext: true, link: "https://aescripts.com/automation-toolkit/" },

  // ── PREMIERE PRO — FEATURED ──────────────────
  {
    name: "Captioneer",
    desc: "Auto-generate and style captions fast — built for short-form content creators.",
    soft: "pr", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/13bry9rD5ycxKU9OWkZGliwI71M-76-s3/view?usp=drive_link"
  },
  {
    name: "FastFx",
    desc: "One-click effect presets for fast-paced edits and montages.",
    soft: "pr", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/1ZXT0xzgm4hTyahQ6cSFCm_6w3cO4b2Y4/view?usp=drive_link"
  },
  {
    name: "Excalibur",
    desc: "Dynamic transition pack designed for fast cuts and energetic edits.",
    soft: "pr", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/1qaTifU5wfHBot6yea8Kiope1jvZ0ad68/view?usp=drive_link"
  },
  {
    name: "Easify 2 Pro",
    desc: "Drag-and-drop easing curves for Premiere — finally smooth keyframes without AE.",
    soft: "pr", src: "GD", featured: true,
    link: "https://drive.google.com/file/d/10n1X-4iFQNf_bEmTD6DUppq6wPp33lMG/view?usp=drive_link"
  },

];
// Called by index.html after this script loads
if (typeof renderResources === 'function') renderResources();
