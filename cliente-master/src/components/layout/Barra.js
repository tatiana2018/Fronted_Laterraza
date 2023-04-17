import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Barra = () => {
  return (
    <Fragment>
      <header className="App-header">
        <nav className="topnav">
          <Link to="/">Inicio</Link>
          <Link to="/galeria">Galeria</Link>
          <Link to="/servicio-cliente">Servicios</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/somos">Quiénes somos</Link>
        </nav>
      </header>
    </Fragment>
  );
};

export default Barra;
