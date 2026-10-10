# Portfolio improvements tracker

Owner: Usman Tariq  
Created: October 10, 2026  
Last updated: October 11, 2026

## Objective

Improve the portfolio's visual presentation, interactions, engineering evidence, and personality while keeping it easy for recruiters and other visitors to explore. Build on the current responsive portfolio and preserve the existing project routes, recruiter filters, CV downloads, accessibility, and reduced-motion support.

This tracker records the researched recommendations. Seven improvements are implemented and ready for review; additional personal photos remain pending. The original implementation plan remains in [development.md](development.md).

## Status definitions

- **Planned:** proposed work has not started.
- **In progress:** implementation is underway.
- **Ready for review:** implemented and checked, awaiting visual/content review.
- **Done:** acceptance criteria are satisfied and verification is recorded.
- **Deferred:** intentionally outside the next implementation phases.

Existing foundations are identified separately. They do not make a new improvement complete. Update each status, checklist, and verification note as work progresses; record concrete blockers without assuming missing assets prevent all other work.

## Overview and implementation order

| ID     | Improvement                                         | Priority | Phase                    | Status           |
| ------ | --------------------------------------------------- | -------- | ------------------------ | ---------------- |
| IMP-01 | Real project demonstrations and visual stories      | Highest  | 1 — Project presentation | Ready for review |
| IMP-02 | Varied homepage composition and role-aware flagship | High     | 1 — Project presentation | Ready for review |
| IMP-05 | Scannable case-study summaries and navigation       | High     | 1 — Project presentation | Ready for review |
| IMP-04 | Deliberate interface animation and feedback         | High     | 2 — Interaction polish   | Ready for review |
| IMP-03 | Signature “Look inside” architecture interaction    | High     | 3 — Signature experience | Ready for review |
| IMP-06 | Expanded engineering playground                     | Medium   | 3 — Signature experience | Ready for review |
| IMP-07 | Illustrated build notes                             | Medium   | 4 — Personal depth       | Ready for review |
| IMP-08 | Personal photo collection and current-focus content | Medium   | 4 — Personal depth       | In progress      |

## IMP-01 — Real project demonstrations and visual stories

