import { todoService } from '@/lib/todoService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const todo = await todoService.toggleTodo(params.id);
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to toggle todo' },
            { status: 500 }
        );
    }
}
