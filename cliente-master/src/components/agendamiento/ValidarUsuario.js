import React, { Fragment, useState, useContext } from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AgendamientoContext from '../../context/agendamiento/agendamientoContext';
import Alert from '@material-ui/lab/Alert';
import { Container } from "reactstrap";

const ValidarUsuario = () => {

    const agendamientoContext = useContext(AgendamientoContext);

    const { buscarCliente, usuarioConfirmado, mensaje } = agendamientoContext;

    const [identificacion, guardarIdentificacion] = useState({ documento: '' });

    const { documento } = identificacion;

    // Lee los contenidos del input
    const onChange = evento => {

        //destructure de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;

        guardarIdentificacion({
            ...identificacion,
            [name]: value
        })

    }

    //funcion onsubmit
    const onSubmit = e => {

        e.preventDefault();

        if (documento <= 0) {
            // mostrarError("Ingrese un documento valido")
            return;
        }
        buscarCliente(identificacion.documento);

        guardarIdentificacion({
            documento: ''
        })
    }

    return (
        <Fragment>
            <form
                onSubmit={onSubmit}
            >
                {mensaje ?  ( <Alert severity="error">{mensaje.msg}</Alert>) : null}
                <div className="contenedor-basico sombra-dark">
                    <div className="flex-med">
                        <button
                            className="btn btn-outline-success mt-0 mr-2 btn-sm padding-button"
                            type="submit"
                        ><AssignmentTurnedInIcon /></button>
                        <div className="barraBusqueda mr-4">
                            <input
                                type="number"
                                placeholder="N° Documento"
                                className="textField"
                                name="documento"
                                value={documento}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <br></br>
                    <Container >
                        {usuarioConfirmado ? ( <h5>{usuarioConfirmado.nombres}</h5>   )   : null}
                    </Container>
                </div>
            </form>
        </Fragment >
    );
}

export default ValidarUsuario;