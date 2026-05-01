import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await axios.post(
        "https://team-task-backend-production.up.railway.app/api/auth/register",
        {
          name,
          email,
          password,
          role: "admin"
        }
      );

      alert("Signup successful");
      window.location.href = "/";
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Signup</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/><br/>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>

      <button onClick={signup}>Signup</button>
    </div>
  );
}