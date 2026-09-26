# mustafahan786.github.io

Research portfolio of Muhammad Mustafa Khan — robotics, feedback control and mechatronics.
Plain HTML, CSS and a small progressive-enhancement script. **No build step, no framework**:
what is in the repository is exactly what GitHub Pages serves.

## Layout

```
index.html                     Home: hero, selected work, research interests, outputs, about
cv.html                        CV page: rendered page previews + open/download actions
404.html                       Not-found page
projects/index.html            Project index — four public projects with structured metadata
projects/<project>.html        One project page each
style.css                      All styling (design tokens at the top of the file)
script.js                      Year, current-page nav, mobile menu, figure lightbox, CV-missing notice
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

In-page anchors currently in use: `#work`, `#research`, `#outputs`, `#about` on the home page, and
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

`assets/img/concepts/` holds the four current generated editorial covers used on the home page and the project
index. They are **not evidence** and carry three obligations everywhere they appear:

1. a visible `<span class="tag tag-concept">Concept illustration</span>` in the figcaption;
2. alt text of the form `Concept illustration of …; not experimental evidence.`;
3. never the labels Photograph, Measured, CAD, Simulation or Experimental result.

They may be used as listing covers and introductory conceptual figures only. Inside a project page the
authentic photographs, CAD, measured plots, simulations and videos remain primary.

`assets/img/concepts/source/` keeps the full-resolution PNGs (approximately 2 MB each) for re-export. **They are
never served** — only the `-640.jpg` and `-1200.jpg` derivatives are referenced. If you regenerate a
cover, re-cut both derivatives at exactly 16:10 (640 × 400 and 1200 × 750).

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

`assets/img/about/portrait-{312,416,624}.jpg` is a 3:4 crop of an original photograph that stays
outside this repository. To replace it, export a new 3:4 crop at 624 px wide plus 416 px and 312 px
versions, keep the filenames, and update the `alt` text and `.hero-caption` in `index.html` if the
setting changes. Do not publish a portrait larger than its source.

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

* One accent colour (`--accent` in `style.css`); everything else is ink on warm white.
* Two webfonts (Newsreader, IBM Plex Sans) and the system monospace stack for technical labels.
* Nothing that carries meaning is set below 13 px (`--fs-meta`).
* Claims on the site are traceable to a primary source; simulations, literature thresholds and
  interface previews are labelled as such, and team work is attributed to the team.
* State a limitation once, where it matters — not defensively in several places.
* All filenames are lower-case with hyphens (except the CV PDF).
