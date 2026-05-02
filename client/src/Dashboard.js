import { useEffect, useState } from "react";

const BASE_URL = "https://team-task-manager-production-349d.up.railway.app";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      alert("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= CREATE TASK =================
  const createTask = async () => {
    if (!title) {
      alert("Enter task");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      });

      if (!res.ok) throw new Error();

      setTitle("");
      fetchTasks();

    } catch (err) {
      alert("Failed to add task");
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${BASE_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      fetchTasks(); // refresh list
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // ================= UI =================
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e3c72, #2a5298)",
      padding: "40px",
      fontFamily: "Arial",
      color: "white"
    }}>
      <h1 style={{ textAlign: "center" }}>Task Manager</h1>

      {/* INPUT */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px"
      }}>
        <input
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <button
          onClick={createTask}
          style={{
            padding: "12px 20px",
            marginLeft: "10px",
            background: "#4CAF50",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      {/* TASK LIST */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "40px"
      }}>
        {tasks.length === 0 && (
          <p style={{ textAlign: "center" }}>No tasks yet</p>
        )}

        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              background: "white",
              color: "black",
              padding: "20px",
              borderRadius: "10px"
            }}
          >
            <h3>{task.title}</h3>

            {/* STATUS DROPDOWN */}
            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
              style={{
                padding: "6px",
                marginTop: "10px",
                borderRadius: "5px"
              }}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            {/* STATUS TEXT */}
            <p style={{
              marginTop: "10px",
              fontWeight: "bold",
              color:
                task.status === "done"
                  ? "green"
                  : task.status === "in-progress"
                  ? "orange"
                  : "red"
            }}>
              {task.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}