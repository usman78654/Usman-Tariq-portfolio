# Deployment

- Production: https://usman-tariq-portfolio.vercel.app
- GitHub: https://github.com/usman78654/Usman-Tariq-portfolio
- Vercel project: `usmantariq/usman-tariq-portfolio`
- Initial production deployment: October 10, 2026; Vercel cloud build succeeded.
- Existing `clearstep` project was not modified.

Public checks pass for the homepage, Mindplay/ClaimGuard case studies, build notes, CV PDF, and sitemap. The production alias is accessible without signing into Vercel. The project uses the free/default build machine; no paid services were added.

## Automatic GitHub deployments — pending account connection

The repository is pushed to `main`, but Vercel returned: “You need to add a Login Connection to your GitHub account first.” Therefore automatic deployment from Git pushes is **not yet enabled**.

Connect `usman78654` in Vercel's account Authentication/Login Connections settings, then run from this workspace:

```powershell
npx vercel git connect https://github.com/usman78654/Usman-Tariq-portfolio.git --yes
```

Once connected, pushes to the configured production branch (`main`) deploy automatically. No passwords or tokens should be committed or pasted into chat.

## Update the site now

Until the GitHub connection is enabled, after editing and testing:

```powershell
npm.cmd run typecheck
npm.cmd run build
git add .
git commit -m "Describe the portfolio update"
git push
npx vercel deploy --prod --yes
```

The stable production URL remains the same. `.vercel/`, environment files, dependencies, test artifacts, and original asset duplicates are excluded from Git. Public CV/portrait copies under `public/` are intentional.
