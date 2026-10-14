# Portfolio development plan

## Current implementation — October 14, 2026

The application now includes ten README-grounded case studies, role-aware curated showcases, inspectable architecture previews, real CloudCrew/QA media, three browser-local engineering experiments, three illustrated build notes, CV selection, and contact feedback. The portrait-free opening and clarity pass are live on Vercel. See [project-curation.md](project-curation.md) for selection rationale and [forgequeue-review.md](forgequeue-review.md) for the latest project review.

Default featured order: ClearStep, ClaimGuard, ForgeQueue, e-commerce QA, CipherRelay, Mindplay. ForgeQueue leads the cloud filter; CloudCrew and cross-browser QA remain in the full collection and relevant filters. Research/coursework remains discoverable instead of being presented as stronger production evidence. The old empty-Forgequeue observation is superseded by its October 14 source and CI review.

Confirmed solo projects: ClearStep, both QA portfolios, and ForgeQueue. Mindplay is team work; individual task ownership is unspecified. Other contributions are not assumed. Confirmed personal interests: perfume collecting, gaming, reading, and singing. Hobby photos are optional; the interactive typographic snapshots work without them. Original supplied assets are preserved, but the portrait is no longer rendered in the opening.

## Purpose and audience

Build a memorable personal portfolio for **Usman Tariq** that helps recruiters, hiring managers, engineers, collaborators, and curious visitors understand his work quickly and explore it in an informal, engaging way.

The portfolio should make three things clear within the first screen: who Usman is, what kinds of problems he works on, and where to see his strongest projects. Personality and motion should make the work inviting; accurate evidence and clear explanations should make it credible.

This document is a development plan, not authorization to publish the site. The intended hosting target is Vercel, with a free tier where its current terms and limits permit the planned usage.

## Working assumptions and decisions to confirm

- Use **Usman Tariq** in the interface, metadata, résumé labels, and contact section.
- Present one software-engineering identity with three recruiter paths: **Software & AI**, **Cloud & DevOps**, and **SQA & Test Automation**, supported by the three supplied CVs.
- Use a friendly, direct first-person voice. Explain each project for visitors who may not know its technologies.
- Start with a dark visual theme, off-white typography, and one electric lime or cyan accent. Confirm the preferred accent before polishing.
- Use curated project content, with GitHub metadata as optional supplementary information.
- Begin with screenshots and recorded demonstrations for projects that cannot run affordably on the public site.
- Do not invent experience, qualifications, project outcomes, usage numbers, performance improvements, or availability for work.
- Use the supplied LinkedIn URL and CV contact email. Display Islamabad, Pakistan as the location. Keep the telephone number off the main interface by default; it is already present in the supplied CV downloads.

## Supplied profile, CVs, and portrait

All three supplied PDFs were read in full, and `NewPFP.png` was visually inspected. Preserve these originals and create separate public asset copies during implementation.

| Source file              | Portfolio use                                                  |
| ------------------------ | -------------------------------------------------------------- |
| `CV-UsmanTariq.pdf`      | Software engineering / AI CV and supporting experience content |
| `Cloud_Based_CV.pdf`     | Cloud / DevOps CV and supporting experience content            |
| `SQA_USMAN_TARIQ_CV.pdf` | SQA / testing CV and supporting experience content             |
| `NewPFP.png`             | Portrait in the hero or About section                          |

Profile configuration:

- Name: **Usman Tariq**, following the user's preferred spelling rather than the CVs' M. Usman Tariq variants.
- Location: **Islamabad, Pakistan**.
- Email: **m.usmantariq124@gmail.com**, consistent across the CVs.
- LinkedIn: **https://www.linkedin.com/in/m-usman-tariq-6581b022a/**.
- GitHub: **https://github.com/usman78654**.
- Professional anchor: **Software Engineer at Huawei Technologies, 2026–Present**. Current employment confirmed by Usman on October 10, 2026.
- Education: **Software Engineering graduate**, FAST / FAST National University of Computer and Emerging Sciences, Islamabad, **2022–2026**. Graduation confirmed by Usman on October 10, 2026; the cloud CV's “undergraduate” wording is outdated.

