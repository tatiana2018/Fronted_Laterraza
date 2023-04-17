import React from 'react';
import MenuPrincipal from '../inicio/menuPrincipal';
import AppBar from '@material-ui/core/AppBar';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
import ListadoReportes from './ListadoReportes';
import Ganancias  from './ModalGanancias';
import Edades from './ModalEdades';
import Productos from './ModalProductos';
import ReporteCitas from './ModalCitasColab';
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    }

}));

const Reportes = () => {
    const classes = useStyles();
    return (
        <div className="seccion-principal">
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <MenuPrincipal />
            </AppBar>
            <div className="contenedor-principal">
                <main>
                    <br></br>
                   <ListadoReportes/>
                   <Ganancias/>
                   <Edades/>
                   <Productos/>
                   <ReporteCitas/>
                </main>
            </div>
        </div>
    );
}

export default Reportes;