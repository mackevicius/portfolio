---
name: Shot Tracer
description: A portfolio explored as a round of televised golf; a flat top-down course, broadcast graphics, and focused project flyovers.
colors:
  ground: '#0f3d24'
  rough: '#164a2c'
  fairway: '#2a7d45'
  fairway-stripe: '#24713d'
  fringe: '#5fa456'
  putting-green: '#7fbf6a'
  sand: '#e8dcb0'
  tee: '#3d9a58'
  tree: '#0b311e'
  haze: '#14452b'
  tracer: '#ffd400'
  tracer-ink: '#111611'
  panel: 'rgb(8 30 18 / 0.92)'
  panel-solid: '#08261a'
  panel-line: 'rgb(255 255 255 / 0.12)'
  paper: '#ffffff'
  ink: '#0f3d24'
  ink-body: '#18251d'
  ink-muted: '#4d5d53'
  paper-line: '#e3e8e4'
  screen-wash: '#eef2ef'
  label: '#9cc8a5'
  soft: '#c4dccb'
  alert: '#c62f2f'
  clock-face: '#000000'
  live-dot: '#26cf86'
typography:
  display:
    fontFamily: 'Barlow Semi Condensed, Arial Narrow, sans-serif'
    fontSize: '40px'
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: '0em'
  headline:
    fontFamily: 'Barlow Semi Condensed, Arial Narrow, sans-serif'
    fontSize: '34px'
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: '-0.005em'
  title:
    fontFamily: 'Barlow Semi Condensed, Arial Narrow, sans-serif'
    fontSize: '22px'
    fontWeight: 800
    lineHeight: 1.05
  tag:
    fontFamily: 'Barlow Semi Condensed, Arial Narrow, sans-serif'
    fontSize: '18px'
    fontWeight: 700
    lineHeight: 1
  button:
    fontFamily: 'Barlow Semi Condensed, Arial Narrow, sans-serif'
    fontSize: '16px'
    fontWeight: 700
    letterSpacing: '0.02em'
  label:
    fontFamily: 'Barlow Semi Condensed, Arial Narrow, sans-serif'
    fontSize: '13px'
    fontWeight: 600
    letterSpacing: '0.06em'
  body:
    fontFamily: 'Barlow, Helvetica Neue, Arial, sans-serif'
    fontSize: '16px'
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: '"tnum" 1'
  body-sm:
    fontFamily: 'Barlow, Helvetica Neue, Arial, sans-serif'
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: 'Barlow, Helvetica Neue, Arial, sans-serif'
    fontSize: '13px'
    fontWeight: 400
    lineHeight: 1.4
  clock:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1
    letterSpacing: '0em'
rounded:
  none: '0px'
  bubble: '10px'
  screen: '12px'
  clock: '8px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '12px'
  lg: '16px'
  xl: '22px'
  edge: '28px'
  gutter: '40px'
