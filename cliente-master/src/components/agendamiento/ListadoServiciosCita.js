import React, { Fragment, useContext, useEffect} from 'react';
import ServicioContext from '../../context/servicios/servicioContext';
import AgendamientoContext from '../../context/agendamiento/agendamientoContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Card from "react-bootstrap/Card";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {

    Button,

} from "reactstrap";

const useStyles = makeStyles((theme) =>
    createStyles({
        gridList: {
            width: 420,
            height: 450,  
        }
    }),
);

const ListadoServiciosCita = () => {
    const classes = useStyles();
    const servicioContext = useContext(ServicioContext);
    const { servicios, obtenerServicios, mensaje } = servicioContext;
    const agendamientoContext = useContext(AgendamientoContext);
    const { guardarServicio, calcularCostoTotal, costoTotal ,guardarSeleccion} = agendamientoContext;
    // Obtener servicios cuando carga el componente
    useEffect(() => {
        // si hay un error
        obtenerServicios();
        // eslint-disable-next-line
    }, [mensaje]);

    const guardarEnResumen = servicio => {
        let total = costoTotal + servicio.precio;
        calcularCostoTotal(total);
        guardarSeleccion(servicio);
        guardarServicio(servicio);
    }
    // revisar si proyectos tiene contenido
    if (servicios.length === 0) {
        return <p>No hay servicios, comienza creando uno</p>
    }

    return (
        <Fragment>
            <br></br>
            <GridList cellHeight={180} className={classes.gridList}>
                {servicios.map((servicio) => (
                    <Card key={servicio._id}>
                        <Card.Body>
                            <Card.Title>{servicio.nombre}
                                <hr></hr>
                                {`$ ${servicio.precio}`}{'  |  '}
                                <AccessTimeIcon />
                                {servicio.duracion}<br></br>
                                {servicio.tipo}

                            </Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <Button 
                             className="padding-button"
                             variant="primary"
                             size="lg" block
                                onClick={() => guardarEnResumen(servicio)}
                            > Agendar </Button>
                        </Card.Footer>
                    </Card>

                ))}
            </GridList>
       
        </Fragment>
    );
}

export default ListadoServiciosCita;