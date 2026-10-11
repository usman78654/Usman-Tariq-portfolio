# Purposeful portfolio motion

Reviewed October 11, 2026. Audience: recruiters and people exploring Usman Tariq's engineering projects.

## Status bar

`[██████████] 100% — 9/9 features verified`

Status: Implemented and verified; ready for review. All nine features were implemented or refined and checked. This is implementation progress, not a usability or hiring-outcome score.

## Attention path

Identity → relevant projects → engineering decisions → evidence and limitations → CV/contact.

Motion supports that path; static hierarchy, readable labels, and explicit links still do the main work. No content or action requires waiting for an animation.

## Feature tracker

| #   | Animation                   | Location and behaviour                                                                                                                                    | Intended benefit                                                | Status   |
| --- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------- |
| 1   | Directed hero entrance      | Name/intro and main heading move a few pixels into place; a single accent sweep under AI / SOFTWARE / CLOUD / QUALITY. About 600–800 ms total, no loader. | Establish identity, then expertise and the work CTA.            | Verified |
| 2   | Section handoff             | Major section label leads a short heading movement, once per entry. About 8–12 px; no scroll pinning.                                                     | Make chapter and collection boundaries obvious.                 | Verified |
| 3   | Focused project hover/focus | Strengthen one card's border and slightly move its link arrow in 150–200 ms. Image-only zoom is optional. Other cards remain readable.                    | Clarify the selected project, especially paired cards.          | Verified |
| 4   | Preview-to-case continuity  | Refine the existing shared preview transition; connect the project title across list/detail routes. About 300 ms, with unsupported-browser fallback.      | Communicate going deeper into the same project.                 | Verified |
| 5   | Filter continuity           | Preserve existing moving indicator/card layout; add a visible result count alongside the role filters.                                                    | Explain filtering rather than an unexplained rearrangement.     | Verified |
| 6   | Engineering walkthroughs    | Look inside: manual steps and optional finite Play/Pause, active component plus a drawn connection. Never start automatically.                            | Explain technical decisions to non-specialists.                 | Verified |
| 7   | Targeted before/after       | ClearStep deadline → checklist item; ClaimGuard failing claim → quoted source → only that sentence repaired.                                              | Show product value and bounded editing, not generic decoration. | Verified |
| 8   | Action → consequence        | Existing CloudCrew playground: worker failure, lease expiry, recovery, and stale-write outcome receive local motion cues.                                 | Make failure/recovery causality visible.                        | Verified |
| 9   | Reading-position indicator  | Case-study navigation marker tracks Overview, Architecture, Decisions, Evidence, and Lessons.                                                             | Keep orientation and provide direct access to evidence.         | Verified |

Timing is a starting point for QA, not a universal UX rule. All walkthroughs are labelled illustrations/simulations, separate from live recordings, published evaluation, and benchmarks.

## Project-specific explanations

| Project          | Explain                                                                                                            | Boundary                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| ClearStep        | Fictional notice → browser extraction → validated analysis → actionable checklist. Highlight the example deadline. | Not an actual model call; scanned-PDF OCR remains incomplete.                    |
| ClaimGuard       | Stable sentence IDs → checks → quoted verification → bounded repair → audit. Preserve the surrounding sample text. | Illustration of the README fixture, not a new verification run.                  |
| CloudCrew        | Persist a task → claim → worker failure → lease expiry/reclaim → fenced saved result.                              | At-least-once execution; fencing does not undo external side effects.            |
| CipherRelay      | Sender browser → encrypted content → relay → recipient.                                                            | Relay metadata remains visible; static identities lack forward secrecy.          |
| Mindplay         | Headset/LSL → parallel EEG, blink, motion → arbitration → cooldown → game control.                                 | Academic team prototype; no clinical or independent held-out validation implied. |
| Cross-browser QA | User journey → browser matrix → checks → failure artifacts → release decision.                                     | Third-party application; WebKit is not branded Safari.                           |
| E-commerce QA    | Requirements → test design → runs → defect evidence → No-Go decision.                                              | Third-party ProShop; no new test run is simulated as real evidence.              |
| EDiME            | PathMNIST → conditional diffusion → generated samples → explanations → evaluation.                                 | Keep unsuccessful results visible; not clinical imagery or validation.           |
| Local RAG        | PDFs → embeddings → retrieval → local inference → answer.                                                          | Retrieved context does not guarantee a factual answer.                           |

