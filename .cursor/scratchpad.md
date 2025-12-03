# Project: Setup Project (Backend + Frontend + Supabase)

## Background and Motivation
The user wants to "recreate" a Hardware Parts CRUD feature (originally Node/Knex/React) using the current project stack: Node/Express/Supabase (Backend) and Next.js/Tailwind/Radix (Frontend).

## Key Challenges and Analysis
-   **Stack Translation**:
    -   **DB Access**: Replace `Knex` (SQL builder) with `@supabase/supabase-js` (Client SDK).
    -   **Styling**: Replace custom `ds-*` CSS classes with Tailwind CSS.
    -   **Architecture**: Maintain the Controller-Service-Repository pattern from the example, but adapted for the new repository implementation.
-   **Validation**: Reuse `zod` schemas.
-   **API Communication**: Frontend will call the Express Backend, not Supabase directly (following the 3-tier architecture implied by the separate backend folder).

## High-level Task Breakdown

1.  **Database Setup**
    -   Define SQL schema for `parts` table compatible with Supabase (PostgreSQL).
    -   Provide SQL script for user to run (since no migration tool is configured yet).

2.  **Backend Implementation**
    -   **Config**: Initialize Supabase Client in `backend/src/config/supabase.ts`.
    -   **Model**: Port `partModel.ts` (Zod schemas, Types).
    -   **Repository**: Implement `partRepository.ts` using `supabase.from('parts')`.
    -   **Service**: Port `partService.ts` (Business logic, error handling).
    -   **Controller**: Create `partController.ts` to handle HTTP requests.
    -   **Routes**: Register `/parts` routes in `index.ts`.

3.  **Frontend Implementation**
    -   **Types**: Mirror `Part` types in Frontend.
    -   **API Client**: Create `services/partService.ts` to consume the Express API.
    -   **Components**:
        -   `PartsTable`: List parts, styled with Tailwind/Radix.
        -   `PartForm`: Create/Edit form, styled with Tailwind/Radix.
    -   **Page**: `app/parts/page.tsx` to integrate everything.

## Project Status Board

-   [ ] **Database**: Create `parts` table SQL.
-   [ ] **Backend**: Config Supabase Client.
-   [ ] **Backend**: Implement `Part` Module (Model, Repo, Service, Controller).
-   [ ] **Backend**: Mount Routes.
-   [ ] **Frontend**: Create Types and API Service.
-   [ ] **Frontend**: Implement `PartsTable` and `PartForm` (Tailwind).
-   [ ] **Frontend**: Implement `/parts` Page.

## Executor's Feedback or Assistance Requests
-   Need to confirm if the user wants to stick to the separate Backend API or move logic to Next.js Server Actions. (Assuming Backend API based on project structure).
