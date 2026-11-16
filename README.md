# PACScribe – Specialty landing page (internal preview)

A static, dependency-free build of the **Solution Page** frame from Figma
(`PACSCRIBE` › node `3748:13719`), with the **Specialty-Focused Medical Imaging
Solution** section fully implemented and interactive.

The copy has been rewritten for this preview, so it doesn't duplicate the live
site. The page is also marked `noindex` (meta tag + `robots.txt`), so search
engines won't index it.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .          # or: python3 -m http.server 8080
```

## Put it live for the team (GitHub Pages, ~3 minutes)

1. On GitHub, create a new repository, e.g. `pacscribe-landing-preview`.
2. Click **uploading an existing file** and drag in **everything in this folder**
   (including the hidden `.nojekyll` file). Then commit.
3. Go to **Settings → Pages**. Under *Build and deployment* choose
   **Deploy from a branch**, then branch `main` and folder `/ (root)`, and click **Save**.
4. After about a minute the link appears at the top of that page:
   `https://<your-github-user-or-org>.github.io/pacscribe-landing-preview/`

> **Visibility:** Pages sites are public, even when the repo is private, unless your
> org is on GitHub Enterprise Cloud (which can restrict Pages to org members).
> The link is unlisted and `noindex`, so it won't be found by search, but anyone who
> has the link can open it.

Updating: upload changed files again (or `git push`), and Pages redeploys automatically.

## Structure

```
index.html              page markup + inline SVG icon sprite
css/styles.css          all styles, tokens, breakpoints, motion
js/main.js              tabs, specialty content, scroll effects, preview widget
assets/img/             hero + 10 specialty header backgrounds (Figma renders), logos (SVG)
assets/icons/           specialty / badge icons exported from Figma (SVG)
robots.txt, .nojekyll   keep the preview out of search; serve files as-is on Pages
```

## Breakpoints

| Width | Behaviour |
|---|---|
| ≥ 1200px | Figma desktop layout: vertical tab rail (326px) + panel, fixed 744px height |
| 1024–1199 | Nav collapses to menu button; rail 272px; panel lists stack when panel < 720px (container query) |
| 768–1023 | Tabs become a horizontal, swipeable chip row above the panel |
| < 768 | Mobile: compact header, 2-up stat tiles, single-column lists, stacked footer |

## Interactions & motion

- ARIA tabs with arrow / Home / End keys (vertical on desktop, horizontal below 1024px)
- Panel content cross-fades, bullets stagger in, the header image settles, and stats count up
- Scroll: reveal-on-scroll, header compacts after 24px, 3px progress bar, gentle hero parallax (desktop/tablet).
  On mobile (<768px) the header + hero stay pinned and the rest of the page slides up over them as a rounded sheet
- Hover: tab chevron nudge and icon scale, button lift, social icon invert
- Everything is disabled under `prefers-reduced-motion`
- Floating **Preview** widget (bottom centre): mobile 390×844, tablet 834×1112 (with rotate),
  desktop. It renders the page in a scaled device frame. Esc or Desktop closes it.

## Security review (static site)

| Check | Result |
|---|---|
| Secrets, API keys, tokens, personal data in repo | None |
| Third-party JavaScript | None. Only first-party `js/boot.js` and `js/main.js` |
| DOM injection / XSS | No `innerHTML`, `eval` or inline handlers; content is set with `textContent` only |
| Content-Security-Policy | Meta CSP: `script-src 'self'`, `connect-src 'none'`, `object-src 'none'`, `form-action 'none'`, `base-uri 'self'`, fonts only from Google Fonts |
| Referrer leakage | `strict-origin-when-cross-origin` |
| Forms | Newsletter form never submits or stores data (preview only) |
| Search indexing | `noindex, nofollow` meta + `robots.txt Disallow: /` |
| Preview iframe | Same-origin only (`frame-src 'self'`) |

Known limits on GitHub Pages: response headers can't be customised, so `frame-ancestors`
(clickjacking) and HSTS preload can't be set. That's low risk for a static page with no
logged-in actions. Google Fonts shares visitors' IP addresses with Google; self-host the
fonts if that matters for compliance.

## Needs developer / content review

- **All copy is placeholder.** Content for the 9 non-OB specialties was written for this
  preview; Figma only has the Gynaecology & Obstetrics content. **All statistics are illustrative**.
  Confirm or replace them before any public launch.
- Each specialty has its own header image, exported from the Figma header frames (background layers only; the text stays live HTML).
  Dentistry has no glow ellipse in Figma, so none is drawn.
- Figma's icons use Font Awesome 6 *Sharp/Pro*; these were exported from Figma as SVG.
  Nav, social and widget icons use Font Awesome Free 6 (CC BY 4.0).
- Fixed in copy: "Gastroenterolgy" → "Gastroenterology", "HIPPA" → "HIPAA".
- Nav, hero and footer below 1200px are not in Figma; their responsive behaviour is
  a proposal.
- Links are `#` placeholders; the newsletter form is not wired to anything.
- The preview widget is a review tool. Remove the `.vp-widget` / `.vp-stage` markup and
  the last block of `js/main.js` for production.
