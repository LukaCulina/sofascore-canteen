# Sofascore canteen

A React application built with Vite, TanStack Router, Panda CSS, and Zustand.

## Prerequisites

- **Node.js** v22 — download and install from [nodejs.org](https://nodejs.org/)
- **Yarn** — install globally after Node is set up:
  ```bash
  npm install -g yarn
  ```
- **VS Code** with the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Start the development server:

```bash
yarn dev
```

## Testing the Application
The application supports multiple user roles. You can explore the system using the following test credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Employee** | `user@example.com` | `user` |
| **Catering Manager** | `catering@example.com` | `catering` |
 
## Available Commands

| Command | Description |
| --- | --- |
| `yarn dev` | Start the Vite dev server |
| `yarn build` | Type-check and build for production |
| `yarn preview` | Preview the production build locally |
| `yarn lint` | Run Biome linting |
| `yarn lint:fix` | Run Biome linting and auto-fix issues |
| `yarn format` | Format code with Biome |
| `yarn test` | Run tests in watch mode (Vitest) |
| `yarn test:run` | Run tests once |

## Tech Stack

- **React 19** — UI library
- **Vite** — Build tool and dev server
- **TanStack Router** — Type-safe file-based routing
- **Panda CSS** — Zero-runtime CSS-in-JS
- **Zustand** — State management
- **SWR** — Data fetching
- **Biome** — Linting and formatting
- **Vitest** — Testing
