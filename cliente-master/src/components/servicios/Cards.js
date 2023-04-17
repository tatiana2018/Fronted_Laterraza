import React, { Fragment, useContext, useEffect} from 'react';
import Card from './Card';
import ServicioContext from '../../context/servicios/servicioContext';

function Cards(){

    const servicioContext = useContext(ServicioContext);
    const { servicios, obtenerServicios } = servicioContext;
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        obtenerServicios();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="contenedor d-flex">
            <div className="row">
                {
                    servicios.map(servicio=>(
                        <div className="col-md-4" key={servicio._id}>
                            <Card title={servicio.nombre} text={`$ ${servicio.precio}`}
                            time={`${servicio.duracion} `} url={servicio.url}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Cards