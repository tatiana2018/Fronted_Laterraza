import React from "react";
import { Fragment } from "react";
import Barra from "../layout/Barra";
import Header from "../layout/Header";
import Logo from '../../images/logo.png';

const Somos = () => {
  return (
    <Fragment>
      <Header />
      <Barra />
      <div className="contenedor-principal ">
        <hr></hr>
        <div className="contenedor-basico sombra-dark">
          <h1 className="Titulo2">
            <i>La Terraza de Frida</i>
          </h1>
          <div className="texto-somos">
            <h3>
              <p className="Parrafo">
                <i>
                  Nos gusta el color y las nuevas tendencias. Hemos usado la
                  imagen de Frida en su caracterización de mujer fuerte,
                  atrevida y aguerrida; junto con la de Diego un hombre rebelde
                  y enamorado todo unido en un espacio de belleza hecho galería.
                </i>
              </p>

              <p className="Parrafo">
                <i>
                  {" "}
                  Queremos que las fridas y diegos que nos visiten se sientan
                  cómodos y vivan una experiencia entre la belleza el arte y la
                  música. “Un sitio donde esperar se vuelve un cuento”.
                </i>
              </p>

              <p className="Parrafo">
                <i>
                  Frida, roja, Frida de flores, Frida artista, Frida pintora,
                  Frida en expresión de su belleza interna y externa en su arte.
                  “Todos hemos sido Fridas y Diegos”.{" "}
                </i>
              </p>
            </h3>
          </div>

          <img className="tamano-logo" src={Logo} />
          

          <div className="Contenedor-mision-vision-objetivo">
            <div className="Mision">
              <h1 className="Titulo1">
                {" "}
                <i>MISIÓN</i>
              </h1>
              <h3>
                <p className="Parrafo1">
                  <i>
                    {" "}
                    La terraza de Frida es un espacio creado para la belleza de
                    la mujer y del hombre, un espacio que te hace reafirmar tu
                    identidad aportando en la construcción de la imagen estética
                    que quieres ver reflejado en el espejo.{" "}
                  </i>
                </p>
              </h3>
            </div>

            <div className="Mision">
              <h1 className="Titulo1">
                <i> VISIÓN </i>{" "}
              </h1>
              <h3>
                <p className="Parrafo1">
                  <i>
                    Fortalecer la satisfacción en la experiencia del cliente,
                    cumplir las metas planteadas con su respectivo plan o
                    propuesta logrando orientar el proceso y consiguiendo un
                    resultado óptimo.
                  </i>
                </p>
              </h3>
            </div>

            <div className="Mision">
              <h1 className="Titulo1">
                {" "}
                <i> OBJETIVO </i>
              </h1>
              <h3>
                <p className="Parrafo1">
                  <i>
                    Ofrecer servicios de cuidado personal, atendiendo a las
                    demandas y necesidades de los clientes, siguiendo siempre
                    unos códigos de higiene y salud, para poder ofrecer
                    servicios de la mayor calidad posible.{" "}
                  </i>
                </p>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Somos;