The supplied LinkedIn URL is canonical; the cloud CV omits its final `a`. LinkedIn page content could not be fetched during this review, so no additional profile facts are inferred from that page.

### Positioning and recruiter paths

Candidate hero: **“Usman Tariq. I build useful software, intelligent tools, and reliable systems.”**

Candidate introduction: “I'm a software engineer based in Islamabad, working on telecom analytics and automation at Huawei. Outside work, I explore AI, cloud systems, secure applications, and software testing.” Keep the tone conversational and verify employment before launch.

Offer three lightweight “Explore my work” controls below the introduction. Selecting a path emphasizes relevant projects and recommends the matching CV. Keep the default view broad, make every project accessible, and preserve shareable filter state through URLs such as `/projects?focus=cloud`. Visitors must not choose a role before seeing work.

| Path                  | Project emphasis                                                                                                                       | Matching CV              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| Software & AI         | ClearStep, CloudCrew, EDiME, RAG pipeline, CipherRelay; Mindplay EEG as an additional research/desktop story                           | `CV-UsmanTariq.pdf`      |
| Cloud & DevOps        | CipherRelay deployment and CloudCrew first; verified CI/CD, observability, persistence, recovery, and deployment tradeoffs             | `Cloud_Based_CV.pdf`     |
| SQA & Test Automation | Playwright cross-browser project and e-commerce QA first; strategy, defects, API checks, accessibility, and release-readiness evidence | `SQA_USMAN_TARIQ_CV.pdf` |

These are portfolio interests and project evidence, not claims that Usman has held three different professional titles.

### Experience, education, and training

Add a compact “Where I've worked” section with expandable details:

- **Huawei Technologies — Software Engineer, 2026–Present:** telecom KPI dashboards, recurring Excel-data automation, context-aware chatbots/APIs, and operational analysis. The CVs report **10+ dashboards** and interpretation time changing from roughly **1–2 hours to a few clicks**. Confirm public wording and supporting context before featuring these CV-reported outcomes; do not invent a duration or percentage from “a few clicks.”
- **National Incubation Center — Software Engineer Intern, 2025:** Firebase room scheduling, requirements gathering, collaboration, events, and media work. Emphasize the scheduling system for recruiters; event/media work adds personality and communication context.
- **Parliament of Pakistan — Software Engineer Intern, 2024:** internal ticketing automation and gathering operational requirements.
- **Pakistan Television — Software Engineer Intern, 2024:** digital public-service content and broadcast/editorial collaboration. Describe the actual media responsibilities clearly under the CV-reported title.

Use public descriptions or synthetic reconstructions for workplace visuals. Do not publish internal telecom datasets, dashboards, tickets, or conversations.

Include concise education and an optional training row: AWS Cloud Practitioner Essentials, LangChain for LLM Application Development, Docker Foundations, and PIPS Officer Training. Label them as **training/courses** unless the exact credential is verified; Cloud Practitioner Essentials does not establish AWS Certified Cloud Practitioner certification. Optional About details: English and Urdu fluency, basic German. Connect skill groups to demonstrated projects rather than implying equal proficiency in every listed tool.

### Reconcile source differences before publishing

- **Confirmed source policy:** for project capabilities, current repository READMEs take precedence over conflicting CV wording. Use CVs for professional history and personal background, with the user's direct confirmations taking precedence for identity and current status. Link each case study to its source README. Never infer that a README claim proves an independent audit or successful remote CI run.
- CipherRelay is presented according to its README: educational encrypted messaging, static identity ECDH, no forward secrecy, trust-on-first-use limitations, and no independent security audit. Conflicting CV wording is not used in portfolio copy. Original downloadable CVs remain unchanged.
- The cloud CV mixes completed-work wording with “Adding” wording for platform hardening. Verify Kubernetes, Terraform, scanning, metrics, dashboards, and rollback individually in the repository; label planned features as planned.
- The SQA CV's summary remains broad AI/full-stack wording. The portfolio's testing path should foreground actual testing evidence without changing the original PDF.
- Use the user-confirmed graduation and current Huawei employment in the timeline. Preserve the supplied CVs; note the outdated “undergraduate” wording if preparing a future CV revision.

