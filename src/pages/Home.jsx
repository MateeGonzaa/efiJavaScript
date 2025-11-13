import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "../styles/theme.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido a MyL</h1>
      <p>La Mejor Plataforma de publicaciones y comentarios.</p>
      <Link to="/posts">
        <Button label="Ver publicaciones" className="p-button-rounded p-button-primary" />
      </Link>
    </div>
  );
}
