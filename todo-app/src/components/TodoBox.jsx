import { useState, useEffect } from 'react'
import Form from './Form.jsx'
import Todo from './Todo.jsx'

export default function TodoBox() {
  // Initialize todos from localStorage if available
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (e) {
        console.error('Error parsing saved todos:', e);
        return [];
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState('all');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    const newTodo = { id: Date.now(), text: text, completed: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  function deleteTodo(id) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'remaining') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; 
  });

  
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className='bg-white p-4 sm:p-5 rounded-lg w-[95%] sm:w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%] min-h-[70vh] shadow-lg mx-auto'>
      <h2 className='text-xl sm:text-2xl font-bold text-center mb-4'>Manage your Todos</h2>
      <Form 
        onSubmit={addTodo} 
        onFilterChange={setFilter} 
        currentFilter={filter} 
      />
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
        <p className="text-lg sm:text-xl text-gray-500">
          &ensp; Your todos 
        </p>
        <p className="text-xs sm:text-sm text-gray-500 ml-3 sm:ml-0">
          {completedCount} of {totalCount} tasks completed
        </p>
      </div>
      
      <ul className='space-y-2'>
        {filteredTodos.map((todo) => (
          <Todo 
            key={todo.id} 
            id={todo.id} 
            text={todo.text} 
            completed={todo.completed} 
            onDelete={deleteTodo} 
            onToggle={toggleTodo} 
          />
        ))}
        {todos.length === 0 && (
          <p className='text-center text-gray-400 py-4'>No todos yet! Add a new task to get started.</p>
        )} 
        {todos.length > 0 && filteredTodos.length === 0 && (
          <p className='text-center text-gray-400 py-4'>
            No {filter === 'completed' ? 'completed' : 'remaining'} tasks found.
          </p>
        )}
      </ul>
    </div>
  )
}
