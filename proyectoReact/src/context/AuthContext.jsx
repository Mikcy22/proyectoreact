import React,{ createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // El estado del usuario

  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const user = response.data.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
  
      if (user) {
        localStorage.setItem("authToken", user.id); // Guardar el token
        setUser(user); // Almacenar el usuario en el estado
      } else {
        console.log("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Función para registrarse
  const register = async (credentials) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, credentials);
      localStorage.setItem("authToken", response.data.accessToken);
      setUser(response.data.user);
      return response;
    } catch (error) {
      console.error("Error al registrarse:", error.response ? error.response.data : error.message);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("authToken"); // Eliminar el token
    setUser(null); // Eliminar el usuario del estado
  };

  // Verificar si hay un token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Buscar el token
    if (token) {
      axios.get(`http://localhost:3000/users/${token}`) // Verificar el usuario
        .then((response) => {
          setUser(response.data); // Almacenar el usuario en el estado
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
          localStorage.removeItem("authToken");
          setUser(null);
        });
    }
  }, []);

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