components:
  location-clock:
    backgroundColor: '{colors.clock-face}'
    textColor: '{colors.paper}'
    typography: '{typography.clock}'
    rounded: '{rounded.clock}'
    padding: '0 16px'
    height: '44px'
  button-primary:
    backgroundColor: '{colors.tracer}'
    textColor: '{colors.tracer-ink}'
    typography: '{typography.button}'
    rounded: '{rounded.none}'
    padding: '0 16px'
    height: '44px'
  button-primary-hover:
    backgroundColor: '#ffe24d'
  button-dark:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.paper}'
    typography: '{typography.button}'
    rounded: '{rounded.none}'
    padding: '0 16px'
    height: '44px'
  button-dark-hover:
    backgroundColor: '{colors.tracer}'
    textColor: '{colors.tracer-ink}'
  button-ink:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    typography: '{typography.button}'
    rounded: '{rounded.none}'
    padding: '0 16px'
    height: '44px'
  button-ink-hover:
    backgroundColor: '#0a2c19'
    textColor: '{colors.tracer}'
  name-bar:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.headline}'
    rounded: '{rounded.none}'
    padding: '10px 16px 9px'
  info-panel:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.paper}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.none}'
    padding: '12px 16px 14px'
  hole-tag-number:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.tag}'
    rounded: '{rounded.none}'
    padding: '7px 10px'
  hole-tag-number-active:
    backgroundColor: '{colors.tracer}'
    textColor: '{colors.tracer-ink}'
  hole-tag-title:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.paper}'
    typography: '{typography.tag}'
    rounded: '{rounded.none}'
    padding: '7px 12px'
  scorebug-tab:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.soft}'
    typography: '{typography.button}'
    rounded: '{rounded.none}'
    padding: '0 14px'
    height: '44px'
  scorebug-tab-current:
    backgroundColor: '{colors.tracer}'
    textColor: '{colors.tracer-ink}'
  lower-third-name:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.display}'
    rounded: '{rounded.none}'
    padding: '8px 22px 6px'
  lower-third-hole:
    backgroundColor: '{colors.tracer}'
    textColor: '{colors.tracer-ink}'
    typography: '{typography.title}'
    rounded: '{rounded.none}'
    padding: '0 18px'
  lower-third-info:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.paper}'
    typography: '{typography.body}'
    rounded: '{rounded.none}'
    padding: '14px 22px 18px'
  hover-card-head:
    backgroundColor: '{colors.tracer}'
    textColor: '{colors.tracer-ink}'
    typography: '{typography.title}'
    rounded: '{rounded.none}'
    padding: '10px 14px 9px'
  green-screen-card:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink-body}'
    rounded: '{rounded.screen}'
    padding: '14px 18px 16px'
    width: '420px'
  screen-chip:
    backgroundColor: '{colors.screen-wash}'
    textColor: '{colors.ink}'
    rounded: '{rounded.none}'
    padding: '2px 8px'
---

# Design System: Shot Tracer

## Overview

**Creative North Star: "The Shot Tracer Broadcast"**

The site is a round of golf watched on television. The ground is a flat, top-down vector course in deep fairway green; every piece of interface sits on top of it as broadcast graphics: square white name bars, dark translucent green info bars, condensed uppercase lettering, and one loud yellow that marks the hole in play and the primary action. Nothing is photographed grass, nothing is ornamental; the course is drawn from flat shapes (mown stripes, pale greens, sand, tee boxes, two-tone tree crowns, white flagsticks with yellow flags).

Density is broadcast density: a player card in a narrow left column, the course filling the rest of the frame, small numbered tags beside each green. Graphics are compact and legible at a glance, then a white "screen" on the green carries the deeper reading. The one authored moment is the camera fly-in: the map tilts into a 3D view and settles beside the project. Everything else moves only as a TV graphic would: wipes, drops, staged reveals.

The world reads as modern sports coverage, not as a country club. It works without WebGL (the flat map glides into the project) and without motion (every state is reached directly).

**Key Characteristics:**

- Flat vector course as the page ground; no photographic texture.
- One loud accent, tracer yellow, for the hole in play and the primary action.
- Square broadcast chrome: white name bars over dark translucent green info bars.
- Condensed uppercase type for every label, tag and title; plain sans for reading.
- One authored motion moment (camera tilt, glide, settle); graphics wipe in like a TV package.
- Rounded corners exist only inside the white screen card on the green.

## Colors

A deep, low-key green world with a white-and-ink broadcast layer and a single saturated yellow.

### Primary

- **Tracer Yellow** (`tracer`): the flag on every pin, the active hole number, the current scorebug tab, the hole slab on the lower third, the hover card header, primary buttons, the focus ring and text selection. Text on it is always **Tracer Ink** (`tracer-ink`), never white.

### Neutral

- **Fairway Night** (`ground`): the page background, the course surround, the 3D ground plane and the browser theme colour. Also used as **Ink** (`ink`) for headline text and solid buttons on white.
- **Broadcast Panel** (`panel`): the dark translucent green info bar under every name bar, the dark button, hole-tag titles and scorebug tabs. **Panel Solid** (`panel-solid`) is its opaque hover state. **Panel Line** (`panel-line`) separates scorebug tabs.
- **Paper** (`paper`): name bars, hole-tag numbers, the hover card and the green screen card; also body text on dark panels.
- **Ink Body** (`ink-body`) and **Ink Muted** (`ink-muted`): reading text and metadata on white. **Paper Line** (`paper-line`) for rules and table dividers on white; **Screen Wash** (`screen-wash`) for chips and bar-chart tracks inside the screen card.
- **Pale Label Green** (`label`): condensed caps field labels on dark panels. **Soft Green** (`soft`): secondary text on dark (hints, idle tabs, list metadata).
- **Alert Red** (`alert`): data mismatches inside the screen card only.

