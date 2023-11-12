import React from "react";

const Todo = ({ todo, onToggle }) => {
  const { text, createdAt, completed } = todo;

  const formattedTime =
    createdAt instanceof Date ? createdAt.toLocaleTimeString() : "";

  return (
    <div className={`todo-item ${completed ? "completed" : ""}`}>
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <p className="todo-text">{text}</p>
      <p className="todo-meta">{formattedTime}</p>
    </div>
  );
};

export default Todo;
