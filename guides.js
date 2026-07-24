// ─────────────────────────────────────────────
//  hunnids* guides
//  To add a guide: copy any object below and
//  paste it at the end of the array.
//
//  Fields:
//    id      – YouTube video ID
//    title   – display title
//    tag     – "AE", "PR", or "GEN"
//
//  The featured banner always uses guides[0].
// ─────────────────────────────────────────────

const guides = [
  { id: "ASRhzm6u5Vw", title: "Learn After Effects in 10 Minutes",            tag: "AE"  },
  { id: "S6cqRFkA01o", title: "Tweening Animation — Learn the Basics of AE",  tag: "AE"  },
  { id: "qWs8dSoPw_I", title: "How to Use Datamosh | Glitch AMV Tutorial",     tag: "AE"  },
  { id: "OqlympxTGK8", title: "Manga Animation: Compositing Tutorial",          tag: "AE"  },
  { id: "4mEuRby7_Us", title: "Full In Depth Manga Animation Tutorial",         tag: "AE"  },
  { id: "HjGEIU8K8d0", title: "Easy Camera Lock Music Video Effect",            tag: "AE"  },
  { id: "EP8OaGisJr0", title: '"3D" Head Rotation for Detailed Artwork',        tag: "PR"  },
  { id: "KUquO5vzdGY", title: "HUNNIDS* Guide: Customizing Your AE Workspace",  tag: "PR"  },
  { id: "R9bCpLIVMdY", title: "Coloring and Animating Manga — Photoshop & AE", tag: "GEN" },
  { id: "hiQ-Y4rk42E", title: "How to Make Frutiger Metro Aero Effects",        tag: "GEN" },
];

// Called by index.html after this script loads
if (typeof renderGuides === 'function') renderGuides();
