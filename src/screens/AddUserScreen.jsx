import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddUserScreen() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleAdd = () => {
    alert(`User "${name}" added (simulated)!`);
    navigate('/users');
  };

  return (
    <div>
      <h2>Add User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="User name"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
