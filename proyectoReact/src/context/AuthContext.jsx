import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Manejo de errores

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const foundUser = response.data.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (foundUser) {
        localStorage.setItem("token", foundUser.id);
        setUser(foundUser);
        setError(null); // Limpiar errores en caso de éxito
      } else {
        setError("Correo o contraseña incorrectos");
      }
    } catch (error) {
      setError("Error al intentar iniciar sesión. Intenta de nuevo.");
      console.error("Login failed:", error);
    }
  };

  // Función para registrarse
  const register = async (credentials) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, credentials);
      
      if (response.status === 201) {
        setUser(response.data); // Guarda el usuario registrado en el contexto
        localStorage.setItem("token", response.data.id); // Guarda el ID como "token"
        return response.data;
      }
    } catch (error) {
      setError("Error al registrarse. Intenta con otro correo.");
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
      axios.get(`${import.meta.env.VITE_API_URL}/users/${token}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  // Valor que se provee a los componentes hijos
  const value = {
    user,
    login,
    register,
    logout,
    error, // Exponer errores al contexto
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
