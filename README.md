# Eden Demo

A quick demo using Elysia & Elysia Eden. Backend is built with Elysia & leveraging postgresql and Prisma. Frontend is built with Vite + React, and using Elysia Eden to interact with the backend and get full end-to-end type safety.

- [Bun](https://bun.sh)
- [Elysia](https://elysiajs.com/)
- [Elysia Eden](https://elysiajs.com/eden/overview.html)
- [Prisma](https://www.prisma.io/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [Tanstack Router](https://tanstack.com/router/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Docker](https://www.docker.com/)

## Getting Started

Clone the repo

```bash
git clone https://github.com/karledenstal/eden-demo.git
```

Install dependencies

```bash
cd backend
bun install

cd frontend
bun install
```

Start the database

```bash
cd backend
docker compose up -d
```

Run the backend

```bash
bun run dev
```

Run the frontend

```bash
cd frontend
bun run dev
```

🎉 Get hacking! 👾