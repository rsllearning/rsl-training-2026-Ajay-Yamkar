import React, { useMemo, useState } from 'react';

const initialTodos = [
  { id: 1, text: 'Learn ReactJS basics', completed: true },
  { id: 2, text: 'Practice React.JS', completed: false },
  { id: 3, text: 'Learn Redux', completed: false },
  { id: 4, text: 'Code portfolio in React', completed: false },
  { id: 5, text: 'Learn React Native', completed: false },
];

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Done', value: 'done' },
  { label: 'Todo', value: 'todo' },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  function addTodo(event) {
    event.preventDefault();
    // The assignment does not require description validation; preserve the entered text.
    setTodos((current) => [
      ...current,
      { id: Date.now() + Math.random(), text: newTodo, completed: false },
    ]);
    setNewTodo('');
  }

  function toggleCompleted(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id && !todo.completed
          ? { ...todo, completed: true }
          : todo
      )
    );
  }

  function startEditing(todo) {
    if (todo.completed) return;
    setEditingId(todo.id);
    setEditText(todo.text);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditText('');
  }

  function confirmEditing(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id && !todo.completed ? { ...todo, text: editText } : todo
      )
    );
    cancelEditing();
  }

  function deleteTodo(todo) {
    if (!todo.completed) return;
    const shouldDelete = window.confirm(`Delete "${todo.text}"?`);
    if (shouldDelete) {
      setTodos((current) => current.filter((item) => item.id !== todo.id));
      if (editingId === todo.id) cancelEditing();
    }
  }

  const visibleTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      if (filter === 'done') return todo.completed;
      if (filter === 'todo') return !todo.completed;
      return true;
    });

    // Completed tasks first, while preserving the relative order within each group.
    return filtered
      .map((todo, index) => ({ todo, index }))
      .sort((a, b) => Number(b.todo.completed) - Number(a.todo.completed) || a.index - b.index)
      .map(({ todo }) => todo);
  }, [todos, filter]);

  return (
    <main className="app">
      <h1 className="page-title">TodoInput</h1>

      <form className="input-panel" onSubmit={addTodo}>
        <div className="input-row">
          <span className="input-icon" aria-hidden="true">▣</span>
          <input
            aria-label="New Todo"
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
        </div>
        <button className="add-button" type="submit">Add new task</button>
      </form>

      <h2 className="list-title">TodoList</h2>

      {todos.length > 0 && (
        <div className="filters" aria-label="Todo filters">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`filter-button ${filter === item.value ? 'selected' : ''}`}
              onClick={() => setFilter(item.value)}
              aria-pressed={filter === item.value}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <section className="todo-list" aria-live="polite">
        {visibleTodos.length === 0 ? (
          <p className="empty-state">No todo is available</p>
        ) : (
          visibleTodos.map((todo) => (
            <article className={`todo-row ${todo.completed ? 'completed' : ''}`} key={todo.id}>
              {editingId === todo.id && !todo.completed ? (
                <div className="edit-row">
                  <input
                    className="edit-input"
                    aria-label="Edit todo description"
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') confirmEditing(todo.id);
                      if (event.key === 'Escape') cancelEditing();
                    }}
                    autoFocus
                  />
                  <div className="actions">
                    <button className="action-button confirm" onClick={() => confirmEditing(todo.id)} type="button">Confirm</button>
                    <button className="action-button cancel" onClick={cancelEditing} type="button">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="todo-text">{todo.text}</span>
                  <div className="actions">
                    <input
                      className="complete-checkbox"
                      type="checkbox"
                      aria-label={`Mark "${todo.text}" as completed`}
                      checked={todo.completed}
                      disabled={todo.completed}
                      onChange={() => toggleCompleted(todo.id)}
                    />
                    <button
                      type="button"
                      className="action-button edit"
                      onClick={() => startEditing(todo)}
                      disabled={todo.completed}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="action-button delete"
                      onClick={() => deleteTodo(todo)}
                      disabled={!todo.completed}
                      title={todo.completed ? 'Delete todo' : 'Complete this todo before deleting'}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </article>
          ))
        )}
      </section>
    </main>
  );
}
