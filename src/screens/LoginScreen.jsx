import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginScreen() {
  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <br />
      <input type="password" placeholder="Password" />
      <br />
      <button>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
