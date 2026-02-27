# Monkbot SaaS (No-Payment-Gateway Phase)

Next.js + Vercel backend for Monkbot WordPress plugin.

## What this scaffold includes

- Plugin API routes
  - `POST /v1/plugin/validate`
  - `POST /v1/plugin/chat-completions`
- Manual admin API routes (protected by `x-admin-secret`)
  - `POST /api/admin/keys/create`
  - `POST /api/admin/domains/link`
  - `POST /api/admin/credits/grant`
- Prisma models for API keys, linked domains, and credit ledger.
- OpenAI proxy with server-side API key only.

## Setup

1. Install deps:

```bash
npm install
```

2. Copy env:

```bash
cp .env.example .env
```

3. Run migrations:

```bash
npx prisma migrate dev --name init
```

4. Run dev server:

```bash
npm run dev
```

## Vercel env vars

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `ADMIN_SECRET`
- `DEFAULT_FREE_CREDITS`

## Minimal launch flow (manual billing)

1. Create key using admin API.
2. Link one domain for free users.
3. Install plugin on customer WP site and paste key.
4. Add credits manually when user upgrades.

## Notes

- `vercel.json` + `next.config.ts` rewrites allow plugin to call `/v1/...` directly.
- Keep all plugin routes on Node runtime.
