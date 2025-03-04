import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import GameList from "./components/Games/GameList";
import GameForm from "./components/Games/GameForm";
import GlobalStyles from "./styles/GlobalStyles";
import React from "react";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <GameList /> : <Navigate to="/login" />} />
          <Route path="/games/new" element={user ? <GameForm /> : <Navigate to="/login" />} />
          <Route path="/games/edit/:id" element={user ? <GameForm /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
