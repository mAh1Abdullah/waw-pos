# Technology Stack (Chosen)

Based on the user's preferences, the following technology stack has been chosen for the POS application:

## Full-stack Framework:
- **Next.js:** For both frontend UI development and backend API routes. This provides a unified development experience and leverages React for the UI.

## Key Libraries/Integrations (Next.js Ecosystem):
- **Auth.js:** For authentication and authorization.
- **Next PWA:** To enable Progressive Web App features, allowing for an installable and offline-capable application.

## Database:
- **Cloudflare D1:** Chosen for its integration with Cloudflare Workers and Vercel, offering a serverless SQL database solution.
- **Drizzle ORM:** To be used for type-safe and efficient database interactions with Cloudflare D1.

## Deployment:
- **Vercel:** For seamless deployment of the Next.js application, offering excellent integration and performance for Next.js projects.

## Reporting & Export:
- Libraries compatible with Next.js/Node.js environment for generating CSV and PDF reports (e.g., `csv-stringify`, `pdf-lib` or similar).
