import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./dashboard.css";

const BASE_URL = "https://team-task-manager-production-349d.up.railway.app";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // 🔴 If no token → force login
  if (!token) {
    alert("Please login again");
    window.location.href = "/";
  }

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
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
      alert("Enter task name");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/tasks`,
        {
          title,
          status: "todo",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task added successfully");

      setTitle("");
      fetchTasks();
    } catch (err) {
      alert("Failed to add task");
    }
  };

  // ================= UPDATE TASK =================
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/api/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      alert("Failed to update task");
    }
  };

  // ================= UI =================
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
              onChange={(e) =>
                updateStatus(task._id, e.target.value)
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <p className={`status ${task.status}`}>
              {task.status}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}