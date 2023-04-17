import React, { Fragment, useContext, useEffect, useState } from 'react';
import ServicioContext from '../../context/servicios/servicioContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

function buscandoFiltro(consult) {
    return function (x) {
        return x.nombre.toLowerCase().includes(consult) || !consult;
    }
}

const ListadoServicios = () => {

    const servicioContext = useContext(ServicioContext);
    /** */
    const { servicios, obtenerServicios, actualizarServicio } = servicioContext;

    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    const [editable, guardarEditable] = useState({
        nombre: '',
        precio: '',
        duracion: '',
        tipo: ''
    })

    const [modalActualizar, setModalActualizar] = useState(false);


    const { consult } = consulta;
    const { nombre, precio, duracion, tipo } = editable;



    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        obtenerServicios();
        // eslint-disable-next-line
    }, []);


    const onChangeBusqueda = e => {

        const { name, value } = e.target;


        guardarConsulta({
            ...consulta,
            [name]: value
        })

    }

    const handleChange = (e) => {
        guardarEditable({
            ...editable,
            [e.target.name]: e.target.value,

        });
    };

    const mostrarModalActualizar = (servicio) => {
        setModalActualizar(true);
        guardarEditable(servicio);

    };

    const cerrarModalActualizar = () => {
        guardarEditable({
            nombre: '',
            precio: '',
            duracion: '',
            tipo: ''
        });
        setModalActualizar(false);
    }

    const editar = servicio => {
        actualizarServicio(servicio);
        setModalActualizar(false);
        alert("Servicio actualizado con éxito");
    }

    const cambiarEstado = servicio => {
        if (servicio.estado === 'Activo') {
            servicio.estado = 'Inactivo';
        } else {
            servicio.estado = 'Activo'
        }
        actualizarServicio(servicio);
    }
    // revisar si proyectos tiene contenido
    if (servicios.length === 0) {
        return <p>No hay servicios, comienza creando uno</p>
    }
    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
                <h1>Listado de Servicios</h1>
                <div className="barraBusqueda">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="textField"
                        name="consult"
                        value={consult}
                        onChange={onChangeBusqueda}
                    />
                </div>
                <br></br>
                <Container>
                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Duración(min)</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicios ? (
                                servicios.filter(buscandoFiltro(consult)).map(servicio => (
                                    <tr>
                                        <td>{servicio.nombre}</td>
                                        <td>{servicio.precio}</td>
                                        <td>{servicio.duracion}</td>
                                        <td>{servicio.tipo}</td>
                                        <td>{servicio.estado}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary padding-button"
                                                onClick={() => mostrarModalActualizar(servicio)}
                                            > <EditIcon /></button>{"  "}
                                              {servicio.estado === 'Activo' ? (
                                                <button
                                                    className="btn btn-success padding-button"
                                                    onClick={() => cambiarEstado(servicio)}
                                                ><AssignmentTurnedInIcon /></button>
                                            ) :
                                                (
                                                    <button
                                                        className="btn btn-danger padding-button"
                                                        onClick={() => cambiarEstado(servicio)}
                                                    > <HighlightOffIcon /> </button>

                                                )}
                                        </td>
                                    </tr>
                                )))
                                :
                                null}
                        </tbody>
                    </Table>
                </Container>
            </div>
            <Modal isOpen={modalActualizar}>
                <ModalHeader>
                    <div><h3>Editar Servicio</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre Servicio"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Precio</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Precio Servicio"
                            name="precio"
                            value={precio}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Duración</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Duración (Min)"
                            name="duracion"
                            value={duracion}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Tipo</label>
                        <input
                            readOnly
                            type="text"
                            className="form-control"
                            placeholder="Tipo"
                            name="tipo"
                            value={tipo}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="padding-button"
                        color="primary"
                        onClick={() => editar(editable)}
                    > Editar
                   </Button>
                    <Button
                        className="padding-button"
                        color="danger"
                        onClick={() => cerrarModalActualizar()}
                    > Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default ListadoServicios;