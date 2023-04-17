import React, { useContext, useEffect, useState, Fragment } from 'react';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
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
        return x.documento.includes(consult) || !consult;
    }
}

const ListadoEmpleados = () => {
    let fechaForm;
    //instanciar context de empleado
    const empleadoContext = useContext(EmpleadoContext);
    const alertaContext = useContext(AlertaContext);

    //extraer objetos y funciones del state de empleados
    const { empleados, mensaje, obtenerEmpleados, actualizarEmpleado } = empleadoContext;
    const { mostrarAlerta } = alertaContext;


    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    const [editable, guardarEditable] = useState({
        tipo: '',
        documento: '',
        nombres: '',
        apellidos: '',
        correo: '',
        confirmarCorreo: '',
        telefono: '',
        fecha: '',
        perfil: '',

    })

    const [modalActualizar, setModalActualizar] = useState(false);

    const { consult } = consulta;

    const { tipo, documento, nombres, apellidos, correo, telefono,
        perfil } = editable;

    useEffect(() => {
        // si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerEmpleados();
        // eslint-disable-next-line
    }, [mensaje]);

    const onChangeBusqueda = e => {
        const { name, value } = e.target;
        guardarConsulta({
            ...consulta,
            [name]: value
        })

    }

    const mostrarModalActualizar = (producto) => {
        setModalActualizar(true);
        guardarEditable(producto);

    };

    const cerrarModalActualizar = () => {
        guardarEditable({
            tipo: '',
            documento: '',
            nombres: '',
            apellidos: '',
            correo: '',
            confirmarCorreo: '',
            telefono: '',
            fecha: '',
            perfil: '',
        });
        setModalActualizar(false);
    }

    const handleChange = (e) => {
        guardarEditable({
            ...editable,
            [e.target.name]: e.target.value,

        });
    };
    const editar = empleado => {
        actualizarEmpleado(empleado);
        setModalActualizar(false);
        alert("Empleado actualizado con éxito");
    }

    const cambiarEstado = empleado => {
        if (empleado.estado === 'Activo') {
            empleado.estado = 'Inactivo';
        } else {
            empleado.estado = 'Activo'
        }
        actualizarEmpleado(empleado);
    }

    // revisar si hay empleados registrados
    if (empleados.length === 0) {
        return <p>No hay empleados, comienza creando uno</p>
    }
    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
                <h1>Listado de Colaboradores</h1>
                <div className="barraBusqueda">
                    <input
                        type="number"
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
                                <th>Tipo Doc.</th>
                                <th>N° de documento</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Correo Electrónico</th>
                                <th>Teléfono</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Perfil</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados ? (
                                empleados.filter(buscandoFiltro(consult)).map(empleado => (   
                                    fechaForm = new Date(empleado.fecha),
                                    empleado.fecha = fechaForm.toUTCString(),
                                    <tr key={empleado._id}>
                                        <td>{empleado.tipo}</td>
                                        <td>{empleado.documento}</td>
                                        <td>{empleado.nombres}</td>
                                        <td>{empleado.apellidos}</td>
                                        <td>{empleado.correo}</td>
                                        <td>{empleado.telefono}</td>
                                        <td>{empleado.fecha}</td>
                                        <td>{empleado.perfil}</td>
                                        <td>{empleado.estado}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary padding-button"
                                                onClick={() => mostrarModalActualizar(empleado)}
                                            > <EditIcon /></button>{"  "}
                                              {empleado.estado === 'Activo' ? (
                                                <button
                                                    className="btn btn-success padding-button"
                                                    onClick={() => cambiarEstado(empleado)}
                                                ><AssignmentTurnedInIcon /></button>
                                            ) :
                                                (
                                                    <button
                                                        className="btn btn-danger padding-button"
                                                        onClick={() => cambiarEstado(empleado)}
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
                    <div><h3>Editar Empleado</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label htmlFor="tipo">Tipo Documento</label>
                        <input
                            type="text"
                            id="tipo"
                            name="tipo"
                            className="form-control"
                            placeholder="Tipo de Documento"
                            value={tipo}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="documento">N° Documento</label>
                        <input
                            type="number"
                            id="documento"
                            name="documento"
                            className="form-control"
                            placeholder="Número de Doc."
                            value={documento}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="nombres">Nombres</label>
                        <input
                            type="text"
                            id="nombres"
                            name="nombres"
                            className="form-control"
                            placeholder="Tu nombre"
                            value={nombres}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            className="form-control"
                            placeholder="Tus apellidos"
                            value={apellidos}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            className="form-control"
                            placeholder="Tu Correo Electrónico"
                            value={correo}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="number"
                            id="telefono"
                            name="telefono"
                            className="form-control"
                            placeholder="Tu Teléfono"
                            value={telefono}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="password">Perfil</label>
                        <input
                            type="text"
                            id="perfil"
                            name="perfil"
                            className="form-control"
                            placeholder="Perfil del empleado"
                            value={perfil}
                            onChange={handleChange}
                        >
                        </input>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        className="padding-button"
                        color="primary"
                        onClick={() => editar(editable)}
                    > Editar </Button>

                    <Button
                        className="padding-button"
                        color="danger"
                        onClick={() => cerrarModalActualizar()}
                    > Cancelar </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default ListadoEmpleados;