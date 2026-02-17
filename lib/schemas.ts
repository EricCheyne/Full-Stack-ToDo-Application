import { z } from 'zod';

export const Priority = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']);

export const CreateTodoSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().optional(),
    priority: Priority.default('MEDIUM'),
    dueDate: z.string().datetime().optional(),
});

export const UpdateTodoSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().optional(),
    completed: z.boolean().optional(),
    priority: Priority.optional(),
    dueDate: z.string().datetime().optional(),
});

export const TodoResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    completed: z.boolean(),
    priority: Priority,
    dueDate: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export type CreateTodo = z.infer<typeof CreateTodoSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;
export type Todo = z.infer<typeof TodoResponseSchema>;
