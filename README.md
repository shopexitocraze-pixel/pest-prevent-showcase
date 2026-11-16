# Global Elite Pest Management — Website

Marketing website for a pest control company in Chennai (Ambattur). Single-page
site built with [TanStack Start](https://tanstack.com/start) + React 19,
Tailwind CSS v4 and Vite.

**Live:** https://globalelitepestmanagement.in

## Features

- Full landing page: services, about, process, areas served, reviews, FAQ, contact
- Contact form backed by a server function — sends an inquiry notification to the
  business inbox plus an automatic confirmation reply to the customer (SMTP)
- SEO: canonical/OG tags, JSON-LD (`LocalBusiness`, `FAQPage`, `WebSite`),
  `sitemap.xml`, `robots.txt`, WebP imagery
- Google Drive powered field-work gallery

## Development

```sh
npm i
cp .env.example .env   # then fill in the SMTP + site values
npm run dev
```

| Script            | Purpose                      |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the dev server         |
| `npm run build`   | Production build             |
| `npm run preview` | Preview the production build |
| `npm run lint`    | ESLint                       |
| `npm run format`  | Prettier                     |

## Environment (`.env`)

See `.env.example` for documentation on every variable.

- `SITE_URL` — production origin (canonical/OG/sitemap must match it)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
  — SMTP credentials for the contact form (server-side only, never `VITE_` prefixed)
- `CONTACT_NOTIFY_TO`, `CONTACT_AUTO_REPLY` — where inquiries land / auto-reply toggle
- `VITE_GALLERY_IMAGES` — Google Drive links for the work gallery
- `VITE_GOOGLE_REVIEWS_URL` — Google Business Profile reviews link

For production deploys (Cloudflare Workers), set the SMTP values as secrets:

```sh
npx wrangler secret put SMTP_HOST
npx wrangler secret put SMTP_USER
npx wrangler secret put SMTP_PASS
# ...repeat for the other server-side variables
```

## Notes

- Routes live in `src/routes/` (file-based routing; `routeTree.gen.ts` is
  generated — don't edit it by hand).
- Shared public constants (URL, phone, service areas) are in `src/lib/site.ts`.