### Course

- **Rough** (`rough`), **Fairway** (`fairway`) with **Fairway Stripe** (`fairway-stripe`) as alternating 20px mown bands at -30°, **Fringe** (`fringe`) ringing each **Putting Green** (`putting-green`), **Sand** (`sand`) bunkers, **Tee** (`tee`) boxes, **Tree** (`tree`) crowns, and **Haze** (`haze`), the fog and sky colour the 3D view fades into as it tilts. These live in `lib/palette.ts` and are shared by the SVG map and the WebGL scene, so both views paint the same course.

### Named Rules

**The Quiet Turf Rule.** Page ground and unmown terrain share the low-contrast, 192px repeating grass tile in `public/rough-grass.svg`. Its flat tufts use the existing ground, rough and tree colours; no photographic grain or animation. The SVG course and 3D terrain use the same asset, while fairways, greens and broadcast panels stay clean.

**The One Tracer Rule.** Yellow is the only loud colour. It marks the hole in play and the action to take; a second accent is never introduced for emphasis.

**The Shared Palette Rule.** Course colours come from one palette used by both the 2D map and the 3D flyover. A course colour added to one view is added to the palette, never hard-coded in one renderer.

## Typography

**Display Font:** Barlow Semi Condensed 600, 700, 800 (with Arial Narrow, sans-serif)
**Body Font:** Barlow 400, 500, 600 (with Helvetica Neue, Arial, sans-serif)

**Character:** The condensed caps are the broadcast voice: tight, heavy, uppercase, built to be read in a second over moving footage. Barlow underneath is plain and calm, so facts read as facts. Numbers are tabular site-wide.

### Hierarchy

- **Display** (800, 40px, 1.05, uppercase): the project name on the lower third; 30px on narrow screens.
- **Headline** (800, 34px, 1.02, uppercase, balanced wrap): the player's name bar; 24px on narrow screens.
- **Title** (800, 22px, 1.05, uppercase): hover card header and the hole slab on the lower third.
- **Tag** (700, 18px, 1, uppercase): numbered hole tags on the course; numbers at 800.
- **Button** (700, 16px, 0.02em, uppercase): all buttons and scorebug tabs.
- **Label** (600, 13px, 0.06em, uppercase): field labels (Role, Based, Stack) in pale label green; 12px muted on white inside the screen card.
- **Body** (400, 16px, 1.5): project summaries, max 54ch.
- **Body small** (400, 15px, 1.35–1.45): info rows, hover card text.
- **Caption** (400, 12–13px, 1.4): metadata lines, screen card source line and footnotes.

### Named Rules

**The Caps Are Chrome Rule.** Condensed uppercase is for names, labels, tags and actions. Sentences, summaries and facts are always Barlow in sentence case.

## Layout

The page is one centred frame, at most `1920px` wide and fluid below that, `100svh` tall with a 620px minimum: a left column of `clamp(260px, 22vw, 320px)` for the player card, a 40px gap, and the course region filling the rest. The course stage keeps its 1040:900 proportion and is centred and fitted inside the region with container units, so tags and badges are placed in course coordinates and always land beside their greens.

Graphics hug the frame edges the way a TV package does: the scorebug 28px from the top, the lower third 40px from the bottom and flush left, the screen card 40px from the right, the hint 40px/28px from the bottom right. The spacing rhythm is 4, 8, 12, 16, 22, 28 and 40px; panels use 12–22px internal padding.

**Responsive behaviour:**

