import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = () => {
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
    if (users.find(u => u.email === email)) {
      setError("User already exists.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Register</h2>

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
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Register
      </button>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
