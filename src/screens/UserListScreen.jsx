import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserListScreen() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) navigate("/");
    const stored = JSON.parse(localStorage.getItem("userList")) || [];
    setUsers(stored);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/add-user"><button>Add User</button></Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
