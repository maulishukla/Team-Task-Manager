import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("https://your-backend.up.railway.app/api/auth/login", , {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="loginContainer">
      <motion.div
        className="loginBox"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2>Login</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={login}>Login</button>
      </motion.div>
    </div>
  );
}