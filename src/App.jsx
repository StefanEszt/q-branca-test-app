import { useState } from "react";
import "./App.css";

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const addTask = () => {
    const trimmedName = taskName.trim();

    if (!trimmedName) {
      setError("Task name cannot be empty");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: trimmedName,
        completed: false,
      },
    ]);

    setTaskName("");
    setError("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <main className="app">
      <h1>Q-Branca Test Task Manager</h1>

      <section>
        <label htmlFor="task-name">Task name</label>

        <div className="task-form">
          <input
            id="task-name"
            data-testid="task-input"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            placeholder="Enter a task"
          />

          <button
            data-testid="add-task"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        {error && (
          <p role="alert" data-testid="validation-error">
            {error}
          </p>
        )}
      </section>

      <section>
        <h2>Tasks</h2>

        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>
            Completed
          </button>
        </div>

        {visibleTasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <ul data-testid="task-list">
            {visibleTasks.map((task) => (
              <li key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />

                  <span className={task.completed ? "completed" : ""}>
                    {task.name}
                  </span>
                </label>

                <button
                  aria-label={`Delete ${task.name}`}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
