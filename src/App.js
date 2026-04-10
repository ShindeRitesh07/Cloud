import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks"));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="app">
      <div className="card">
        <h1>✨ Task Manager</h1>

        <div className="inputBox">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>➕</button>
        </div>

        <ul className="taskList">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "task completed" : "task"}
              onClick={() => toggleTask(index)}
            >
              <span>{task.text}</span>

              <button
                className="deleteBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <p className="footer">
          {tasks.length} tasks • Click to complete
        </p>
      </div>
    </div>
  );
}

export default App;