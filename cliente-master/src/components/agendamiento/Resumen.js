import React, { useContext } from 'react';
import AgendamientoContext from '../../context/agendamiento/agendamientoContext';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';

import {
  Table,
  Container
} from "reactstrap";


const Resumen = () => {
  const agendamientoContext = useContext(AgendamientoContext);

  const { servicios, eliminarDelResumen, costoTotal, calcularCostoTotal,limpiarStateResumen } = agendamientoContext;

  const eliminarServicio = servicio => {
    eliminarDelResumen(servicio._id);
    let total = costoTotal - servicio.precio;
    calcularCostoTotal(total);

  }

  const limpiarResumen = () => {
    
    limpiarStateResumen();
  }

  // revisar si proyectos tiene contenido
  if (servicios.length === 0) {
    return <p>No hay servicios, comienza seleccionando uno</p>
  }


  return (
    <div >
      <h2>Resumen</h2>

      <Container>
        <Table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Duración(min)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios ? (
              servicios.map(servicio => (
                <tr key={servicio._id}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.precio}</td>
                  <td>{servicio.duracion}</td>
                  <td>
                    <button
                      onClick={() => eliminarServicio(servicio)}
                    > <BackspaceOutlinedIcon /> </button>
                  </td>
                </tr>
              )))
              :
              null}
          </tbody>
        </Table>
        <h3>Precio Total:{`$ ${costoTotal}`}</h3>
        <button
          onClick={() => limpiarResumen()}
          className="btn btn-success derecha"
        >Finalizar</button>
      </Container>
    </div>

  );
}

export default Resumen;