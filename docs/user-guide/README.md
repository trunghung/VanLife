# Travato 59K — Borrower's Guide (PWA)

A mobile/tablet-friendly, installable web guide for friends & family who borrow our
**2022 Winnebago Travato 59K**. Two reading modes (Quick Reference & Beginner),
pictures, embedded videos, and full offline support once loaded.

## How it works (template + data binding)

You **never edit the web page code** to change wording. Content lives in one Markdown file:

```
content/guide-content.md   ← edit the words here
        │
        │  node scripts/build.js
        ▼
data/content.json          ← generated data (do not edit by hand)
        │
        ▼
index.html + app.js        ← template renders cards from the JSON
```

### To change any instruction, tip, warning, or add a section
1. Edit `content/guide-content.md` (the format is documented at the top of that file).
2. Run the converter (from the repo root):
   ```
   node docs/user-guide/scripts/build.js
   ```
3. Commit and push. Done.

## Adding real photos of our van
The guide shows labeled placeholders wherever a photo is expected (📷 "Photo to add"
with the exact filename). To add a real photo:

1. Take the picture with your phone.
2. Name it exactly as shown on the placeholder (e.g. `inverter-panel.jpg`).
3. Drop it into the **`photos/`** folder.
4. Commit and push — it appears automatically in **Beginner** mode.

(You can add or rename photo slots in `guide-content.md` under each section's `**Photos:**` block.)

## Two modes
- **Quick Reference** — the short refresher: summary + numbered steps + safety notes. For people who know the van.
- **Beginner** — everything: tips, large photos, and embedded how-to videos.

## Publishing on GitHub Pages
This guide lives at `docs/user-guide/`. GitHub Pages serves the `docs/` folder as the site root.

1. Push this repo to GitHub (already set to `origin`).
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch **main**, folder **/docs**. Save.
3. Your guide will be live at `https://<username>.github.io/VanLife/user-guide/`
   (and the landing page at `https://<username>.github.io/VanLife/`).
4. Open that link on a phone/tablet → browser menu → **Add to Home Screen** to install it
   as an app. Once opened while online, it works offline afterward.

> The app uses only relative paths, and a `.nojekyll` file in `docs/` lets it work from the
> `/VanLife/user-guide/` subpath without a build step. Everything (content, converter,
> service worker, icons) is self-contained in this folder.

## Files
| File | Purpose |
|------|---------|
| `content/guide-content.md` | **Edit this** — all guide content |
| `scripts/build.js` | Converts the Markdown to `data/content.json` |
| `data/content.json` | Generated content (rendered by the app) |
| `index.html`, `styles.css`, `app.js` | The template / renderer |
| `manifest.json`, `sw.js`, `icons/` | PWA install + offline caching |
| `photos/` | Drop your real van photos here |

## Notes on the 59K power system
The Travato **59K (59KL)** is the **Pure3 lithium** model: a large lithium battery + 3600W
inverter + solar + a second under-hood alternator, and **no factory Onan generator** (the
lithium system replaces it — you can run the A/C and microwave off the inverter for a while).
A full **Generator (Onan) + reset** section is included anyway per the owner's request —
review/keep/remove it in `guide-content.md`, and confirm the exact generator model printed on
the unit's label if your van has one added.
