import React, { useReducer } from 'react';
import reporteContext from './reporteContext';
import reporteReducer from './reporteReducer';

import {
    ABRIR_MODAL,
    AGREGAR,
    ERROR,
    LIMPIAR,
    CERRAR_MODAL,
    ABRIR_MODAL_EDAD,
    CERRAR_MODAL_EDAD,
    AGREGAR_EDADES,
    LIMPIAR_EDADES,
    ABRIR_MODAL_PRODUCTO,
    CERRAR_MODAL_PRODUCTOS,
    OBTENER,
    ABRIR_MODAL_CITAS,
    CERRAR_MODAL_CITAS,
    LIMPIAR_CITAS
} from '../../types';

import clienteAxios from '../../config/axios';


const ReporteState = props => {

    const initialState = {
        citas: [],
        errorformulario: false,
        mensaje: null,
        abrirModalGanancias: false,
        abrirModalEdades: false,
        abrirModalProductos: false,
        abrirModalCitas: false,
        segmentacion: [],
        productos: []
    }
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(reporteReducer, initialState);


    // Serie de funciones para el CRUD
    const generarReporte = async rango => {
        try {
            const resultado = await clienteAxios.post('/api/reportes', rango);
            dispatch({
                type: AGREGAR,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    const generarReporteProductos = async rango => {
        try {
            const resultado = await clienteAxios.post('/api/reporte-productos', rango);
            dispatch({
                type: OBTENER,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    const generarReporteEdades = async rango => {
        try {
            const resultado = await clienteAxios.post('/api/reporte-edades', rango);
            dispatch({
                type: AGREGAR_EDADES,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    const mostrarModalGanancias = () => {
        dispatch({
            type: ABRIR_MODAL
        })

    }

    const mostrarModalEdades = () => {
        dispatch({
            type: ABRIR_MODAL_EDAD
        })
    }

    const mostrarModalProducto = () => {
        dispatch({
            type: ABRIR_MODAL_PRODUCTO
        })
    }

    const mostrarModalCitas = () => {
        dispatch({
            type: ABRIR_MODAL_CITAS
        }) 
    }

    const cerrarModalGanancias = negativo => {
        dispatch({
            type: CERRAR_MODAL,
            payload: negativo
        })
    }

    const cerrarModalEdades = negativo => {
        dispatch({
            type: CERRAR_MODAL_EDAD,
            payload: negativo
        })
    }

    const cerrarModalProductos = negativo => {
        dispatch({
            type: CERRAR_MODAL_PRODUCTOS,
            payload: negativo
        })
    }

    const cerrarModalCitas = negativo => {
        dispatch({
            type: CERRAR_MODAL_CITAS,
            payload: negativo
        })
    }

    const limpiarReporte = () => {
        dispatch({
            type: LIMPIAR
        })
    }

    const limpiarReporteEdades = () => {
        dispatch({
            type: LIMPIAR_EDADES
        })
    }

    const limpiarReporteCitas = () => {
        dispatch({
            type: LIMPIAR_CITAS
        })
    }


    return (
        <reporteContext.Provider
            value={{
                citas: state.citas,
                abrirModalGanancias: state.abrirModalGanancias,
                mensaje: state.mensaje,
                abrirModalEdades: state.abrirModalEdades,
                segmentacion: state.segmentacion,
                abrirModalProductos: state.abrirModalProductos,
                productos: state.productos,
                abrirModalCitas: state.abrirModalCitas,
                generarReporte,
                mostrarModalGanancias,
                cerrarModalGanancias,
                limpiarReporte,
                mostrarModalEdades,
                cerrarModalEdades,
                generarReporteEdades,
                limpiarReporteEdades,
                mostrarModalProducto,
                cerrarModalProductos,
                generarReporteProductos,
                mostrarModalCitas,
                cerrarModalCitas,
                limpiarReporteCitas
            }}
        >
            {props.children}
        </reporteContext.Provider>

    )
}
export default ReporteState;