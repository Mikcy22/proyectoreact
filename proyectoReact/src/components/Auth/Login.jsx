import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Importamos el contexto


// Estilos
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin: 5px 0;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

// Componente Login
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener función de login del contexto

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const user = response.data.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
  
      if (user) {
        localStorage.setItem("token", user.id); // Guarda el ID como "token"
        login(user); // Ahora actualiza el contexto de autenticación
        navigate("/"); // Redirige correctamente
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Error during login. Please try again.");
    }
  };
  
  

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        required
      />
      <Button type="submit">Login</Button>
      <LinkButton type="button" onClick={() => navigate("/register")}>
        Go to Register
      </LinkButton>
    </Form>
  );
};

export default Login;
