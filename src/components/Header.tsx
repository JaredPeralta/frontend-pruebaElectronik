"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isAuth, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/pages/auth/login");
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link href="/" style={styles.link}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/pages/favorites" style={styles.link}>Favoritos</Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/pages/search" style={styles.link}>Buscar Imagen</Link>
          </li>
          {isAuth ? (
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.button}>Cerrar sesión</button>
            </li>
          ) : (
            <>
              <li style={styles.navItem}>
                <Link href="/pages/auth/login" style={styles.link}>Iniciar sesión</Link>
              </li>
              <li style={styles.navItem}>
                <Link href="/pages/auth/register" style={styles.link}>Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    padding: '10px 20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default Header;