import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterScreen() {
  return (
    <div>
      <h2>Register</h2>
      <input type="email" placeholder="Email" />
      <br />
      <input type="password" placeholder="Password" />
      <br />
      <button>Register</button>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
