import React, { Fragment, useContext, useState, useEffect } from "react";
import ReporteContext from "../../context/reportes/reporteContext";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Pdf from "react-to-pdf";
import Alert from "@material-ui/lab/Alert";
import AuthContext from "../../context/autenticacion/authContext";

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
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: 105,
  },
  formControl: {
    minWidth: 200,
  },
  text: {
    fontSize: 14,
    marginTop: -10,
  },
  textFecha: {
    fontSize: 14,
    marginTop: -2,
  },
  textField: {
    marginRight: theme.spacing(1),
    fontSize: 14,
  },
  card: {
    width: 140,
    height: 230,
  },
}));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ref = React.createRef();

const ReporteCitas = () => {
  const classes = useStyles();
  let str;
  let str1;
  let citasEmpleado;
  var today = new Date(),
    hoy =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const reporteContext = useContext(ReporteContext);

  const [modalCitas, setModalCitas] = useState(false);
  const {
    abrirModalCitas,
    generarReporte,
    citas,
    cerrarModalCitas,
    mensaje,
    limpiarReporteCitas,
  } = reporteContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    // si hay un error
    if (abrirModalCitas) {
      setModalCitas(abrirModalCitas);
    }
    // eslint-disable-next-line
  }, [abrirModalCitas]);

  const [rango, guardarRango] = useState({
    fechaInicio: new Date(),
    fechaFinal: new Date(),
  });

  const { fechaInicio, fechaFinal } = rango;

  const onChange = (evento) => {
    const { name, value } = evento.target;
    guardarRango({
      ...rango,
      [name]: value,
    });

    limpiarReporteCitas();
  };

  const consultarEdades = () => {
    generarReporte(rango);
  };

  const cerrarModal = () => {
    cerrarModalCitas(false);
    setModalCitas(false);
    guardarRango({
      fechaInicio: "",
      fechaFinal: "",
    });
  };
  return (
    <Fragment>
      <Modal style={customStyles} isOpen={modalCitas}>
        <ModalHeader>
          <h3>Generar Reporte</h3>
        </ModalHeader>
        <ModalBody>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <InputLabel className={classes.textFecha} id="required-label">
                Fecha Inicial
              </InputLabel>
              <TextField
                required
                id="time"
                type="date"
                value={fechaInicio}
                name="fechaInicio"
                fullWidth
                className={classes.textField}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel className={classes.textFecha} id="required-label">
                Fecha Final
              </InputLabel>
              <TextField
                required
                id="time"
                type="date"
                value={fechaFinal}
                name="fechaFinal"
                fullWidth
                className={classes.textField}
                onChange={onChange}
              />
            </Grid>
          </Grid>

          {mensaje ? <Alert severity="error">{mensaje.msg}</Alert> : null}
          <div ref={ref}>
            {citas.length !== 0 ? (
              <div>
                <span className="text-reportes">Fecha de Reporte: {hoy}</span>
                <Table className="table table-striped responsive">
                  <thead>
                    <tr>
                      <th>Servicio</th>
                      <th>Hora de Inicio</th>
                      <th>Hora de Finalización</th>
                      <th>Costo</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                  {citas ? (
                     citasEmpleado = citas.filter(cita => cita.docEmpleado == usuario.documento),
                     citasEmpleado.map(cita => (
                          str = new Date(cita.horaInicio),
                          str1 = new Date(cita.horaFin),
                          cita.horaInicio = str.toUTCString(),
                          cita.horaFin = str1.toUTCString(),
                           <tr key={cita._id}>
                             <td>{cita.Servicio}</td>
                             <td>{cita.horaInicio}</td>
                             <td>{cita.horaFin}</td>
                             <td>{cita.costo}</td>
                             <td>{cita.Estado}</td>
                          </tr>
                            )))
                            :
                     null}
                  </tbody>
                </Table>
              </div>
            ):null}
          </div>
        </ModalBody>
        <ModalFooter>
          <Pdf targetRef={ref} filename="result.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Generar PDF</button>}
          </Pdf>
          <Button
            className="padding-button"
            onClick={() => consultarEdades()}
            color="primary"
          >
            {" "}
            Consultar
          </Button>
          <Button
            className="padding-button"
            color="danger"
            onClick={() => cerrarModal()}
          >
            {" "}
            Cancelar{" "}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default ReporteCitas;