### Portrait treatment

Use `NewPFP.png`, the supplied head-and-shoulders portrait with a light background, as a personal anchor in the hero or prominently in About. A framed off-white portrait panel can connect its existing background to the dark site.

- Preserve the face and proportions, natural headroom, and a responsive crop checked on mobile.
- Keep the original intact; prepare appropriately sized WebP/AVIF derivatives and a fallback during implementation.
- Give the image explicit dimensions and alt text such as “Portrait of Usman Tariq.”
- Animate the surrounding panel or accent shapes subtly; avoid distorting or continuously animating the face.
- Background removal is optional and unnecessary for the first version.

### Three-CV interaction

Provide a visible **“Choose a CV”** control with three options: **Software & AI**, **Cloud & DevOps**, and **SQA & Testing**. Each must expose its PDF without requiring a role-filter selection. Recommend the matching CV on relevant recruiter paths and case studies while keeping the other two available.

Prepare separate public copies under `/resume/` named `Usman-Tariq-Software-AI-CV.pdf`, `Usman-Tariq-Cloud-DevOps-CV.pdf`, and `Usman-Tariq-SQA-CV.pdf`. Document their source mapping in profile data. Verify open/download behavior and review the public contact details contained in the downloads before launch. Do not silently rewrite or merge the three CVs.

## Creative direction

Working concept: **Usman’s Engineering Lab**. Treat this as a direction to explore, not a final brand name.

Reference: https://landonorris.com/

Borrow the reference’s confident typography, sectional storytelling, large visuals, and sense of motion. Adapt those ideas to Usman’s own identity and engineering work. Use original compositions, copy, and assets.

Visual system:

- Oversized but readable headlines, generous spacing, and a clear hierarchy.
- Dark surfaces, off-white text, a restrained accent color, and subtle grid lines or texture.
- Large screenshots, short demonstration clips, and architecture visuals as the primary project imagery.
- Distinct visual identities for featured projects within one consistent site system.
- Visible navigation and recognizable links for projects, résumé, GitHub, and contact.
- A responsive layout with equally complete content on phones and desktops.

Avoid burying project links behind an introductory sequence. Recruiters should be able to reach evidence immediately, while other visitors can enjoy the longer visual journey.

## Content and information architecture

### Homepage

1. **Hero:** name, a concise positioning statement, a short personal introduction, and direct links to selected work and résumé. Candidate headline: “I build intelligent systems that solve difficult problems.” Validate the wording against the target role. An optional rotating specialty line can show AI, full-stack development, cloud systems, and software quality without replacing the main readable introduction.
2. **Selected work:** four to six prominent projects, each with a strong preview, a plain-language summary, project type, key technologies, and case-study link. Show demo and source links when available.
3. **Engineering approach:** a brief explanation of how Usman builds and evaluates systems, supported by examples from the projects rather than a wall of skill badges.
4. **Project explorer:** all suitable remaining repositories, with category filters and clear links. This can be a homepage section initially and a dedicated page if the collection becomes too large.
5. **Engineering timeline:** a concise account of progress from algorithms and ML experiments to larger applications and distributed systems. Verify dates and the narrative before publishing; repository update dates do not necessarily establish when a project was built.
6. **Technical playground:** one polished interactive demonstration in the first release, with additional experiments added later.
7. **About and contact:** supplied portrait, personal context, verified experience and education, three clearly labeled CV downloads, GitHub, the supplied LinkedIn link, and email. Include an honest work-availability statement only after confirmation. Place the compact experience section before About or combine them for better pacing.

