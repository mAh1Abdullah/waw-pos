# waw-pos

This project is a straightforward Point of Sale (POS) application designed to help small businesses manage their daily operations, including inventory, expenses, sales, and detailed reporting.

## Key Features:
- Inventory Management
- Expense Tracking
- Sales Directory
- Exportable Daily Detailed Reporting

## Project Structure:
```
waw-pos/
├── doc/                  # Project documentation
├── public/               # Static assets (images, fonts, etc.)
├── src/                  # Main application source code
│   ├── app/              # Next.js 13+ App Router
│   │   ├── api/          # API routes (backend logic)
│   │   ├── (auth)/       # Authentication related routes/components
│   │   ├── (dashboard)/  # Main application dashboard/features
│   │   │   ├── inventory/
│   │   │   ├── sales/
│   │   │   └── expenses/
│   │   └── layout.tsx    # Root layout
│   │   └── page.tsx      # Root page
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions, helpers, non-UI logic
│   │   ├── db/           # Database related files (Drizzle schema, migrations)
│   │   ├── auth/         # Auth.js configuration and helpers
│   │   └── utils.ts      # General utilities
│   ├── styles/           # Global styles, CSS modules, Tailwind config
│   └── types/            # TypeScript type definitions
├── tests/                # Unit and integration tests
├── .env.local            # Environment variables (local development)
├── .gitignore            # Git ignore file
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project overview
```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation:
Refer to the `doc` directory for detailed requirements, features, and technical considerations.