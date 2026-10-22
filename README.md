# Phạm Tiến Đạt — SEO Portfolio

Source code for a bilingual (Vietnamese / English) personal SEO portfolio.

## Run locally

Requires Node.js 20 or newer. There are no package dependencies and no build step.

```bash
npm run dev
```

Open `http://localhost:4173`. You can also edit `dist/index.html` directly: it contains the HTML, CSS, JavaScript, content, and interactions in one file. The local server binds to `127.0.0.1`.

## Repository map

| File | Purpose |
| --- | --- |
| `dist/index.html` | Website source and static entry point. |
| `.openai/hosting.json` | Static hosting configuration for the existing Sites project. |
| `dev-server.mjs` | Dependency-free local preview server. |
| `docs/brief.md` | Content, audience, and design direction. |
| `docs/evidence.md` | Public-safe aggregate search data and attribution guidelines. |
| `docs/references.md` | Design references and browser inspection status. |
| `docs/design-direction.json` | Earlier generated design direction; optional background. |
| `AGENTS.md` | Instructions for continuing this project in Codex. |

The source snapshot corresponds to the website as of October 22, 2026. The static folder is `dist/`. Import this folder as a repository or open it directly in Codex. This repository does not contain private Search Console exports, screenshots, or CV source documents.

## Put the entire folder on GitHub

Create an empty repository on GitHub, then from this folder run:

```bash
git init
git add .
git commit -m "Add SEO portfolio source"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example repository URL with your own. Inspect the files before pushing to a public repository, especially your visible contact information in `dist/index.html`. GitHub Pages is not automatically enabled by this package.
