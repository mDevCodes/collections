# Record Collections — Brand & Style Guide

A reference for designers and tools (e.g. Claude Design) producing brand assets
for **Record Collections**, including the Open Graph / social share image.

Everything below is drawn from the live product: the design tokens in
`styles/globals.css`, the typography in `app/layout.tsx`, and the marketing UI in
`components/landing/Landing.tsx` and `components/NavBar.tsx`.

---

## 1. The product in one line

**Record Collections** is a web app for record collectors to catalogue the vinyl
they own, build a wishlist of what's next, and share their shelf with friends —
"no spreadsheet required."

- **Category eyebrow:** *For record collectors*
- **Hero headline:** *Every record you own, want, and love — in one place.*
- **Support line:** *Catalogue your vinyl, build a wishlist of what's next, and
  share your shelf with fellow Collectors.*
- **Social proof:** *Joined by 40,000+ collectors cataloguing their shelves.*

## 2. Brand personality

Warm, tactile, and analog — the feeling of paper sleeves, printed liner notes,
and a well-loved shelf. Editorial and confident, never sterile or "techy."

Keywords: **warm · vintage-paper · editorial · calm · crafted · collector's-shelf**

Do:
- Lean into the cream/paper background and terracotta accent.
- Use real album cover art as texture (grids or a marquee row of square covers).
- Keep generous whitespace and tight, confident headline typography.

Don't:
- Use pure white (`#ffffff`) or pure black (`#000000`) as page backgrounds.
- Add cool blues, neon gradients, drop shadows with cold tones, or glassy
  "SaaS" gradients.
- Crowd the layout — the brand breathes.

---

## 3. Color

Colors are defined as CSS variables in `styles/globals.css` for both a **light
(default)** and **dark** theme. The light theme is the primary brand look; use it
for the OG image unless a dark variant is explicitly requested.

### Light theme (primary)

| Token | Hex | Role |
| --- | --- | --- |
| `--bg` | `#f4eddf` | Page background — warm cream / paper |
| `--surface` | `#efe7d6` | Raised panels, marquee band, section bands |
| `--text` | `#2b2117` | Primary text — near-black warm espresso |
| `--muted` | `#8a7a60` | Secondary text |
| `--muted-2` | `#6e6151` | Slightly stronger secondary text |
| `--faint` | `#cdbfa4` | Faint text / disabled |
| `--border` | `#e2d6bf` | Hairline borders |
| `--pill-border` | `#d9cbb0` | Outlined button / pill borders |
| `--accent` | `#b0562f` | **Primary accent — terracotta / burnt sienna** |
| `--accent-text` | `#ffffff` | Text/icon on top of the accent fill |
| `--divider` | `#e6dbc6` | List dividers |

### Dark theme (secondary)

| Token | Hex | Role |
| --- | --- | --- |
| `--bg` | `#17110a` | Page background — deep warm brown-black |
| `--surface` | `#1d160d` | Raised panels |
| `--text` | `#f2e8d6` | Primary text — warm cream |
| `--muted` | `#a2937a` | Secondary text |
| `--accent` | `#d99a4a` | **Primary accent — amber / gold** |
| `--accent-text` | `#231607` | Text on accent fill |
| `--accent-glow` | `#d99a4a` | Glow behind the brand dot |

### Footer navy (accent-only)

One deliberate cool tone appears only in the landing-page footer band:

| Hex | Role |
| --- | --- |
| `#141b2e` | Dark navy footer background |
| `#9aa3b8` | Footer wordmark / emphasis text |
| `#6f7a92` | Footer muted text |

Use navy sparingly, if at all, in the OG image — it's a supporting accent, not a
brand color.

### Palette at a glance

- **Primary:** cream paper `#f4eddf` + terracotta `#b0562f` + espresso `#2b2117`
- The accent (terracotta) is the single hero color. One accent, used decisively.

---

## 4. Typography

Two Google fonts, loaded via `next/font` in `app/layout.tsx`.

| Role | Font | Weights in use | Usage |
| --- | --- | --- | --- |
| **Display** | **Schibsted Grotesk** | 400, 500, 600, 700, 800 | Headlines, wordmark, buttons, numerals, anything prominent |
| **Body** | **Space Grotesk** | 400, 500, 600, 700 | Paragraph copy, eyebrows/labels, captions |

### Headline style (the signature look)

Big display type set **extrabold (800)** with **tight tracking** and **tight
leading** — this is the most recognizable typographic trait of the brand.

- Weight: `800` (extrabold)
- Letter-spacing: `-0.035em` on the hero, `-0.03em` on section headings
- Line-height: ~`1.02`–`1.05`
- Color: `--text` (espresso), with the emotional phrase left in the same color
  (the brand does not color-highlight words in the headline)

