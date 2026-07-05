# VanLife

A collection of small web apps and resources for our RV
(**2022 Winnebago Travato 59K**), served from one GitHub Pages site.

The published site lives in **`docs/`** — GitHub Pages serves that folder as the site root.

## Apps
| App | Source | Live URL | Description |
|-----|--------|----------|-------------|
| Landing page | [`docs/index.html`](docs/index.html) | `…/VanLife/` | Home page listing all apps. |
| Borrower's Guide | [`docs/user-guide/`](docs/user-guide/) | `…/VanLife/user-guide/` | Mobile/tablet how-to guide (installable PWA, offline) for friends & family who borrow the van. |

_(Add more apps as new folders under `docs/`.)_

## Repo layout
```
.
├── README.md
└── docs/                     # ← GitHub Pages root
    ├── .nojekyll             # serve files as-is (no Jekyll build)
    ├── index.html            # landing page linking to each app
    └── user-guide/           # the Borrower's Guide PWA (self-contained)
        └── README.md         # how to edit content, add photos, deploy
```

## Enable GitHub Pages (one time)
**Settings → Pages → Build and deployment → Source: Deploy from a branch →
branch `main`, folder `/docs`.** Save.

The site is then live at `https://<username>.github.io/VanLife/`, and each app at
`https://<username>.github.io/VanLife/<app>/`. See each app's own README for details.
