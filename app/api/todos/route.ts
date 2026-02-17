import { CreateTodoSchema } from '@/lib/schemas';
import { todoService } from '@/lib/todoService';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET() {
    try {
        const todos = await todoService.listTodos();
        return NextResponse.json(todos);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch todos' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = CreateTodoSchema.parse(body);
        const todo = await todoService.createTodo(validatedData);
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to create todo' },
            { status: 500 }
        );
    }
}