## References and adaptations

- [Lando Norris](https://landonorris.com/) and [OFF+BRAND's creator case study](https://www.itsoffbrand.com/our-work/lando-norris): coherent identity, sharp transitions, expressive typography. Adapt speed/energy into engineering signals and decisions; do not copy branded assets. The research browser did not fully render its 3D assets; use the studio's description rather than inferring their performance.
- [Brittany Chiang](https://brittanychiang.com/): restrained item emphasis and persistent navigation. Adapt readable card focus and case orientation.
- [Dennis Snellenberg](https://dennissnellenberg.com/): confident personal presentation and expressive typography. Avoid continuous moving name text competing with the work.
- [Bruno Simon](https://bruno-simon.com/): interaction demonstrates the creator's craft. Adapt to the optional engineering playground, not mandatory game navigation.
- [Josh Comeau's animation breakdown](https://www.joshwcomeau.com/blog/whimsical-animations/): intentional, user-triggered interactions; repeated novelty can become annoying.
- [Codrops preview-to-content experiment](https://tympanus.net/codrops/2021/04/07/preview-to-full-content-page-transition/): visual continuity between preview and detail. Use a restrained adaptation, not its complete experimental navigation.
- [Nielsen Norman Group motion guidance](https://www.nngroup.com/articles/animation-purpose-ux/): brief motion for feedback, state changes, orientation; avoid competing attention cues.
- [W3C reduced-motion guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html): remove non-essential movement when requested. [Pause/stop/hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) informs controls for timed sequences.

## Guardrails and deliberate exclusions

- Respect OS reduced motion; manual explanations remain functional without movement or automatic advancement.
- Content visible before JavaScript, keyboard/touch access, stable hit targets, readable static alternatives.
- Finite, user-started walkthrough playback; pause when hidden or offscreen; clean up timers/observers/animations.
- No cinematic loader, scroll hijacking, long pinned chapters, constant skill marquee, looping heading, or background motion behind reading content.
- No autoplaying project videos, magnetic click targets, hover-only information, or animated accuracy counters.
- Remove the existing endlessly rotating hero star: it competes with the proposed attention hierarchy.
- Use existing Motion, React view transitions, CSS, and the browser animation API. No heavyweight animation dependency or additional backend.

## Verification and release

Build and typecheck; desktop/mobile Chromium regression tests; test manual/play/pause/reset and reduced motion; check keyboard focus, navigation indicators, overflow, accessibility, and screenshots. Verify GitHub-to-Vercel production deployment. Browser compatibility and hiring effectiveness must not be claimed beyond tested evidence.

### Verified implementation

- Phase 1 complete: progressive hero/section motion, stable project hover/focus, visible filter counts, existing preview morph refined with title continuity and a stationary header, moving case-position marker.
- Phase 2 complete: all nine Look inside views have project-specific manual/finite Play/Pause/Reset explanations; Mindplay's inputs remain parallel. ClearStep highlights the source deadline; ClaimGuard changes only its fictional middle sentence. The recovery playground highlights the correct worker and signals outcomes locally.
- Phase 3 complete: production build, TypeScript, formatting, and 28 desktop/mobile Chromium tests pass. Tests cover no-JavaScript content, manual completion of every explanation, playback/pause/reset/end/offscreen behaviour, reduced motion, keyboard interaction, source/output emphasis, unchanged surrounding sample text, result counts, case navigation, existing video playback, and WCAG scans.
- Reviewed desktop/mobile screenshots. Narrow cards use a compact vertical flow with downward connectors; the expanded Mindplay component is approximately 672 CSS pixels tall at the tested iPhone viewport, down from 924 in the initial pass.
- A real project-link navigation and browser-back check produced no page errors. Unsupported view-transition browsers retain ordinary links. Real Safari/Firefox and real-user performance or hiring outcomes are not established by these checks.
- Optional image zoom was intentionally omitted: card focus and the link-arrow cue are sufficient, and the real evidence screenshots should remain stable. No further media, account, or user-content input is needed for this animation pass.

Implementation: `src/app/animations.css`, `src/components/attention-motion.tsx`, `src/components/engineering-walkthrough.tsx`, `src/content/walkthroughs.ts`, and refinements to previews, explorer, case navigation, playground, layout, and home/case routes. Regression coverage: `tests/animations.spec.ts`.

## Signature interaction extension

Status: Implemented. `[██████████] 100% — 5/5 signature features implemented`. The original 9/9 tracker above describes the earlier release, not this extension. Production build and formatting pass; 32 desktop/mobile Chromium regression checks pass, including new accessibility and reduced-motion checks. Mobile desk cards were refined into compact rows after screenshot review, with a follow-up signature regression run. Real Safari/Firefox and recruitment outcomes remain unverified.

| Feature              | Implementation                                                                                            | Remaining input                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Engineering desk     | Three real project links under the portrait; gentle mouse-only perspective, stable keyboard/touch targets | None                                                                 |
| Surface → system     | Short clipping-mask reveal when Look inside opens; existing architecture and controls preserved           | None                                                                 |
| Signature typography | Outlined USMAN resolves into lime once; main headline stays steady                                        | None                                                                 |
| Project atlas        | Optional Map view, theme connections, current filters and case links; normal cards remain default         | None                                                                 |
| Personal snapshots   | Manual previous/next stack using confirmed perfume collecting, gaming, reading and singing interests      | Optional real hobby photographs; typographic cards work without them |

The atlas is an editorial grouping, never a proficiency ranking. Screenshots and Mindplay media retain their provenance. No fabricated hobbies, photos, live output, or new recordings. All new movement has a reduced-motion static alternative; no automatic card cycling, scroll hijacking, custom cursor or heavy 3D dependency.

References: [Eduard Bodak's creator breakdown](https://tympanus.net/codrops/2025/07/29/built-to-move-a-closer-look-at-the-animations-behind-eduard-bodaks-portfolio/) for pointer-responsive depth; [clip-path experiments](https://tympanus.net/codrops/2023/03/01/double-image-hover-effects-with-clip-path-animations/) for surface/system masking; [kinetic typography](https://tympanus.net/codrops/2021/09/29/kinetic-typography-page-transition/) for identity emphasis; [SVG map demo](https://tympanus.net/Tutorials/ScrollMap/) for relationship tracing; [image-motion experiments](https://tympanus.net/codrops/2023/10/18/ideas-for-image-motion-trail-animations/) for the bounded personal-card adaptation. These are design inspirations, not evidence of improved recruiting outcomes.

## Creative motion / signal → structure

Status: Implemented and verified. `[██████████] 100% — 6/6 creative effects checked`. Production build, TypeScript, formatting and 46 desktop/mobile Chromium checks pass. This pass deliberately increases expressiveness without making navigation depend on animation; the progress bar is not a usability or hiring-outcome score.

| Effect                             | Where and trigger                                                                                        | Purpose                                                                               | Status      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------- |
| Morphing signal sculpture          | New Signal Studio before selected work; choose Signal, Structure, or System                              | A distinctive, interactive expression of turning complexity into useful structure     | Implemented |
| Inspection lens and finite pulse   | Mouse movement inside the sculpture lights nearby connections; Send a pulse also works by keyboard/touch | Reward inspection without altering actual project screenshots or replacing the cursor | Implemented |
| Blueprint atmosphere               | Hero orbital contours shift at most a few pixels with the mouse                                          | Give the portrait/identity depth without moving the headline or controls              | Implemented |
| Kinetic letter ripple              | Mouse entry on make sense / something useful; one brief direction-aware letter wave                      | Playful opening and closing accents; original accessible text stays intact            | Implemented |
| Pointer edge-light and arrow pulse | Project/CV card edges only; finite arrow feedback on entry                                               | Make selection feel tactile without glare over evidence or moving links               | Implemented |
| Project constellation              | Map view now draws measured hub-to-project SVG routes; theme choice traces only matching connections     | Make relationships genuinely visible instead of decorative disconnected bars          | Implemented |

### Basis and adaptation

- [Franky Hung's wave-propagation grid](https://tympanus.net/codrops/2026/07/09/building-an-interactive-wave-propagation-cube-grid-with-three-js/): pointer-responsive geometric fields. Our sculpture uses original mathematical forms and Canvas 2D perspective, not the tutorial's Three.js grid, perpetual idle waves, assets, or code.
- [Cullen Webber's dual-scene X-ray reveal](https://tympanus.net/codrops/2026/03/23/building-a-dual-scene-fluid-x-ray-reveal-effect-in-three-js/) and [Tomoyuki Nakata's square lens](https://tympanus.net/codrops/2026/08/25/building-a-mouse-following-square-lens-effect-with-three-js-and-glsl/): scoped inspection reveals. Our simple lens lights the artwork's structure; no WebGL post-processing, warped CV portrait, or false project evidence.
- [Line and letter hover demo](https://tympanus.net/Development/LineTypeEffect/) and [terminal-like typography](https://tympanus.net/codrops/2024/06/19/hover-animations-for-terminal-like-typography/): finite expressive lettering. We use a wave, never scrambling the user's name, body text, or claims.
- The earlier SVG-map and pointer-responsive-card references inform the connected constellation and edge emphasis. These are visual precedents, not performance or recruitment benchmarks.

### Behaviour and boundaries

- Artwork has 364 mathematical points, three forms, explicit simulation/art provenance, project links and a direct Skip to the projects link. No model calls, EEG data, traffic metrics, or benchmark claims.
- One finite initial morph when visible; forms settle. Optional Animate for 20s starts only by user action and has Pause/Reset; stops at its time limit, offscreen, or when the document is hidden. Pointer interaction/pulses schedule bounded frames, not a permanent render loop. Pixel ratio capped at 1.5.
- Reduced motion draws static forms; animation control is disabled with an explanation. Manual form choice, pulse feedback and links still work. No-JavaScript retains a static SVG artwork, readable content and project links.
- Normal cards remain the default. Atlas routes are decorative; stable links, labelled connections, keyboard theme buttons and a compact mobile spine carry the information.
- No additional dependency, loader, sound, autoplay video, scroll hijack, forced drag, flickering glitch, continuous ticker, or page-wide cursor effect.
- Implementation: `signal-sculpture.tsx`, `creative-motion.css`, `kinetic-details.tsx`, `kinetic-details.css`, `atlas-upgrade.css`, and the atlas portion of `signature-interactions.tsx`. Tests: `signal-sculpture.spec.ts`, `creative-motion.spec.ts`, existing suite.
- Verification includes finite idle frames, pulse feedback, pause/reset/offscreen behaviour, the actual 20-second time limit, live reduced-motion switching during playback, initial reduced-motion hydration, no-JavaScript fallback, semantic text, stable CV targets, remounted/filtered cards, accurate atlas routes, container resizing, overflow, accessibility scans and desktop/mobile screenshots. Corrected a one-pixel overflow from a reused card's decorative edge, a reduced-motion server/client text mismatch, and pause orientation resetting. A live media-query subscription is used for the sculpture/hero because the installed Motion hook snapshots its initial setting. No real Safari/Firefox, battery benchmarks, Core Web Vitals or recruitment outcomes were measured.
