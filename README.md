# Dilshad Ansari — Portfolio

A cinematic, dark, typography-driven developer portfolio built with Next.js 14,
TypeScript, Tailwind CSS and Framer Motion.

## Visual direction — how the reference videos were used

Both reference videos were extracted frame-by-frame (via `ffmpeg`) and reviewed
directly rather than guessed at from the filenames. What they actually showed:

- **Video 1** (saree/textile e-commerce brand reel): floating browser mockups
  at a slight tilt, warm editorial photography sections, script-accent +
  bold-sans mixed typography ("Woven to be *Remembered*"), horizontal product
  card rows.
- **Video 2** ("Websites in 2026" reel): dark, cinematic backgrounds; huge bold
  lowercase-sans typography reveals ("it's wear—", "sustainability"); isometric
  3D brand illustrations; minimal nav with dot pagination; technical/label
  captions in small caps.

Neither video was actually a *developer portfolio* — both were product/brand
site showcases — so rather than literally copy either, I extracted the
underlying visual language (dark cinematic backgrounds, huge type reveals,
minimal nav, technical mono-font labels, grid-line textures, floating masked
imagery) and applied that language to a personal developer portfolio
structure. This is a deliberate interpretation, not a literal recreation, and
worth mentioning in your video walkthrough.

## What's implemented

- **Hero**: full-bleed dark hero, huge two-line name treatment (solid +
  outlined text), your real photo in a custom angular clip-path mask (not a
  rectangle), mouse-parallax on the photo and its ambient glow, animated
  availability indicator, dual CTA buttons, ambient canvas particle field,
  grid-line background texture.
- **Navigation**: minimal, hides on scroll-down/reveals on scroll-up, blurs in
  once scrolled, full-screen circular-wipe mobile menu.
- **About**: editorial two-column layout, second personal photo masked the
  same way, large pull-quote-style bio, stat row.
- **Work**: each of your 6 projects gets a full visual "slide" — index, name,
  tag, description, tech pills, view/code links, and a large interactive
  3D-tilt panel (mouse-follow rotateX/rotateY via Framer Motion springs) with
  oversized ghost-text project name and a grid texture.
- **Skills**: two counter-scrolling marquees of your tech stack in huge
  typography — explicitly no percentage bars, per your brief.
- **Experience/Education**: minimal timeline, exactly the two entries you gave
  me, nothing invented or exaggerated.
- **Contact**: huge three-line cinematic sign-off, magnetic CTA button, real
  email/GitHub/LinkedIn links.
- **Interaction layer**: custom cursor (dot + lagging ring that expands on
  hover targets), magnetic buttons, scroll-linked line-reveal text animation,
  page-load counter/loader with a clip-path wipe transition, film-grain noise
  overlay — all built with Framer Motion (no GSAP: Framer Motion alone covers
  every effect requested, so a second animation library wasn't added just to
  add one).
- **Responsive**: verified at both 1440px desktop and 390px mobile widths —
  mobile isn't just a shrunk desktop layout: the hero restacks text-over-photo,
  project panels go full-width above their text instead of side-by-side, and
  navigation collapses into a full-screen menu.

## Honest scope notes

