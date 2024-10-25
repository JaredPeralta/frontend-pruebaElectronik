// Verificar si estamos en el lado del cliente
const isClient = () => typeof window !== "undefined";

// Obtener el token JWT desde localStorage solo si estamos en el cliente
export const getToken = (): string | null => {
  if (!isClient()) return null; // Verifica si se esta en el cliente
  return localStorage.getItem("token");
};

// Verificar si el usuario está autenticado solo en el cliente
export const isAuthenticated = (): boolean => {
  return !!getToken();  // Si hay un token, está autenticado
};

// Eliminar el token JWT del localStorage solo si estamos en el cliente
export const logout = () => {
  if (isClient()) {
    localStorage.removeItem("token");
  }
};
