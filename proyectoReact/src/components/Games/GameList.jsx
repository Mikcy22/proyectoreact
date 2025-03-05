import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import GameForm from "./GameForm";
import { useNavigate } from "react-router-dom"; // Para la redirección
import React from "react";
import { useAuth } from "../../context/AuthContext";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado del buscador
  const [gameToEdit, setGameToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const navigate = useNavigate(); // Hook de redirección
  const { logout } = useAuth(); //
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
      setGames(response.data);
    } catch (error) {
      console.error("Error cargando juegos:", error);
    }
  };

  const handleEdit = (game) => {
    setGameToEdit(game);
    setIsModalOpen(true); // Mostrar modal al editar
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/games/${id}`);
      fetchGames();
    } catch (error) {
      console.error("Error eliminando juego:", error);
    }
  };

  const handleOpenModal = () => {
    setGameToEdit(null); // Asegurar que se abre para añadir, no editar
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    // Eliminar el token de autenticación o cualquier otra acción de logout
    logout(); // Llamar a logout
    console.log("cierra?");
    navigate("/login"); // Redirigir al login
  };

  // Filtrar juegos según el término de búsqueda
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <SearchInput
          type="text"
          placeholder="🔍 Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
      </Header>

      <AddGameButton onClick={handleOpenModal}>➕ Agregar Juego</AddGameButton>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>❌</CloseButton>
            <GameForm onSave={() => { fetchGames(); handleCloseModal(); }} gameToEdit={gameToEdit} />
          </ModalContent>
        </ModalOverlay>
      )}

      <GameGrid>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard key={game.id}>
              <img src={game.image} alt={game.title} />
              <h3>{game.title}</h3>
              <p>🎮 {game.genre} | 📅 {game.releaseYear}</p>
              <ButtonGroup>
                <ButtonEdit onClick={() => handleEdit(game)}>✏️ Editar</ButtonEdit>
                <ButtonDelete onClick={() => handleDelete(game.id)}>🗑️ Eliminar</ButtonDelete>
              </ButtonGroup>
            </GameCard>
          ))
        ) : (
          <NoResults>No se encontraron juegos.</NoResults>
        )}
      </GameGrid>
    </Container>
  );
};

export default GameList;

// 🎨 Estilos con Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  width: 75%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #cc0000;
  }
`;

const AddGameButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-bottom: 15px;

  &:hover {
    background-color: #218838;
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const GameCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }

  h3 {
    margin: 10px 0 5px;
    font-size: 18px;
  }

  p {
    color: #555;
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ButtonEdit = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonDelete = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
`;

// 🎨 Estilos del Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
`;
