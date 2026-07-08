// ─────────────────────────────────────────────
//  hunnids* tutorials
//  To add a tutorial: copy any object below and
//  paste it at the end of the array.
//
//  Fields:
//    id      – YouTube video ID (default source)
//    title   – display title
//    cat     – basics | color | motion | 3d | effects-create | manga | premiere | plugins
//    soft    – "ae" or "pr" (shows as a badge on the thumbnail)
//
//  For TikTok or a hosted file instead of YouTube, add:
//    source  – "tiktok" or "file"
//    embedId – (tiktok only) the numeric ID from the TikTok URL
//    url     – (tiktok/file) the direct/original video URL
//    thumb   – (tiktok/file) a manual screenshot, since there's no
//              auto-thumbnail service for those sources
// ─────────────────────────────────────────────

const tutorials = [
  { id: "ASRhzm6u5Vw", title: "Learn After Effects in 10 Minutes", cat: "basics", soft: "ae" },
  { id: "IOfdULAjGj4", title: "Thermal Opium Effect — After Effects Tutorial", cat: "effects-create", soft: "ae" },
  { id: "S6cqRFkA01o", title: "Tweening Animation — Learn the Basics of After Effects", cat: "basics", soft: "ae" },
  { id: "qWs8dSoPw_I", title: "How to Use Datamosh | Glitch AMV Tutorial", cat: "effects-create", soft: "ae" },
  { id: "OqlympxTGK8", title: "Manga Animation: Compositing Tutorial", cat: "manga", soft: "ae" },
  { id: "d46RQW0DfJE", title: "How to Make Your Own Slowed/Reverb Songs — After Effects", cat: "manga", soft: "ae" },
  { id: "4mEuRby7_Us", title: "Full In Depth Manga Animation Tutorial (AE & Photoshop)", cat: "manga", soft: "ae" },
  { id: "eB24MMeiz28", title: "Create a Smooth Motion Trail Effect — After Effects", cat: "effects-create", soft: "ae" },
  { id: "CvOxo4WHbWQ", title: "Full SFX Tutorial (+ FREE SFX Pack)", cat: "color", soft: "ae" },
  { id: "H_Or2MONFQk", title: "My Quality/Sharpen Settings", cat: "color", soft: "ae" },
  { id: "HjGEIU8K8d0", title: "Easy Camera Lock Music Video Effect in After Effects", cat: "effects-create", soft: "ae" },
  { id: "0JM6oXxEDEI", title: "How to Sync with Time Remapping/Velocity — After Effects", cat: "motion", soft: "ae" },
  { id: "R9bCpLIVMdY", title: "Coloring and Animating Manga — Photoshop & After Effects", cat: "manga", soft: "ae" },
  { id: "Kgas01Fd5XA", title: "Vibe / Heavy CC Tutorial", cat: "color", soft: "ae" },
  { id: "BkD6KPnPZK4", title: "Jugg After Effects One Framer Tutorial", cat: "motion", soft: "ae" },
  { id: "xnuP27VrO40", title: "Basic Typography — AE AMV Text Tutorial for Advanced Editors", cat: "effects-create", soft: "ae" },
  { id: "giu-mel7iyU", title: "How to Rig Hand in After Effects using Duik Bassel", cat: "3d", soft: "ae" },
  { id: "EP8OaGisJr0", title: "\"3D\" Head Rotation for Detailed Artwork in After Effects", cat: "manga", soft: "ae" },
  { id: "IvTXbHLtod4", title: "How to Make Kinetic Warp Text Animation in After Effects", cat: "effects-create", soft: "ae" },
  { id: "S8teW6OeMnk", title: "Smooth Twixtor With No Warps (Flowframes)", cat: "motion", soft: "ae" },
  { id: "Vhp-ukczmJM", title: "Mograph Tutorial — 3D Shapes AMV", cat: "motion", soft: "ae" },
  { id: "PGotOcHqjOg", title: "Make Film Titles with Ease — Edit Tutorial", cat: "effects-create", soft: "ae" },
  { id: "CUWPaQ0JHBQ", title: "How to Make Jugg Style in After Effects", cat: "motion", soft: "ae" },
  { id: "GHlhzoukoPg", title: "Ultimate Graph Editor Tutorial", cat: "motion", soft: "ae" },
  { id: "hiQ-Y4rk42E", title: "How to Make Frutiger Metro Aero Effects — After Effects", cat: "effects-create", soft: "ae" },
  { id: "fdGzWXM_UPY", title: "Smooth Animations Tutorial", cat: "motion", soft: "ae" },
  { id: "fRl92Bba_6s", title: "3D Camera Tutorial", cat: "3d", soft: "ae" },
  { id: "KUquO5vzdGY", title: "Premiere Pro Workspace Customization", cat: "premiere", soft: "pr" },
  { id: "qTaOIhh9ja8", title: "Flow Plugin Tutorial — After Effects", cat: "plugins", soft: "ae" },
  { id: "JsQ_TtfDcnI", title: "Newton 4 Tutorial — After Effects", cat: "plugins", soft: "ae" },
  { id: "Qr0PFFPiv54", title: "FX Console — Speed Up Your AE Workflow", cat: "plugins", soft: "ae" },
  { id: "j-TA5u0TBNk", title: "KBar3 for After Effects Tutorial", cat: "plugins", soft: "ae" },
  { source: "tiktok", embedId: "7624116548101262599", url: "https://www.tiktok.com/@adhitpe/video/7624116548101262599", title: "Text Morphing Effect", cat: "basics", soft: "ae" },
  { source: "tiktok", embedId: "7658945947988184341", url: "https://www.tiktok.com/@sorasalter/video/7658945947988184341", title: "After Zoom Tutorial", cat: "basics", tag: "AE" },
  { id: "y5Q-AhxPh9A", title: "Apple Style UI Shape Morphing Tutorial in After Effects", cat: "motion", soft: "ae" },
  { id: "cpQzSKuEAkM", title: "Learn Apple Style Motion Graphics in 20 minutes | After Effects", cat: "motion", soft: "ae" },
  { id: "pnynUoWmX3A", title: "How To Motion Track Objects In Premiere Pro", cat: "premiere", soft: "pr" },
  { id: "vZzZFXzzWFU", title: "Uwu2x - 4K Quality + Smooth Twixtor in 1 click | After Effects Extension", cat: "plugins", soft: "ae" },
  { id: "HWd80Yyzfe4", title: "TextEvo Tutorial: The Basics", cat: "plugins", soft: "ae" },
  { id: "xB7ocpdHjtM", title: "AFTER EFEFCTS SIGNAL PLUGIN TUTORIAL FOR WINDOWS", cat: "plugins", soft: "ae" },
  
];

// Called by tutorials.html after this script loads
if (typeof renderTutorials === 'function') renderTutorials();
