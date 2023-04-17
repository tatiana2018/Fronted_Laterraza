import React from 'react';
import { Fragment,useContext, useEffect } from 'react';
import Barra from '../layout/Barra';
import Header from '../layout/Header';
import { RViewerTrigger, RViewer } from 'react-viewerjs';
import AuthContext from '../../context/autenticacion/authContext';

const Galeria = () => {
    const authContext = useContext(AuthContext);
    const {limpiarUsuario } = authContext;
  
    useEffect(() => {
          limpiarUsuario();
      // eslint-disable-next-line
  }, []);

    let imagenes = [
        require("../../images/image2.jpeg"),
        require("../../images/image3.jpeg"),
        require("../../images/image4.jpeg"),
        require("../../images/image5.jpeg"),
        require("../../images/image6.jpeg"),
        require("../../images/image7.jpeg"),
        require("../../images/image8.jpeg"),
        require("../../images/image9.jpeg"),
        require("../../images/image10.jpeg"),
        require("../../images/image11.jpeg"),
        require("../../images/image12.jpeg"),
        require("../../images/image13.jpeg"),
        require("../../images/image14.jpeg"),
        require("../../images/image15.jpeg"),
        require("../../images/image16.jpeg"),
        require("../../images/image17.jpeg"),
        require("../../images/image18.jpeg"),
        require("../../images/image19.jpeg"),
        require("../../images/image20.jpeg"),
        require("../../images/image21.jpeg")

    ];

    return (
        <Fragment>
            <Header />
            <Barra />
            <div className="contenedor-galeria">       
            <br></br>
            <RViewer imageUrls={imagenes}>
                <div style={{ marginLeft:'30px', marginRight: '20px', marginTop: '20px' }}>
                    {imagenes.map((imagen, index) => {
                        return (
                            <RViewerTrigger index={index}>
                                <img className="tarjetas-galeria" src={imagen} alt="Imagen" style={{ width: '280px', height: '280px', margin: '1%', border: '1px solid black' }} />
                            </RViewerTrigger>
                        )
                    })}
                </div>
            </RViewer>  
            </div>
        </Fragment>
    );
}

export default Galeria;