### Featured project candidates

Final order depends on the selected recruiter path, project completeness, and available evidence. Keep four to six projects in the default showcase; the expanded candidate list does not require every project to occupy the homepage. Review implementation and artifacts before writing final claims.

| Project                                | Story to communicate                                                                               | Suggested presentation                                                                                                      |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ClearStep                              | Making dense paperwork understandable through a privacy-conscious document assistant               | Sample notice walkthrough, extracted facts and checklist, browser/server data-flow diagram                                  |
| CipherRelay                            | Building encrypted real-time communication with deployment and operational tooling                 | Recorded chat/file demonstration, encryption flow, deployment architecture, explicit security limitations                   |
| CloudCrew                              | Coordinating durable jobs and independent agents in a distributed backend                          | Task-console clip, job-state sequence, supervisor/worker architecture; label mock and cloud modes                           |
| EDiME / xai-diffusion-medical          | Investigating explainable diffusion for medical images, including unsuccessful results and lessons | Generation examples, explainability overlays, evaluation results with context; identify it as research, not a clinical tool |
| Playwright cross-browser SQA portfolio | Turning testing evidence into a defensible release assessment                                      | Browser matrix, representative report, trace/video samples, accessibility findings                                          |
| LLM RAG Pipeline                       | Answering questions using a document knowledge base                                                | Retrieval walkthrough, cited sample response, pipeline diagram, recorded local demonstration                                |
| E-commerce QA Testing Portfolio        | Testing critical shopping journeys and communicating release risk                                  | Test-case examples, reproducible defects, Postman examples, and regression summary                                          |
| Mindplay / EEG motor imagery           | Connecting signal processing and real-time interaction                                             | Desktop recording, pipeline diagram, synthetic/live mode labels, and classifier evaluation context                          |

Repository source: https://github.com/usman78654?tab=repositories

Consider Forgequeue for a featured slot after its purpose, implementation, README, and demonstration are reviewed. Other projects belong in the explorer when their content and evidence are ready.

### Case-study structure

Each featured project gets a permanent, directly shareable URL, such as `/projects/clearstep`.

Use the same readable structure while allowing each project its own visuals:

1. Plain-language overview: what it does and why someone might use it.
2. Project facts: role, scope, status, timeframe if verified, and technologies.
3. Quick access: live demonstration, source repository, and short video where available.
4. The problem and constraints.
5. What Usman personally designed, implemented, tested, or investigated; acknowledge collaborators and external work accurately.
6. An architecture diagram and an understandable explanation of the flow.
7. Two or three technical decisions and their tradeoffs.
8. Evidence: screenshots, tests, evaluation results, or measured outcomes, with enough context to assess them.
9. Limitations, lessons learned, and the next improvement.
10. Links to related projects and contact.

Use friendly project titles and summaries rather than exposing long repository names as the primary labels. Keep technical detail available for engineers, with concise summaries for recruiters. Define unfamiliar terms where needed.

### Project explorer

Categories: AI/ML, Full stack, Security, Cloud/DevOps, Software testing, and Algorithms. Allow projects to have multiple categories.

Include title, summary, screenshot where useful, technologies, status, and source/demo links. Provide an “All” filter and a clear empty state. Add search only if the collection makes it useful.

Do not rank projects using stars alone. Curate by relevance, depth, completeness, and evidence. Avoid presenting prototypes as production deployments.

## Motion and interaction plan

Build a small, consistent motion vocabulary before adding individual effects.

Core effects for the first release:

- Short text and image reveals as sections enter the viewport.
- Animated project previews and responsive hover/focus states.
- Subtle magnetic buttons on suitable desktop devices.
- Smooth, brief transitions between the homepage and case studies, if they preserve reliable routing and navigation.
- Animated service connections in architecture diagrams where they help explain data flow.

Optional cinematic effects after the core experience works:

