import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/users");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Login</h2>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
          if (error) setError("");
        }}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <p style={{ marginTop: "1rem" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
