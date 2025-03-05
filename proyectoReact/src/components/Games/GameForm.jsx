import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";
import React from "react";

const GameForm = ({ onSave, gameToEdit }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [image, setImage] = useState("");

  const genres = ["Acción", "Aventura", "RPG", "Estrategia", "Deportes", "Carreras", "Simulación", "Terror", "Peleas", "Plataformas"];

  useEffect(() => {
    if (gameToEdit) {
      setTitle(gameToEdit.title);
      setGenre(gameToEdit.genre);
      setReleaseYear(gameToEdit.releaseYear);
      setImage(gameToEdit.image);
    }
  }, [gameToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre || !releaseYear || !image) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (gameToEdit) {
        // Actualizar un juego existente
        await axios.put(`${import.meta.env.VITE_API_URL}/games/${gameToEdit.id}`, {
          title,
          genre,
          releaseYear,
          image,
        });
      } else {
        // Agregar un nuevo juego
        await axios.post(`${import.meta.env.VITE_API_URL}/games`, {
          title,
          genre,
          releaseYear,
          image,
        });
      }

      onSave(); // Refrescar lista de juegos
      setTitle("");
      setGenre("");
      setReleaseYear("");
      setImage("");
    } catch (error) {
      console.error("Error al guardar juego:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>{gameToEdit ? "✏️ Editar Juego" : "➕ Agregar Nuevo Juego"}</h2>

      <Input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Select value={genre} onChange={(e) => setGenre(e.target.value)} required>
        <option value="">Selecciona un género</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </Select>

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

      <Button type="submit">{gameToEdit ? "💾 Guardar Cambios" : "✅ Guardar Juego"}</Button>
    </FormContainer>
  );
};

GameForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  gameToEdit: PropTypes.object,
};

export default GameForm;

// 🎨 Estilos con Styled Components
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

const Select = styled.select`
  width: 95%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: white;
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