- Project titles moving behind preview images.
- Mouse-following project thumbnails on desktop, with equivalent visible previews for touch and keyboard users.
- A bounded horizontal selected-work sequence on wide screens, with ordinary vertical browsing on smaller screens and accessible navigation.
- A command-execution-inspired transition motif.
- Project cards expanding into case studies when URL history, back navigation, and focus behavior remain correct.
- Subtle parallax and a restrained cursor treatment.

Motion requirements:

- Respect `prefers-reduced-motion`; provide a readable static experience.
- Keep native scrolling and browser back/forward navigation dependable.
- Never require hovering, cursor movement, dragging, or animation completion to access important content.
- Keep mobile motion light and optional; avoid large persistent WebGL scenes.
- Use transform and opacity animations where practical, clean up listeners, and pause offscreen work.
- Load expensive animation code only where used. No artificial loading delay.
- Use one library to own each animated property; avoid Motion and GSAP competing on the same element.

## Technical playground

Choose one small experiment based on the strongest available implementation and assets. It should demonstrate an idea in under a minute and link to the corresponding project.

Candidates:

- A local sample RAG walkthrough showing retrieval and grounded answers.
- A multi-agent diagram with clickable or draggable nodes and a task-state walkthrough.
- An encryption-flow visualization explaining sender, recipient, keys, and ciphertext.
- A chess minimax visualizer with a bounded search depth.
- A graph-algorithm comparison on a small editable graph.
- Medical-image overlays comparing generated examples and explainability outputs.

Use browser computation, precomputed results, or clearly labeled recorded/mock examples for the first release. Any future live AI integration needs a separate hosting, latency, and operating-cost decision. Never disguise predetermined output as live inference.

## Technical stack and implementation structure

- **Next.js and TypeScript:** routing, static rendering, metadata, and case-study pages.
- **Tailwind CSS:** shared tokens and responsive styling.
- **Motion for React:** component interactions and ordinary reveals.
- **GSAP with ScrollTrigger:** optional, limited to cinematic sequences that justify its additional complexity.
- **Structured TypeScript data:** project catalog and homepage content initially. Use MDX for longer case studies if it simplifies authoring.
- **Vercel:** intended deployment target, Git-based previews, and production hosting.
- **Vercel Analytics:** optional after checking current plan availability and deciding whether analytics is needed.
- **GitHub API:** optional build-time metadata, cached and supplementary; the site must render when GitHub is unavailable.

Proposed structure:

```text
src/
  app/
    page.tsx
    projects/
      page.tsx
      [slug]/page.tsx
    not-found.tsx
  components/
    layout/
    projects/
    motion/
    playground/
  content/
    projects.ts
    profile.ts
    case-studies/
  styles/
public/
  projects/
  resume/
```

Confirm current package versions and compatibility during setup. Prefer static content and minimal server behavior so hosting stays simple. A portfolio on Vercel does not imply every showcased backend can run there: local Ollama, GPU workloads, persistent workers, Docker stacks, and long-lived WebSocket services need their own hosting or recorded/sample demonstrations.

Project content should have typed fields for slug, title, summary, categories, recruiter paths, technologies, role, status, source URL, optional demo URL, media, evidence, limitations, and featured order. Profile data should include the confirmed name, location, email, LinkedIn/GitHub URLs, portrait metadata, experience, education, and the three CV mappings. Keep private credentials out of content and browser bundles.

## GitHub and asset preparation

- Add concise descriptions and useful topic tags to serious repositories.
- Add homepage/demo URLs where working demonstrations exist.
- Pin the strongest six repositories after the final featured selection.
- Improve READMEs with screenshots or GIFs, setup instructions, architecture, tests/evaluation, limitations, and results.
- Prepare Forgequeue’s README before promoting it.
- Capture consistent project screenshots and short clips; use original project assets and remove private information.
- Record evidence for numerical claims, including measurement conditions and dates where relevant.
- Preserve the three supplied CVs and prepare clearly labeled public copies with readable filenames and verified open/download links.
- Prepare responsive portrait derivatives from `NewPFP.png`; retain the original and validate crops on mobile.
- Create social-sharing preview imagery and a favicon consistent with the visual system.

