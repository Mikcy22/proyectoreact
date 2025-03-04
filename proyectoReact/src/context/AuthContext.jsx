import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user`, credentials);
      localStorage.setItem("token", response.data.accessToken);
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Función para registrarse
  const register = async (credentials) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, credentials);
      localStorage.setItem("token", response.data.accessToken);
      setUser(response.data.user);
      return response;  // Devolver la respuesta para confirmar el registro
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
    }
  };
  

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Verificar si hay un token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Aquí podrías hacer una solicitud para obtener los datos del usuario
      // y actualizar el estado `user`.
    }
  }, []);

  // Valor que se provee a los componentes hijos
  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};