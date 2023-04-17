import React from "react";
import Barra from "../layout/Barra";
import Header from "../layout/Header";
import Cards from "./Cards";
import AppBar from "@material-ui/core/AppBar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
}));

const ServiciosParaClientes = () => {
  const classes = useStyles();

  return (
    <div className="seccion-principal">
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Header />
        <Barra />
      </AppBar>

      <div className="contenedor-principal">
        <main>
          <br></br>
          <Cards />
        </main>
      </div>
    </div>
  );
};
export default ServiciosParaClientes;
