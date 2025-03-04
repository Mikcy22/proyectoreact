import { useEffect, useState } from "react";
import axios from "axios";
import GameItem from "./GameItem";

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/games`)
      .then((response) => setGames(response.data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div>
      <h1>Lista de Videojuegos</h1>
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameList;