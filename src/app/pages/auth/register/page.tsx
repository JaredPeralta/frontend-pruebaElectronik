"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleRegister = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/register`, { username, password });
      router.push("/pages/auth/login");
    } catch (err) {
      console.error("Error durante el registro:", err);
      setError("Error al registrar. Inténtalo de nuevo.");
    }
  };

  const styles = {
    container: {
      width: "300px",
      margin: "0 auto",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center" as "center",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#2980b9",
    },
    errorMessage: {
      color: "red",
      marginTop: "10px",
    },
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registrarse</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={handleRegister}
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Registrarse
      </button>
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Register;
