# Usman Tariq's portfolio

Live: https://usman-tariq-portfolio.vercel.app  
Repository: https://github.com/usman78654/Usman-Tariq-portfolio

A Next.js / TypeScript portfolio for recruiters and curious visitors. Includes curated role-aware showcases, nine README-grounded case studies, inspectable architecture, three engineering experiments, three build notes, and three original CV downloads.

## Run locally

Requires Node.js 20.9+ (validated using Node 22).

```powershell
npm.cmd ci --include=dev
npm.cmd run dev
```

Open http://localhost:3000. If your shell already sets `NODE_ENV=production`, set `$env:NODE_ENV='development'` in the current shell before running the development server.

## Verify

```powershell
npm.cmd run typecheck
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd run test:e2e
```

Browser checks use a production server and cover desktop/mobile layouts, project filters/history/search, CV files, direct case-study routes, reduced motion, the walkthrough, and automated accessibility scans. The build must exist first.

The improvement pass passes production build, TypeScript checks, and all 16 desktop/mobile Chromium tests, including hierarchy/grouping regression checks and automated WCAG scans. Desktop/mobile screenshots were reviewed. This does not establish branded Safari/Firefox compatibility or real-user Core Web Vitals.

Use `npm.cmd run format` to format source and content; `npm.cmd run format:check` verifies formatting without changes.

## Content

- `src/content/profile.ts`: profile, experience, links, and CV mapping.
- `src/content/projects.ts`: curated case studies and other repositories.
- `src/content/curation.ts`: role-aware order, confirmed contributions, and repository scope.
- `src/content/notes.ts`: source-grounded engineering notes.
- `src/app/improvements.css`: showcase, lab, note, and interaction layouts.
- `src/app/globals.css`: design tokens, responsive layouts, project concept artwork, and reduced-motion styling.
- `public/resume/`: public copies of the supplied CVs; originals in the workspace stay unchanged.
- `public/images/`: original portrait copy. Next Image handles responsive delivery.
- `public/projects/cloudcrew-console.png`: actual screenshot from the public CloudCrew repository.
- `public/projects/`: actual QA screenshot/recording and provenance README.

Project READMEs take precedence over conflicting CV project claims. Project diagrams are illustrations, not screenshots or running application demos. The CloudCrew walkthrough is explanatory and does not connect to a backend. Source review date: October 10, 2026. Skill/proficiency or individual contributions beyond the supplied sources are not invented.

## Deployment

Deployed to the separate Vercel project `usman-tariq-portfolio` on October 10, 2026. The existing ClearStep project is unchanged. Next.js is automatically detected; no API keys, database, or model server are required. Vercel's production URL supplies canonical and sitemap metadata. GitHub is connected: pushes to `main` trigger production deployments. See [DEPLOYMENT.md](DEPLOYMENT.md) for the update workflow.

## Remaining content work

Additional informal photos/captions are needed for the personal photo collection. ClearStep and both QA portfolios are confirmed solo; Mindplay is team work. Other task ownership is unspecified and not invented. Original CVs may retain outdated wording. See `improvements.md` for status and `project-curation.md` for selection rationale.
