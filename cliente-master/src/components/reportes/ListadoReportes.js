import React, { useContext, Fragment } from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ReporteContext from '../../context/reportes/reporteContext';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BrushIcon from '@material-ui/icons/Brush';
import AuthContext from '../../context/autenticacion/authContext';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

const ListadoReportes = () => {
    const reporteContext = useContext(ReporteContext);
    const { mostrarModalGanancias, mostrarModalEdades ,mostrarModalProducto,mostrarModalCitas} = reporteContext;
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario } = authContext;
    const mostrarModal = () => {
        mostrarModalGanancias();
    }
    const mostrarModalEdad = () => {
        mostrarModalEdades();
    }
    const mostrarModalProductos = () => {
        mostrarModalProducto();
    }

    const mostrarModalCita = ()=> {
        mostrarModalCitas();
    }

    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
            {usuario?.rol == "60f4ba1618bcb70ffca87c9c"? (
                <div className="row">
                       <div className="col-md-4" >
                            <div className="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                                <div className="mr-4 flex-shrink-0 ">
                                    <button className="item-report" onClick={() => mostrarModal()}><MonetizationOnIcon /></button>
                                </div> <div className="text-muted">Ganancias</div>
                            </div>
                        </div>,
                      <div className="col-md-4" >
                        <div className="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                            <div className="mr-4 flex-shrink-0 text-center" >
                                <button className="item-report" onClick={() => mostrarModalEdad()}><PeopleAltIcon /></button>
                            </div> <div className="text-muted">Publico</div>
                        </div>
                      </div>,
                      <div className="col-md-3" >
                       <div className="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                          <div className="mr-4 flex-shrink-0 text-center" >
                          <button className="item-report" onClick={() => mostrarModalProductos()}><BrushIcon/></button>
                          </div> <div className="text-muted">Productos</div>
                       </div>
                      </div>
                </div>
                ): null}
                {usuario?.rol !== "60f4ba1618bcb70ffca87c9c"? (
                   <div className="row">
                     <div className="col-md-3">
                     </div>
                        <div className="col-md-4">
                            <div className="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                                <div className="mr-4 flex-shrink-0 ">
                                    <button className="item-report" onClick={() => mostrarModal()}><MonetizationOnIcon /></button>
                                </div> <div className="text-muted">Ganancias</div>
                            </div>
                        </div>,
                         <div className="col-md-4" >
                           <div className="d-flex flex-grow-1 align-items-center bg-hover-light p-4 rounded">
                              <div className="mr-4 flex-shrink-0 text-center" >
                              <button className="item-report" onClick={() => mostrarModalCita()}><EventAvailableIcon/></button>
                              </div> <div className="text-muted">Citas</div>
                           </div>
                       </div>
                       <div className="col-md-1">
                       </div>
                    </div>
                ): null}
            </div>
        </Fragment>
    );
}

export default ListadoReportes;