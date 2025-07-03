# Feature Development & Implementation Outline

This outline provides a general workflow for developing each major feature (e.g., Inventory Management, Expense Tracking, Sales Directory).

**Phase 0: Project Initialization (One-time Setup)**

1.  **Initialize Next.js Project:**
    *   Run `npx create-next-app@latest pos_application --typescript --tailwind --eslint --app --src-dir --use-pnpm` (or your preferred package manager).
    *   Configure `next.config.js` for PWA (Next PWA).
    *   Set up `tsconfig.json` and ESLint.
2.  **Database & ORM Setup:**
    *   Install Drizzle ORM and Cloudflare D1 client dependencies.
    *   Configure Drizzle for D1 in `src/lib/db`.
    *   Set up initial Drizzle schema and migration scripts.
3.  **Authentication Setup:**
    *   Install Auth.js dependencies.
    *   Configure Auth.js with **Google OAuth** as an authentication provider, along with any other desired providers and callbacks in `src/lib/auth`.
    *   Create basic sign-in/sign-out pages in `src/app/(auth)`.
4.  **Global Styling & Layout:**
    *   Define global CSS in `src/styles`.
    *   Create the root `layout.tsx` and `page.tsx` in `src/app`.

---

**Iterative Feature Development Workflow (for each major feature, e.g., Inventory Management)**

**Step 1: Data Model & Database Layer**

1.  **Refine Data Model:** Review and finalize the Drizzle schema for the feature's entities (e.g., `Product`, `Sale`, `Expense`) in `src/lib/db/schema.ts`.
2.  **Database Operations (CRUD):**
    *   Write Drizzle ORM functions in `src/lib/db/` (e.g., `products.ts`, `sales.ts`) for Create, Read, Update, and Delete (CRUD) operations.
    *   Implement basic validation at the database layer where appropriate.
3.  **Migrations:**
    *   Generate and apply Drizzle migrations to your Cloudflare D1 database.

**Step 2: Server Actions (Backend Logic)**

1.  **Define Server Actions:** Create Server Actions within components or pages, or in a dedicated `src/lib/actions/` directory for reusable server-side logic.
2.  **Implement Server Action Functions:**
    *   Write asynchronous functions marked with `'use server'` that directly interact with the database via Drizzle ORM.
    *   Implement server-side input validation and error handling within these actions.
    *   Integrate authentication and authorization using Auth.js to protect actions.

**Step 3: Frontend UI & Logic**

1.  **UI Components:**
    *   Develop reusable React components in `src/components/` (e.g., `ProductForm.tsx`, `ProductTable.tsx`).
    *   Focus on modularity and reusability.
2.  **Pages/Routes:**
    *   Create the necessary pages in `src/app/(dashboard)/` (e.g., `inventory/page.tsx`, `sales/page.tsx`).
    *   Integrate the UI components.
3.  **Data Fetching & State Management:**
    *   Utilize Server Actions directly from client components or server components for data mutations and fetching.
    *   Implement client-side input validation and provide user feedback.
4.  **PWA Integration (as needed):**
    *   For offline capabilities, implement service worker logic (via Next PWA) to cache data or queue offline operations.

**Step 4: Testing & Refinement**

1.  **Unit Tests:** Write tests for individual functions (e.g., utility functions, Drizzle ORM functions, Server Actions) in `tests/unit/`.
2.  **Integration Tests:** Test the interaction between components, Server Actions, and the database in `tests/integration/`.
3.  **End-to-End Tests:** Use a tool like Playwright or Cypress to simulate user flows (e.g., adding a product, recording a sale) in `tests/e2e/`.
4.  **Error Handling & Edge Cases:** Thoroughly test how the application behaves under various error conditions and edge cases.
5.  **Performance & Usability:** Optimize for performance and ensure a smooth user experience.

---

**Suggested First Feature to Implement:**

I recommend starting with **Inventory Management (Product CRUD)**. This feature is foundational and will allow you to establish the full development pipeline from database schema to UI, including:

*   Defining the `Product` schema in Drizzle.
*   Implementing CRUD operations for products.
*   Creating Server Actions for products.
*   Building UI components for adding, viewing, editing, and deleting products.

This will give you a solid working base and validate your chosen tech stack before moving on to more complex features like sales transactions or reporting.
