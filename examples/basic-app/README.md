# Basic WebFramework App

Example app showcasing WebFramework routing, styling, and development workflow.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Features Demonstrated

- File-system based routing in `src/routes/`
- Tailwind CSS styling
- TypeScript support
- Hot module reloading (HMR)
- Zero-config setup

## File Structure

```
src/
  routes/          # File-system routes
  styles/          # Global styles
  components/      # Reusable components
  lib/             # Utilities
public/            # Static assets
```

## Routes Convention

Routes are defined using parentheses and brackets:

- `(home).tsx` → `/`
- `(about).tsx` → `/about`
- `(blog.[slug]).tsx` → `/blog/:slug`
- `(docs.[...slug]).tsx` → `/docs/**`

## Building

```bash
npm run build
npm start
```

Production build is optimized and minified.
