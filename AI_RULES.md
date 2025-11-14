# AI Development Rules

This document provides guidelines for AI-driven development on this project. Adhering to these rules ensures consistency, maintainability, and leverages the existing architecture effectively.

## Tech Stack

The application is built with a modern, type-safe, and component-based stack:

- **Framework**: Next.js 15+ using the App Router.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS for all styling purposes.
- **UI Components**: A comprehensive set of components from **shadcn/ui**, built upon Radix UI primitives.
- **Icons**: **Lucide React** is the exclusive icon library.
- **Forms**: **React Hook Form** for logic, combined with **Zod** for schema validation.
- **Backend & Auth**: **Supabase** is used for all backend services, including database, authentication, and storage.
- **Fonts**: Fonts are self-hosted via the **Fontsource** library.

## Library Usage Guidelines

To maintain a clean and consistent codebase, please follow these library-specific rules.

### UI & Components

- **Rule**: **Always** use `shadcn/ui` components from the `src/components/ui` directory for all standard UI elements (e.g., `Button`, `Input`, `Card`, `Dialog`).
- *Why*: This maintains visual consistency and leverages our established design system.
- **Rule**: Do not install new UI component libraries. If a specific component is needed, build it by composing existing `shadcn/ui` components or primitives.

### Styling

- **Rule**: Use Tailwind CSS utility classes for all styling. Avoid writing custom CSS files or using inline `style` objects unless absolutely necessary for dynamic properties that cannot be handled by utilities.
- *Why*: It keeps our styling co-located with the markup and adheres to the project's design tokens.

### Icons

- **Rule**: Only use icons from the `lucide-react` package.
- *Why*: We have a single, consistent, and high-quality icon set ready to use.

### Forms

- **Rule**: All forms must be built using `react-hook-form` for state management and submission handling.
- **Rule**: All form validation must be implemented using `zod` schemas.
- **Rule**: Integrate forms with `shadcn/ui`'s `<Form />` component (`src/components/ui/form.tsx`) to ensure accessibility and proper styling.

### Backend, Database & Authentication

- **Rule**: Use the official Supabase client (`@supabase/supabase-js`) for all backend interactions. This includes auth, database queries (CRUD), and file storage.
- *Why*: Supabase is the designated Backend-as-a-Service for this project.

### State Management

- **Rule**: For local component state, use React's built-in hooks (`useState`, `useReducer`).
- **Rule**: For cross-component or global state, prefer the React Context API. Do not introduce complex state management libraries like Redux or Zustand unless the application's complexity explicitly requires it.
- *Why*: This approach keeps state management simple and leverages React's native capabilities first.