"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, isAuthenticated, logout } from "../app/utils/auth";

// Definir el contexto
const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = () => {
    setIsAuth(true);
  };

  const logoutUser = () => {
    logout();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
