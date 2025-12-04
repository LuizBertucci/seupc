---
name: "Plan: Implement Tags Feature"
overview: ""
todos:
  - id: e03ba78e-6486-4cdc-a39f-39924abb6809
    content: "Backend: Create Tag Model"
    status: pending
  - id: fdf6a43a-900f-4b01-8683-5c48686903a6
    content: "Backend: Create Tag Controller"
    status: pending
  - id: 7b0f9366-133d-490e-91f1-4889a603c4e3
    content: "Backend: Create Tag Routes and Register"
    status: pending
  - id: a1a66b66-f1f1-4db6-8fd2-af837faa9413
    content: "Frontend: Create Tag Types"
    status: pending
  - id: 1a91fdb4-f297-4c4e-8cef-70de84460a9a
    content: "Frontend: Create Tag Service"
    status: pending
  - id: b27eb36e-dfb1-403e-8f5f-96f695d4db86
    content: "Frontend: Create Tag Components (Table & Modal)"
    status: pending
  - id: bab6ad8e-0043-47a3-afa0-2919474918b1
    content: "Frontend: Update Admin Page"
    status: pending
---

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