**Status:** Ready for review  
**Existing foundation:** concept artwork for project previews, eight case studies, and an actual CloudCrew console screenshot.  
**Reference:** [Linear](https://linear.app/) presents concrete interface workflows rather than relying only on abstract feature descriptions. The recommendation is to adapt that approach to the actual behavior of Usman's projects.

Replace or supplement illustrative previews with short, understandable demonstrations:

- **ClearStep:** a fictional notice becomes extracted facts, important dates, and an action checklist.
- **CloudCrew:** a submitted task moves through queueing, claiming, retry/recovery, and completion.
- **CipherRelay:** content is encrypted in the browser before reaching the relay; show actual UI where available and an explanatory animation for the encryption boundary.
- **QA projects:** a failing action leads to captured evidence, a defect report, and a release recommendation.

### Tasks

- [x] Inventory actual screenshots, recordings, and suitable repository artifacts.
- [x] Choose an actual recording or clearly labeled interactive illustration for each featured project.
- [x] Prepare concise demonstrations, responsive poster images, and accessible descriptions.
- [x] Integrate previews with click/tap playback and a clear case-study link.
- [x] Keep existing concept artwork as a fallback where real media is not yet ready.

### Acceptance criteria

- A visitor can understand the project's purpose without reading the full case study.
- Real application recordings and illustrative/mock sequences are distinguishable.
- Videos do not automatically play with sound; reduced-motion behavior is respected.
- Below-the-fold media is loaded conservatively and does not cause layout shifts.
- No private workplace data, invented results, or unverified capabilities appear.

**Dependencies:** available recordings/screenshots or access to run the relevant projects locally.  
**Verification:** Build, typecheck, desktop/mobile Chromium interaction checks, and automated WCAG scans pass. See implementation log below.

## IMP-02 — Varied homepage composition and role-aware flagship

**Status:** Ready for review  
**Existing foundation:** six default project cards in a two-column desktop grid and role-based filtering.  
**Reference:** [OFF+BRAND's Lando Norris case study](https://www.itsoffbrand.com/our-work/lando-norris) describes cinematic storytelling, media galleries, and transitions tied to the subject's personality. The proposed composition below is an adaptation for this portfolio.

Give selected work a stronger rhythm:

1. One large flagship project with a wide demonstration.
2. Two supporting projects side by side.
3. One full-width interactive engineering story.
4. A clear route to the full collection.

The role filter should change the emphasis: ClearStep for Software & AI, CloudCrew for Cloud & DevOps, and a QA project for SQA & Testing. Keep all projects reachable and retain shareable filter state.

### Tasks

- [x] Define the default flagship and the supporting project order.
- [x] Build an asymmetric desktop composition with a straightforward mobile layout.
- [x] Connect the flagship selection to the existing role filters.
- [x] Integrate IMP-01 demonstrations as they become available.
- [x] Keep project titles, summaries, and links accessible independently of motion.

### Acceptance criteria

- Sections have visibly different presentation roles without losing consistency.
- Role changes do not break browser history, direct links, or keyboard navigation.
- The mobile layout has no forced horizontal scrolling or hidden project access.
- Visitors can reach the full collection immediately.

**Dependencies:** curated order and preview assets; layout work can begin before every recording is available.  
**Verification:** Build, typecheck, desktop/mobile Chromium interaction checks, and automated WCAG scans pass. See implementation log below.

## IMP-03 — Signature “Look inside” architecture interaction

**Status:** Ready for review  
**Existing foundation:** static architecture overviews and labeled concept diagrams.  
**Reference:** [Rauno Freiberg's Craft collection](https://rauno.me/craft) includes an X-Ray Interaction and focused interface experiments. The architecture interaction is an original adaptation of that inspectable-layer idea.

Add a visible **“Look inside”** toggle to selected project previews:

- Normal view: actual interface or recorded application preview.
- Inside view: annotated architecture layer.
- Select a component to learn its responsibility and the relevant tradeoff.

Start with ClearStep's extraction, validation, inference, and storage flow. Extend to CipherRelay's encryption, transport, identity trust, and visible metadata if the first implementation works well.

### Tasks

- [x] Define the project-specific diagram and component explanations from its README.
- [x] Implement the preview/architecture toggle and selected-component details.
- [x] Provide button, touch, and keyboard interaction rather than relying on hovering.
- [x] Preserve a readable static overview for reduced-motion and non-JavaScript viewing.
- [x] Validate the animation against real preview dimensions and responsive layouts.

### Acceptance criteria

- Visitors can inspect each component without dragging or hovering.
- Focus, selected states, and explanations are accessible.
- The diagram accurately represents the documented system and its boundaries.
- CipherRelay does not acquire stronger security claims than its README supports.
- Switching views feels brief and connected without delaying content access.

**Dependencies:** at least one suitable preview, a verified diagram, and IMP-01's asset treatment.  
**Verification:** Build, typecheck, desktop/mobile Chromium interaction checks, and automated WCAG scans pass. See implementation log below.

## IMP-04 — Deliberate interface animation and feedback

**Status:** Ready for review  
**Existing foundation:** basic reveals, artwork hover effects, button hover states, and reduced-motion support.  
**References:** [Emil Kowalski's practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips) covers immediate feedback, subtle pressed states, easing, and short UI transitions. [Paco Coursey's Craft collection](https://paco.me/craft) includes smooth tabs and filtering patterns.

### Tasks

- [x] Add a sliding selection indicator to the recruiter filters.
- [x] Animate project rearrangement briefly after changing roles.
- [x] Add subtle pressed states to buttons.
- [x] Add an explicit copy-email action with success/failure feedback, retaining the email link.
- [x] Add an expandable CV chooser while keeping all three downloads reachable.
- [x] Explore a preview-to-case-study transition that retains the project's visual identity.
- [x] Define shared duration/easing tokens instead of assigning unrelated animation settings.

### Acceptance criteria

- Search, filtering, and keyboard navigation respond immediately.
- Ordinary UI transitions generally stay below 300 ms; any longer presentation animation has a specific purpose.
- Layout animation preserves focus and does not create a misleading reading order.
- Clipboard failures do not produce false success feedback.
- Reduced motion removes unnecessary movement.
- Existing URLs, browser back/forward behavior, and CV downloads continue to work.

**Dependencies:** stable layout from IMP-02 for project rearrangement; smaller feedback improvements can be implemented independently.  
**Verification:** Build, typecheck, desktop/mobile Chromium interaction checks, and automated WCAG scans pass. See implementation log below.

## IMP-05 — Scannable case-study summaries and navigation

**Status:** Ready for review  
**Existing foundation:** case studies with overview, architecture, decisions, evidence, limitations, and next steps.  
**Reference:** [Brittany Chiang's portfolio](https://brittanychiang.com/) connects project and experience descriptions with technologies, imagery, and supporting links. The proposed summary block adds a recruiter-focused entry point to the existing detailed stories.

Add an opening block containing **what it does, my contribution, the most interesting decision, and evidence**. Use short copy, verified artifacts, and project-specific results. For e-commerce QA, the README snapshot supports 45 traceable cases, six confirmed defects, and a No-Go recommendation; explain the critical finding rather than presenting numbers without context.

Add a compact desktop section navigator: Overview, Architecture, Decisions, Evidence, and Lessons. Provide an unobtrusive mobile equivalent where useful.

### Tasks

- [ ] Confirm remaining individual contributions. ClearStep and both QA portfolios are confirmed solo; Mindplay is confirmed team work. Other summaries describe repository scope without assuming authorship.
- [x] Add typed content fields for the opening summary.
- [x] Design and implement the scannable summary block.
- [x] Add section anchors and current-section navigation.
- [x] Bring the most useful actual evidence closer to the opening overview.

### Acceptance criteria

- A recruiter can identify project purpose and personal contribution quickly.
- Result snapshots include context and a source reference.
- Navigation does not cover content, trap focus, or require animation.
- Third-party application authorship is acknowledged for QA projects.

**Dependencies:** individual contribution details and verified source artifacts. Navigation can be built independently.  
**Verification:** Build, typecheck, desktop/mobile Chromium interaction checks, and automated WCAG scans pass. See implementation log below.

## IMP-06 — Expanded engineering playground

**Status:** Ready for review  
**Existing foundation:** a five-step illustrative CloudCrew job-recovery walkthrough with reset and reduced-motion support.  
**Reference:** [Bruno Simon's portfolio](https://bruno-simon.com/) uses exploration as a demonstration of his creative-development skills. Adapt the idea to small engineering experiments that remain optional and easy to access.

Candidate experiments:

- **Worker recovery:** extend the existing walkthrough with moving tasks and selectable failure scenarios.
- **Retrieval inspection:** select a sample question and inspect the passages retrieved from a sample document.
- **QA investigation:** reproduce a deliberately seeded bug, then inspect the test and captured failure evidence.

Build one experiment at a time. Two or three polished experiments are enough for the collection.

### Tasks

- [x] Extend CloudCrew's walkthrough with clear task/worker state changes and failure choices.
- [x] Design a bounded sample retrieval inspection flow.
- [x] Design a safe, browser-local seeded QA demonstration.
- [x] Label recorded, precomputed, simulated, and live behavior accurately.
- [x] Connect each experiment to the corresponding project case study.

### Acceptance criteria

- Each experiment communicates one idea in roughly a minute.
- Reset, completion, and failure states are clear.
- No paid model, public backend, or account is needed for the initial experiments.
- Keyboard and touch alternatives are available.
- A demonstration does not imply that it is running the full source application.
- Experimental interactions do not obstruct normal project navigation.

**Dependencies:** source-grounded scenarios and representative sample data.  
**Verification:** Crash/stale-worker, browser-local lexical retrieval, and seeded authorization bug/fix/reset flows implemented and tested.

## IMP-07 — Illustrated build notes

**Status:** Ready for review  
**Existing foundation:** engineering decisions within individual case studies.  
**References:** [Emil Kowalski's portfolio](https://emilkowal.ski/) combines projects with writing about implementation; [Rauno's portfolio](https://rauno.me/) separates projects and field notes. Adapt this into a small collection that reveals Usman's reasoning.

Initial subjects:

1. Why CloudCrew uses PostgreSQL as its queue.
2. What CipherRelay's encryption protects—and what it does not.
3. Why a passing performance test did not mean the shop was ready to ship.

Each note should contain a few concise paragraphs and one useful diagram, screenshot, or artifact. A large publishing system or posting schedule is unnecessary.

### Tasks

- [x] Draft the three notes from current README and repository evidence.
- [x] Avoid unverified first-person decision claims; use source-grounded technical wording.
- [x] Add one explanatory visual per note where it helps.
- [x] Implement a small index and directly shareable note pages.
- [x] Link notes to the associated project and add a modest homepage entry point.

### Acceptance criteria

- Each note communicates a concrete tradeoff or lesson.
- Implementation claims cite source material and follow the README-first policy.
- Notes add depth rather than repeat the case-study overview.
- Dates, page metadata, and related links are accurate.

**Dependencies:** content drafting and contribution review.  
**Verification:** Build, typecheck, desktop/mobile Chromium interaction checks, and automated WCAG scans pass. See implementation log below.

## IMP-08 — Personal photo collection and current-focus content

**Status:** In progress  
**Existing foundation:** supplied professional portrait, conversational About copy, education, and experience.  
**References:** [Lando Norris's site](https://landonorris.com/) separates professional and personal material through On Track and Off Track; [Paco Coursey's site](https://paco.me/) includes current focus and personal interests.

Add a small curated collection of university, public-event, project-setup, or personal-interest photos. Use brief captions that explain why each matters. An optional “Currently exploring” item can describe a real present interest supplied by Usman.

Keep the existing portrait as the professional introduction and use less formal material to give About more personality.

### Tasks

- [ ] Obtain user-supplied photos suitable for public display.
- [x] Add confirmed interests: perfume collecting, gaming, reading, and singing. Engineering themes are labeled project threads, not invented learning commitments.
- [ ] Build a responsive photo strip or compact collage.
- [ ] Optimize image sizes and provide useful alt text/captions.
- [ ] Use restrained reveal/hover treatment with touch and reduced-motion alternatives.

### Acceptance criteria

- The photos and interests are authentic and approved for public use.
- No hobbies, events, relationships, or achievements are invented.
- Images complement the engineering story and do not expose private workplace material.
- About remains concise and readable on mobile.

**Dependencies:** additional photos, captions, and personal details from Usman.  
**Verification:** Personal-interest section implemented and checked. Additional authentic public-use photos and captions are not supplied; photo strip remains pending.

## Deferred ideas

| Idea                           | Status   | Reason                                                                                                 |
| ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------ |
| Full 3D navigable world        | Deferred | High implementation/asset cost; targeted engineering interactions better support the current audience. |
| Constant custom cursor effects | Deferred | Limited information value and potential interference with familiar navigation.                         |
| Autoplay audio                 | Deferred | Unnecessary for project exploration; any future sound should be opt-in.                                |

## Shared implementation rules

- Project READMEs take precedence over conflicting CV capability claims.
- Preserve supplied CVs and photos; create separate derivatives as needed.
- Keep direct project access, CV downloads, and contact information easy to find.
- Retain the accessible, readable experience without decorative animation.
- Add third-party libraries only when the improvement needs them; reuse the existing stack where practical.
- Keep private data and unsupported outcomes out of examples and public assets.
- Treat source-site observations as inspiration, not a requirement to copy their compositions or assets.

## Verification and progress log

### October 11, 2026 — readable hierarchy and explicit project grouping

Status: implemented and verified, ready for visual review.

- Enlarged discipline labels, section markers, project category labels, and simulation headers. Main context labels are at least 14px; project/walkthrough statuses are at least 12px, with distinct badges.
- Added consistent bordered project surfaces, rounded corners, preview/content dividers, larger gutters, and a separator after the flagship. These apply visual hierarchy, contrast, proximity, and common-region grouping so adjacent projects are clearly independent.
- Preserved the flagship/two-column composition, project order, accessible controls, reduced motion, and mobile stacking. Status badges wrap rather than shrink on narrow screens.
- Added `src/app/hierarchy.css` and a regression test for readable computed sizes, card boundaries, and viewport overflow.
- Production build and typecheck pass; all 16 desktop/mobile Chromium tests pass, including automated WCAG scans. Desktop/mobile project and playground screenshots reviewed. No new dependencies or content claims.

For each implemented improvement, record the date, changed files, checks performed, observed limitations, and final status. Use focused interaction checks, responsive/reduced-motion review, and screenshots where appropriate. Do not mark an improvement Done merely because code was written.

| Date             | Update                                                                                                                  | Verification                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| October 10, 2026 | Created tracker with eight researched improvements and four implementation phases. All new improvements remain Planned. | Documentation creation only; no application changes in this update. |

### October 10, 2026 — implementation pass

- **Curation:** assessed 25 public repositories by demonstrable depth, recruiter relevance, tradeoffs, and inspectable evidence. ClaimGuard promoted to a ninth case study. Default selected work: ClearStep, ClaimGuard, CloudCrew, e-commerce QA, CipherRelay, cross-browser QA. Cloud and QA paths lead with CloudCrew and e-commerce QA. Forgequeue's public Git tree is empty (HTTP 409), so it remains in progress. See [project-curation.md](project-curation.md).
- **Phase 1:** asymmetric flagship/pair/wide-story layout; actual CloudCrew and ProShop screenshots; on-demand silent QA recording; fictional ClearStep interaction and ClaimGuard fixture; opening summaries and section navigation. Ownership is stated only where confirmed.
- **Phase 2:** sliding filter indicator, reduced-motion-aware layout changes, shared React view-transition identity, short timing tokens, pressed states, native CV chooser, and truthful clipboard success/failure feedback.
- **Phase 3:** Preview/Look inside toggles with selectable README-grounded decisions and static architecture fallbacks. Expanded recovery scenarios; added live browser-local lexical matching and a fictional authorization failure/fix/retest experiment. These do not claim to run their source services.
- **Phase 4:** three source-linked illustrated notes with direct routes and index; confirmed hobbies and project-derived themes. Photo collection awaits additional approved photos and captions.
- **Changed areas:** content/curation/notes, explorer/preview/lab/contact/navigation components, home/case/notes routes, sitemap, improvements stylesheet, public QA evidence, and browser tests. Original CVs and portrait are unchanged.
- **Verification:** production build and typecheck; 14 desktop/mobile Chromium tests covering filters/history/search, nine case routes, three note routes, PDFs, clipboard failures/success, previews, scenarios, resets, reduced motion, evidence delivery, and WCAG scans. Desktop/mobile screenshots reviewed. Fixed an intrinsic-grid mobile overflow and strengthened checks against layout viewport width.
- **Limits:** no deployment, real-user performance measurement, or branded Safari/Firefox test. View transitions fall back to normal navigation where unsupported. Unconfirmed individual task ownership and extra photos remain explicitly pending. Seven items are Ready for review, not automatically signed off as Done.
- **Additional checks:** homepage, explorer, two new/featured cases, and a note have no horizontal overflow at 320, 390, 768, 1024, and 1440 CSS pixels. With JavaScript disabled, ClearStep still has its four-step static architecture and matching CV link. File hashes confirm the public CV/portrait copies match the supplied originals. ClearStep/CipherRelay's inspectable layer explicitly covers extraction, validation, inference, local storage, encryption, transport, identity trust, and operational boundaries.

# Mindplay and project videos — October 11, 2026

Status: Ready for review. Production build, TypeScript, and all 18 desktop/mobile Chromium tests pass, including actual video decoding/playback and layout checks.

- Updated Mindplay from the current repository README and evaluation report, including three input branches, arbitration, hardware requirements, team attribution, and evaluation caveats.
- Promoted Mindplay into the six default selected projects; both QA projects remain in the QA filter.
- Added reusable, user-controlled video playback to project previews and case studies. Mindplay's supplied animation is labelled as a visual explanation; the existing ProShop video remains actual QA footage.
- Inspected all nine featured repositories: only ProShop has a checked-in video asset. Mindplay uses the supplied local video; the other seven need recordings before playback can be added. External video links not checked into a repository may still exist.
- Preserve local original media; publish separate public copies. No autoplay, and video data is not preloaded.
