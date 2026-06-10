# Learning Management System (LMS)

This repository contains a full-featured Learning Management System built with Next.js (App Router), TypeScript, Prisma, Better-Auth, and modern React. It provides course publishing, enrollment, lesson progress tracking, user authentication (email OTP and GitHub social sign-in), an admin dashboard, and S3-backed media storage.

**Quick start**

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 in your browser.

**Note:** Ensure required environment variables are present (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `AUTH_GITHUB_CLIENT_ID`, `AUTH_GITHUB_CLIENT_SECRET`, `RESEND_API_KEY`, AWS credentials, Stripe keys). See `lib/env.ts` for required keys.

**Features**
- **Authentication:** Email OTP and GitHub social sign-in using `better-auth` with a Prisma adapter.
- **Public catalog:** Browse published courses with search and filters.
- **Course management:** Admin can create, edit, and publish courses, chapters, and lessons.
- **Lesson playback & progress:** Lessons with video assets stored in S3 and per-user progress tracking.
- **Enrollments & payments:** Stripe integration for paid courses and enrollment records.
- **User dashboard:** Saved courses, enrolled courses, and progress overview.
- **Admin analytics:** Basic admin dashboard with course and enrollment metrics.

**Screenshots**

Place your screenshots in `public/screenshots/` and replace the placeholder filenames below. Example paths used here:

- `public/screenshots/01-public-catalog.png`
- `public/screenshots/02-course-page.png`
- `public/screenshots/03-lesson-player.png`
- `public/screenshots/04-admin-dashboard.png`
- `public/screenshots/05-sign-in.png`

Screenshots (replace with real images):

![Public catalog](public/screenshots/01-public-catalog.png)

![Course page](public/screenshots/02-course-page.png)

![Lesson player](public/screenshots/03-lesson-player.png)

![Admin dashboard](public/screenshots/04-admin-dashboard.png)

![Sign in](public/screenshots/05-sign-in.png)

**Project structure**

- **app/** — Next.js App Router pages and layouts.
	- `app/(auth)/` — Authentication pages (login, verify, public flows).
	- `app/(public)/` — Public site pages (catalog, courses, footer, navbar components).
	- `app/admin/` — Admin area and analytics pages.
	- `app/dashboard/` — User dashboard and saved/enrolled course views.

- **components/** — Reusable React components (UI primitives, editor, uploader, sidebar components).

- **lib/** — Shared libraries and integrations.
	- `lib/db.ts` — Prisma client instance.
	- `lib/generated/prisma/` — Generated Prisma client.
	- `lib/auth.ts` — Better-Auth configuration and adapters.
	- `lib/auth-client.ts` — Client-side auth helpers.
	- `lib/env.ts` — Environment variable schema and validation.
	- `lib/S3Client.ts` — S3 helpers for uploading assets.
	- `lib/stripe.ts` — Stripe integration.

- **prisma/** — Prisma schema and migrations.

- **app/api/** — Server API routes (auth handlers, S3 upload endpoints, webhooks).

- **public/** — Static assets. Put screenshots in `public/screenshots/`.

- **components/ui** — Design system primitives (button, input, modal, table, etc.).

**Environment & secrets**
Copy `.env.example` (if available) and set the following (minimum):

- `DATABASE_URL` — Postgres connection string.
- `BETTER_AUTH_SECRET` — Secret used by `better-auth`.
- `AUTH_GITHUB_CLIENT_ID` and `AUTH_GITHUB_CLIENT_SECRET` — GitHub OAuth app credentials.
- `RESEND_API_KEY` — Resend API key for email OTP (or configure your email provider).
- AWS credentials for S3 storage.
- Stripe keys for payments.

**Developer tips**
- Use `pnpm dev` to run Next.js locally.
- If you see Prisma constructor errors at runtime, verify `DATABASE_URL` and that Prisma client was generated (`pnpm prisma generate`).
- Add screenshots to `public/screenshots/` and commit them so the README displays them on GitHub.

If you want, I can add actual screenshots into `public/screenshots/` and commit them — upload the images or tell me which pages to capture and I will generate placeholders.

---
Updated README to include project overview, features, screenshots placeholders, and code structure.

**Demo**

- Live demo: Add your hosted demo URL here (e.g. https://demo.example.com).
- Local demo: to run a local demo build, ensure env vars are set, then run migrations and start the app:

```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
pnpm dev
```

- If a seed script exists, run `pnpm prisma db seed` (or follow the project's seed instructions) to populate sample data.
- To demo admin features, create an admin user in the database or run the project's seeding script that includes an admin account.
