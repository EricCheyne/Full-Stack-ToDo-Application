'use client';

import { Todo } from '@/lib/schemas';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: any) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSaveEdit = async () => {
    if (editTitle.trim()) {
      await onUpdate(todo.id, { title: editTitle });
      setIsEditing(false);
    }
  };

  const priorityColors = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition flex items-start gap-4 p-4">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 cursor-pointer transition ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {todo.completed && (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            className="w-full px-2 py-1 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <>
            <p className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </p>
            {todo.description && (
              <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
            )}
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[todo.priority as keyof typeof priorityColors]}`}>
                {todo.priority}
              </span>
              {todo.dueDate && (
                <span className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex gap-2">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
          title="Edit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
