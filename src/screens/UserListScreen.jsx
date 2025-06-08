import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

export default function UserListScreen() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("userList") || "[]");
      setUsers(stored);
    } catch {
      setUsers([]);
    }
  }, []);

  const handleDelete = (id) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("userList", JSON.stringify(updated));
  };

  const handleEdit = (id) => {
    const name = prompt("Enter new name:");
    if (!name) return;
    const updated = users.map((u) => u.id === id ? { ...u, name } : u);
    setUsers(updated);
    localStorage.setItem("userList", JSON.stringify(updated));
  };

  const isValidLottie = (data) => {
    try {
      const parsed = typeof data === "string" ? JSON.parse(data) : data;
      return parsed && typeof parsed === "object" && parsed.v && parsed.layers;
    } catch {
      return false;
    }
  };

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h2>👥 User List</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginRight: 10 }}
      />
      <button onClick={() => navigate("/add-user")}>➕ Add User</button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: 10 }}>
        🔙 Back
      </button>

      {filtered.length === 0 && <p>No users found.</p>}

      {filtered.map((user) => (
        <div
          key={user.id}
          style={{
            margin: "1rem 0",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "10px",
            background: "#f9f9f9",
          }}
        >
          <h3>{user.name}</h3>

          {/* Image preview */}
          {user.fileType === "image" && user.file && (
            <img
              src={user.file}
              alt="User upload"
              style={{ height: 100, width: 100, objectFit: "cover" }}
            />
          )}

          {/* Lottie preview */}
          {user.fileType === "lottie" && isValidLottie(user.file) && (
            <div
              onClick={() =>
                setPreviewFile(
                  typeof user.file === "string"
                    ? JSON.parse(user.file)
                    : user.file
                )
              }
              style={{
                cursor: "pointer",
                border: "1px dashed gray",
                width: 120,
                height: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Player
                autoplay
                loop
                src={
                  typeof user.file === "string"
                    ? JSON.parse(user.file)
                    : user.file
                }
                style={{ height: 100, width: 100 }}
              />
            </div>
          )}

          {/* Fallback for unsupported or invalid files */}
          {user.file && user.fileType !== "image" && user.fileType !== "lottie" && (
            <p>📁 File uploaded: {user.fileType}</p>
          )}

          <div style={{ marginTop: "1rem" }}>
            <button onClick={() => handleEdit(user.id)}>✏️ Edit</button>
            <button
              onClick={() => handleDelete(user.id)}
              style={{ marginLeft: 10 }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}

      {/* Fullscreen Lottie preview */}
      {previewFile && (
        <div
          onClick={() => setPreviewFile(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Player
            autoplay
            loop
            src={previewFile}
            style={{ width: "80%", height: "80%" }}
          />
        </div>
      )}
    </div>
  );
}
