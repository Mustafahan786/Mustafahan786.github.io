# mustafahan786.github.io

Research portfolio of Muhammad Mustafa Khan — robotics, feedback control and mechatronics.
Plain HTML, CSS and a small progressive-enhancement script. **No build step, no framework**:
what is in the repository is exactly what GitHub Pages serves.

## Layout

```
index.html                     Home: about (introduction, portrait, education), selected work, outputs,
                               and a short personal closing note ("Beyond research")
cv.html                        CV page: rendered page previews + open/download actions
404.html                       Not-found page
projects/index.html            Project index — four public projects with structured metadata
projects/<project>.html        One project page each
style.css                      All styling (design tokens at the top of the file)
script.js                      Year, current-page nav, mobile menu, figure lightbox, CV-missing notice,
                               smooth in-page scrolling after load, whole-line setting of the closing note
sitemap.xml, robots.txt        Search infrastructure
assets/img/<project>/…         Images, named <name>-<width>.jpg
assets/img/cv/…                Rendered CV page previews
assets/img/og/…                One social card per page
assets/video/…                 MP4 clips + their poster frames
assets/documents/…             CV PDF
assets/favicon.svg|.png        Site icon
.nojekyll                      Serve files as-is (no Jekyll processing)
```

### URL policy

The canonical home URL is the root form, `https://mustafahan786.github.io/`, and the project index is
`https://mustafahan786.github.io/projects/`. Every page carries a matching `<link rel="canonical">`,
`og:url` and `sitemap.xml` entry — keep those three in step when adding a page.

In-page anchors currently in use: `#work`, `#outputs`, `#beyond-research`, `#about` on the home page, and
per-project section ids on the project pages.

Five legacy files in `assets/` (`afm-control.svg`, `afm-hardware.jpg`, `afm-notch.jpg`, `ai-rl.svg`,
`mused-i.svg`) and `assets/img/social-card.jpg` are no longer referenced by any page. They can be
deleted once you are sure nothing external points at them.

## Replacing the CV

1. Export the approved CV as PDF, keeping selectable text and working hyperlinks.
2. Save it over `assets/documents/Muhammad_Mustafa_Khan_CV.pdf` — **keep that exact filename**, so
   every link on the site keeps working.
3. Re-render the two page previews the CV page displays, at 1240 px wide, and save them as
   `assets/img/cv/cv-page-1-1240.jpg` and `cv-page-2-1240.jpg`, plus 620 px versions with the same
   names ending `-620.jpg`. Any PDF viewer's export, or the Windows `Windows.Data.Pdf` API, will do.
4. If the page count changes, add or remove a `<figure class="cv-page">` block in `cv.html`.

If the PDF is ever missing, the CV page hides the actions and shows a short note with an email link.

## Adding a research output

Open `index.html`, find `<section … id="outputs">`, and copy one `<article class="output">` block:

```html
<article class="output">
  <figure class="output-thumb">
    <img src="assets/img/…" width="720" height="480" loading="lazy" decoding="async" alt="…">
  </figure>
  <div>
    <p class="output-type">Poster presentation · 2026</p>
    <h3>Full title of the work</h3>
    <p class="output-authors"><span class="self">M. M. Khan</span>, A. Author and B. Author</p>
    <p class="output-venue">Venue, place, date. DOI or identifier.</p>
    <ul class="output-links">
      <li><a href="https://doi.org/…">doi:…</a></li>
    </ul>
  </div>
</article>
```

Rules: give the **complete author list in the registered order**, mark the site owner with
`<span class="self">`, and label the output for exactly what it is (poster presentation, dataset,
preprint, journal article). Use the heading "Research outputs", not "Publications", unless a formally
published paper is present. Verify the author list against the authoritative record (the publisher's
landing page or the DOI registry) before writing it.

## Adding a project

1. Copy an existing page, e.g. `projects/voice-coil-actuator.html`, to `projects/<new-name>.html`
   (lower-case, hyphens — GitHub Pages paths are case-sensitive).
2. Update `<title>`, `<meta name="description">`, `<link rel="canonical">` and the `og:` tags, and add
   a unique `assets/img/og/<name>.jpg` social card (1200 × 630).
3. Fill in the hero: `.case-meta` (category · institution · dates), `h1`, `.case-sub`, optional
   `.case-links`, then the strongest authentic visual.
4. Fill in the **research brief** — the `.brief` block. It carries exactly four entries:

