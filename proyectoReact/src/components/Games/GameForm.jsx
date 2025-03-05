import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

const GameForm = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre || !releaseYear || !image) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/games`, {
        title,
        genre,
        releaseYear,
        image,
      });

      onSave(); // Refrescar lista de juegos
      setTitle("");
      setGenre("");
      setReleaseYear("");
      setImage("");
    } catch (error) {
      console.error("Error añadiendo juego:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>➕ Agregar Nuevo Juego</h2>

      <Input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Input
        type="text"
        placeholder="Género"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />

      <Input
        type="number"
        placeholder="Año de lanzamiento"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        required
      />

      <Input
        type="text"
        placeholder="URL de la imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />

      {image && <PreviewImage src={image} alt="Vista previa" />}

      <Button type="submit">✅ Guardar Juego</Button>
    </FormContainer>
  );
};

GameForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default GameForm;

// Estilos con Styled Components
const FormContainer = styled.form`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 5px;
`;
