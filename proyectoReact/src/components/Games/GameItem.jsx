import PropTypes from "prop-types";
import styled from "styled-components";
import React from "react";

const GameItem = ({ game }) => {
  return (
    <ItemContainer>
      <h3>{game.title}</h3>
      <p>Género: {game.genre}</p>
      <p>Año de lanzamiento: {game.releaseYear}</p>
    </ItemContainer>
  );
};

GameItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameItem; // Asegúrate de que esté exportando por defecto

// Estilos con Styled Components
const ItemContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
`;