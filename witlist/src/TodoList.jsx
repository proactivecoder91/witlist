import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList = ({ selectedDate }) => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const storedTodos =
      JSON.parse(localStorage.getItem(selectedDate.toISOString())) || [];
    setTodos(storedTodos);
  }, [selectedDate]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim() === "") return;

    const newTodo = {
      text: newTodoText,
      createdAt: new Date(),
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoText("");

    localStorage.setItem(
      selectedDate.toISOString(),
      JSON.stringify([...todos, newTodo])
    );
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;

    setTodos(updatedTodos);

    localStorage.setItem(
      selectedDate.toISOString(),
      JSON.stringify(updatedTodos)
    );
  };

  return (
    <div className="todo-list">
      <h2>{`Todos for ${selectedDate.toLocaleDateString()}`}</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          onToggle={() => handleToggleTodo(index)}
        />
      ))}
    </div>
  );
};

export default TodoList;
