"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();  

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);  
      await login();  // Llama a login que ahora sincroniza favoritos
      router.push("/pages/favorites"); 
    } catch (err) {
      console.error("Error durante el login:", err);
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
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
      <h2 style={styles.title}>Iniciar Sesión</h2>
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
        onClick={handleLogin}
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Iniciar sesión
      </button>
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
};


export default Login;
