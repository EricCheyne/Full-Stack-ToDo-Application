import { prisma } from './prisma';
import { CreateTodo, UpdateTodo } from './schemas';

export const todoService = {
    async listTodos() {
        return prisma.todo.findMany({
            where: { deletedAt: null },
            orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
        });
    },

    async getTodo(id: string) {
        return prisma.todo.findUnique({
            where: { id },
        });
    },

    async createTodo(data: CreateTodo) {
        return prisma.todo.create({
            data: {
                title: data.title,
                description: data.description,
                priority: data.priority,
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
            },
        });
    },

    async updateTodo(id: string, data: UpdateTodo) {
        return prisma.todo.update({
            where: { id },
            data: {
                ...(data.title && { title: data.title }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.completed !== undefined && { completed: data.completed }),
                ...(data.priority && { priority: data.priority }),
                ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
            },
        });
    },

    async deleteTodo(id: string) {
        // Soft delete
        return prisma.todo.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    },

    async toggleTodo(id: string) {
        const todo = await prisma.todo.findUnique({
            where: { id },
        });

        if (!todo) throw new Error('Todo not found');

        return prisma.todo.update({
            where: { id },
            data: { completed: !todo.completed },
        });
    },
};
