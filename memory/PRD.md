# SERFIX Service Limited Website PRD

## Original Problem Statement
Пользователь попросил сделать демо-сайт для SERFIX Service Limited и позже запросил переносимые файлы сайта для самостоятельного хостинга вне Emergent/GitHub root setup.

## Architecture Decisions
- Main app: React frontend with FastAPI/MongoDB backend for inquiry storage in the full-stack preview.
- Static export: portable React production build with relative asset paths (`PUBLIC_URL=.`).
- Static contact flow: form opens an email draft to `info@serfixservice.com`, so the site works on static hosting without backend.
- Brand content: SERFIX Service Limited, Regina, Saskatchewan, Local | Reliable | Trusted, services and contacts from supplied images.

## Implemented
- One-page SERFIX promotional website with hero, services, trust/benefits, direct phone/email CTAs, contact form, and footer.
- Backend inquiry API for the full-stack version: `POST /api/inquiries`, `GET /api/inquiries`.
- Static export package created at `/app/serfix_static_site.zip`.
- Static files folder created at `/app/serfix_static_site`.

## Testing
- JavaScript and Python lint passed.
- Backend API tested with curl and testing agent.
- Frontend tested with Playwright screenshots.
- Static export tested locally via Python static server.

## Prioritized Backlog
### P0
- User downloads `/app/serfix_static_site.zip` and uploads all contents to chosen hosting public folder.

### P1
- If database-backed requests are needed later, connect the contact form to the chosen hosting provider/backend or form service.

### P2
- Add SEO meta tags, business hours, testimonials, and project/gallery photos.


## GitHub Pages Ready Update
- Updated React routing to render the site on any path (`path="*"`), fixing blank screens on GitHub Pages subpaths like `/SERFIX4/serfix_static_site/`.
- Created `/app/docs` with static build contents and `.nojekyll` for GitHub Pages `main /docs` publishing.
- Created `/app/serfix_github_pages_ready.zip` containing both `docs` and `serfix_static_site` folders.
- Verified nested path rendering locally with `/SERFIX4/serfix_static_site/`.


## No-Badge Static Export Update
- Removed platform badge and related external scripts from `frontend/public/index.html`.
- Rebuilt `/app/docs` and `/app/serfix_static_site`.
- Repacked `/app/serfix_github_pages_ready.zip`.
- Verified rendered site has no `Made with Emergent` text and no `#emergent-badge` element.
