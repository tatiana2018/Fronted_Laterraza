import React, { useContext, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../../context/autenticacion/authContext';

const MenuPrincipal = () => {
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario } = authContext;
    useEffect(() => {
        // usuarioAutenticado();
        // eslint-disable-next-line
    }, []);
    return (
        <Fragment>
            <header>
                <nav className="navegacion">
                    <ul className="menu">
                        <li><a href="/inicio">Inicio</a></li>
                        {usuario?.rol == '60f4ba1618bcb70ffca87c9c' ? (
                            <li><a href="/productos">Productos</a>
                                <ul className="submenu">
                                    <li><a href="/productos">Lista de Productos</a></li>
                                    <li><a href="/nuevo-producto">Crear Producto</a></li>
                                </ul>
                            </li>
                        ) : null}

                        {usuario?.rol == '60f4ba1618bcb70ffca87c9c' ? (
                            <li><a href="/servicios">Servicios</a>
                                <ul className="submenu">
                                    <li><a href="/servicios">Lista de Servicios</a></li>
                                    <li><a href="/nuevo-servicio">Crear Servicio</a></li>
                                </ul>
                            </li>
                        ) : null}

                        {usuario?.rol == '60f4ba1618bcb70ffca87c9c' ? (
                            <li><a href="/empleados">Colaboradores</a>
                                <ul className="submenu">
                                    <li><a href="/empleados">Lista de Colaboradores</a></li>
                                    <li><a href="/nuevo-empleado">Crear Colaborador</a></li>
                                </ul>
                            </li>
                        ) : null}

                        {usuario?.rol == '60f4ba1618bcb70ffca87c9c' ? (
                            <li><a href="/clientes">Clientes</a>
                                <ul className="submenu">
                                    <li><a href="/clientes">Lista de Clientes</a></li>
                                    <li><a href="/nuevo-cliente">Crear Cliente</a></li>
                                    <li><a href="/puntos">Puntajes</a></li>

                                </ul>
                            </li>
                        ) : null}

                        {usuario?.rol == '60f4ba1618bcb70ffca87c9c' ? (
                            <li><a href="/agendamiento">Agendamiento</a>
                                <ul className="submenu">
                                    <li><a href="/citas">Lista de Citas</a></li>
                                    <li><a href="/agendamiento">Agendar Cita</a></li>
                                </ul>
                            </li>
                        ) :
                            <li><a href="/citas">Agendamiento</a>
                                <ul className="submenu">
                                    <li><a href="/citas">Lista de Citas</a></li>
                                </ul>
                            </li>
                        }
                           <li><a href="/reportes">Reportes</a></li>
                    </ul>
                </nav>
            </header>
        </Fragment>
    );
}

export default MenuPrincipal;