- **No real project screenshots were provided** — only your personal photos.
  Each project panel currently uses a generated abstract gradient + ghost-text
  treatment (a common, legitimate premium-portfolio pattern when real product
  shots aren't available yet) rather than a fabricated fake screenshot. Drop
  real screenshots into `public/images/projects/` and swap the placeholder
  `<div>` in `components/ProjectCard.tsx` for an `<Image>` when you have them —
  the tilt/hover interaction already works on either.
- **No WebGL/Three.js/shaders** were used. Every effect requested (parallax,
  3D tilt, text reveal, magnetic buttons, masked image reveal, particle
  ambiance) is achievable with CSS transforms + Framer Motion at production
  quality, and reaching for Three.js/shaders for effects that don't need them
  would add bundle weight and complexity without a visible quality gain here.
  If you want a genuine WebGL centerpiece (e.g. a shader-distorted hero image),
  that's a good next iteration — flag it in your interview as a considered
  choice, not an oversight.
- One image you supplied (`portrait3.png` — the headphones/blazer style shot)
  wasn't used in the final layout since the brief's Hero/About slots called
  for a clear, front-facing photo; it's still in `public/images/` if you want
  to use it in an "About" gallery or similar section later.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build && npm run start   # production build
```

## Project structure

```
app/
  layout.tsx        fonts (self-hosted @fontsource, no external font fetch), metadata
  page.tsx           assembles all sections
  globals.css        noise texture, marquee keyframes, grid-line background, cursor CSS
components/
  Loader.tsx          page-load counter + clip-path wipe
  CustomCursor.tsx     dot + lagging ring cursor
  Nav.tsx              scroll-aware nav + mobile menu
  Hero.tsx             hero section
  About.tsx            editorial about section
  Work.tsx / ProjectCard.tsx   project showcase + 3D tilt cards
  Skills.tsx           counter-scrolling typography marquee
  Experience.tsx       timeline
  Contact.tsx          cinematic contact section
  Footer.tsx
  Reveal.tsx           scroll-triggered line-reveal + fade-up primitives
  MagneticButton.tsx   cursor-follow magnetic button
  ParticleField.tsx    canvas ambient particles
lib/
  projects.ts          your 6 projects as data
public/images/          your uploaded photos
```

## Update: `motion` package + accessibility pass

Two follow-up changes were made after the initial build, at your request:

1. **Migrated `framer-motion` → `motion`**: same team, same API, now the
   actively-developed unified package. Every `import ... from "framer-motion"`
   became `import ... from "motion/react"`; no animation logic changed. Verified
   with a full rebuild + visual re-check afterward — zero regressions.

2. **`prefers-reduced-motion` support**: I checked
   [uupm.cc](https://uupm.cc) / the `ui-ux-pro-max` skill's `motion.csv`
   dataset, which flags this as a requirement on *every* motion pattern
   (hover micro-interactions, scroll reveals, magnetic cursor-follow, stagger
   lists) — something the first build was genuinely missing. Added:
   - `lib/useReducedMotion.ts` — a shared hook wrapping
     `matchMedia('(prefers-reduced-motion: reduce)')`
   - Wired into `Hero` (skips mouse-parallax tracking), `CustomCursor` (doesn't
     render at all), `MagneticButton` (no pull), `ParticleField` (no ambient
     canvas animation)
   - A global CSS fallback that disables smooth-scroll and slows the skills
     marquee to near-static for anyone with the OS setting on

I looked at the rest of that skill's data (`styles.csv`, `colors.csv`, the
bundled `portfolio-dark` example) but didn't adopt its example color palette —
it's a generic slate/blue/purple scheme, whereas this site's rust/void palette
comes directly from the reference videos you originally sent, which is more
faithful to your actual brief. Worth knowing in case you're asked why the
palette doesn't match that example.

## Update: fixed the dead "Say Hello" button + made it convert

You reported clicking "Say Hello" did nothing. Root cause: it was a plain
`mailto:` link. Those silently do nothing if the visitor's device/browser has
no default mail client configured — no error, no fallback, just silence. That
happens more often than you'd expect: sandboxed previews, many phones, a lot
of work laptops.

Fixed by making every contact action give **visible feedback no matter what**:

- Clicking **Say Hello** now copies your email to the clipboard and shows a
  toast confirmation ("Email copied to clipboard"), *then* also attempts to
  open the visitor's mail app as a bonus — never the only feedback.
- Added a proper **"Tell me about your project" brief form** (name, project
  type, message) in the Contact section. Submitting it copies the full message
  to clipboard, shows a toast, and opens a pre-filled `mailto:` as a bonus.
  This gives a client a concrete action to take instead of just staring at an
  email address.
- Added `components/Toast.tsx` — a small reusable confirmation toast used by
  both of the above.

## Update: made the site convert, not just look good

You asked for something that makes a client land on the page and think "you
should build my project." A beautiful animation reel doesn't do that on its
own — it needs to say, in plain language, what you build and that you're
available. Added:

- **New Services section** (`components/Services.tsx`, right after About):
  "Have a project in mind?" with four concrete, outcome-framed offerings —
  Full-Stack Web Apps, AI-Powered Products, MVPs & Startup Builds, Premium
  Interfaces — plus a small "currently taking on new projects" availability
  line. This directly answers the client's real question ("can this person
  build what I need?") before they even reach your project list.
- **Floating "Start a Project" CTA** (`components/FloatingCTA.tsx`): a small
  persistent button, bottom-right, that appears once a visitor scrolls past
  the hero and hides again near the Contact section (so it doesn't compete
  with the section that's already asking for contact). Standard, proven
  conversion pattern — the ask is always one click away without being pushy.
- Section numbering (`01 / About` → `06 / Contact`) updated to account for the
  new Services section, and Nav updated to include it.

None of this is fake urgency or dark-pattern copy — it's just making the real
value proposition legible instead of implicit.

## Update: horizontal-scroll Work section + Say Hello re-check

**On "Say Hello did nothing" (again):** I checked the current source — the fix
from before (copy-to-clipboard + toast, no bare `mailto:` link) is intact and
working; I re-tested it end-to-end with an automated click test and it copies
the email correctly every time. If you're still seeing the old broken
behavior (a browser status-bar preview showing `mailto:...` on hover means
it's a real `<a href>` again, which this version doesn't use), you're almost
certainly testing a stale build — **fully replace your project folder with
this zip**, delete any old `.next` and `node_modules` folders, then
`npm install && npm run dev` fresh. A leftover `.next` cache or an older
deployed copy is the most common cause of "I fixed this already, why is it
still broken."

**Horizontal scroll, but not the whole site:** A fully horizontal-scroll
*website* is a rough fit for mobile — it fights the OS's native vertical swipe
and is easy to get visually "stuck" mid-gesture on a touchscreen. Since your
original brief specifically listed horizontal scrolling as an option for the
*project* section (not the whole page), that's where I applied it:

- **Desktop/tablet** (`components/WorkHorizontal.tsx`): normal vertical page
  scroll drives a *pinned, horizontally-panning* gallery through all 6
  projects — scroll down, projects slide left, cinematically, with a progress
  bar and a "scroll to explore" hint that fades after the first bit of motion.
  This is the same "vertical-scroll-drives-horizontal-pan" technique used in
  the kind of premium product sites your reference videos showed.
- **Mobile** (`<md`): unchanged — the same straightforward stacked vertical
  cards from before. This isn't a fallback in the "worse version" sense; it's
  a deliberately different, better-suited interaction for touch, per the
  original brief's own note that mobile should be "a carefully designed
  version rather than simply shrinking the desktop layout."

If you actually want the *entire site* to scroll horizontally (not just Work),
say so explicitly and I'll rebuild it that way — it's a much bigger
restructuring (every section's internal layout changes) and a real mobile-UX
trade-off, so I didn't want to guess wrong on something that size.

## Update: filled project boxes, fixed whitespace, added premium touches

Four concrete fixes from your feedback:

1. **Project boxes were empty** — each project panel (both desktop horizontal
   gallery and mobile stacked cards) now shows a real mockup illustration
   instead of just ghost text: a browser-chrome header (traffic-light dots +
   address bar) plus a domain-specific animated skeleton UI —
   GymFlow AI gets an animated bar chart, LEVI AI gets a live waveform,
   Sign Language Recognition gets pulsing landmark dots, the e-commerce clone
   gets a product grid, the healthcare app gets table rows, the job-cards app
   gets a card list. See `components/ProjectVisual.tsx`. These are honest,
   clearly-stylized illustrations — not fake screenshots — since I don't have
   real product screenshots to show. Swap in real ones later by replacing
   `<ProjectVisual variant={...} />` with an `<Image>` once you have them.
2. **Too much empty space above/below "Things I've built."** — the previous
   fix for a scroll-overlap issue used a full `min-h-screen` centered block,
   which was overkill and created the dead space you flagged. Turned out the
   "overlap" I was fixing wasn't a real bug — it was a mid-scroll screenshot
   catching normal transition between sections, not an actual layout defect.
   Reverted to compact padding; space is tight now.
3. **Services section animation** — cards now animate in with more presence
   (scale + lift, not just a fade), each icon sits in a glowing ring, and a
   thin accent line draws in across the top of a card on hover.
4. **"Doesn't feel premium/futuristic"** — added a soft rust-tinted light
   that follows the cursor across the whole page (`components/Spotlight.tsx`),
   and a subtle scanning light sweep inside each project visual. Both are
   intentionally subtle — ambient depth, not flashy effects — and both are
   skipped entirely for visitors with reduced-motion preferences enabled, same
   as every other motion effect on the site.

## Update: form validation, real inbox delivery, and a desk-scene illustration

**Real bug fixed — validation was missing.** The brief form would previously
"send" even completely empty, copying a mostly-blank message
(`Name: —`) to the clipboard. Added proper validation: name, a valid-looking
email, and a message of at least 10 characters are all required before
anything is sent. Invalid fields get a red border and inline error text, and
an attempted empty submit shows a toast instead of silently doing nothing. A
matching bug was also found and fixed here: the earlier code used a
`text-danger` / `border-danger` Tailwind class that was **never actually
defined** in this project's `tailwind.config.ts` — so error text was silently
rendering in the default text color instead of red. Added a proper `danger`
color token.

**Real email delivery, not just mailto.** Previously "Send Brief" only opened
*the visitor's own* mail app with a pre-filled draft — if they don't have one
configured, or don't hit send themselves, you never actually receive
anything. To fix this properly (a message really landing in your Gmail inbox
without depending on the visitor's device), the form now supports
[Formspree](https://formspree.io): a free service that turns a plain
`fetch()` POST into an email in your inbox, no backend required. **Setup
takes about 2 minutes:**
1. Go to formspree.io, sign up free, create a new form pointed at
   `dilshadansariu@gmail.com`.
2. Copy the form's endpoint URL (looks like `https://formspree.io/f/xxxxxxxx`).
3. Open `components/Contact.tsx` and paste it into the `FORMSPREE_ENDPOINT`
   constant near the top of the file.

Until you do that, the form still works exactly as before (validated, then
falls back to mailto + clipboard) — it just won't land in your inbox on its
own. I didn't wire up a real email service without your input because that
needs an account and credentials only you can create; I'm not able to
generate real API keys on your behalf.

Also added a proper **sender email field** to the form — previously there was
no way to collect the visitor's email, so even if a message had reached you,
you'd have had nothing to reply to.

**Contact section's empty right side.** Added `components/DeskScene.tsx`: a
small animated illustration — a lamp switching on, then a desk, chair,
laptop (screen glowing) and a developer silhouette, gently rotating in 3D
like a product turntable. One honest scope note on this: you asked for an
exact sequence of camera angles (front, left, back, right, top) — that level
of a real "walk around a 3D character" effect needs an actual rigged 3D model
(built in Blender/similar, then rendered via Three.js or a Spline embed),
which isn't something that can be faithfully hand-built from flat CSS/SVG
shapes; rotating flat 2D art a full 360° in 3D space looks broken edge-on
around 90°/270°. What's built instead captures the same spirit — a
scene that visibly comes to life and gently turns to show it from an angle —
within a moderate, non-degenerate rotation range. If you have or can source
an actual 3D model file (`.glb`) or a Spline scene link, I can wire that in
instead for a truly multi-angle view.

## Update: vertical Services, richer project visuals, real security pass

- **Services** is now a vertical list (numbered rows, icon ring, cursor-spotlight + accent-line hover) that reuses the row language of the Experience timeline.
- **Project visuals** are fuller illustrated app mockups (dashboard, voice, hand-tracking, records table — plus spare store / job-card / form mockups in `ProjectVisual.tsx` for future projects). To use a **real screenshot**, put the file in `public/images/projects/` and set `image: "/images/projects/<file>.png"` on that project in `lib/projects.ts` — `ProjectMedia` swaps it in automatically. Likewise set `link` / `github` and the card CTAs become real links.
- **Security**: Next.js 16.4.0, `sharp` 0.35.5, security headers, form hardening (honeypot, cooldown, length caps, sanitizing). Full checklist with N/A reasoning is in `SECURITY.md`.
- **Contact form** now delivers through Formspree (`FORMSPREE_ENDPOINT` in `components/Contact.tsx`).
- `lib/utils.ts` adds the `cn()` helper (clsx + tailwind-merge) that shadcn/Aceternity/Magic UI components rely on.

## A build note worth knowing

The scroll-triggered "line reveal" text effect (used for the big headlines)
combines an `overflow: hidden` mask with a child that starts translated below
it. Naively wiring Framer Motion's `whileInView` directly to that translated
child creates a deadlock: the mask clips the child to zero visible area at its
initial position, so the browser's IntersectionObserver never reports it as
"in view" — it can't reveal itself because it's hidden, and it's only hidden
because it hasn't revealed itself yet. `components/Reveal.tsx` fixes this by
observing visibility on the *unclipped outer wrapper* with `useInView`, then
driving the clipped child's animation from that boolean. Worth understanding
before your code walkthrough, since it's exactly the kind of animation-timing
bug that's easy to introduce and non-obvious to debug.
