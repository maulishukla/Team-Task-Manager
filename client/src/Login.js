import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "https://team-task-manager-production-349d.up.railway.app/api/auth/login",
        {
          email,
          password
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        <p
          style={styles.link}
          onClick={() => (window.location.href = "/signup")}
        >
          Create Account
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a"
  },
  box: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)"
  },
  title: {
    color: "#fff",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  },
  link: {
    marginTop: "15px",
    color: "#a5b4fc",
    cursor: "pointer"
  }
};