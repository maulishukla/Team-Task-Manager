import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://team-task-manager-production-349d.up.railway.app";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(`${BASE_URL}/api/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return alert("Enter task");

    await axios.post(`${BASE_URL}/api/tasks`, {
      title,
      projectId: null,
      assignedTo: null
    });

    setTitle("");
    fetchTasks();
  };

  return (
    <div>
      <h1>Task Manager</h1>

      <input
        placeholder="Task name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button>Add Task NOW</button>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.status}</p>
        </div>
      ))}
    </div>
  );
}