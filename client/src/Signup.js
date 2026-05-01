import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("https://team-task-manager-production-349d.up.railway.app/api/auth/register", {
      name,
      email,
      password,
      role
    });

    alert("Signup successful");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Signup</button>
    </form>
  );
}