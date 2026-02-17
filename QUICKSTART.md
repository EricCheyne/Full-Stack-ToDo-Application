# Quick Start Guide

Get your todo app running in minutes!

## Option 1: Local Development (Recommended)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start PostgreSQL

**Using Docker:**
```bash
docker run --name todo-postgres \
  -e POSTGRES_USER=todouser \
  -e POSTGRES_PASSWORD=todopass \
  -e POSTGRES_DB=todo_app \
  -p 5432:5432 \
  -d postgres:16-alpine
```

**Or using Docker Compose (PostgreSQL only):**
```bash
docker-compose up postgres -d
```

### Step 3: Setup Database
```bash
# Create .env.local if you haven't already
cp .env.example .env.local

# Run migrations
npm run prisma:migrate
```

You'll be prompted to name your first migration. Enter something like "init" or just press Enter.

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## Option 2: Full Docker Setup

```bash
# Start both PostgreSQL and the app
docker-compose up

# In another terminal, run migrations (first time only)
docker-compose exec app npm run prisma:migrate
```

Then open [http://localhost:3000](http://localhost:3000)

---

## Useful Commands

### Database
```bash
# View data in Prisma Studio
npm run prisma:studio

# Create a new migration
npm run prisma:migrate

# Generate Prisma Client
npm run prisma:generate
```

### Development
```bash
# Start dev server
npm run dev

# Run type checking
npx tsc --noEmit

# Lint code
npm run lint
```

### Production
```bash
# Build
npm run build

# Start server
npm start
```

---

## Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npm run prisma:generate
npm install
```

### "connect ECONNREFUSED 127.0.0.1:5432"
PostgreSQL is not running. Start it with Docker or your local PostgreSQL instance.

### "relation \"Todo\" does not exist"
Run migrations:
```bash
npm run prisma:migrate
```

---

## Next Steps

✅ App is running!

Now try:
1. ➕ Add a few todos
2. 🎯 Set different priorities
3. 📅 Add due dates
4. ✔️ Mark some as complete
5. 🔧 Edit and delete todos

---

## API Testing

You can test the API endpoints using curl:

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Create a todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn TypeScript",
    "description": "Deep dive into TypeScript",
    "priority": "HIGH",
    "dueDate": "2024-12-31T23:59:59Z"
  }'

# List todos with jq (pretty print)
curl http://localhost:3000/api/todos | jq
```

---

## Need Help?

Check the main README.md for:
- Full API documentation
- Project structure
- Environment variables
- Database schema details

Happy organizing! 🚀
