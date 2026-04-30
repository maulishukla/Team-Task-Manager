import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: token },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, status: "todo" },
      { headers: { Authorization: token } }
    );

    setTitle("");
    fetchTasks();
  };

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>

      <div className="inputBox">
        <input
          placeholder="Add new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createTask}>Add</button>
      </div>

      <div className="taskGrid">
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            className="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3>{task.title}</h3>

            <select
              value={task.status}
              onChange={async (e) => {
                await axios.put(
                  `https://your-backend.up.railway.app/api/tasks`,
                  { status: e.target.value },
                  { headers: { Authorization: token } }
                );
                fetchTasks();
              }}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <p className={`status ${task.status}`}>{task.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}