GitHub edits are a separate task to carry out when requested; they are listed here as launch preparation.

## Accessibility, performance, and discoverability

- Use semantic sections, a logical heading order, descriptive link text, and a skip link.
- Ensure complete keyboard operation, visible focus, sufficient contrast, and accessible filter controls.
- Provide text equivalents for diagrams, alt text for meaningful images, and captions/transcripts for clips where needed.
- Test reduced motion and touch behavior explicitly.
- Optimize screenshots with responsive sizes and modern formats; lazy-load below-the-fold media.
- Avoid autoplaying large videos; use posters and deliberate playback.
- Keep the hero lightweight and the main content readable without animation initialization.
- Add page titles, descriptions, canonical URLs after the domain is known, Open Graph images, sitemap, and robots configuration.
- Aim for good Core Web Vitals: LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1. Use lab checks before launch and real-user data when sufficient traffic exists.
- Check representative phone, tablet, and desktop sizes in Chromium, Firefox, and Safari/WebKit where tooling allows.

## Development phases

### Implementation checkpoint — October 10, 2026

The first working release implements the responsive Next.js / TypeScript foundation, dark/lime visual system, portrait, contact links, experience, education, three CV downloads, role filters with shareable URLs and browser history, search, repository explorer, eight statically generated case studies, and a CloudCrew recovery walkthrough. Case-study capabilities follow the current public READMEs. Six projects occupy the default homepage, with all eight detailed projects and seventeen other repositories available in the collection.

| Phase                      | Current state                                                                                                                                                                  | Remaining work                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1 — Content and design     | First pass implemented                                                                                                                                                         | Optional role priority and accent feedback; confirm personal contribution details and public workplace outcomes                       |
| 2 — Functional version     | Implemented                                                                                                                                                                    | Iterate from review feedback                                                                                                          |
| 3 — Project stories        | Eight first-pass case studies implemented                                                                                                                                      | Additional actual screenshots/videos and more individual contribution detail; CloudCrew already includes a real repository screenshot |
| 4 — Motion and personality | Initial reveals, artwork hover states, reduced-motion support, and interactive walkthrough implemented                                                                         | Add cinematic transitions or magnetic effects only if they improve the reviewed experience                                            |
| 5 — Verification           | Production build and type checks passed; all eight desktop/mobile Chromium tests passed, including automated accessibility scans. Desktop/mobile screenshots visually reviewed | Broader browser checks, real-user performance data, and final content review before launch                                            |
| 6 — Deployment             | Not deployed; configured for a standard Vercel Next.js project                                                                                                                 | Choose the real public origin, check current hosting limits, and deploy when requested                                                |

Run instructions are in `README.md`. Automated browser checks are in `tests/portfolio.spec.ts`; screenshots and failure traces are generated under ignored `test-results/`. Source assets and original CVs remain intact. Concept diagrams are explicitly labeled and are not represented as application screenshots. The interactive recovery explanation does not run or contact CloudCrew's backend.

### Phase 1 — Content and design foundations

Use the confirmed name, graduation, current Huawei employment, LinkedIn URL, supplied portrait, CV contact details, and three recruiter paths. Confirm remaining details: availability, accent color, and featured-project priorities. Reconcile the CV/repository claims listed above, review project evidence, and collect initial media. Draft the hero, experience section, summaries, and one full ClearStep case study. Define typography, color, spacing, and motion tokens.

Deliverable: a content outline and visual direction detailed enough to build without placeholder marketing claims.

### Phase 2 — Functional first version

Set up the application, shared layout, navigation, homepage, project data, recruiter-path filters, case-study routing, portrait, and contact links. Implement the three-CV selector and ClearStep as the first complete case study. Establish responsive and keyboard behavior early.

Deliverable: a locally reviewable portfolio with real content, a working explorer, and one complete case study.

### Phase 3 — Complete project stories

