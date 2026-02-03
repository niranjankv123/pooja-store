# Divine Pooja Store 🕉️

A premium e-commerce application for Pooja essentials, built with **React, TypeScript, Express, and a custom "Divine" Design System**.

## 🚀 Features

-   **Catalog**: Browse 25+ products including Coconuts, Oils, Incense, and Pooja Sets.
-   **WhatsApp Checkout**: Direct order placement via WhatsApp integration.
-   **Admin Panel**: Secure login (`admin`/`password123`) to Add, Edit, and Delete products.
-   **Local Images**: optimized image serving from the backend.
-   **Responsive Design**: Fully mobile-compatible.

## 🏗️ Architecture (Clean Code)

The codebase follows enterprise-grade coding standards with separation of concerns:

### Client (`apps/client`)
-   **Services (`src/services/api.ts`)**: Centralized API layer for all HTTP requests. Decoupled from UI.
-   **Hooks (`src/hooks/`)**: Custom React hooks for logic reuse:
    -   `useProducts`: State management for fetching and modifying products.
    -   `useCart`: Shopping cart logic (add/remove/update).
    -   `useAdmin`: Authentication state management.
-   **Components**: Pure presentational components (dumb) styled with CSS modules/classes.
-   **Theme (`src/index.css`)**: Centralized "Divine Theme" using CSS Variables for Saffron, Maroon, and Gold palette.

### Server (`apps/server`)
-   **Express API**: RESTful endpoints for Products and Auth.
-   **Static Serving**: Images served securely from `public/images`.

## 🛠️ Setup & Run

### 1. Backend (Port 3001)
```bash
cd apps/server
npm install
npm start
```

### 2. Frontend (Port 5173)
```bash
cd apps/client
npm install
npm run dev
```

## 🎨 Theme System
The UI uses a custom variable sytem defined in `index.css`:
-   `--primary`: **Saffron** (Actions)
-   `--secondary`: **Deep Maroon** (Headings)
-   `--accent`: **Gold** (Highlights)
-   `--font-sans`: **Outfit** (Google Font)
