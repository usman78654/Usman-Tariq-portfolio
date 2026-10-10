# Deployment

- Production: https://usman-tariq-portfolio.vercel.app
- GitHub: https://github.com/usman78654/Usman-Tariq-portfolio
- Vercel project: `usmantariq/usman-tariq-portfolio`
- Initial production deployment: October 10, 2026; Vercel cloud build succeeded.
- Existing `clearstep` project was not modified.

Public checks pass for the homepage, Mindplay/ClaimGuard case studies, build notes, CV PDF, and sitemap. The production alias is accessible without signing into Vercel. The project uses the free/default build machine; no paid services were added.

## Automatic GitHub deployments — connected

GitHub login and repository permissions are configured. Vercel's project API confirms provider `github`, owner `usman78654`, repository `Usman-Tariq-portfolio`, and production branch `main`.

Pushes to `main` now trigger automatic production deployments. No passwords or tokens should be committed or pasted into chat.

## Update the site now

After editing and testing:

```powershell
npm.cmd run typecheck
npm.cmd run build
git add .
git commit -m "Describe the portfolio update"
git push
```

The stable production URL remains the same. `.vercel/`, environment files, dependencies, test artifacts, and original asset duplicates are excluded from Git. Public CV/portrait copies under `public/` are intentional.
