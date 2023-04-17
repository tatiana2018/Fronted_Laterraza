import React from 'react'
import { Fragment, useEffect, useContext } from 'react';
import Barra from '../../components/layout/Barra';
import Header from '../layout/Header';
import AuthContext from '../../context/autenticacion/authContext';
import CarouselContainer from './CarruselContainer';

const Principal = () => {
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, cerrarSesion, token ,limpiarUsuario} = authContext;
    // Forzar eliminación de datos de usuario autenticado
    useEffect(() => {
        limpiarUsuario();
        if (!token) {
            cerrarSesion();
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado]);
    return (
        <Fragment>
            <Header />
            <Barra />
            <CarouselContainer/>
        </Fragment>
    )
}

export default Principal;