Example (hero): Schibsted Grotesk, 800, ~62px, tracking `-0.035em`, leading `1.02`.

### Eyebrow / label style

- Font: Space Grotesk, ~12px
- **UPPERCASE**, letter-spacing `0.16em`–`0.18em`
- Color: `--accent` (terracotta) for category eyebrows, `--muted` for section labels

### Body copy

- Font: Space Grotesk, 16–18px, line-height ~1.55, color `--muted`

---

## 5. Logo / wordmark

There is no icon logo — the brand mark is a **typographic wordmark**:

> ● **Record Collections**

- A small **filled accent-colored dot** (a stylized record) immediately left of
  the words, with a soft glow in dark mode (`box-shadow: 0 0 12px var(--accent-glow)`).
- Wordmark text: Schibsted Grotesk, **extrabold (800)**, tracking `-0.02em`,
  ~20px, in `--text`.
- Dot size ≈ 9px at a 20px wordmark; scale proportionally.
- Spacing between dot and text ≈ 9px.

When placing the wordmark on the cream background, the dot is terracotta
`#b0562f` and the text is espresso `#2b2117`.

---

## 6. Shape, spacing & texture language

- **Corner radius:**
  - Buttons & pills: **fully rounded** (`rounded-full`).
  - Album covers: small radius — `5–7px` (they read as square records/sleeves).
- **Buttons:**
  - Primary: solid `--accent` fill, `--accent-text` label, fully rounded,
    Schibsted Grotesk semibold. E.g. *"Create your collection"*, *"Sign up free"*.
  - Secondary: transparent with a `--pill-border` outline, `--text` label.
- **Album covers** are the primary visual texture: square tiles with a soft warm
  shadow (`--cover-shadow: 0 12px 26px -14px rgba(60,40,20,0.55)`), arranged in
  **scrolling marquee rows** on the landing page ("Popular right now"). A row or
  grid of album covers is the most on-brand background motif for an OG image.
- **Layout rhythm:** generous vertical padding, hairline `--border` dividers,
  max content width ~1160px.

---

## 7. Guidance for the Open Graph image

Recommended spec and art direction — hand this section to the design tool.

**Canvas:** 1200 × 630 px (standard OG/Twitter summary_large_image ratio).

**Background:** warm cream `#f4eddf`. Optionally a subtle paper texture. Do not
use white.

**Composition (suggested):**
1. Wordmark top-left: terracotta dot + "Record Collections" in Schibsted Grotesk
   extrabold, espresso `#2b2117`.
2. Hero headline, large, Schibsted Grotesk extrabold, tight tracking
   (`-0.035em`), espresso — e.g. *"Every record you own, want, and love — in one
   place."* Keep to 2–3 lines.
3. Optional category eyebrow above the headline: *FOR RECORD COLLECTORS*, Space
   Grotesk, uppercase, tracking `0.18em`, terracotta.
4. Album-cover texture: a row/grid or fanned stack of square album covers with
   `5–7px` radius and the warm cover shadow — anchored to the right side or
   along the bottom edge. This is the signature brand visual.
5. Optional terracotta pill button shape (*"Start your collection"*) if a CTA is
   wanted, but the headline can stand alone.

**Type:** Schibsted Grotesk (display/headline), Space Grotesk (labels/support).

**Color discipline:** one accent only — terracotta `#b0562f`. Everything else is
paper cream and espresso. No cool gradients, no neon, no pure black/white.

**Dark variant (if needed):** background `#17110a`, text `#f2e8d6`, accent shifts
to amber `#d99a4a`, and the brand dot gets its amber glow.

---

## 8. Quick-reference token sheet

```
Fonts
  Display : Schibsted Grotesk  (700/800 for headlines & wordmark)
  Body    : Space Grotesk      (400–600 for copy, eyebrows, captions)

Light theme
  bg        #f4eddf   surface   #efe7d6
  text      #2b2117   muted     #8a7a60   muted-2 #6e6151
  border    #e2d6bf   divider   #e6dbc6   pill-border #d9cbb0
  accent    #b0562f   accent-text #ffffff

Dark theme
  bg        #17110a   surface   #1d160d
  text      #f2e8d6   muted     #a2937a
  accent    #d99a4a   accent-text #231607   accent-glow #d99a4a

Footer navy (accent only)
  bg #141b2e   text #9aa3b8 / #6f7a92

Shape
  Pills/buttons : rounded-full
  Album covers  : radius 5–7px, shadow 0 12px 26px -14px rgba(60,40,20,0.55)

Headline signature
  Schibsted Grotesk 800 · tracking -0.035em · leading ~1.02
```
