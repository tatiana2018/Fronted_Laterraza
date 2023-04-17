import React, { useEffect, useContext } from 'react';
import ListaPuntos from '../puntos/ListadoPuntos';
import MenuPrincipal from '../inicio/menuPrincipal';
import AuthContext from '../../context/autenticacion/authContext';
import AppBar from '@material-ui/core/AppBar';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    appBar: {
        position: 'relative',
    }

}));

const Puntos = () => {

    const classes = useStyles();

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {

        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="seccion-principal">
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <MenuPrincipal />
            </AppBar>

            <div className="contenedor-principal">
                <main>
                    <br></br>
                    <ListaPuntos />
                </main>
            </div>
        </div>

    );
}

export default Puntos;