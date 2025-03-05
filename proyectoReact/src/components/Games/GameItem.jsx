import PropTypes from "prop-types";
import styled from "styled-components";
import React from "react";
import axios from "axios";

const GameItem = ({ game, onGameUpdated }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/games/${game.id}`);
      onGameUpdated();
    } catch (error) {
      console.error("Error eliminando el juego:", error);
    }
  };

  const handleEdit = async () => {
    const newTitle = prompt("Nuevo título:", game.title);
    const newGenre = prompt("Nuevo género:", game.genre);
    const newYear = prompt("Nuevo año de lanzamiento:", game.releaseYear);
    const newImage = prompt("Nueva URL de la imagen:", game.image);

    if (newTitle && newGenre && newYear && newImage) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/games/${game.id}`, {
          title: newTitle,
          genre: newGenre,
          releaseYear: newYear,
          image: newImage,
        });
        onGameUpdated();
      } catch (error) {
        console.error("Error editando el juego:", error);
      }
    }
  };

  return (
    <Card>
      <GameImage src={game.image} alt={game.title} />
      <h3>{game.title}</h3>
      <p><strong>Género:</strong> {game.genre}</p>
      <p><strong>Año:</strong> {game.releaseYear}</p>

      <ButtonContainer>
        <EditButton onClick={handleEdit}>✏️ Editar</EditButton>
        <DeleteButton onClick={handleDelete}>🗑️ Eliminar</DeleteButton>
      </ButtonContainer>
    </Card>
  );
};

GameItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired, // Nueva propiedad
  }).isRequired,
  onGameUpdated: PropTypes.func.isRequired,
};

export default GameItem;

// Estilos con Styled Components
const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
`;

const EditButton = styled(Button)`
  background-color: #ffc107;
  color: black;

  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;