- **Portrait map** (container `aspect-ratio < 4/5`): the course rotates a quarter turn, flags counter-rotate to stay upright, the hover card is hidden, small numbered badges mark each hole on the map, and the holes become a full-width list below it (50px rows with number, name, one fact and an arrow cell). The 3D camera reads the same container flag so both views agree.
- **Below 900px**: hide the home-view hover card in both orientations so it cannot cover the map. Hole tags or the portrait list remain available to open each hole.
- **Below 900px**: the layout stacks. The player card collapses to a 72px head-crop of the portrait beside the name and info, with extra rows hidden and labels visually hidden; the hole view puts the scorebug, lower third and screen card in one column under a shorter map. Idle scorebug tabs shrink to their number.
- **Hole container below 940px**: the lower third and screen card stretch to the frame with 24px inset.

### Named Rules

**The Course Coordinates Rule.** Anything pinned to the course (tags, badges, the hover card) is positioned as a fraction of the course, never in viewport pixels, so it stays on its green at every size and in both orientations.

## Elevation & Depth

The interface is flat, layered over a flat map. Depth comes from stacking (white bar over dark bar over course) and from short, heavy drop shadows that lift a graphic off the ground the way a broadcast overlay sits over footage. Shadows are soft and pulled in with negative spread; there are no offset or coloured shadows. Real depth belongs only to the 3D flyover, where fog and haze close in as the camera tilts.

### Shadow Vocabulary

- **Panel lift** (`box-shadow: 0 24px 40px -18px rgb(0 0 0 / 0.6)`): lower third, hover card, screen card.
- **Tag lift** (`box-shadow: 0 10px 20px -10px rgb(0 0 0 / 0.6)`): course tags and the scorebug; dropped when they become list rows or stack on narrow screens.
- **Badge lift** (`box-shadow: 0 8px 16px -8px rgb(0 0 0 / 0.6)`): portrait-mode hole badges.

The 3D canvas edge is feathered into the page ground with a 72px left and 56px top mask, so the horizon never shows a hard seam.

## Shapes

Broadcast chrome is square: name bars, info panels, buttons, tags, badges, tabs, chips and status badges all have 0 radius. The only rounded object in the interface is the white screen card on the green (12px), which stands for a device screen; inside it, message bubbles use 10px and route dots are circles. Bullets are 7px squares. Icons are 16px line drawings with a 1.75 stroke, square caps and mitred joins, matching the square chrome.

On the course, shapes are flat vector fills: rounded fairway outlines with a wide rough border, elliptical greens with a fringe ring and their own fine mow stripes, freeform bunkers, rectangular tee boxes, two-circle tree crowns, white flagsticks with triangular yellow flags.

### Named Rules

**The Square Chrome Rule.** Broadcast graphics have square corners. Radius is reserved for the screen card on the green and what lives inside it.

## Components

### Buttons

Heavy, square, caps; they read as broadcast buttons, not web pills.

- **Shape:** square (0), 44px minimum height, 16px side padding, 8px icon gap.
- **Primary:** tracer yellow with tracer ink; hover lightens the yellow; focus ring turns white.
- **Dark:** broadcast panel with white text; hover becomes tracer yellow with tracer ink. Used on dark ground (player card CV / Email / GitHub).
- **Ink:** fairway night with white text, used on white surfaces (hover card "Play this hole"); hover deepens and turns the text yellow; focus ring turns ink.
- **Focus:** every focusable element gets a 3px tracer yellow outline at 3px offset (inset on scorebug tabs).
- **Transitions:** colour only, 160ms on the shared ease-out.

### Live Location Banner

The user-supplied reference pins a compact black banner, an 8px green dot, monospaced text and 8px corners. These are scoped exceptions to the broadcast chrome, not a new general-purpose style. The dot marks the live clock, not the owner's online or hiring status.

Show Vilnius, the abbreviated weekday and 24-hour local time using `Europe/Vilnius`, including daylight-saving changes. Refresh on each minute boundary and when the tab becomes visible. The banner sits left of the centred masthead on desktop; on phones it shares a utility row below the title with the return arrow. Keep clock updates isolated from the course and avoid live screen-reader announcements.

### Player Card

