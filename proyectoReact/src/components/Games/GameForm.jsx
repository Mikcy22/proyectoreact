import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";

const GameForm = ({ game, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
  });

  useEffect(() => {
    if (game) {
      setFormData(game);
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (game) {
        await axios.put(`${import.meta.env.VITE_API_URL}/games/${game.id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/games`, formData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving game:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
      />
      <Input
        type="number"
        name="releaseYear"
        placeholder="Release Year"
        value={formData.releaseYear}
        onChange={handleChange}
      />
      <Button type="submit">{game ? "Update" : "Create"}</Button>
    </Form>
  );
};

GameForm.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseYear: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default GameForm;

// Estilos con Styled Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;