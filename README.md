# Next.js E-commerce Engine v2.0

A high-performance, generic E-commerce engine built with **Next.js 16**, **Tailwind CSS v4**, and **Zustand**. Designed as a "Clean Canvas" for modern digital commerce.

## Features

- **Core**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4.
- **State**: Global Cart management with `zustand` (LocalStorage persistence).
- **Backend**: Server Actions for Cart operations and Checkout simulation.
- **AI-Ready**: 
  - **Orama Search**: Vector search entry point.
  - **Automation Hooks**: API routes for n8n/webhook integrations (`app/api/automation`).
  - **AI Recommendations**: Client component for dynamic product suggestions.
- **UI**:
  - **Clean Canvas**: Minimalist, premium aesthetic.
  - **Cart Drawer**: Smooth slide-out interaction.
  - **Animations**: Subtle micro-interactions.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Testing

E-commerce flows are verified with **Playwright**.

```bash
# Install Browsers (First time only)
npx playwright install

# Run E2E Tests
npx playwright test
```

## Structure

- `src/app/actions`: Server Actions (Checkout, Cart Sync).
- `src/store`: Zustand State Management.
- `src/components`: UI Components (Hero, ProductCard, CartDrawer).
- `src/lib`: Utilities and Search Infrastructure.
