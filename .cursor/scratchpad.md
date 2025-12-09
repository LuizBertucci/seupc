# Project: Setup Project (Backend + Frontend + Supabase)

## Background and Motivation
The user wants to "recreate" a Hardware Parts CRUD feature (originally Node/Knex/React) using the current project stack: Node/Express/Supabase (Backend) and Next.js/Tailwind/Radix (Frontend).
New request: in `frontend/components/TagModal.tsx`, the processor field (currently a select) should become a searchable input because the number of options is now very large; need to investigate best approach.

## Key Challenges and Analysis
-   **Stack Translation**:
    -   **DB Access**: Replace `Knex` (SQL builder) with `@supabase/supabase-js` (Client SDK).
    -   **Styling**: Replace custom `ds-*` CSS classes with Tailwind CSS.
    -   **Architecture**: Maintain the Controller-Service-Repository pattern from the example, but adapted for the new repository implementation.
-   **Validation**: Reuse `zod` schemas.
-   **API Communication**: Frontend will call the Express Backend, not Supabase directly (following the 3-tier architecture implied by the separate backend folder).
-   **Processor selection scale**: Thousands of processors make a plain select unusable; need a searchable typeahead with loading/empty/error states. Decide whether to fetch all processors once (client filter) or add a backend search endpoint (with `part_type=PROCESSOR` and query, ideally paginated).
-   **UX and form integration**: Component must stay compatible with `react-hook-form` and existing `Part` shape (`processor_id` string | null). Need to preserve other fields and avoid regressions.
-   **Current state**: `TagModal` fetches `partService.getAll()` (frontend) which hits backend `GET /parts` returning all parts (no filtering/search). Processor field is a plain `<select>` listing all parts of type `Processor`. No backend search or per-type endpoint; `PartModel.findAll` selects all rows ordered by `created_at`.
-   **Decision (processor search)**: We only need to search by name (e.g., "i5-4020") and pick a single processor; pagination not required, but backend search by `type=Processor` + `q` should avoid loading thousands. Limit results (e.g., top 20) and keep empty/error/loading states.

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

4.  **TagModal: Processor field becomes searchable**
    -   Inspect current `TagModal` processor select and `partService` to see available APIs/filters for processors only. (Done)
    -   Implement backend search endpoint `GET /parts/search?type=Processor&q=...&limit=20` (no pagination needed; limit for performance).
    -   Update frontend `partService` to call search; add combobox/search UI (shadcn `Command`/combobox) with debounce, loading/empty/error, keyboard nav, and selection of a single processor id.
    -   Integrate with `react-hook-form`, ensuring `processor_id` stays a string or null, default values work for editing, and other fields remain unchanged.
    -   Add tests/QA checklist: typing filters options, selection persists on submit, loading/error states render, empty state shown when no match, editing preselects current processor.

## Project Status Board

-   [ ] **Database**: Create `parts` table SQL.
-   [ ] **Backend**: Config Supabase Client.
-   [ ] **Backend**: Implement `Part` Module (Model, Repo, Service, Controller).
-   [ ] **Backend**: Mount Routes.
-   [ ] **Frontend**: Create Types and API Service.
-   [ ] **Frontend**: Implement `PartsTable` and `PartForm` (Tailwind).
-   [ ] **Frontend**: Implement `/parts` Page.
-   [x] **TagModal**: Decide processor search approach (client vs API).
-   [x] **TagModal**: Implement searchable processor field + states.
-   [x] **Backend**: Limit default fetch to 20 items for Parts and Tags to prevent 429 errors (temporary fix for pagination).
-   [x] **PartModel**: Applied `.limit(20)` to `findAll` and `findByType`.
-   [x] **TagModel**: Applied `.limit(20)` to `findAll`.
-   [ ] **TagModal**: Add tests/QA for processor search field.
-   [x] **Git**: Clear stuck rebase on `feat/parts`.
-   [x] **Sidebar**: Install shadcn sidebar components.
-   [x] **Sidebar**: Create `AppSidebar` with `/admin` link.
-   [x] **Sidebar**: Update `app/layout.tsx` to include sidebar.

## Executor's Feedback or Assistance Requests
-   Need to confirm if the user wants to stick to the separate Backend API or move logic to Next.js Server Actions. (Assuming Backend API based on project structure).

## Current Status / Progress Tracking
-   Rebase aborted successfully; `git status` clean on `feat/parts`.
-   Sidebar components installed by user.
-   Sidebar UI added (`components/ui/sidebar.tsx`, `components/app-sidebar.tsx`) and wired in `app/layout.tsx`.
-   Executor: implemented backend `GET /parts/search` (type + q, limit) and TagModal processor combobox with async search/selection; QA/tests pending.

## Lessons
-   Missing `git-rebase-todo` prevents `git rebase --continue`; aborting can clear when working tree is clean.
