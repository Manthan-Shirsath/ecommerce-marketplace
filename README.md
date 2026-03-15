This is a production-ready ecommerce starter built with [Next.js 14](https://nextjs.org/), App Router, TypeScript, Tailwind CSS, and `shadcn/ui`.

## Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- `shadcn/ui`
- `src/components` and `src/lib` folders for clean scaling

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the starter storefront.

You can start editing the homepage in `src/app/page.tsx`, shared sections in `src/components`, and mock storefront data in `src/lib/data.ts`.

## Folder Structure

```text
src/
  app/
  components/
    home/
    layout/
    shared/
    ui/
  lib/
```

## GitHub Push

Create a new empty GitHub repository first, then run:

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

If you prefer SSH:

```bash
git remote add origin git@github.com:<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

This project is ready for Vercel with the default Next.js settings.

1. Push the repository to GitHub.
2. Go to Vercel and create a new project.
3. Import your GitHub repository.
4. Keep the detected framework as `Next.js`.
5. Use the default build settings and deploy.

Vercel should automatically use:

- Install command: `npm install`
- Build command: `npm run build`
- Output setting: Next.js default

## Build Check

Build the production bundle with:

```bash
npm run build
```

You can also verify linting locally with:

```bash
npm run lint
```

You can deploy the app anywhere Next.js is supported, including Vercel, Railway, Render, and self-hosted Node environments.
