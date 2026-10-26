# Portfolio visual direction: bold, modern, still fast

Date: 2026-10-26

**Question:** What do bold, modern developer portfolios look like in 2026, how are they built, how do they stay fast and accessible, and which visual direction fits a frontend lead moving into Full-Stack AI Engineering?

Companion to [portfolio-2026.md](portfolio-2026.md) (content and structure). This file is only about the look.

**How to read this file.** Plain statements with a link are sourced facts. Lines marked **Assessment:** are my own judgment calls.

---

## TL;DR

1. **Bold is fine. Slow is not.** The award-winning portfolios this month mostly use GSAP, and some add Three.js ([Awwwards](https://www.awwwards.com/sites/brandon-yasin), [Awwwards](https://www.awwwards.com/sites/mathias-adolfsson-2026), [Awwwards](https://www.awwwards.com/sites/sebastien-graf-1)). You can get most of the look with huge real text, colour and a few small effects.
2. **Make the huge headline your LCP, and show it at once.** LCP (Largest Contentful Paint: when the biggest text or image appears) counts text blocks too. Aim for 2.5 s or less ([web.dev](https://web.dev/articles/optimize-lcp)). Hiding the hero until a script reveals it slows LCP. So never put the word-by-word reveal or a preloader on the hero.
3. **Use CSS first and add a library only where CSS can't do it.** Scroll-driven CSS animations work in Chrome and Safari but are still only a preview in Firefox ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)). Treat them as a bonus, not a requirement.
4. **Respect `prefers-reduced-motion`.** Scaling or panning large objects can make people with vestibular (inner-ear balance) disorders feel sick ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)). Huge text that zooms on scroll is exactly that kind of motion.
5. **Two directions fit you:** (A) "Night console": dark, glow, technical. (B) "Warm editorial": off-white, huge uppercase type, one soft colour blob. **Assessment:** use B for the page and A only inside the AI demo panels. That gives you both looks without two full designs.
6. **Build the "Ask about my work" chat. It is the strongest signature feature for an AI engineer.** It proves RAG skills on the page itself, and it matches your support-desk project. Copy the guard rails from a live example: starter questions, a visible rate limit, a disclaimer, and "email the real me" ([sankar.work](https://sankar.work/)). Add citations and an "I don't know, email him" hand-off.
7. **Load heavy things late.** Load 3D, the chat widget and smooth scroll after the first screen has painted. Never load them before it.

---

## 1. Real, live reference sites

All sites below loaded this session. My fetch tool reads text only, so the "look" lines come from Awwwards descriptions, the site's own text, and what I know of the site. Visual details not backed by a source are marked **Assessment**.

1. **Vitalik Korolev**, [korolev.uk](https://www.korolev.uk). Your starting reference. The hero is a few short uppercase lines: "BRIDGING USER NEEDS & BUSINESS GOALS / 10 YEARS OF DESIGNING SCALABLE, HIGH-IMPACT PRODUCTS", followed by a stack of small fact cards ("Who", "Global", "Born in", "Red Dot Award") ([korolev.uk](https://www.korolev.uk)).
   - Copy this: **the fact-card stack.** Short "about me" facts as cards, not a paragraph.

2. **Brandon Yasin** (creative director), [brandonyasin.com](https://brandonyasin.com/). Awwwards Site of the Day, Oct 24 2026. Editorial, magazine look. "Colour palettes shift with the time of day, or drag the clock to time travel. Navigation unfolds like magazine covers side by side." Built with GSAP, Nuxt.js and Sass ([Awwwards](https://www.awwwards.com/sites/brandon-yasin)).
   - Copy this: **one playful, personal control** (the clock that changes the colours) instead of many effects.

3. **Sebastien Graf** (full-stack dev, frontend focus), [sebg.ch](https://www.sebg.ch/). "A dithered 3D mascot shows you around: he changes outfits for each project, reacts when you pat or grab him." Built with GSAP and Three.js ([Awwwards](https://www.awwwards.com/sites/sebastien-graf-1)). The mascot talks you through each project as you scroll ("This is Jaeger-LeCoultre. I work on their website, front and back."). His bio says he builds "fast, accessible websites" and cares most about motion and interaction ([sebg.ch](https://www.sebg.ch/)).
   - Copy this: **a scroll-led guided tour.** Each scroll step explains one project in one sentence.

4. **Mathias Adolfsson** ("Independent Creative Engineer"), [mathiasadolfsson.dev](https://mathiasadolfsson.dev/). Clean, minimal, with an intro animation, a project carousel, cases that open and close in place, and an "about" drawer. Built with GSAP, Three.js and Nuxt.js ([Awwwards](https://www.awwwards.com/sites/mathias-adolfsson-2026)).
   - Copy this: **open a case study in place** (expand from the card) rather than a hard page load.

5. **Dennis Snellenberg** (freelance designer and developer), [dennissnellenberg.com](https://dennissnellenberg.com/). Opens with a fast "Hello / Bonjour / Ciao…" greeting loop, then a huge name headline "Dennis Snellenberg—" and a short promise line ([dennissnellenberg.com](https://dennissnellenberg.com/)). **Assessment:** this site is a classic reference for huge type, a photo-led hero and "magnetic" buttons that pull toward the cursor.
   - Copy this: **huge name as the hero**, with a one-line promise under it. Skip the greeting preloader (see section 4).

6. **Bruno Simon** (creative developer), [bruno-simon.com](https://bruno-simon.com/). The whole portfolio is a 3D world you drive a car through: "Please drive around to learn more about me" ([bruno-simon.com](https://bruno-simon.com/)). **Assessment:** famous and memorable, but a recruiter cannot scan it in 10 seconds. Good to know, not a model for you.
   - Copy this: **only the idea of one memorable "toy"**, kept small and optional.

7. **Brittany Chiang** (senior frontend engineer, accessibility), [brittanychiang.com](https://brittanychiang.com/). Dark, two-column layout: name, title and one-line promise stay fixed on the left, content scrolls on the right. Built with Next.js and Tailwind, all text in Inter. Has a "skip to content" link ([brittanychiang.com](https://brittanychiang.com/)). **Assessment:** the dark navy background has a soft light that follows the cursor. That is a quiet "glow" effect that does not hurt reading.
   - Copy this: **a cursor-following soft spotlight** on a dark background, plus a sticky left column.

8. **Sankar Kumar Palaniappan** (AI Product Manager), [sankar.work](https://sankar.work/). Awwwards nominee, Oct 24 2026: "Interview my AI twin, try live AI products… read my GitHub activity as an animated skyline." Built with Next.js and TypeScript ([Awwwards](https://www.awwwards.com/sites/sankar-kumar-palaniappan-ai-product-manager)). The AI twin is "Claude-powered", "grounded on my real career", has starter questions, a limit of five questions per hour, and the note "not a guarantee of accuracy… email me directly" ([sankar.work](https://sankar.work/)).
   - Copy this: **the AI chat's guard rails**: starter questions, a visible rate limit, an honest disclaimer, and a link to email the real person.
   - **Assessment:** the page is very long and packs in a knowledge graph, games, analytics, LinkedIn stats and more. Good proof that the chat idea works. Bad example of how much to put on one page.

**Not used:** I did not check godly.website or Codrops this session, to save fetch budget. The two Dribbble mockups are concepts, not live sites.

## 2. Recurring visual patterns

Seen on the sites above:

- **Huge type as the hero.** Short uppercase lines (Korolev) or a giant name (Snellenberg). The text *is* the design, so no big hero image is needed.
- **Intro or loading sequence.** Brandon Yasin's site lists a "Preloader" element and Mathias Adolfsson's lists "Loading and intro" ([Awwwards](https://www.awwwards.com/sites/brandon-yasin), [Awwwards](https://www.awwwards.com/sites/mathias-adolfsson-2026)). Snellenberg opens with a multi-language "Hello" loop ([dennissnellenberg.com](https://dennissnellenberg.com/)). Common, but costly (see section 4).
- **Case studies that open in place.** Adolfsson's "Open and close case" and Graf's "Cover morph into a project" ([Awwwards](https://www.awwwards.com/sites/mathias-adolfsson-2026), [Awwwards](https://www.awwwards.com/sites/sebastien-graf-1)). The card grows into the page instead of a hard page load.
- **One personal "toy".** Yasin's clock that changes colours, Graf's mascot, Simon's car. Each site has one memorable thing, not ten.
- **Scroll-led storytelling.** Graf's mascot explains one project per scroll step ([sebg.ch](https://www.sebg.ch/)).
- **Cursor effects.** A soft spotlight that follows the cursor (Chiang) and buttons that pull toward the cursor (Snellenberg). **Assessment** (from memory of these sites, not fetched text).
- **AI chat as the call to action.** Sankar's "Ask my AI twin" section, placed right after the intro ([sankar.work](https://sankar.work/)). It is also the main idea in your second Dribbble mockup.

From your Dribbble mockups, not confirmed on the live sites above:

- **Dark background with coloured glows** (red/blue or purple/blue), **glass panels** (see-through blurred cards), **outlined glowing buttons**, **big stat numbers**. **Assessment:** these are easy to build in plain CSS (`box-shadow`, `backdrop-filter`, radial gradients) and cost little, as long as the blur areas stay small.
- **Grain and bento grids** (a grid of different-sized cards). I did not confirm either on the sites I fetched. **Assessment:** both are still common in 2026 design galleries, but this is unverified here.

**Assessment, what the best ones share:** one strong idea, plus very readable text underneath it. The weaker ones stack many effects. Sankar's site is the clearest case: too many sections, and the chat gets lost.

## 3. How they're built: CSS vs JS libraries

### What the reference sites use (per Awwwards tags)

- Brandon Yasin: GSAP, Nuxt.js, Sass ([Awwwards](https://www.awwwards.com/sites/brandon-yasin)).
- Mathias Adolfsson: GSAP, Three.js, Nuxt.js ([Awwwards](https://www.awwwards.com/sites/mathias-adolfsson-2026)).
- Sebastien Graf: GSAP, Three.js, WebGL ([Awwwards](https://www.awwwards.com/sites/sebastien-graf-1)).
- Sankar: JavaScript, Next.js, TypeScript. No animation library listed ([Awwwards](https://www.awwwards.com/sites/sankar-kumar-palaniappan-ai-product-manager)).
- Brittany Chiang: Next.js and Tailwind, deployed on Vercel ([brittanychiang.com](https://brittanychiang.com/)).

**Assessment:** GSAP is the default tool for award-style motion. Three.js only shows up when there is a real 3D object.

### Plain CSS and browser APIs (no library)

- **Scroll-driven animations.** These tie a CSS animation to scroll position instead of time, using `animation-timeline: scroll()` or `view()` ([MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)). Support: Chrome 115+, Safari 26+, Firefox only as a preview (159). MDN marks it "Limited availability" ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)). Gotcha: the `animation` shorthand resets `animation-timeline`, so declare `animation-timeline` *after* it ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)).
- **View Transitions.** These animate between two states or two pages. In-page (SPA) transitions with `document.startViewTransition()` work in Chrome 111+, Firefox 144+ and Safari 18+. Cross-page transitions (`@view-transition`) do **not** work in Firefox ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)). **Assessment:** this is how to do "card grows into case study" without GSAP. In Angular, the router has a View Transitions option for in-app navigation, so the Firefox gap for cross-page transitions does not matter.
- **Not checked this session:** `@starting-style`, `clip-path`, `mask` and variable-font animation. The earlier file covers `@starting-style` support. **Assessment:** `clip-path` and `mask` are the usual CSS tools for "text reveal" and "blob" shapes, and they need no library.

### JS libraries (what each one says about itself)

- **GSAP.** "A wildly robust JavaScript animation library built for professionals." Plugins include ScrollTrigger, SplitText (splits text into words or letters for reveals), Flip, MorphSVG and Draggable. It is now "free for everyone" thanks to Webflow, which owns it ([gsap.com](https://gsap.com/)). The home page does not state a file size.
- **Lenis** (smooth scroll). A free, open-source library that "turns native scroll into a silky, controllable experience", is "under 5kb", and claims "no hijacked scrollbars, no accessibility trade-offs". It was built to keep WebGL and the page in sync while scrolling ([lenis.dev](https://lenis.dev/)). **Assessment:** that is the vendor's own claim. Smooth scroll still changes how scrolling feels, so turn it off under `prefers-reduced-motion`.
- **Motion** (formerly Framer Motion). Free and open source, for React, JavaScript and Vue. It starts "at 3.2kb with the mini `animate` function" and uses the browser's own `ScrollTimeline` where it can ([motion.dev](https://motion.dev/)). **Assessment:** there is no Angular wrapper, but the plain JS `animate()` works in Angular.
- **Three.js.** The current release is r186. The site links docs, examples, an editor and a TSL (shader language) guide ([threejs.org](https://threejs.org/)). The home page does not state a file size.
- **React Three Fiber.** Not fetched this session. It is React-only, so it does not fit an Angular build anyway.

### Assessment: what to use for this portfolio

- Use plain CSS for glows, the blob, hover states and simple reveals.
- Use View Transitions (through the Angular router) for card → case study.
- Use scroll-driven CSS for small progress effects, with no fallback needed. Without support, the content just doesn't animate.
- Add GSAP plus SplitText **only** if you want the Korolev-style word-by-word reveal below the fold. Skip Lenis and Three.js unless you have a real 3D idea.

## 4. Keeping it fast and accessible

### Speed (LCP)

- **Target.** LCP of 2.5 s or less for at least 75% of visits. LCP is when "the largest image or text block is rendered" ([web.dev](https://web.dev/articles/optimize-lcp)).
- **Huge text is a cheap LCP.** If the LCP element is text in a system font, there is no extra file to download. With a web font, preload the font. Set `font-display` to anything other than `auto` or `block` so the text shows while the font loads ([web.dev](https://web.dev/articles/optimize-lcp)).
- **Intros and preloaders hurt LCP.** web.dev describes a page where "the LCP element is hidden until the JavaScript code finishes loading, and then everything is revealed at once". On that page, making the image smaller did not improve LCP at all ([web.dev](https://web.dev/articles/optimize-lcp)). A preloader or a word-by-word hero reveal does exactly this.
- **Big scripts delay rendering.** Large JS files run on the main thread, and an image "may still have to wait until an unrelated script finishes executing" ([web.dev](https://web.dev/articles/optimize-lcp)). **Assessment:** so load Three.js, GSAP and the chat widget *after* first paint, or when the visitor clicks or scrolls to them.
- **Render on the server or at build time.** Content that JavaScript adds later shows up as a big gap between first paint and LCP. web.dev recommends SSR, and says prerendering (SSG) is "generally a better choice" when possible ([web.dev](https://web.dev/articles/optimize-lcp)). **Assessment:** use Angular prerendering for the home page and case studies.
- **Never lazy-load the hero image.** If the hero is an image, add `fetchpriority="high"` ([web.dev](https://web.dev/articles/optimize-lcp)).

### Motion and accessibility

- **`prefers-reduced-motion`.** Works in every major browser ("Baseline widely available"). It tells you the user wants less non-essential motion. Scaling or panning large objects can trigger vestibular discomfort ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)). Under `reduce`: no scroll-linked zoom, no blob morph, no smooth scroll, and instant reveals.
- **Real text, not canvas.** **Assessment:** keep every headline and stat as real HTML text. Screen readers and search engines can read it, and text in a canvas or a WebGL image cannot be selected, translated or zoomed cleanly. Use 3D only for decoration, with `aria-hidden`.
- **No scroll hijacking.** **Assessment:** don't snap, lock or speed up scrolling on the main page. Lenis says it avoids hijacking ([lenis.dev](https://lenis.dev/)), but the simplest safe choice is native scroll.
- **Skip link and focus.** Brittany Chiang's site has "Skip to content" ([brittanychiang.com](https://brittanychiang.com/)). Glowing buttons need a visible focus ring, not only a hover glow. The earlier file has the contrast numbers.

## 5. Recommendation: visual direction options

All of this section is **Assessment**, except the font facts, which have links.

### Font facts checked this session

- **Clash Display** (Fontshare, by Indian Type Foundry). A sans for large sizes with 6 weights plus a variable version. It is free for personal and commercial use under the ITF Free Font License, and self-hosting is allowed. Catch: the license forbids subsetting or converting the files ([Fontshare](https://www.fontshare.com/fonts/clash-display)). So you cannot trim it to make it smaller.
- **Anton** (Google Fonts, by Vernon Adams). Loud, condensed, one weight (Regular 400) ([Google Fonts](https://fonts.google.com/specimen/Anton)). Good for huge uppercase headlines.
- **Inter.** Used for all text on brittanychiang.com ([brittanychiang.com](https://brittanychiang.com/)). I did not check its license page this session. It is widely known as a free, open-source font.

### Option A: "Night console" (dark + glow, technical)

- **Feel:** like your Sharkfold and "AI Portfolio" mockups. Calm, dark, a bit cinematic.
- **Palette:** near-black background (about `#0B0D12`), off-white text (about `#ECEAE4`), and one glow colour, electric blue (about `#4F7CFF`). Use a second colour (violet or red) only in the glows. Green only for passing eval numbers.
- **Fonts:** Anton for huge headlines, Inter for body, and a monospace font for numbers and logs (pick one from Google Fonts; none checked this session).
- **Signature effects:**
  1. A soft spotlight that follows the cursor on the dark background (from Brittany Chiang).
  2. Outlined buttons with a gentle glow on hover *and* focus (from the Sharkfold mockup).
  3. Big stat numbers from your real evals, such as "8/8 hand-offs routed" (from the Sharkfold mockup, with numbers from the earlier file).
- **Risk:** this look is very common on AI sites, and dark plus blur can hurt contrast. It can look like a template.

### Option B: "Warm editorial" (bold type, light)

- **Feel:** like korolev.uk and Brandon Yasin. Confident, human, magazine-like.
- **Palette:** warm off-white (about `#F3EFE7`), near-black ink (about `#151515`), and one soft accent for a blob, pink (about `#F4B6C6`). Optionally a second accent for links.
- **Fonts:** Clash Display (Semibold or Bold, uppercase) or Anton for headlines, Inter for body.
- **Signature effects:**
  1. A huge uppercase headline that is **visible at once**. The word-by-word reveal is used only for section titles below the fold (from Korolev).
  2. A slow morphing pink blob made with CSS or SVG, not WebGL, and switched off under reduced motion (from Korolev).
  3. A stack of fact cards for "about me" (from Korolev), and project cards that grow into the case study with a View Transition (from Adolfsson).
- **Risk:** it reads more "designer" than "engineer" unless the project cards show real technical proof.

### Option C (recommended): B for the page, A inside the AI panels

- The page is warm editorial (Option B).
- Each AI project card, and the chat, sits in a dark "console" panel with a subtle glow (Option A). The dark panels say "this part is the machine". The light page says "this is the person".
- **Why:** the bold type gives you the look you like. The dark panels give your AI work its own space. And the contrast between the two is your story: frontend craft *plus* AI systems.

### The "Ask about my work" chat

**Verdict: build it. It is the best signature feature for an AI engineer.** It is proof, not decoration.

- **Why it works:** it shows RAG (retrieval-augmented generation: the model answers from your documents) live, on your own data. It is the same skill as your support-desk project. A live example already exists and got an Awwwards nomination: Sankar's "AI twin", "grounded on my real career" ([sankar.work](https://sankar.work/), [Awwwards](https://www.awwwards.com/sites/sankar-kumar-palaniappan-ai-product-manager)).
- **Copy from Sankar:** starter questions, a visible limit ("Five questions per hour"), an honest note ("not a guarantee of accuracy"), and a link to email the real person ([sankar.work](https://sankar.work/)).
- **Do better than Sankar:**
  1. Show **sources** under each answer (which CV line or doc it used), like your support desk's "How the AI decided" trail.
  2. **Hand off when unsure:** "I don't have that in my notes. Email me directly." That matches the theme from the earlier file: "AI that knows when to hand off to a person."
  3. Publish a small **eval set** (about 20 questions with expected answers) and the score, on the case-study page.
  4. Index **only** public material: CV, project READMEs, case studies. Treat retrieved text as data, not instructions, to resist prompt injection.
- **Placement:** in the hero, a button or input that opens the chat. Do not render the full chat widget in the hero. Load the chat code on click so it doesn't hurt LCP. Keep the plain CV link next to it. Many recruiters won't chat.
- **Risks:** wrong answers about your own career (worse than no chat), API cost and abuse (rate-limit per IP), and slow first replies (stream the answer).

---

## Sources

All fetched on 2026-10-26.

**Reference sites**

- https://www.korolev.uk
- https://brandonyasin.com/
- https://www.sebg.ch/
- https://mathiasadolfsson.dev/
- https://dennissnellenberg.com/
- https://bruno-simon.com/
- https://brittanychiang.com/
- https://sankar.work/

**Awwwards pages**

- https://www.awwwards.com/websites/portfolio/
- https://www.awwwards.com/sites/brandon-yasin
- https://www.awwwards.com/sites/mathias-adolfsson-2026
- https://www.awwwards.com/sites/sebastien-graf-1
- https://www.awwwards.com/sites/sankar-kumar-palaniappan-ai-product-manager

**Libraries**

- https://gsap.com/
- https://lenis.dev/ (redirected from lenis.darkroom.engineering)
- https://motion.dev/
- https://threejs.org/

**Platform docs**

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- https://web.dev/articles/optimize-lcp

**Fonts**

- https://www.fontshare.com/fonts/clash-display
- https://fonts.google.com/specimen/Anton

**Not verified this session:** godly.website, tympanus.net/codrops, React Three Fiber docs, `@starting-style` / `clip-path` / `mask` / variable-font docs, GSAP and Three.js file sizes, Inter and monospace font licenses, and the visual details marked Assessment (the Chiang spotlight, Snellenberg's magnetic buttons, grain and bento grids).