```html
<div class="brief">
  <h2 class="sr-only">Research brief</h2>
  <dl>
    <div><dt>Research question</dt><dd>…</dd></div>
    <div><dt>Approach</dt><dd>…</dd></div>
    <div><dt>Individual contribution</dt><dd>…</dd></div>
    <div><dt>Experimental evidence</dt><dd>…</dd></div>
  </dl>
</div>
```

   Use "Objective" in place of "Research question", and "Current status" in place of "Experimental
   evidence", where that is the honest label. Do not restate the same facts in the hero, the brief and
   the narrative — the brief is the single place the summary lives.
5. Write the narrative as `<section class="stage">` blocks with plain `<h2>` headings. **Do not number
   the headings** and do not force every project through the same sequence; delete any section the
   evidence does not support. Add `<nav class="contents">` only if the page is long enough to need it.
6. State each limitation once, in a `.limits` block near the end.
7. Add an `<article class="index-entry">` to `projects/index.html`, a `sitemap.xml` entry, and a card
   on `index.html` only if the project belongs in the selected four.

Target roughly 650–850 words of narrative per project page.

### Concept illustrations (listing covers)

`assets/img/concepts/` holds the generated editorial covers (the AFM banner below; the earlier glove, sEMG and
voice-coil concept covers are kept but unused). They are **not evidence** and carry three obligations everywhere they appear:

1. a visible `<span class="tag tag-concept">Concept illustration</span>` in the figcaption;
2. alt text of the form `Concept illustration of …; not experimental evidence.`;
3. never the labels Photograph, Measured, CAD, Simulation or Experimental result.

They may be used as listing covers and introductory conceptual figures only. Inside a project page the
authentic photographs, CAD, measured plots, simulations and videos remain primary.

**AFM cover.** The AFM entry uses the labelled 4:3 banner `assets/img/concepts/afm-concept-v6-{640,1280}.jpg`
(source: `assets/img/afm/source/concept-cover/afm-concept-v6-labelled-1448x1086.png (smaller inset; v5 earlier)`, generated with an image model
from Mustafa's brief; labels PZT, Cantilever, Laser Diode, QPD, Standard Sample). It is shown whole at 4:3 (class
`cover-4x3`: no `object-fit` crop) and follows the three concept rules above. On the home page (from 900px) and the
Projects page (from 880px) its caption and the project links share a bottom grid row (CSS subgrid), centred on
each other. The earlier `afm-concept-v5-*`, `afm-concept-v4-*`, `afm-concept-v3-*` and photo-only `afm-setup-cover-*` covers are kept
but unused. The social card is `assets/img/og/afm-v2.jpg` (the current title beside the AFM-head photograph);
`og/afm.jpg` carried an earlier working title and is no longer referenced.

**sEMG cover.** The sEMG entry uses the team's original animated graphical abstract, not a concept
illustration: `assets/img/semg/semg-graphical-abstract-banner.gif` (466 × 307, 51 frames at 100 ms, looping). It was
cut from `Portfolio Source/…/Project # 1 sEMG based protocol development/Graphical Abstract.gif` (600 × 338; the
original is unchanged) by removing the embedded title capsule and the outer white margin and outline from every
frame, with the original palette, timing and loop kept exactly. `semg-graphical-abstract-poster.png` is the final,
fully built frame: the reduced-motion image, the pause state and the home-page cover, where it sits whole in the same
4:3 frame as the other secondary cards (class `cover-ga-still`: letterboxed on the artwork's own background, #faf8fa,
with no play control because nothing moves); `semg-graphical-abstract-card-4x3.png`
is the same frame padded to 4:3 for related-project links. Both covers share the caption "Forearm sEMG control,
interactive rehabilitation tasks and visual feedback." The Projects card shows the GIF whole (class `cover-ga`)
with the caption tag "Graphical abstract"; `script.js` adds a small pause button and starts paused for readers who
prefer reduced motion. The social card is `assets/img/og/semg-v3.jpg`. The project page's protocol schematic
(`assets/img/semg/semg-protocol-schematic-1020.png`) and gesture-mapping figure (`semg-gesture-mapping-894.png`) are
the original artwork of Fig. 1 and Fig. 4 in the final manuscript draft (9 March 2023), extracted losslessly from the PDF
without the printed captions; they open at full size in the lightbox (`data-zoom="natural"`). The earlier SVG system-overview banner,
`semg-rehabilitation-loop-cover*.svg`, `semg-pipeline-card-*` and the `semg-realtime-*` images and video (the latter
are third-party material, not from this project) are no longer referenced.

