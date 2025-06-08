import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUserScreen() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const type = selected.type;
    const isImage = type.startsWith("image/");
    const isJson = type === "application/json";

    if (isImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
        setFileType("image");
      };
      reader.readAsDataURL(selected);
    } else if (isJson) {
      const text = await selected.text();
      try {
        const parsed = JSON.parse(text);
        if (!parsed.v || !parsed.layers) {
          throw new Error("Invalid Lottie format");
        }
        setFile(JSON.stringify(parsed));
        setFileType("lottie");
      } catch {
        setError("Invalid Lottie JSON file");
        setFile(null);
      }
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
        setFileType(type);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked", { name, file, fileType });

    if (!name) {
      setError("Name is required");
      return;
    }

    const newUser = {
      name,
      file,
      fileType,
    };

    const users = JSON.parse(localStorage.getItem("userList") || "[]");
    users.push(newUser);
    localStorage.setItem("userList", JSON.stringify(users));
    console.log("User saved", newUser);

    navigate("/users"); // Make sure your routing includes this path
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>➕ Add User</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setError("");
              setName(e.target.value);
            }}
            style={{ width: "100%", padding: "0.5rem" }}
            required
          />
        </label>

        <label>
          Upload File (Image or Lottie JSON):
          <input type="file" accept=".json,image/*,*" onChange={handleFileChange} />
        </label>

        {file && fileType === "image" && (
          <img
            src={file}
            alt="Preview"
            style={{
              height: 100,
              width: 100,
              objectFit: "cover",
              borderRadius: 10,
              marginTop: "0.5rem",
            }}
          />
        )}

        {file && fileType === "lottie" && (
          <p style={{ fontStyle: "italic", color: "green" }}>✅ Lottie JSON ready</p>
        )}

        {file && fileType !== "image" && fileType !== "lottie" && (
          <p style={{ color: "gray" }}>📎 Attached file type: {fileType}</p>
        )}

        <div>
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            ✅ Submit
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ padding: "0.5rem 1rem", marginLeft: 10 }}
          >
            🔙 Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
