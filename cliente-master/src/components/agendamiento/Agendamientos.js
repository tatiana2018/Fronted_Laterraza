import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import ListaServicios from './ListadoServiciosCita';
import AppBar from '@material-ui/core/AppBar';
import Header from '../layout/Header';
import MenuPrincipal from '../inicio/menuPrincipal';
import { makeStyles } from '@material-ui/core/styles';
import Resumen from './Resumen';
import Modal from './Modal';
import ValidarUsuario from './ValidarUsuario';

const useStyles = makeStyles((theme) => ({

    appBar: {
        position: 'relative',
    }

}));

const Agendamientos = () => {

    const classes = useStyles();

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return (

        <div className="seccion-principal">
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <MenuPrincipal />
            </AppBar>

            <div className="contenedor-principal">
                <main>
                    <br></br>
                    <DIV>HOLA</DIV>
                    <div className="contenedor-basico sombra-dark">
                        <div className="contenedor-agenda">
                            <ListaServicios />

                            <ValidarUsuario />
                            <div className="contenedor-tareas">
                                <Resumen />
                            </div>

                            <Modal />

                        </div>
                    </div>
                </main>
            </div>
        </div>

    );
}

export default Agendamientos;