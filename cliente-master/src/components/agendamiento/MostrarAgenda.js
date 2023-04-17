import React from 'react';
import { Fragment, useContext } from 'react';
import AgendamientoContext from '../../context/agendamiento/agendamientoContext';
import Alert from '@material-ui/lab/Alert';
import {
    Table
} from "reactstrap";

const MostrarAgenda = () => {
    const agendamientoContext = useContext(AgendamientoContext);

    const { citas, mensajeDispo } = agendamientoContext;

   
    if (citas.length === 0 && mensajeDispo === '' ) {
        return <p></p>
    }

    if (mensajeDispo !== '') {
        return <Alert severity="success">{mensajeDispo?.msg}</Alert>
    }


    let str;
    let str1;

    return (
        <Fragment>

            <h2>Citas Agendadas</h2>
            <Table className="table table-striped">
                <thead>
                    <tr>
                        <th>Inicia</th>
                        <th>Finaliza</th>
                    </tr>
                </thead>
                <tbody>
                    {citas ? (
                        citas.map((cita) => (
                            str = new Date(cita.horaInicio) ,
                            str1 = new Date (cita.horaFin),

                            cita.horaInicio = str.toUTCString(),
                            cita.horaFin = str1.toUTCString(),

                            < tr key={cita._id} >
                                <td>{cita.horaInicio}</td>
                                <td>{cita.horaFin}</td>
                            </tr>
                        ))

                    ) : null}
                </tbody>
            </Table>
        </Fragment >
    );
}

export default MostrarAgenda;