import React from "react";
import { Fragment } from "react";
import Barra from "../layout/Barra";
import Header from "../layout/Header";

const Contacto = () => {
  return (
    <Fragment>
      <Header />
      <Barra />
      <div className="contenedor-principal ">
        <hr></hr>
        <div className="contenedor-basico sombra-dark">
          <h1 className="Titulo2">Información de contacto</h1>

          <div className="Contactate">
            <h1 className="Titulo8">
              <u>
                <i>
                  ¡Si necesitas solicitar un servicio Contáctate con nosotros!
                </i>
              </u>
            </h1>
          </div>

          <div className="Contenedor-todo">
            <div className="contenedor-inf">
              <h1 className="Titulo3">Información local</h1>
              <h2 className="Titulo4">Administradora:</h2>
              <h4>Natalia Sierra</h4>

              <h2 className="Titulo4">Teléfono:</h2>
              <h4>3006512878</h4>

              <h2 className="Titulo4">Correo Electrónico:</h2>
              <h4>laterrazadefridapeluqueria@gmail.com</h4>

              <h2 className="Titulo4">Dirección:</h2>
              <h4>
                Carrera 89 # 42 c 66 local 1 Barrio La América En la misma
                cuadra del d1, una cuadra arriba de san juan y a dos cuadras de
                la iglesia de La América.
              </h4>
            </div>

            <div className="Info-Texto1">
              <h1 className="Titulo5">Mapa de Ubicación</h1>
              <div className="Mapa">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.097244781471!2d-75.60970
            888573407!3d6.250916028007525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s
            0x8e442977956b0c39%3A0x16a60e252b02e8c5!2sCra.%2089%20%2342c-66%2C%20Medell%C3%ADn%2C%20Antioquia
            !5e0!3m2!1ses!2sco!4v1619034058002!5m2!1ses!2sco"
                  width="500"
                  height="350"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="Texto-Alusivo">
              <p className="Parrafo3">
                {" "}
                <b>"Un sitio donde esperar se vuelve un cuento"</b>
              </p>
          </div>

          <div className="Footer">
            <h1 className="Titulo6">
              {" "}
              <i>Información de los desarrolladores</i>
            </h1>
            <p className="Parrafo4">
             
              <i>
                Andres David Berrio:&nbsp; aberriog@gmail.com &nbsp; &nbsp;
                &nbsp; Tatiana Gallon
                Restrepo:&nbsp;restrepotatianamarcela@gmail.com
                &nbsp; &nbsp; &nbsp; Santiago Zuluaga Castaño:&nbsp;  santiagozuluaga46@gmail.com
              </i>
            </p>
            <h1 className="Titulo7">
              {" "}
              <i>Copyright © 2021 Todos los derechos reservados</i>
            </h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Contacto;