The TV player graphic. A full-body illustrated portrait (golf driver over the shoulder) cropped head to knee in a fairway-green panel with a 4px tracer yellow bottom rule, a white name bar in headline caps, then a broadcast panel with label/value rows (88px label column) and a three-up row of dark buttons.

### Hole Tags (Course Navigation)

Each hole is a two-part tag beside its green: a white number cell (yellow when previewed) joined to a dark panel title. Hover deepens the title to panel solid. The clubhouse uses a house icon in place of a number. Hovering or focusing a tag previews the hole with a 4px yellow fairway outline and a faint static route arc. In portrait the tags become a stacked list.

### Hover Card

A 300px white card in open rough: tracer yellow header in title caps, a short body, a muted fact line, and a full-width ink button. Panel lift shadow, square corners.

### Scorebug

A strip of joined square cells at the top of the hole view: a white back button, then a dark tab per hole separated by panel lines. The current hole is tracer yellow. It drops in from the top (clip-path, 420ms).

### Lower Third

The project's name graphic, bottom left: a yellow hole slab and a white display-size name bar on top, a broadcast panel below with the summary, label/value facts and actions. It wipes in from the left (clip-path, 640ms).

### Green Screen Card

The one white, rounded surface: the project shown as a screen on the green. A source line and a square chip head it. Support and invoice replays use three manually advanced slides: one scenario at a time, then the saved checks on their own slide. Square arrow buttons and a page count stay visible, with no auto-advance. The slide grid reserves space for the longest page so navigation never jumps; when desktop height is limited, only the keyboard-focusable reading area scrolls. Invoice prices and totals use label/value pairs that remain visible on phones.

Tracer yellow marks the hand-off and review decisions. The role-result card retains its before/after bars, with yellow on the "after" bar; the CV retains its summary layout. Cards rise in after the camera settles, slide changes use a 240ms reveal, and bars grow over 900ms. Reduced motion disables these animations.

### Course Flyover (Signature)

Selecting a hole glides into a three-quarter view of its fairway and green (1.5s, or 1.7s for the clubhouse). Trees rise from flat two-tone crowns into toon-shaded shapes, flags stand up and only the selected hole keeps its flag. Returning to the overview takes 1.3s. Without WebGL, the flat map glides to the hole in 0.9s. Escape or the skip control finishes the camera move; Escape from the settled project returns to the course. Under reduced motion the camera cuts straight to the hole, the 3D layer is not used, and the wipes, rises and staged reveals are off.

About & contact opens automatically when the clubhouse settles, including direct links and reduced-motion entry. Closing the sheet keeps the clubhouse selected; the existing summary action reopens it. Project details still open only from their fairway signs, and the clubhouse building stays clear.

The owner removed the extra "Hit the shot" interaction because it was overkill. There is no playable ball, shot animation or secondary play step: opening a hole leads directly to its project content. Keep the existing hover and focus effects, fairway outlines and static route previews; those are course navigation, not the removed shot interaction.

## Do's and Don'ts

### Do:

- **Do** keep tracer yellow (`#ffd400`) for the hole in play and the primary action, with tracer ink text on it.
- **Do** pair a white name bar with a dark translucent green info panel for any new broadcast graphic.
- **Do** set names, labels, tags and actions in Barlow Semi Condensed caps (600–800) and everything readable in Barlow (400–600).
- **Do** keep chrome square; use the 12px radius only for the screen card on the green.
- **Do** bring graphics in like a TV package (clip-path wipes and drops, staged reveals on the ease-out curve) and turn all movement off under `prefers-reduced-motion`; only short opacity and colour fades remain.
- **Do** add course colours to the shared palette so the 2D map and the 3D flyover stay identical.
- **Do** make every 3D camera move degrade to the flat SVG map.

### Don't:

- **Don't** use photos of grass, crests, plaid, gold script or serif type; this is sports broadcast, not a country club.
- **Don't** introduce a second loud accent; alert red stays inside the screen card for data errors.
- **Don't** round buttons, tags, panels or badges.
- **Don't** add a second authored motion moment; the camera fly-in is the one.
- **Don't** place course-attached graphics in viewport pixels; use course coordinates so they survive the portrait rotation.
