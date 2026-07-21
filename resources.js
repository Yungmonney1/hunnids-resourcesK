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
//
//  IMPORTANT: only list tools that are genuinely free to use.
//  Don't add anything that's normally a paid/commercial plugin —
//  even a copy of one of those causes real problems (legal takedowns,
//  security flags) for the whole site. If you're not sure whether
//  something is free, ask before adding it.
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
    name: "FxConsole",
    desc: "Quickly search and apply any effect or preset by name without digging through panels.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://www.videocopilot.net/blog/2018/05/fx-console-updated-to-v1-0-3/"
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
    name: "Saber",
    desc: "Video Copilot's free plugin for energy beams, lightsabers, lasers, and neon effects.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://www.videocopilot.net/blog/2016/03/new-plug-in-saber-now-available-100-free/"
  },
  {
    name: "Orb",
    desc: "GPU-accelerated 3D planet and sphere generator, free from Video Copilot.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://www.videocopilot.net/orb/"
  },
  {
    name: "UnMult",
    desc: "One-click alpha channel generator for lens flares, glows, and other black-background FX.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://aescripts.com/unmult/"
  },
  {
    name: "Duik Ángela",
    desc: "The industry-standard free rigging and character animation toolkit for After Effects.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://rxlaboratory.org/tools/duik-angela"
  },
  {
    name: "Animation Composer",
    desc: "A huge library of drag-and-drop animation presets, transitions, and sound effects. Core version is free.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://misterhorse.com/animation-composer"
  },

  // ── AFTER EFFECTS — SHOW ALL ─────────────────
  // (empty for now — add genuinely free AE plugins/scripts here)

  // ── AFTER EFFECTS — EXTENSIONS ───────────────
  // (empty for now — add genuinely free AE extensions here)

  // ── PREMIERE PRO — FEATURED ──────────────────
  {
    name: "Animation Composer",
    desc: "Same drag-and-drop preset library as the AE version, built for Premiere Pro. Core version is free.",
    soft: "pr", src: "WEB", featured: true,
    link: "https://misterhorse.com/animation-composer-for-premiere"
  },
  {
    name: "FILM CRUX Transitions Vol. 2",
    desc: "15 free drag-and-drop transitions built specifically for Premiere Pro.",
    soft: "pr", src: "WEB", featured: true,
    link: "https://www.filmcrux.com/free-transitions-vol-2"
  },

];
