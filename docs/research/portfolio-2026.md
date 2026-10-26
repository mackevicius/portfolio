# What strong 2026 portfolios for full-stack AI engineers look like

Date: 2026-10-26

**Question:** What do strong 2026 portfolio websites for full-stack AI engineers (TypeScript + Python) look like? The answer is tailored to a frontend lead moving into a Full-Stack AI Engineer role. The portfolio will feature two projects: [AI Support Desk](https://github.com/mackevicius/ai-support-desk) and [Invoice Agent](https://github.com/mackevicius/invoice-agent).

**How to read this file.** Plain statements with a link are sourced facts. Lines marked **Assessment:** are my own judgment calls.

---

## TL;DR: recommendations for this portfolio

1. **Make the first screen work in about 10 seconds.** Show your name, the target title ("Full-Stack AI Engineer, TypeScript + Python"), one sentence on what you build, two project cards, and links to your CV, GitHub and email. Recruiters spend about 5 to 20 seconds on a first scan of a resume ([Tech Resume Inside Out](https://thetechresume.com/samples/the-hiring-pipeline)). Expect a first look at a portfolio to be just as short. *(The portfolio part is my assumption.)*
2. **Use one theme for both projects: "AI that knows when to hand off to a person."** The support desk sends risky questions to a human ([README](https://github.com/mackevicius/ai-support-desk)). The invoice agent only auto-approves invoices that pass a three-way match and stay under a limit ([CONTEXT.md](https://github.com/mackevicius/invoice-agent/blob/main/CONTEXT.md)). **Assessment:** one clear theme is easier to remember than a list of features.
3. **Lead with AI Support Desk and put its numbers on the card.** It has a live demo with no sign-up and it shows measured results: 8/8 hand-offs routed correctly, 3/3 leak attempts blocked, and 10/11 search hits in the top 3 vs 7/11 for keyword search. The README also says honestly that the dataset is small ([README](https://github.com/mackevicius/ai-support-desk)). Hiring managers for AI roles ask directly how you evaluated the system ([Eugene Yan](https://eugeneyan.com/writing/how-to-interview/)).
4. **Do not link Invoice Agent as a finished project yet.** Right now the repo has docs and a glossary but no README or demo ([repo](https://github.com/mackevicius/invoice-agent)). A hiring manager who finds pinned repos with no README or a broken site will be disappointed ([Tech Resume Inside Out](https://thetechresume.com/samples/common-mistakes)). Ship a demo and a README first, or label it "in progress" and link the design notes.
5. **Present the career change as "frontend lead → full-stack AI", not "starting over".** The AI engineer role grew out of software engineering, not ML research ([Latent Space](https://www.latent.space/p/ai-engineer)). Your frontend background is a strength for AI UX, such as the support desk's "How the AI decided" trail. Your lead experience covers the "influence" that senior hiring looks for ([Eugene Yan](https://eugeneyan.com/writing/how-to-interview/)).
6. **Give each project a short case-study page.** Cover the problem, what the AI may and may not do, how you measured it, key trade-offs, known limits, stack, and links. This answers the questions engineers ask in interviews: evaluation, guardrails, trade-offs, and what you would change ([Eugene Yan](https://eugeneyan.com/writing/how-to-interview/)).
7. **Use one or two quiet effects, and only as extras.** Good options are a View Transition between the home page and a case study, and `@starting-style` for small fade-ins. Wrap all motion in `prefers-reduced-motion`. Avoid custom cursors and scroll-jacking. Cross-page View Transitions still do not work in Firefox ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition)).
8. **Set firm limits.** At the 75th percentile (the slowest quarter of visits sets the score), aim for LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 ([web.dev](https://web.dev/articles/vitals)). Text contrast should be at least 4.5:1, or 3:1 for large text. UI parts and focus rings should be at least 3:1 ([W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). **Assessment:** a fast, accessible site is itself proof of frontend seniority.

---

## 1. Sections and layout

### What the sources say

- **Two audiences, two depths.** A recruiter or inbound sourcer scans a resume in 5 to 20 seconds. If that first scan looks promising, they read in more depth ([Tech Resume Inside Out, hiring pipeline](https://thetechresume.com/samples/the-hiring-pipeline)). Recruiters and hiring managers usually click links only *after* they find the key facts in that first scan ([Tech Resume Inside Out, common mistakes](https://thetechresume.com/samples/common-mistakes)).
- **Write for employers, not for other developers.** Josh Comeau has been involved in hiring and reviewed a couple hundred portfolios. He found most of them followed a template that is "not optimized for appealing to prospective employers". He argues a portfolio should guide the reader through your work like a tour guide ([joshwcomeau.com](https://www.joshwcomeau.com/effective-portfolio/)).
- **Tailor the order to the job.** Lead with the experience that matches the role you are applying for ([Tech Resume Inside Out](https://thetechresume.com/samples/common-mistakes)).
- **Keep links few and alive.** Use a handful of relevant links. Make sure every link works and points to up-to-date, well-written content ([Tech Resume Inside Out](https://thetechresume.com/samples/common-mistakes)).

### What strong real sites do above the fold

- [Brittany Chiang](https://brittanychiang.com) shows her name, title and a one-line promise ("I build accessible, pixel-perfect experiences for the web"), then social links. Below that come About, Experience (each job with tech tags), Projects (with proof such as GitHub stars and install counts), Writing, and a link to the full résumé.
- [Eugene Yan](https://eugeneyan.com) opens with one line ("Hi, I'm Eugene Yan, an ML engineer"), a sentence on his current work, and three bullets (write, prototype, teach). Then come latest writing, selected prototypes and talks.
- [Hamel Husain](https://hamel.dev) opens with a short bio that puts credibility first (Airbnb, GitHub, research later used by OpenAI) and states one focus: evals. Then a dated list of long-form posts.
- [Jason Liu](https://jxnl.co) opens with his current role and one strong proof point: Instructor, which "OpenAI cited as inspiration" for structured outputs.

### Recommended order for this site (Assessment)

1. **Hero:** name, "Full-Stack AI Engineer (TypeScript + Python)", one sentence on the theme, buttons for CV, GitHub and email.
2. **Selected work:** two cards. Each card has a one-line summary, 2–3 numbers, a "Live demo" button and a "Case study" link.
3. **About / career story:** 3–4 sentences. Frontend lead → full-stack AI, and why.
4. **Experience:** a short timeline with tech tags, in the style of Brittany Chiang.
5. **Writing / notes (optional):** link the ADRs (short decision records) and the embedding-model trial if you have no blog yet.
6. **Contact.**

---

## 2. How to present AI projects

### What hiring engineers look for (sourced)

- **Evals, not vibes.** Hamel Husain finds that unsuccessful AI products "almost always" lack solid evaluation. He asks for product-specific evals, and says unit-test-style assertions should run on every code change ([Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/)).
- **Interview questions you should answer before anyone asks** ([Eugene Yan & Jason Liu](https://eugeneyan.com/writing/how-to-interview/)):
  - How did you evaluate the system and do error analysis?
  - What guardrails or policies keep the model in line with users?
  - What constraints and hard trade-offs did you face?
  - What was the outcome, and what would you do differently?
- **Evals are the AI engineer's job.** Latent Space says AI engineers "should certainly view product-specific data and evals as their job" ([The Rise of the AI Engineer](https://www.latent.space/p/ai-engineer), industry essay).
- **GitHub is part of the portfolio.** Thorough reviewers do click through. Pinned repos with no README are a letdown ([Tech Resume Inside Out](https://thetechresume.com/samples/common-mistakes)).

### What AI Support Desk already does well (sourced from its README)

- A live demo that needs no sign-up, with a "two-minute tour" telling the reader what to try ([README](https://github.com/mackevicius/ai-support-desk), [demo](https://ai-support-desk-omega.vercel.app/)).
- A clear architecture: web (Next.js) → API (Node/Express, TypeScript) → AI service (Python standard library, gpt-4o-mini) → Postgres. Only the web app is public, and the OpenAI key lives only in the Python service ([README](https://github.com/mackevicius/ai-support-desk)).
- Measured quality with honest limits, plus decision records and a "Known limitations" section ([README](https://github.com/mackevicius/ai-support-desk)).
- Cost guardrails enforced in the database: 5 live AI drafts per visitor and 200 per day ([README](https://github.com/mackevicius/ai-support-desk)).

### Case-study page template (Assessment)

1. One sentence: "A support desk where AI answers safe questions and hands risky ones to a person."
2. A **Live demo (no sign-up)** button and a **GitHub** link, both above the fold.
3. Three numbers in large type, with a one-line caveat: 8/8 hand-off, 3/3 leaks blocked, 10/11 retrieval.
4. A single architecture diagram as an SVG with text labels (not an image of text).
5. "Key decisions": 2–3 bullets linking the ADRs.
6. "Guardrails" and "Known limits" side by side. Showing limits reads as senior, not weak.
7. Stack line: TypeScript, Python, Next.js, Postgres, Kubernetes in CI, Playwright.

### What makes a recruiter click (Assessment, thin sourcing)

- The words "Live demo, no sign-up" on the card. Fewer steps means more clicks.
- Specific numbers instead of adjectives. This matches the "evidence over cliché" advice in [Tech Resume Inside Out](https://thetechresume.com/samples/common-mistakes).
- Stack keywords from the job ad visible on the card.

### Invoice Agent: what to do before featuring it

The domain is already well defined in [CONTEXT.md](https://github.com/mackevicius/invoice-agent/blob/main/CONTEXT.md):

- **Three-Way Match:** the invoice must agree with the purchase order and the goods receipt.
- **2% Price Tolerance:** a line may cost at most 2% more than the purchase order.
- **Auto-Approval Limit:** invoices above this total always need a person.
- **Duplicates:** possible duplicates always go to the Review Queue.
- **24-hour Demo Company:** each visitor gets a private copy of the data.

**Assessment:** ship a minimal demo, a README written in the same style as the support desk's, and one eval number (for example, "X of Y labelled invoices routed correctly"). Then give it a card.

---

## 3. Presenting the career change without looking junior

### Sourced points

- **The role was built for software engineers.** The AI engineer is a software engineer who works with models through APIs. You can be "quite successful in this role without ever training anything" (Karpathy, quoted in [Latent Space](https://www.latent.space/p/ai-engineer)). The same essay notes that AI tooling now serves JavaScript as well as Python developers.
- **What AI hiring managers actually assess** ([Eugene Yan & Jason Liu](https://eugeneyan.com/writing/how-to-interview/)):
  - basic software engineering
  - data literacy (understanding and checking your data)
  - comfort with models that give different answers to the same input
  - guardrails
  - evals
- **What senior hiring adds.** For senior roles they also weigh ambiguity, influence, complexity and execution. Influence means how you drive results through other people, such as design reviews and mentoring ([Eugene Yan](https://eugeneyan.com/writing/how-to-interview/)).
- **Show evidence, not clichés.** Replace "fast learner" with things you delivered ([Tech Resume Inside Out](https://thetechresume.com/samples/common-mistakes)).

### How to apply it (Assessment)

- **Title:** use the target role ("Full-Stack AI Engineer"). Avoid "aspiring" or "transitioning to".
- **One bridging sentence:** "I led frontend teams for N years. Now I build full-stack AI products in TypeScript and Python, with a focus on safe hand-offs and measured quality."
- **Turn the frontend background into an AI strength.** Explaining AI decisions to users is a UX problem, and you solved it in the "How the AI decided" trail and the customer/agent views ([README](https://github.com/mackevicius/ai-support-desk)).
- **Show depth outside the frontend** on purpose: the standard-library Python service, cost limits enforced in the database, Kubernetes deploys in CI, and the embedding-model trial ([README](https://github.com/mackevicius/ai-support-desk)).
- **Avoid "restart" signals:**
  - lists of course certificates
  - "my learning journey" framing
  - tutorial clones
  - star ratings on skills (the resume book also warns against self-rating, [Tech Resume Inside Out](https://thetechresume.com/samples/common-mistakes))
- **Keep the old work visible but short.** One timeline entry per role, with team size and impact. That is your leadership proof.

---

## 4. Subtle modern CSS effects: support and taste

### Browser support facts (checked 2026-10-26)

- **View Transitions, same page (SPA):** a smooth animated swap between two states of a page. Baseline 2025, meaning it works in all major browsers since October 2025. It is supported by about 92.9% of users globally ([caniuse](https://caniuse.com/view-transitions)). Chrome 111+, Safari 18+, Firefox 144+ ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)).
- **View Transitions, across pages (`@view-transition`):** Chrome/Edge 126+ and Safari 18.2+. **No Firefox support yet**, so it is not Baseline ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition)). Both pages must be on the same origin and both must opt in with CSS ([Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions)).
- **`@starting-style`:** sets the "from" state so an element can transition in when it first appears or leaves `display: none`. Baseline 2024: Chrome 117+, Firefox 129+, Safari 17.5+. It only applies to CSS transitions, not keyframe animations ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)).
- **Scroll-driven animations (`animation-timeline`):** ties an animation to scroll position instead of time. Chrome 115+ and Safari 26+. **Firefox has it only in preview (159)**, so it is limited availability, not Baseline ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)). They can run off the main thread, which avoids jank from scroll-event JavaScript ([Chrome for Developers](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)). Gotcha: declare `animation-timeline` *after* the `animation` shorthand, or the shorthand resets it ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)).
- **Custom cursors:** Firefox and Chromium cap cursor images at 128×128 px, and 32×32 px is recommended. iPadOS only honors the `text` cursor ([MDN cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)). Use `@media (pointer: fine)` to target mouse users only ([MDN pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)).
- **Gradients:** gradients behind text or icons can lower contrast. WCAG says to test the least-contrasting area ([W3C 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). Text over a low-contrast background image is a listed failure, F83 ([W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).

### Craft guidance from practitioners

- Every animation needs a purpose. Things used many times a day, such as hover effects and keyboard actions, are often best with no animation. UI animations should usually stay under 300 ms ([Emil Kowalski](https://emilkowal.ski/ui/you-dont-need-animations), design engineer formerly at Linear and Vercel).
- Animate only `transform` and `opacity` where you can. Animating `top`/`left` or `box-shadow` makes the browser redo layout or paint ([web.dev](https://web.dev/articles/animations-guide)).

### Polished vs overdone (Assessment)

**Feels polished:**

- A cross-page View Transition where the project card's title or image morphs into the case-study header. In Firefox the page just changes normally, which is fine.
- `@starting-style` fade and scale (under 200 ms) for menus, dialogs and the demo "copy link" toast.
- A thin reading-progress bar on long case studies, using scroll-driven animation as an extra.
- One static, low-saturation gradient accent behind the hero, with text contrast checked.

**Feels overdone:**

- Fade-in-on-scroll on every section. Skimmers see blank space, and with reduced motion it adds nothing.
- Parallax and scroll-jacking. Parallax is also named as a common trigger for motion sickness ([W3C 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).
- Custom "blob" cursors that follow the mouse. They do nothing on touch devices or iPad, and they add lag to the main pointer.
- Animated gradient text or a typewriter effect in the hero. It delays reading the one sentence a recruiter needs.
- Logos or links that stay dim until hover. WCAG lists this as a failure ([W3C 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)).

---

## 5. Performance and accessibility limits

### Core Web Vitals

Scores are judged at the 75th percentile of page loads. A page passes only if all three metrics meet "good" ([web.dev vitals](https://web.dev/articles/vitals), [thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)).

| Metric | What it measures | Good | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | When the biggest text block or image appears | ≤ 2.5 s | > 4.0 s |
| INP (Interaction to Next Paint) | Delay from a click or key press to the next frame | ≤ 200 ms | > 500 ms |
| CLS (Cumulative Layout Shift) | How much content jumps around | ≤ 0.1 | > 0.25 |

- INP replaced FID (First Input Delay) as a Core Web Vital in May 2024. It counts all interactions, not only the first one ([MDN INP](https://developer.mozilla.org/en-US/docs/Glossary/Interaction_to_next_paint)).
- Lighthouse cannot measure INP because there is no real user. Use TBT (Total Blocking Time) in the lab and real-user data in the field ([web.dev vitals](https://web.dev/articles/vitals)).
- Common causes of CLS are images without width/height, late-loading embeds, and web fonts. Animating `top`/`left` causes layout shifts. `transform` animations do not count toward CLS ([web.dev optimize CLS](https://web.dev/articles/optimize-cls)).
- **Assessment:** for this site, the hero text should be the LCP element (fast, no hero image). Give every screenshot width and height. Keep JavaScript small so INP stays well under 200 ms.

### Reduced motion

- `prefers-reduced-motion` has two values: `no-preference` and `reduce`. It is Baseline widely available, from Chrome 74, Firefox 63 and Safari 10.1 ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)).
- A safe pattern is to turn motion *on* only inside `@media (prefers-reduced-motion: no-preference)`. Browsers that don't understand the query then get no motion. For JavaScript animations, listen with `matchMedia` ([web.dev](https://web.dev/articles/prefers-reduced-motion)).
- Users must be able to turn off motion caused by interaction, such as scroll effects, unless it is essential. This is WCAG 2.3.3, Level AAA ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).
- Motion that starts by itself, lasts more than 5 seconds and runs next to other content needs a pause, stop or hide control. This is WCAG 2.2.2, Level A ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)).

### Contrast (WCAG 2.2, Level AA)

- **Body text:** at least **4.5:1**. **Large text** (about 24 px, or about 18.5 px bold): at least **3:1**. The stricter AAA level is 7:1 ([W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).
- **No rounding.** 4.499:1 fails ([W3C 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).
- **UI parts, chart lines and custom focus rings:** at least **3:1** against what sits next to them ([W3C 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). This matters for the architecture diagram and the eval charts.

---

## 6. Example portfolios worth studying

1. **[Eugene Yan](https://eugeneyan.com)** (ML engineer, Anthropic): a one-line intro, then "Selected Prototypes" with a one-line description each. A great model for listing AI projects.
2. **[Hamel Husain](https://hamel.dev)** (ML engineer, evals): a bio that puts credibility first and owns one clear specialty (evals). Shows how a narrow theme makes you memorable.
3. **[Simon Willison](https://simonwillison.net)** (builder and writer on LLMs): publishes small tools along with the prompts and models used to build them. Strong "building in public" proof.
4. **[Jason Liu](https://jxnl.co)** (Codex team at OpenAI, creator of Instructor): a single, outside-validated proof point near the top, plus a "Start Here" section for new readers.
5. **[Lee Robinson](https://leerob.com)** (engineer and writer, formerly Vercel and Cursor): a very plain text layout with a short bio and dated posts. Shows that minimal can look senior.
6. **[Brittany Chiang](https://brittanychiang.com)** (senior frontend engineer): the classic About → Experience → Projects → Writing layout. Projects carry proof (stars, installs) and each job has tech tags.
7. **[Emil Kowalski](https://emilkowal.ski)** (design engineer): projects are real tools other people use (Sonner, Vaul). His writing explains *when not* to animate. Good reference for restrained motion.
8. **[Rauno Freiberg](https://rauno.me)** (interaction designer, Vercel): the homepage is one sentence plus links to Craft, Projects and Notes. The craft lives on sub-pages, not in hero effects.

---

## Gaps and caveats

- **Recruiter skim time** is sourced only for resumes (5–20 s, [Tech Resume Inside Out](https://thetechresume.com/samples/the-hiring-pipeline)). I found no primary source on portfolio-site skim time. The Ladders eye-tracking PDF returned 403, and Josh Comeau's sample chapter PDF could not be read.
- **Career change** has no primary source written specifically about frontend → AI moves. Section 3 combines general AI-hiring sources with my own judgment.
- **"Polished vs overdone"** is entirely my own assessment. No neutral source ranks these effects.
- **Gradient support data** was not fetched. Only the WCAG contrast rules for gradients are cited.
- **Invoice Agent** has no README, code or demo visible yet, so advice about it is based only on its glossary.
- Some example portfolios (paco.me, nutlope.com) could not be fetched and were left out.

---

## Sources

**Projects**
- https://github.com/mackevicius/ai-support-desk
- https://ai-support-desk-omega.vercel.app/
- https://github.com/mackevicius/invoice-agent
- https://github.com/mackevicius/invoice-agent/blob/main/CONTEXT.md

**Hiring and portfolio advice**
- https://thetechresume.com/
- https://thetechresume.com/samples/the-hiring-pipeline
- https://thetechresume.com/samples/common-mistakes
- https://www.joshwcomeau.com/effective-portfolio/
- https://eugeneyan.com/writing/how-to-interview/
- https://www.latent.space/p/ai-engineer (industry essay)
- https://hamel.dev/blog/posts/evals/
- https://emilkowal.ski/ui/you-dont-need-animations

**Performance**
- https://web.dev/articles/vitals
- https://web.dev/articles/defining-core-web-vitals-thresholds
- https://web.dev/articles/optimize-cls
- https://web.dev/articles/animations-guide
- https://developer.mozilla.org/en-US/docs/Glossary/Interaction_to_next_paint

**Accessibility**
- https://web.dev/articles/prefers-reduced-motion
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html

**CSS features and browser support**
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition
- https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
- https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer
- https://caniuse.com/view-transitions
- https://developer.chrome.com/docs/web-platform/view-transitions
- https://developer.chrome.com/docs/css-ui/scroll-driven-animations

**Example portfolios**
- https://eugeneyan.com
- https://hamel.dev
- https://simonwillison.net
- https://jxnl.co
- https://leerob.com
- https://brittanychiang.com
- https://emilkowal.ski
- https://rauno.me
