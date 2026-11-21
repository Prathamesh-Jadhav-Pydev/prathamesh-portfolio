# Portfolio asset and data guide (Prathamesh Jadhav)

Everything you need to add, with exact sizes and where it goes.

## 1. Images and files

| What | File path | Exact size | Format / weight | Notes |
|---|---|---|---|---|
| Profile photo | `assets/profile.jpg` | **800 × 800 px** (square, 1:1) | JPG or WebP, under 150 KB | Shown at about 370 px wide on desktop (cropped to a square with `object-fit: cover`), so 800 px stays sharp on retina. Keep your face in the centre. Until the file exists, a "PJ" placeholder shows. |
| Open Graph / share image | `assets/og-image.png` | **1200 × 630 px** | PNG or JPG, under 300 KB | Used by LinkedIn, WhatsApp, X when the link is shared. |
| Favicon | `assets/favicon.svg` | any (vector) | SVG | A "PJ" favicon is already included. Replace if you want. |
| Resume | `assets/resume.pdf` | n/a | PDF, under 2 MB | Used by the "Download Resume" button. |
| Gallery images (3) | `assets/creative/3d-typography.jpg`, `cinematic-environment.jpg`, `lighting-study.jpg` | **1600 × 1067 px** (3:2) | JPG or WebP, 200 to 400 KB each | Tiles are 230 to 330 px tall and about 410 to 550 px wide on desktop, so they crop slightly depending on screen size. Keep the main subject in the centre 60%. |

Gallery images are picked up automatically by their name. If a file is missing, the placeholder stays.

## 1b. Video reel ("Motion & 3D Reel")

Put videos in `assets/videos/`. The six default names are `3d-typography.mp4`, `cinematic-environment.mp4`, `lighting-study.mp4`, `motion-graphics.mp4`, `cinematic-edit.mp4` and `short-form.mp4`.

| What | Spec |
|---|---|
| Video file | MP4 (H.264 + AAC), **1920 × 1080 or 1280 × 720 (16:9)**, 10 to 60 s, ideally under 10 MB each (Netlify free tier handles this fine) |
| Poster image (optional) | 1280 × 720 JPG in `assets/videos/posters/`, under 150 KB. Without one, the first frame is used. |
| Vertical shorts | Still play, but are letterboxed inside the 16:9 screen |
| Long or heavy videos | Upload to YouTube and use the link instead of a local file |

**To add, remove or rename videos**, edit the `VIDEOS` list at the top of the "Video reel" block in `script.js`. One line per video:

```js
{ t: "Title", c: "3D Art", s: "assets/videos/my-video.mp4", d: "One-line description", k: ["Blender", "Cycles"], p: "assets/videos/posters/my-video.jpg" },
```

- `c` is the category. Filter buttons are built automatically from the categories you use.
- `s` can also be a YouTube link, for example `"https://youtu.be/XXXXXXXXXXX"`. The thumbnail is fetched automatically.
- `p` (poster) is optional.

## 1c. Tool logos (Technical Skills strip)

PNG files in `assets/tools/`, one per tool. Square, **256 × 256 px**, transparent background, under 20 KB. They display at 28 px inside a 40 px tile, so keep a little padding around the logo.

| Tool | File |
|---|---|
| Google Analytics 4 | `ga4.png` |
| Google Search Console | `search-console.png` |
| Google Tag Manager | `tag-manager.png` |
| Microsoft Clarity | `clarity.png` (placeholder tile, replace with the official logo) |
| Looker Studio | `looker-studio.png` |
| Screaming Frog | `screaming-frog.png` (placeholder tile, replace with the official logo) |
| Bing Webmaster Tools | `bing-webmaster.png` |
| SEMrush | `semrush.png` |
| Ahrefs | `ahrefs.png` |

To replace a logo, overwrite the file with the same name. To add a tool, add a line to the `TOOLS` list in `script.js` (name, fallback icon, accent colour, file name without `.png`). If a PNG is missing, the strip shows the simple line icon instead of a broken image.

## 1d. Project card backgrounds (Featured Projects)

Each card header shows `assets/projects/<name>.jpg`. The current files are illustrated industry scenes. Replace any of them with your own photo or screenshot by using the same file name.

| Card | File |
|---|---|
| SaaS & Technology SEO | `saas.jpg` |
| Preschool / Education SEO | `education.jpg` |
| Wealth Management SEO | `finance.jpg` |
| Healthcare SEO | `healthcare.jpg` |
| Website Technical SEO Audits | `audit.jpg` |
| GA4 & GSC Performance Dashboards | `analytics.jpg` |
| SEO Reporting & Data Visualization | `reporting.jpg` |
| AI Search & GEO Experiments | `ai-search.jpg` |

**Size:** 1200 × 600 px (2:1), JPG or WebP, under 150 KB. The header is about 190 px tall and 280 to 400 px wide, so the image is cropped to fit. Keep the subject in the centre and avoid text near the edges. The icon badge sits at the bottom left. Only use photos you own or have a licence for, and do not show client data without permission.

## 2. Text and data to fill in

| Item | Where | What to enter |
|---|---|---|
| Email | `script.js`, top: `CONTACT_EMAIL` | e.g. `"you@domain.com"` |
| Social links | `script.js`, top: `LINKS` | Full URLs for LinkedIn, GitHub, Instagram, YouTube |
| Stats (years, sites, audits, results) | `index.html`, `data-count=""` on the four `<dd>` tags | Numbers only, e.g. `data-count="3"`. Leave empty to keep the dash. |
| Projects (8 cards and case studies) | `script.js`, `PROJECTS` array and card text | Replace the placeholders with verified details |
| Site URL | `index.html`: `canonical`, `og:url`, `og:image`, JSON-LD `url` | Replace `YOUR-USERNAME.github.io` with your real domain |
| Skill tab descriptions | `index.html`, `#p1` to `#p4` | Edit the copy and keywords |
| Queries typed in the hero search bar | `script.js`, `QS` array in `initScene` | Short phrases, about 25 characters or fewer |
| What orbits the bar (keywords, icons, ranking sites, snippets) | `script.js`, `RINGS` array in `initScene` | Edit the text, or add and remove items. `yourbrand.com` is a placeholder |

## 3. What changed in this version

- **Hero (new):** "The Search Bar Universe". A large 3D search bar types real queries while keywords, ranking websites, search snippets, a featured snippet, an AI Overview and icons orbit it on three tilted rings. Each time a query finishes typing, a shockwave ripples out. Follows the dark/light toggle, tilts with the pointer, dollies in slightly on scroll, and shows a plain 2D search bar if WebGL is unavailable. The Earth globe was removed.
- **SEO Workflow:** plays in a loop while on screen and pauses when you scroll away. Added **07 GEO** and **08 AEO**, so there are now 10 steps in two rows of five.
- **Technical Mind. Creative Soul.:** now follows the dark/light toggle (background, cards, text, tiles).
- **Gallery:** supports real images.
- **Video reel (new):** theater screen with playlist, category filters, hover previews, auto-play of the next video, YouTube support, and a placeholder for any missing file.
- **Reduced motion:** visitors who prefer reduced motion see a static version.
