
# Learning Management System (LMS)

This repository contains a full-featured Learning Management System built with Next.js (App Router), TypeScript, Prisma, Better-Auth, and modern React. It provides course publishing, enrollment, lesson progress tracking, user authentication (email OTP and GitHub social sign-in), an admin dashboard, and S3-backed media storage.

<img width="1900" height="944" alt="Screenshot (1391)" src="https://github.com/user-attachments/assets/0f7849d9-5835-4390-9724-1d4a810f9c53" />

**Features**
- **Authentication:**
  Email OTP and GitHub social sign-in using `better-auth` with a Prisma adapter.

<img width="1920" height="936" alt="Screenshot (1392)" src="https://github.com/user-attachments/assets/19ac2599-24d5-4c7d-9c4d-47cb258e4ed4" />
<br/>
<br/>
<img width="1920" height="938" alt="Screenshot (1393)" src="https://github.com/user-attachments/assets/e383ce62-9493-4e34-beb5-23e62379bc94" />
<br/>
<br/>

- **Public catalog:**
  Browse published courses.
<br/>
<br/>
<img width="1920" height="940" alt="Screenshot (1394)" src="https://github.com/user-attachments/assets/2e6f4a1b-c79c-445c-bc18-35a70b7bc91a" />
<br/>
<br/>

- **Course Overview:**
  Explore course content.
<br/>
<br/>
<img width="1885" height="933" alt="Screenshot (1395)" src="https://github.com/user-attachments/assets/0fdcd1cc-8fa5-4561-a4e2-700979197351" />
<br/>
<br/>

- **Enrollments & payments:**
  Stripe integration for paid courses and enrollment records.
<br/>
<br/>
<img width="1896" height="940" alt="Screenshot (1396)" src="https://github.com/user-attachments/assets/1fb9fc3f-b0c2-4f32-9bbb-ba233ebf39ee" />
<br/>
<br/>

<img width="1901" height="924" alt="Screenshot (1397)" src="https://github.com/user-attachments/assets/02af88ec-d80e-4279-bf38-b0382117225c" />
<br/>
<br/>


- **Lesson playback & progress:**
  Lessons with video assets stored in S3 and per-user progress tracking.
<br/>
<br/>
<img width="1889" height="935" alt="Screenshot (1398)" src="https://github.com/user-attachments/assets/e43ca787-d6d5-4d98-93ab-5b0c9d7afbc8" />
<br/>
<br/>


- **User dashboard:**
  Saved courses, enrolled courses, and progress overview.
<br/>
<br/>
<img width="1892" height="936" alt="Screenshot (1399)" src="https://github.com/user-attachments/assets/c59ab78c-92ea-429b-a271-1f80d27c6c07" />
<br/>
<br/>


<img width="1895" height="922" alt="Screenshot (1400)" src="https://github.com/user-attachments/assets/d5f89c94-a493-432d-a804-5c2463b5a386" />
<br/>
<br/>


- **Admin analytics:**
  Basic admin dashboard with course and enrollment metrics.

<img width="1891" height="936" alt="Screenshot (1401)" src="https://github.com/user-attachments/assets/d7f4f859-6bd7-4a49-82a5-17e3537cd5d4" />
<br/>
<br/>


- **Course management:**
  Admin can create, edit, and publish courses, chapters, and lessons.

<img width="1891" height="927" alt="Screenshot (1402)" src="https://github.com/user-attachments/assets/0b622f59-0406-4dc8-9bc9-66189fd27202" />
<br/>
<br/>
<img width="1883" height="943" alt="Screenshot (1403)" src="https://github.com/user-attachments/assets/7783a801-9a30-4c0c-b8d8-3124209b65d3" />
<br/>
<br/>
<img width="1898" height="928" alt="Screenshot (1404)" src="https://github.com/user-attachments/assets/62bafcb4-876a-4397-a201-d815b78e000b" />
<br/>
<br/>
<img width="1889" height="927" alt="Screenshot (1405)" src="https://github.com/user-attachments/assets/9c8ddd76-e4ac-4374-a54e-28595c7cf222" />
<br/>
<br/>
<img width="1885" height="929" alt="Screenshot (1406)" src="https://github.com/user-attachments/assets/0124b857-6b5d-4851-a22e-4f02b125427e" />
<br/>
<br/>
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

**Quick start**

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 in your browser.

**Note:** Ensure required environment variables are present (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `AUTH_GITHUB_CLIENT_ID`, `AUTH_GITHUB_CLIENT_SECRET`, `RESEND_API_KEY`, AWS credentials, Stripe keys). See `lib/env.ts` for required keys.

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

---

**Demo**

- Live demo: Add your hosted demo URL here (https://learning-management-system-pi-one.vercel.app/).
- Local demo: to run a local demo build, ensure env vars are set, then run migrations and start the app:

```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
pnpm dev
```


