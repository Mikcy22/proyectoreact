import { useEffect, useState } from "react";
import axios from "axios";
import GameItem from "./GameItem";
import GameForm from "./GameForm"; // Importa el formulario
import styled from "styled-components";
import React from "react";


const GameList = () => {
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/games`)
      .then((response) => setGames(response.data))
      .catch((error) => console.error("Error fetching games:", error));
  };

  return (
    <Container>
      <h1>Lista de Videojuegos</h1>
      
      {/* Botón para mostrar el formulario */}
      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cerrar Formulario" : "Agregar Juego"}
      </Button>

      {/* Mostrar formulario si showForm es true */}
      {showForm && <GameForm onSave={() => {
        fetchGames();  // Recargar lista de juegos después de agregar
        setShowForm(false); // Ocultar formulario después de agregar
      }} />}

      {/* Lista de juegos */}
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </Container>
  );
};

export default GameList;

// Estilos con Styled Components
const Container = styled.div`
  text-align: center;
`;

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
