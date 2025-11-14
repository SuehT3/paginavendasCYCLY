# AI Rules for Cycly Application

This document outlines the core technologies and libraries used in the Cycly application, along with guidelines for their usage. Adhering to these rules ensures consistency, maintainability, and leverages the strengths of the chosen tech stack.

## Tech Stack Overview

1.  **Framework:** Next.js (App Router) for building server-rendered and static React applications.
2.  **Language:** TypeScript for type safety and improved developer experience.
3.  **Styling:** Tailwind CSS for utility-first CSS styling, ensuring responsive and consistent designs.
4.  **UI Components:** shadcn/ui for pre-built, accessible, and customizable UI components, based on Radix UI.
5.  **Icons:** Lucide React for a comprehensive set of SVG icons.
6.  **State Management:** React's built-in `useState` and `useEffect` for local component state.
7.  **Form Handling:** React Hook Form for robust form management and Zod for schema validation.
8.  **Toasts:** Sonner for elegant and customizable toast notifications.
9.  **Fonts:** `@fontsource` and `next/font` for optimized font loading and usage.
10. **Database/Auth:** Supabase for backend services, including authentication and database interactions.

## Library Usage Rules

*   **Next.js:** All new pages should be created within the `src/app/` directory following the App Router conventions. Use `next/navigation` for routing.
*   **TypeScript:** Always use TypeScript for new files and components. Ensure proper typing for props, state, and functions.
*   **Tailwind CSS:** All styling should be done using Tailwind CSS classes. Avoid inline styles or separate CSS files unless absolutely necessary for specific third-party integrations.
*   **shadcn/ui:** Prioritize using components from `src/components/ui/`. If a required component is not available, create a new, small, and focused component in `src/components/` using Tailwind CSS. **Do not modify existing shadcn/ui component files.**
*   **Lucide React:** Use icons from the `lucide-react` library.
*   **React State:** For component-level state, use `useState` and `useEffect`. Avoid introducing external state management libraries unless there's a clear, justified need for global state management across many components.
*   **Forms:** When building forms, use `react-hook-form` for form logic and `zod` for schema validation. Leverage the `src/components/ui/form.tsx` component for consistent form structures.
*   **Toasts:** For displaying notifications, use the `sonner` library.
*   **Date Pickers:** For date selection, use `react-day-picker` in conjunction with the `src/components/ui/calendar.tsx` component.
*   **Drag and Drop:** If drag-and-drop functionality is required, use the `@dnd-kit` library.
*   **Supabase:** For any authentication, database interactions, or server-side functions, integrate with Supabase using `@supabase/supabase-js`.