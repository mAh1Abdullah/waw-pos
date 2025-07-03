# WAW-POS Project Overview for Gemini

This document provides a concise overview of the WAW-POS project, its architecture, and development practices to facilitate efficient interaction with the Gemini CLI agent.

## 1. Project Summary

WAW-POS is a modern, offline-first Point of Sale (POS) application designed for small businesses. It enables efficient management of products, sales transactions, expenses, and provides comprehensive reporting capabilities. The application is built with a focus on usability, performance, and reliability, with a key feature being its ability to function offline and synchronize data when connectivity is restored.

## 2. Core Features

*   **Product Management**: Add, edit, delete products with detailed attributes (name, description, price, SKU, stock, reorder level).
*   **Stock Management**: Real-time tracking of stock levels, reorder alerts for low stock.
*   **Sales Transaction**: Record sales with multiple items, quantities, and support for various payment methods (Cash, Card, UPI).
*   **Expense Logging**: Categorize and record business expenses with date, amount, and description.
*   **Comprehensive Reporting**: Generate detailed sales, expense, and inventory reports with various metrics.
*   **Data Export**: Export reports in CSV and PDF formats.
*   **Offline-first Support**: Continue operations (sales, expenses) without an active internet connection.
*   **Background Sync**: Automatic synchronization of offline data with the database upon re-establishing connectivity.

## 3. Technology Stack

The project leverages a modern JavaScript ecosystem for a full-stack development experience:

*   **Full-stack Framework**: Next.js (App Router)
*   **Database**: Cloudflare D1 (serverless SQL)
*   **ORM**: Drizzle ORM (type-safe database interactions)
*   **Authentication**: Auth.js (for user authentication, e.g., Google OAuth)
*   **PWA**: Next PWA (for Progressive Web App features and offline capabilities)
*   **Styling**: Tailwind CSS
*   **Deployment**: Vercel

## 4. Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── public/                 # Static assets (images, favicons)
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, API routes)
│   ├── lib/
│   │   ├── db/             # Database schema (Drizzle) and ORM setup
│   │   └── auth/           # Auth.js configuration
│   └── components/         # Reusable React components
├── doc/                    # Project documentation (requirements, features, tech stack, data models, user stories, development outline)
├── .env.local              # Environment variables (local development)
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml          # pnpm lock file
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── eslint.config.mjs       # ESLint configuration
├── postcss.config.mjs      # PostCSS configuration
└── README.md               # Main project README
```

## 5. Development Workflow

The development process is iterative, focusing on a structured approach for each feature:

1.  **Data Model & Database Layer**: Define Drizzle schema (`src/lib/db/schema.ts`), implement CRUD operations using Drizzle ORM functions (`src/lib/db/*.ts`), and manage migrations.
2.  **Server Actions (Backend Logic)**: Implement server-side logic using Next.js Server Actions (`'use server'`), interacting with the database and handling validation/errors.
3.  **Frontend UI & Logic**: Develop reusable React components (`src/components/`), create pages/routes (`src/app/`), and integrate Server Actions for data fetching and mutations.
4.  **Testing & Refinement**: Write unit, integration, and end-to-end tests. Focus on error handling, edge cases, performance, and usability.

**Recommended First Feature**: Inventory Management (Product CRUD) to establish the full development pipeline.

## 6. How to Interact with Me (Gemini)

*   **Context is Key**: Always provide context for your requests. If you're asking about a specific file, mention its path.
*   **Be Specific**: Clearly state what you want to achieve.
*   **Verify Changes**: After I make changes, I will attempt to verify them by running tests or linting if applicable.
*   **Ask for Clarification**: If my response is unclear or you need more details, please ask.
*   **Code Style**: I will adhere to the existing code style and conventions found in the project.
* always use updated library documentations.
