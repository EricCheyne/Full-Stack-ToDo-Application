'use client';

import { Todo } from '@/lib/schemas';
import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title: string, description?: string, priority?: string, dueDate?: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          priority: priority || 'MEDIUM',
          dueDate: dueDate || undefined,
        }),
      });

      if (!response.ok) throw new Error('Failed to create todo');
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}/toggle`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to toggle todo');
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  const handleUpdateTodo = async (id: string, updates: any) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Total</p>
            <p className="text-3xl font-bold text-gray-800">{todos.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Active</p>
            <p className="text-3xl font-bold text-blue-600">{activeCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          </div>
        </div>

        {/* Form */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg shadow p-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded font-medium transition ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded font-medium transition ${
              filter === 'active'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded font-medium transition ${
              filter === 'completed'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600 mt-2">Loading todos...</p>
          </div>
        )}

        {/* Todo List */}
        {!loading && filteredTodos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">
              {filter === 'all' ? 'No todos yet. Create one to get started!' : `No ${filter} todos.`}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
