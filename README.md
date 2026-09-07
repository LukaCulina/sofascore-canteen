# Sofascore Canteen

Full-stack food management and ordering web application built with React, Vite, and TanStack Router, backed by Deno and PostgreSQL on Supabase.

The repository includes a containerized multi-stage build setup, an automated GitHub Actions CI/CD pipeline, and external health monitoring to ensure serverless availability.

---

## Architecture Overview

* **Frontend Client:** React 19 single-page application built on Vite with code-based routing via TanStack Router. State management handled by Zustand, server-state caching via SWR, styling via Panda CSS, and internationalization with React Intl.
* **Backend & Persistence:** Serverless REST API built with Deno and hosted on Deno Deploy, communicating with a PostgreSQL database provisioned on Supabase.
* **CI/CD Automation:** GitHub Actions workflow triggered on pull requests and pushes to `main`. Executes Biome lint checks and Vitest test suites prior to deployment.
* **Containerization:** Multi-stage `Dockerfile` using Node Alpine for compilation and Nginx Alpine for serving static assets with client-side routing fallbacks. Images are published to GitHub Container Registry (GHCR).
* **High Availability & Keep-Alive:** Automated external cron-job pinging the API layer to prevent serverless database pause cycles on free-tier infrastructure.

---

## Tech Stack

* **Frontend:** React 19, TypeScript, Vite, TanStack Router, Zustand, SWR, Panda CSS, React Intl
* **Code Quality & Testing:** Biome, Vitest, React Testing Library
* **DevOps & Infrastructure:** Docker, Nginx, GitHub Actions, GHCR, Deno Deploy, Supabase (PostgreSQL), Vercel

---

## Prerequisites

* **Node.js:** v22.x
* **Package Manager:** Yarn (`corepack enable` or `npm install -g yarn`)
* **Docker Engine:** Optional, required only for local container testing

---

## Getting Started

### 1. Clone & Install

```bash
git clone [https://github.com/](https://github.com/)<your-username>/sofascore-canteen.git
cd sofascore-canteen
yarn install --frozen-lockfile
```

### 2. Development Server

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
yarn dev
```

### 3. Verification

Run linters and automated tests before committing:

```bash
# Verify code formatting and lint rules
yarn lint

# Execute Vitest test suite once
yarn test:run
```

---

## Docker Execution

To build and run the application in an environment identical to production:

```bash
# Build the production image
docker build -t sofascore-canteen .

# Run container on port 8080
docker run -d -p 8080:80 --name canteen-app sofascore-canteen
```

Access the containerized instance at `http://localhost:8080`.

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `yarn dev` | Runs the Vite development server |
| `yarn build` | Validates TypeScript types and outputs production bundle to `/dist` |
| `yarn preview` | Locally serves the production bundle for testing |
| `yarn lint` | Runs Biome code analysis across the codebase |
| `yarn lint:fix` | Runs Biome and automatically fixes formatting/lint issues |
| `yarn test` | Runs Vitest in watch mode |
| `yarn test:run` | Executes the Vitest test suite once (used in CI) |

---

## Test Accounts

The database comes pre-seeded with two primary roles for testing different authorization scopes:

| Role | Email | Password | Permissions / Scope |
| :--- | :--- | :--- | :--- |
| **Employee** | `user@example.com` | `user` | View weekly menu, submit meal selections, submit meal feedback |
| **Catering Manager** | `catering@example.com` | `catering` | Weekly planner management, meal catalog editing, review dashboard |
