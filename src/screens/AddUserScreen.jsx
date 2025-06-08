import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUserScreen() {
  const [name, setName] = useState("");
  const [lottieData, setLottieData] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/json") {
      alert("Please upload a valid Lottie (.json) file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setLottieData(json);
      } catch (error) {
        alert("Invalid JSON content in Lottie file");
      }
    };
    reader.readAsText(file);
  };

  const handleAdd = () => {
    if (!name || !lottieData) {
      alert("Name and Lottie animation are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("userList")) || [];
    const newUser = { id: Date.now(), name, animation: lottieData };
    users.push(newUser);
    localStorage.setItem("userList", JSON.stringify(users));
    navigate("/users");
  };

  return (
    <div>
      <h2>Add User Profile</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="User name" /><br />
      <input type="file" accept=".json" onChange={handleFileUpload} /><br />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
