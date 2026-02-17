# Todo App

A professional, full-stack todo application built with modern web technologies.

## Features

✨ **Core Features**
- ✅ Create, read, update, and delete todos
- 🎯 Priority levels (Low, Medium, High, Urgent)
- 📅 Due dates for todos
- 📝 Descriptions for detailed task information
- ✔️ Mark todos as completed
- 🎨 Beautiful, responsive UI
- 📊 Task statistics dashboard

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management

### Backend
- **Next.js API Routes** - Serverless API
- **Prisma** - ORM with TypeScript support
- **Zod** - Schema validation

### Database
- **PostgreSQL** - Reliable relational database

### DevOps
- **Docker** - Container orchestration
- **Docker Compose** - Multi-container setup

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or Docker)
- npm or yarn

### Local Development

1. **Clone and install**
```bash
npm install
```

2. **Setup environment**
```bash
cp .env.example .env
# Edit .env and set your DATABASE_URL
```

3. **Run database migrations**
```bash
npm run prisma:migrate
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to `http://localhost:3000`

### With Docker

1. **Start services**
```bash
docker-compose up -d
```

2. **Run migrations** (first time)
```bash
docker-compose exec app npm run prisma:migrate
```

3. **Open browser**
Navigate to `http://localhost:3000`

### Prisma Studio

View and manage your database visually:
```bash
npm run prisma:studio
```

## API Endpoints

### Todos
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Get a specific todo
- `PATCH /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo (soft delete)
- `POST /api/todos/[id]/toggle` - Toggle completion status

### Request/Response Examples

**Create Todo**
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Learn Next.js",
  "description": "Complete the Next.js tutorial",
  "priority": "HIGH",
  "dueDate": "2024-12-31T23:59:59Z"
}
```

**Update Todo**
```bash
PATCH /api/todos/{id}
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true,
  "priority": "URGENT"
}
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # List & create
│   │       └── [id]/
│   │           ├── route.ts      # Get, update, delete
│   │           └── toggle/
│   │               └── route.ts  # Toggle completion
│   ├── components/
│   │   ├── TodoList.tsx          # Main list container
│   │   ├── TodoItem.tsx          # Individual todo item
│   │   └── TodoForm.tsx          # Add/edit form
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── prisma.ts                 # Prisma client
│   ├── schemas.ts                # Zod validation schemas
│   └── todoService.ts            # Business logic
├── prisma/
│   └── schema.prisma             # Database schema
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Database Schema

### Todo Model
- `id` - Unique identifier (CUID)
- `title` - Task title (required, max 255 chars)
- `description` - Detailed description (optional)
- `completed` - Completion status (default: false)
- `priority` - Priority level (LOW, MEDIUM, HIGH, URGENT)
- `dueDate` - Due date and time (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `deletedAt` - Soft delete timestamp (optional)

## Development

### Type Checking
```bash
tsc --noEmit
```

### Lint
```bash
npm run lint
```

### Build
```bash
npm run build
npm start
```

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/todo_app"

# Optional
NODE_ENV="development"
```

## License

MIT
