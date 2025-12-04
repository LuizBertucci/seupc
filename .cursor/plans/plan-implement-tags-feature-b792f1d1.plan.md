<!-- b792f1d1-12f0-470c-93a7-8f7305bb006c 0b561d82-4e6a-4396-bd5a-3c943ac21773 -->
# Plan: Implement Tags Feature

## 1. Database Setup

- [X] Create SQL script to define the `tags` table in Supabase.
    - Columns: `id` (UUID), `name` (Text), `processor_id` (UUID), `ram_memory_id` (UUID), `hd_id` (UUID), `ssd_id` (UUID), `video_card_id` (UUID), `created_at`, `updated_at`.
    - Add Foreign Key constraints to `parts` table.

## 2. Backend Implementation

- [ ] **Model**: Create `src/models/tagModel.ts`.
    - Define Zod schema for Tag (validation).
    - Implement `TagModel` with methods: `findAll`, `findById`, `create`, `update`, `delete`.
    - Ensure queries fetch the related Part details (joins) for display if needed, or just IDs. (Ideally fetch details for the List view).
- [ ] **Controller**: Create `src/controllers/tagController.ts`.
    - `getAll`, `getById`, `create`, `update`, `delete` handlers.
- [ ] **Routes**: Create `src/routes/tagRoutes.ts` and register in `index.ts`.

## 3. Frontend Implementation

- [ ] **Types**: Create `src/types/tag.ts` (matching Backend).
- [ ] **Service**: Create `src/services/tagService.ts` (API client).
- [ ] **UI Components**:
    - `components/TagsTable.tsx`: Display list of tags with their parts names.
    - `components/TagModal.tsx`: Form to Create/Edit Tag.
        - Must fetch `parts` on mount to populate Dropdowns.
        - Filter `parts` by `PartType` for each dropdown (Processor options, RAM options, etc.).
- [ ] **Page**: Update `app/admin/page.tsx`.
    - Add state for Tags (list, loading, pagination).
    - Implement fetching Tags with pagination (limit 10).
    - Render `TagsTable` component below or alongside Parts.
    - Handle Create/Edit/Delete actions for Tags.
- [ ] **Navigation**: (Removed - integrated into single admin page).

## 4. Verification

- [ ] Test creating a Tag with valid parts.
- [ ] Test updating a Tag.
- [ ] Test deleting a Tag.
- [ ] Verify "Select Dropdowns" show correct options filtered by type.