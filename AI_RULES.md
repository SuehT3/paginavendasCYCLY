# AI Rules for Cycly Application

This document outlines the technical stack and specific library usage guidelines to ensure consistency, maintainability, and adherence to best practices when developing the Cycly application.

## Tech Stack Description

*   **Framework**: Next.js for server-side rendering, static site generation, and API routes, providing a robust foundation for the application.
*   **Language**: TypeScript for enhanced code quality, type safety, and improved developer experience.
*   **Styling**: Tailwind CSS for utility-first styling, enabling rapid and consistent UI development. `tw-animate-css` is used for declarative animations.
*   **UI Components**: Shadcn/ui components are utilized for pre-built, accessible, and customizable UI elements, built on Radix UI primitives.
*   **Icons**: Lucide React for a comprehensive and easily customizable icon set.
*   **Form Management**: React Hook Form for efficient and flexible form handling, including validation.
*   **Validation**: Zod for schema validation, ensuring data integrity for forms and API interactions.
*   **Database & Authentication**: Supabase for backend services, including database management, authentication, and real-time subscriptions.
*   **Date Handling**: Date-fns for a lightweight and modular utility library for date manipulation.
*   **State Management**: Standard React `useState` and `useEffect` hooks are preferred for local component state.

## Library Usage Rules

To maintain a consistent and efficient codebase, please adhere to the following rules when implementing features:

*   **Framework**: Always use **Next.js** for page creation, routing, and API routes.
*   **Language**: All new code **must be written in TypeScript**.
*   **Styling**:
    *   Use **Tailwind CSS** classes for all styling. Avoid inline styles or custom CSS files unless absolutely necessary for complex, unique cases.
    *   For animations, leverage **tw-animate-css** where applicable.
*   **UI Components**:
    *   Prioritize using existing **shadcn/ui** components from `src/components/ui/`.
    *   If a required component is not available in `shadcn/ui` or needs significant custom logic, create a new component in `src/components/` (e.g., `src/components/MyCustomComponent.tsx`). **Do not modify files within `src/components/ui/`**.
*   **Icons**: Use icons from **lucide-react**.
*   **Forms**:
    *   Implement all forms using **React Hook Form**.
    *   For form validation, integrate **Zod** schemas with React Hook Form's resolvers.
*   **Toasts**: Use the existing toast system provided by `src/hooks/use-toast.ts` and `src/components/ui/toaster.tsx` for user notifications.
*   **Date & Time**: For any date or time manipulation, use functions from **date-fns**.
*   **Database & Authentication**:
    *   All database interactions and authentication flows **must use Supabase**.
    *   Ensure **Row Level Security (RLS)** is enabled and properly configured for all Supabase tables.
    *   For server-side logic or sensitive operations, utilize **Supabase Edge Functions**.
*   **Routing**: Use **Next.js's built-in routing** (`next/navigation`) for all navigation within the application.
*   **Component Structure**:
    *   Create a new, dedicated file for every new component or hook, no matter how small.
    *   Aim for small, focused components (ideally under 100 lines of code).
    *   Place pages in `src/app/` and reusable components in `src/components/`.