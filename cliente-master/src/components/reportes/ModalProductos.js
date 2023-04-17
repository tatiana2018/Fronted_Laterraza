import React, { Fragment, useContext, useState, useEffect } from 'react';
import ReporteContext from '../../context/reportes/reporteContext';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Pdf from "react-to-pdf";
import Alert from '@material-ui/lab/Alert';


import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 105

    },
    formControl: {
        minWidth: 200,

    },
    text: {
        fontSize: 14,
        marginTop: -10

    },
    textFecha: {
        fontSize: 14,
        marginTop: -2
    },
    textField: {
        marginRight: theme.spacing(1),
        fontSize: 14,
    },
    card: {
        width: 140,
        height: 230
    }

}));

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const ref = React.createRef();

const ModalProductos = () => {
    let fechaForm;
    const classes = useStyles();
    let total = 0;
    var today = new Date(), hoy = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const reporteContext = useContext(ReporteContext);

    const [modalProductos, setModalProductos] = useState(false);
    const { abrirModalProductos, generarReporteProductos, productos, cerrarModalProductos, mensaje, limpiarReporte } = reporteContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        if (abrirModalProductos) {
            setModalProductos(abrirModalProductos);
        }
        // eslint-disable-next-line
    }, [abrirModalProductos]);

    const consultarProductos = () => {
        generarReporteProductos();
    }

    const cerrarModal = () => {
        cerrarModalProductos(false);
        setModalProductos(false);
        
    }

    return (
        <Fragment>
            <Modal
                style={customStyles}
                isOpen={modalProductos}>
                <ModalHeader>
                    <h3>Generar Reporte</h3>
                </ModalHeader>
                <ModalBody>
                    {mensaje ? (
                        <Alert severity="error">{mensaje.msg}</Alert>
                    ) : null}
                    <div  ref={ref}>
                        {productos.length !== 0 ? (
                            <div>
                                <span className="text-reportes">Fecha de Reporte: {hoy}</span>
                                <Table className="table table-striped responsive">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad Disponible (GR/U)</th>
                                            <th>Precio</th>
                                            <th>Fecha Compra</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productos ? (
                                            productos.map(producto => (
                                                fechaForm = new Date(producto.fechaCompra),
                                                producto.fechaCompra = fechaForm.toDateString(),
                                                total = total + (producto.precio * producto.disponibles),
                                                <tr key={producto._id}>
                                                    <td>{producto.nombre}</td>
                                                    <td>{producto.disponibles}</td>
                                                    <td>{producto.precio}</td>
                                                    <td>{producto.fechaCompra}</td>
                                                </tr>
                                            )))
                                            :
                                            null}
                                    </tbody>
                                </Table>
                            </div>
                        ) : null}

                        {total !== 0 ? (
                            <div>
                                <span className="text-reportes">Total: {total}</span>
                            </div>
                        ) : null}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Pdf
                     className="padding-button pdf-button"
                     color="primary"
                     targetRef={ref} 
                     filename="result.pdf">
                        {({ toPdf }) => <button onClick={toPdf}>Generar PDF</button>}
                    </Pdf>
                    <Button
                      className="padding-button"
                      onClick={() => consultarProductos()}
                      color="primary"
                    > Consultar</Button>
                    <Button
                        className="padding-button"
                        color="danger"
                        onClick={() => cerrarModal()}
                    > Cancelar </Button>
                </ModalFooter>

            </Modal>

        </Fragment>
    );
}

export default ModalProductos;