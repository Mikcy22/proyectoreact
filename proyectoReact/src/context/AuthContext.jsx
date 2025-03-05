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
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const user = response.data.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
  
      if (user) {
        localStorage.setItem("token", user.id);
        setUser(user); // 💡 ACTUALIZA EL CONTEXTO
      } else {
        console.log("Invalid credentials");
      }
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
    const token = localStorage.getItem("token"); // Aquí el token es el ID del usuario
    if (token) {
      axios.get(`http://localhost:3000/users/${token}`) // Usa la ruta correcta
        .then((response) => {
          setUser(response.data); // Almacena el usuario en el estado global
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