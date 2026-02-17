import { UpdateTodoSchema } from '@/lib/schemas';
import { todoService } from '@/lib/todoService';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const todo = await todoService.getTodo(params.id);
        if (!todo) {
            return NextResponse.json(
                { error: 'Todo not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch todo' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const validatedData = UpdateTodoSchema.parse(body);
        const todo = await todoService.updateTodo(params.id, validatedData);
        return NextResponse.json(todo);
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to update todo' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await todoService.deleteTodo(params.id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete todo' },
            { status: 500 }
        );
    }
}