**Voice-coil cover.** The voice-coil entry uses `assets/img/vca/vca-concept-figure-{640,960,1448}.jpg`, shown whole
at 4:3 (class `cover-4x3`): a labelled concept figure of the stage (coil assembly, permanent magnets, guide rods) above a
simplified analogue position-feedback path. It follows the three concept rules above, with the caption tag "Concept
illustration", and the related-project cards use the 640 px file. The project page itself shows the authentic labelled
frame from the set-point recording, `assets/img/vca/vca-stage-labelled-{640,1080}.jpg`; its provenance, and that of
the other voice-coil media added in September 2026 (overview and experiment videos, DC-check chart, functional
diagram), is recorded in `assets/img/vca/source/README.md`. The earlier `assets/img/concepts/vca-concept-v2-*` cover,
the `vca-bench-cad-card-*` thumbnails and the `vca-title-figure-*` images are kept but no longer referenced.

**Glove cover.** The glove entry, "sEMG-Controlled Soft Robotics Glove for Game-Based Hand Rehabilitation" (project
dates 2023–2024; the report citation on the page keeps its own date, June 2023), uses
`assets/img/glove/glove-prototype-card-{640,960}.jpg` (4:3, class `cover-4x3`, caption tag "Prototype"): two frames
of the prototype video, open/rest above and close below, cropped to the same band and labelled only with the hand
state. The armband, the game on the monitor and the glove are visible in both. The card links are "View project" and
"Watch prototype video" (`#prototype-video`), which opens the video (`assets/video/glove-prototype-linkedin.mp4`) in
the page's Overview section. The social card is `assets/img/og/glove-v4.jpg`. Provenance and build notes for the
cover, the two schematics, the sEMG traces and the finite-element figures are in `assets/img/glove/source/README.md`.
The earlier labelled overview (`glove-overview-card-*`), the social cards `og/glove-v2.jpg` and `og/glove-v3.jpg`,
the illustrative animation `assets/video/glove-system-overview*` and the `glove-concept-v2-*` cover are kept but no
longer referenced.

`assets/img/concepts/source/` keeps the full-resolution PNGs (approximately 2 MB each) for re-export. **They are
never served** — only the `-640.jpg` and `-1200.jpg` derivatives are referenced. If you regenerate a
cover, re-cut both derivatives at exactly 16:10 (640 × 400 and 1200 × 750).

**Related-project cards.** Project pages end with compact cards (`.related`: a 104 px thumbnail shown whole at 4:3
with `object-fit: contain` in a white frame, then the title and a one-line note; two columns from 720px, one below).
They use the current listing titles and these thumbnails: AFM `assets/img/concepts/afm-concept-v6-640.jpg`,
voice-coil stage `assets/img/vca/vca-concept-figure-640.jpg`, sEMG
`assets/img/semg/semg-graphical-abstract-card-4x3.png` and glove `assets/img/glove/glove-prototype-card-640.jpg`.
When a listing title or banner changes, update the cards on the AFM, voice-coil, sEMG, glove and
motor-condition-monitoring pages as well.

### Concept animations

`.concept-anim` wraps an inline SVG whose moving parts carry `.anim-move`. Motion is **paused by
default** and runs only on hover, on keyboard focus, or when the in-figure button is pressed (the only
route on touch). It stops entirely under `prefers-reduced-motion: reduce`, and the static frame is a
complete, readable diagram on its own. Label it `Concept animation` and never let it carry a numerical
result or imply the drawing is an exact model of the apparatus.

### Figures

```html
<figure class="fig">
  <a class="zoom" href="../assets/img/<project>/<name>-1600.jpg">
    <img src="../assets/img/<project>/<name>-800.jpg"
         srcset="../assets/img/<project>/<name>-800.jpg 800w, ../assets/img/<project>/<name>-1600.jpg 1600w"
         sizes="(min-width: 720px) 45vw, 92vw" width="800" height="513" loading="lazy" decoding="async"
         alt="Describe what the picture shows.">
  </a>
  <figcaption><span class="tag">Measured</span>What this shows and why it matters.</figcaption>
</figure>
```

* Always set `width`/`height` (prevents layout shift) and `alt`, and `loading="lazy"` below the fold.
* Label the evidence type with `<span class="tag">`: **Measured, Simulation, CAD, Schematic, Diagram,
  Photograph, Video, Interface preview**. Use `<span class="tag tag-sim">Simulation</span>` for
  anything simulated, and the same class for `Interface preview` where values are placeholders.
* Any reconstructed or non-photographic visual must be labelled. Never present a generated image as
  research evidence, and never fabricate apparatus, instrument screens, plots or measurements.
