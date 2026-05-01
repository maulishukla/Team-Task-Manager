export default function Login() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Login Page</h2>

      <button onClick={() => window.location.href = "/signup"}>
        Go to Signup
      </button>
    </div>
  );
}