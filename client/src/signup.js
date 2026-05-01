import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./login.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await axios.post(
        "https://your-backend.up.railway.app/api/auth/register",
        {
          name,
          email,
          password,
          role: "admin"
        }
      );

      alert("Signup successful. Now login.");
      window.location.href = "/";
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="loginContainer">
      <motion.div
        className="loginBox"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2>Signup</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={signup}>Signup</button>
      </motion.div>
    </div>
  );
}