* Never crop axes, legends, units or scale bars to make a figure fit a card.
* Layout helpers: `.fig-wide` (940 px cap), `.fig-mid` (780 px), `.fig-narrow` (560 px),
  `.fig-diagram` (720 px, keeps drawn diagrams near their natural size), `.fig-native` (never upscales
  a small source beyond its own pixels), `.fig-pad` / `.fig-frame` for bordered figures, and
  `.fig-grid .fig-grid-2|-3` for comparisons.
* Do not put a landscape photograph and a portrait photograph in equal-height grid cells — pair each
  with text or a diagram instead.

### Image derivatives

Name every file `<name>-<width>.jpg` and generate the sizes the `srcset` lists. Never upscale: if the
source is 394 px wide, publish it at 394 px and use `.fig-native`.

### Video

```html
<video controls preload="none" playsinline width="1280" height="720"
       poster="../assets/video/<name>-poster.jpg">
  <source src="../assets/video/<name>.mp4" type="video/mp4">
  Your browser cannot play this video. It shows …
</video>
```

Keep `preload="none"`, never add `autoplay`, and do not add `loop` to evidence clips. Aim for clips
under ~5 MB, no sound.

## The homepage portrait

`assets/img/about/portrait-selected-transparent-1254.png` is the user-selected portrait, copied
unchanged at 1254 × 1254 px with its transparency intact. The About page places it over a soft grey
gradient (`#c2c7d2` → `#bec4d0` → `#b5bbc7`) matching the selected reference. The circular frame
shows the head, shoulders and upper chest, with headroom and all fingers outside the frame.
No facial retouching or AI regeneration is applied.
The portrait is 320 px on desktop, 240 px on tablet and 152 px on mobile. Its intrinsic dimensions
reserve space before loading, and the image has descriptive alt text and high fetch priority.
Previous portrait assets remain available for recovery. To replace it, add a distinctly named
image and update its `src`, dimensions and alt text in `index.html` as needed.

## Accessibility and motion

* Nothing is hidden waiting for JavaScript. There is no scroll-reveal; the `js` class on `<html>`
  only upgrades the mobile navigation into a disclosure menu, and without it the links simply wrap
  under the brand.
* `aria-current="page"` marks the current page in the nav — `script.js` adds it, and a page may also
  declare it in the markup.
* The mobile menu returns focus to its button on Escape, and moves focus to the target section when
  an in-page link closes it.
* Only media that is itself a link scales on hover.
* Standalone links have 44 px touch targets below 700 px.
* Motion is limited to short hover/focus transitions and respects `prefers-reduced-motion`.

## Local preview

Any static server works, for example:

```bash
python -m http.server 8787
```

then open `http://localhost:8787/`. Opening files directly with `file://` also works, except that the
CV-missing check is skipped.

## Conventions worth keeping

* One accent colour (`--accent` in `style.css`); everything else is ink on warm white. Every figure-caption label
  (`.tag`: Measured, Simulation, CAD, Concept illustration …) uses it with the same type; `tag-concept` and
  `tag-sim` mark the figure type in the markup and do not change the colour.
* Homepage project cards repeat their Projects-page entries word for word: title, description, *My contribution*,
  *Key result*, category · institution · dates, the primary link *View project* plus any project-specific second link
  (AFM *View imaging results*, sEMG *View task results*, glove *Watch prototype video*), and the cover with its
  caption. Edit both places together. Date ranges use a closed en dash (`September 2025–present`) and sit in a
  `.nowrap` span, so a wrapping line breaks at a separator rather than inside a date. The three secondary homepage
  cards share row tracks from 700px (CSS subgrid), so equivalent parts line up without spacer markup.
* Every page links the stylesheet as `style.css?v=YYYY-MM-DD`, the date of the last stylesheet change (`/style.css?v=…`
  on `404.html`). When `style.css` changes, update the date on every page — `index.html`, `cv.html`, `404.html` and
  `projects/*.html` — so a refresh loads the same styles everywhere.
* The homepage closing note ("Beyond research") is one plain-text paragraph across the full content width.
  `script.js` chooses its line breaks so every line, the last one included, runs to both edges, at a size between
  body text and 4% above the lede. Where no size gives even spacing (usually phones) it stays an ordinary
  ragged paragraph. Keep links and other markup out of it, or the script leaves it as an ordinary paragraph.
* Two webfonts (Newsreader, IBM Plex Sans) and the system monospace stack for technical labels.
* Nothing that carries meaning is set below 13 px (`--fs-meta`).
* Claims on the site are traceable to a primary source; simulations, literature thresholds and
  interface previews are labelled as such, and team work is attributed to the team.
* State a limitation once, where it matters — not defensively in several places.
* All filenames are lower-case with hyphens (except the CV PDF).
