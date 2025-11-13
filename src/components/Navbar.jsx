import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/styles.css";

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      <h2>MyL</h2>
      <div>
        <Link to="/">Inicio</Link>
        {isAuthenticated && <Link to="/nuevo">Nuevo Post</Link>}
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {!isAuthenticated && <Link to="/register">Registro</Link>}
        {isAuthenticated && (
          <button onClick={logout} className="logout-btn">
            Salir
          </button>
        )}
      </div>
    </nav>
  );
}
