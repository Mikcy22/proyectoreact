import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:3000/users");
      const user = response.data.find(
        (user) => user.email === credentials.email && user.password === credentials.password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user)); // Almacena los datos del usuario en localStorage
        window.location.href = "/App"; // Redirige al index.html
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <Input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Button type="submit">Login</Button>
      <LinkButton type="button" onClick={() => window.location.href = "/register"}>
        Go to Register
      </LinkButton>
    </Form>
  );
};

export default Login;
