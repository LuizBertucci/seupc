<!-- 26fcbae2-0b82-4394-b0db-7e84fcba7978 c4c62b8e-b06b-41f6-a4a4-ac5e4a1b93b2 -->
# Plan: Port Parts Feature to Current Stack

## Goal

Recreate the [Parts CRUD feature](https://web-backend-10xdev.azurewebsites.net/api/card-features/e44e3173-f5fd-47e0-8ace-d40de698dba8) using the existing project structure:

-   **Backend**: Node.js + Express + Supabase Client (replacing Knex/SQL).
-   **Frontend**: Next.js (App Router) + Tailwind CSS (replacing custom Design System).

## Implementation Steps

### 1. Database Schema

-   Create a `parts` table in Supabase (PostgreSQL).
-   Columns: `id` (UUID), `name`, `part_type` (Enum), `point` (Int), `created_at`, `updated_at`.

### 2. Backend (Express + Supabase)

-   **Configuration**: Setup `backend/src/config/supabase.ts` to initialize `@supabase/supabase-js`.
-   **Module Structure** (`backend/src/modules/part/`):
    -   `partModel.ts`: Define Zod schemas and TypeScript interfaces (reusing existing definitions).
    -   `partRepository.ts`: Implement data access using `supabase.from('parts')` methods (replacing Knex queries).
    -   `partService.ts`: Implement business logic and validation calls.
    -   `partController.ts`: Handle HTTP requests/responses.
-   **Routing**: Register routes in `backend/src/routes/partRoutes.ts` and mount in `index.ts`.

### 3. Frontend (Next.js + Tailwind)

-   **API Integration**: Create `frontend/src/services/partService.ts` to consume the Express API endpoints.
-   **UI Components** (`frontend/components/parts/`):
    -   `PartsTable.tsx`: Display parts list using Tailwind tables.
    -   `PartForm.tsx`: Create/Edit form using `react-hook-form` and Tailwind styling.
-   **Page**: Create `frontend/app/parts/page.tsx` to orchestrate the components and data fetching.

## Assumptions

-   You have your Supabase `URL` and `ANON_KEY` ready to add to `.env`.
-   The Frontend will communicate with the Express Backend via HTTP, not directly with Supabase (preserving the layered architecture).

### To-dos

- [ ] Create SQL schema for 'parts' table
- [ ] Initialize Supabase Client in Backend
- [ ] Implement Backend Part Module (Model, Repo, Service, Controller)
- [ ] Mount Part Routes in Express App
- [ ] Implement Frontend API Service
- [ ] Implement Frontend UI Components (Table, Form)
- [ ] Create Parts Page in Next.js