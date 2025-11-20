## Purpose

This file gives concise, actionable guidance for AI coding agents working in this repo so they can be immediately productive.

## Quick facts

- Framework: Next.js (App Router) — source under `src/app` using route groups (see `(app)/` and `src/app/layout.tsx`).
- TypeScript project with Tailwind. Build scripts live in `package.json`.
- In-memory demo data: `src/lib/data.ts` (not a DB). Persisted state is ephemeral.
- AI tooling: `genkit` + `@genkit-ai/google-genai` configured in `src/ai/genkit.ts`.

## How to run & develop

- App (dev): `npm run dev` — starts Next with turbopack (see `package.json`).
- AI flows (local): `npm run genkit:dev` or `npm run genkit:watch` to run the Genkit dev harness that imports `src/ai/dev.ts` (which loads flows under `src/ai/flows`).
- Build: `npm run build` and `npm run start` to serve production build. Note: `package.json` sets `NODE_ENV=production next build` which is a POSIX-style env assignment — on native Windows PowerShell you may need to run via WSL or use `cross-env` if scripts fail.

## Project architecture (big picture)

- UI: `src/app` (Next App Router) + reusable UI components under `src/components` and `src/components/ui`.
- Business logic / server actions: `src/lib/actions.ts` — contains server actions annotated with `'use server'`. These functions accept FormData (or typed payloads), mutate the in-memory store and call `revalidatePath(...)` to update routes. Examples: `addTask`, `editContact`, `deleteContact`.
- Data: `src/lib/data.ts` provides `contacts` and `tasks` arrays and helper getters (in-memory). Treat this as ephemeral when making changes.
- Types: `src/lib/types.ts` defines domain types (`Contact`, `Task`, `TaskStatus`). Use these when changing shape of data.
- AI flows: `src/ai` —
  - `src/ai/genkit.ts` creates the `ai` object and selects model/plugins (example: `googleai/gemini-2.5-flash`).
  - `src/ai/dev.ts` loads flows (dotenv is used here).
  - `src/ai/flows/*.ts` contains self-contained flows that use `ai.definePrompt`, `ai.defineFlow` and zod-based input/output schemas. Example: `src/ai/flows/summarize-contact-notes.ts` defines `summarizeContactNotes` using `z` schemas and returns `{ summary }`.

## Patterns & conventions agents should follow

- Server actions are the canonical way to mutate state. They live in `src/lib/actions.ts` and are marked `'use server'`. They expect `FormData` or typed inputs and call `revalidatePath(...)` after mutations. When deleting resources, they may call `redirect(...)`.
- Use the existing zod schemas pattern for AI flow inputs/outputs (see `src/ai/flows/*`). Prefer returning typed outputs (Zod -> TypeScript types are used throughout).
- AI flows are pure-ish: prompts are defined via `ai.definePrompt(...)` and wrapped in flows via `ai.defineFlow(...)`. Follow that pattern when adding new flows.
- UI atoms live in `src/components/ui`. Larger composed components live in sibling folders under `src/components` (e.g., `contacts`, `tasks`, `layout`).

## Integration points & external deps

- Genkit + Google GenAI plugin: `genkit`, `genkit-cli`, `@genkit-ai/google-genai`, and `@genkit-ai/next` are declared in `package.json`.
- Firebase SDK is included but not heavily used in the sampled files — check `package.json` for version info.
- Environment variables: `dotenv` is imported in `src/ai/dev.ts`. When running genkit or Next in dev, ensure required environment variables are provided.

## Helpful examples (copyable references)

- Start the app locally:

  npm run dev

- Start genkit dev harness (reloads flows):

  npm run genkit:watch

- AI flow sample reference:

  - File: `src/ai/flows/summarize-contact-notes.ts`
  - Pattern: define input/output with `z`, create a prompt with `ai.definePrompt`, and expose a flow with `ai.defineFlow` that returns `output`.

## What to avoid

- Do not assume a persistent DB — `src/lib/data.ts` is in-memory. If you add persistence, update server actions and revalidation logic accordingly.
- Avoid changing the app router structure haphazardly: routes use Next App Router conventions and route groups (see `(app)/contacts/[id]/edit` patterns).

## Where to look when something breaks

- Build/dev scripts: `package.json` scripts.
- Next config: `next.config.ts` for image domains and build flags.
- Server actions & data: `src/lib/actions.ts` and `src/lib/data.ts`.
- AI flows: `src/ai/*` (especially `genkit.ts` and `flows/`).

## If you need more

If anything in these instructions is unclear or you want additional rules (testing, CI, more flow examples), tell me which area to expand and I will update this doc.
