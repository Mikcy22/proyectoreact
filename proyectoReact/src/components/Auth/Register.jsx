import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import React from "react";


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

const Register = () => {
  const [userData, setUserDauseNavigateta] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);
      console.log("User registered successfully:", response.data);
      navigate("/login"); // Redirige al login tras registrarse
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  

  return (
    <Form onSubmit={handleRegister}>
      <Input
        type="text"
        placeholder="Name"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <Input
        type="email"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <Input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default Register;
