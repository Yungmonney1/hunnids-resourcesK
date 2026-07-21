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
  {
    name: "EaseCopy",
    desc: "Copy and paste your carefully-tuned eases between keyframes without touching your values. Pay-what-you-want, $0 works.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://aescripts.com/easecopy/"
  },
  {
    name: "Repeater",
    desc: "Turn any layer — text, footage, shapes, 3D — into a live repeating array. Free from Plugin Everything.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://aescripts.com/repeater/"
  },
  {
    name: "Plugin Everything — Free Tools",
    desc: "A whole hub of genuinely free AE plugins from Plugin Everything: Displacer Pro, FXAA, Label Match, Frame Skip, and more.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://www.plugineverything.com/free"
  },
  {
    name: "AEJuice Free Plugins",
    desc: "A bundle of free tools and assets: lens textures, expressions pack, Google Material Icons, and more.",
    soft: "ae", src: "WEB", featured: true,
    link: "https://aejuice.com/free-plugins/"
  },

  // ── AFTER EFFECTS — SHOW ALL ─────────────────
  { name: "Redefinery AE Scripts (40+ free scripts)", soft: "ae", src: "WEB", link: "http://redefinery.com/ae/rd_scripts/" },
  { name: "Quick New", soft: "ae", src: "WEB", link: "https://motionnations.gumroad.com/l/Cfadk" },
  { name: "kyletmartinez AE Scripts (GitHub)", soft: "ae", src: "GH", link: "https://github.com/kyletmartinez/after-effects-scripts" },
  { name: "Glass Eyes", soft: "ae", src: "WEB", link: "https://www.videocopilot.net/blog/2016/04/another-new-plug-in/" },
  { name: "Sure Target 2", soft: "ae", src: "WEB", link: "http://www.videocopilot.net/tutorials/sure_target_2/" },
  { name: "Un-PreCompose", soft: "ae", src: "WEB", link: "https://aescripts.com/un-precompose/" },

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
  {
    name: "AinTransitions (Free Pack)",
    desc: "100 free transition presets with sound FX, plus a one-click extension to apply them.",
    soft: "pr", src: "WEB", featured: true,
    link: "https://ainforce.gumroad.com/l/freeAinTransitionsPPro"
  },

];

// Called by index.html after this script loads — this line was missing,
// which is why the featured plugin cards weren't showing up at all.
if (typeof renderResources === 'function') renderResources();
