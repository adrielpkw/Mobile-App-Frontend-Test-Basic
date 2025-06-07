import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserListScreen() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add-user">
        <button>Add User</button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
