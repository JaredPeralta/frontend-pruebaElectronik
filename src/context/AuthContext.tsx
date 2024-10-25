"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated } from "../app/utils/auth";
import axios from "axios";

interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Sincronizar favoritos locales con el backend
const syncFavoritesWithBackend = async (backendUrl: string, token: string) => {
  const localFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (localFavorites.length > 0) {
    try {
      await axios.post(`${backendUrl}/api/images/favorites`, {
        imageIds: localFavorites
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem("favorites"); // Limpiar el localStorage después de sincronizar
    } catch (err) {
      console.error("Error syncing favorites with backend", err);
    }
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const login = async () => {
    setIsAuth(true);
    const token = localStorage.getItem("token");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (token && backendUrl) {
      await syncFavoritesWithBackend(backendUrl, token);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("favorites"); // Limpiar favoritos al cerrar sesión
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

