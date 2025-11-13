import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="p-3 bg-primary text-white flex justify-content-between align-items-center">
      <h3>MyL Suplementos</h3>
      <div className="flex gap-3">
        <Link to="/" className="text-white no-underline">Inicio</Link>
        {isAuthenticated && <Link to="/posts" className="text-white no-underline">Posts</Link>}
        {!isAuthenticated && <Link to="/login" className="text-white no-underline">Login</Link>}
        {!isAuthenticated && <Link to="/register" className="text-white no-underline">Registro</Link>}
        {isAuthenticated && (
          <button onClick={logout} className="p-button p-button-danger p-button-sm">
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}
