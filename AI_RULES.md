# AI Rules for this Project

This document outlines the technical stack and guidelines for developing features within this application. Adhering to these rules ensures consistency, maintainability, and leverages the strengths of the chosen libraries.

## Tech Stack Overview

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **UI Library:** shadcn/ui (built on Radix UI)
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Backend/Database/Auth:** Supabase
*   **Form Management & Validation:** React Hook Form with Zod
*   **Date Utilities:** date-fns
*   **Toast Notifications:** Sonner
*   **Drag and Drop:** DND Kit
*   **Charts/Data Visualization:** Recharts
*   **Carousels:** Embla Carousel React

## Library Usage Guidelines

To maintain consistency and efficiency, please follow these guidelines when implementing new features:

*   **UI Components:**
    *   **Always** prioritize using existing `shadcn/ui` components from `src/components/ui/`.
    *   If a `shadcn/ui` component doesn't exist or requires significant deviation from its core functionality, create a **new, custom component** in `src/components/`. **Never modify** the files within `src/components/ui/`.
*   **Styling:**
    *   All styling **must** be done using **Tailwind CSS** classes. Ensure designs are responsive by utilizing Tailwind's responsive utility classes.
*   **Icons:**
    *   Use icons exclusively from the `lucide-react` library.
*   **Forms & Validation:**
    *   For any form creation and management, use `react-hook-form`.
    *   For schema-based form validation, integrate `zod` with `react-hook-form` resolvers.
*   **Backend & Authentication:**
    *   All authentication, database interactions, and server-side logic (via Edge Functions) **must** use **Supabase**.
    *   Ensure proper Row Level Security (RLS) is enabled and configured for all new database tables.
    *   The Supabase client should be located at `src/integrations/supabase/client.ts`.
*   **Date Handling:**
    *   Use `date-fns` for all date parsing, formatting, and manipulation tasks.
*   **Notifications:**
    *   Implement user notifications (e.g., success messages, errors) using the `sonner` toast library.
*   **Drag and Drop:**
    *   For any drag-and-drop functionality, use the `@dnd-kit` library.
*   **Charts:**
    *   For any data visualization or charting needs, use `recharts`.
*   **Carousels:**
    *   For carousels or image sliders, use `embla-carousel-react`.
*   **Routing:**
    *   Utilize Next.js App Router for all navigation. Keep route definitions within the `src/app/` directory structure.
*   **File Structure:**
    *   New pages should go into `src/app/`.
    *   New components should go into `src/components/`.
    *   New hooks should go into `src/hooks/`.
    *   New utility functions should go into `src/lib/` or `src/utils/`.
    *   Directory names **must** be all lower-case.
*   **Code Quality:**
    *   Prioritize simple, elegant, and readable code. Avoid over-engineering.
    *   Create small, focused components and files (ideally 100 lines or less for components).
    *   Ensure all new code is fully functional and syntactically correct.
    *   Do not use `try/catch` for error handling unless specifically requested, allowing errors to bubble up for easier debugging.