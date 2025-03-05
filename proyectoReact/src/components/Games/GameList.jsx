import { useEffect, useState } from "react";
import axios from "axios";
import GameItem from "./GameItem";
import GameForm from "./GameForm";
import styled from "styled-components";
import React from "react";
import { useAuth } from "../../context/AuthContext"; // Importar el contexto de autenticación

const GameList = () => {
  const [games, setGames] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { logout } = useAuth(); // Obtener la función de logout

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
      <Header>
        <h1>🎮 Lista de Videojuegos</h1>
        <LogoutButton onClick={logout}>Cerrar Sesión</LogoutButton>
      </Header>

      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "❌ Cerrar Formulario" : "➕ Agregar Juego"}
      </Button>

      {showForm && (
        <GameForm onSave={() => {
          fetchGames();
          setShowForm(false);
        }} />
      )}

      <GameGrid>
        {games.map((game) => (
          <GameItem key={game.id} game={game} onGameUpdated={fetchGames} />
        ))}
      </GameGrid>
    </Container>
  );
};

export default GameList;

// Estilos con Styled Components
const Container = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;