Write and build the remaining featured case studies. Add screenshots, demo clips, diagrams, evidence, limitations, related links, about content, and the verified timeline. Populate the remaining suitable projects in the explorer.

Deliverable: complete recruiter-facing content and working links throughout.

### Phase 4 — Motion and personality

Implement the shared reveal system, previews, button interactions, and selected cinematic sequences. Add one technical playground experiment. Tune the visual balance and reduced-motion/mobile experience.

Deliverable: a cohesive interactive portfolio with the intended personality and accessible alternatives.

### Phase 5 — Verification and launch preparation

Run type checks and a production build. Verify filters, project routes, browser history, résumé download, contact links, missing-route behavior, media, and metadata. Review keyboard navigation, reduced motion, responsive layouts, performance, and supported browsers. Use focused automated checks for meaningful interactions; visually inspect the actual pages as well.

Review every claim and remove temporary copy, broken links, private data, and unused assets. Check current Vercel free-tier terms, quotas, analytics availability, and any external service costs. Prepare deployment configuration and a preview when authorized.

Deliverable: a verified build, deployment-ready configuration, and a list of any remaining launch blockers.

### Phase 6 — Deployment and follow-up

When deployment is requested, connect the selected Git repository to Vercel, configure only required environment variables, deploy, and verify the public homepage, direct project links, assets, résumé, and metadata. A free Vercel subdomain is sufficient initially; a custom domain is optional and may have a separate cost.

After launch, refine project order and content based on feedback. Add additional playground experiments only when they strengthen the portfolio. Keep content and demonstrations current.

## Definition of done

- A visitor can identify Usman’s focus and reach selected projects immediately.
- Four to six selected projects have complete, accurate case studies and usable evidence.
- All appropriate remaining projects are discoverable through the explorer.
- Recruiters can access the appropriate one of three CVs, LinkedIn, GitHub, and email without searching; all CV mappings are verified.
- Name and profile details are consistent, the portrait renders correctly, and experience/education wording matches verified facts.
- Each recruiter path foregrounds relevant evidence, and CV/repository contradictions have been resolved before publishing claims.
- The site feels personal and informal while retaining professional clarity.
- Motion is responsive, restrained, and compatible with reduced-motion preferences.
- Important flows work with keyboard, touch, and supported browsers.
- A production build passes, links and downloads work, and metadata is complete.
- Hosting requirements and limits are understood; demonstrations are honestly labeled.
- If launch is requested, the deployed URL and direct case-study URLs are verified.

## Codex workflow and model guidance

The recommendation discussed for this project is GPT-6.1 Sol with high reasoning for routine implementation, responsive layouts, components, and debugging; extra-high reasoning for architecture or a focused polish pass. GPT-6 Astra can be used for demanding creative reviews or complex technical decisions, and GPT-6 Luna for small, well-scoped edits. Choose from models actually available in the account and verify current guidance when implementation begins.

Work in reviewable phases with specific requirements, real assets, and browser verification. Model choice alone will not produce a strong design: consistent art direction, accurate content, and iterative visual review are essential.

Official guidance consulted during planning:

- https://developers.openai.com/api/docs/guides/model-selection
- https://developers.openai.com/api/docs/guides/code-generation

## Questions to resolve before final content and polish

Already supplied or confirmed: **Usman Tariq**, LinkedIn URL, all three role-oriented CVs, a portrait, contact details within the CVs, graduation from FAST, and current employment at Huawei. Do not ask for those again.

1. Should one of the three recruiter paths receive priority, or should the default remain balanced?
2. Which three projects are you most proud of, and what was your personal contribution to each?
3. Do you prefer electric lime, cyan, or another accent?
4. Which projects already have reliable live demos, screenshots, or videos?
5. Are you available for internships, full-time roles, freelance work, or some combination?
6. No clarification is needed for conflicting project claims: use the README-first policy above.

These answers refine positioning and launch content. Development can begin using the working assumptions above while those details are gathered.
