import React, { useReducer } from 'react';
import AgendamientoContext from './agendamientoContext';
import AgendamientoReducer from './agendamientoReducer';

import clienteAxios from '../../config/axios';

import {
    GUARDAR_RESUMEN,
    ELIMINAR_RESUMEN,
    CALCULAR_TOTAL,
    CERRAR_MODAL,
    USUARIO_EXITOSO,
    USUARIO_ERROR,
    GUARDAR_SELECCION,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    CONSULTA_EXITOSA,
    CONSULTA_ERROR,
    LIMPIAR_STATE,
    LIMPIAR_SELECCION,
    OBTENER_ESTADOS,
    LIMPIAR_RESUMEN,
    VALIDAR_FORMULARIO
} from '../../types';

const AgendamientoState = props => {
    const initialState = {
        servicios: [],
        mensaje: null,
        costoTotal: 0,
        mensajeConfirmación: '',
        abrirModal: false,
        usuarioConfirmado: null,
        servicioSeleccionado: null,
        citas: [],
        totalDispo: null,
        mensajeError: null,
        modalError: false,
        estados: [],
        textoAlert: '',
        errorformulario: false,
        mensajeDispo: ''
    }

    const [state, dispatch] = useReducer(AgendamientoReducer, initialState);

    // Valida el formulario por errores
    const guardarServicio = servicio => {
        dispatch({
            type: GUARDAR_RESUMEN,
            payload: servicio
        })
    }

    const guardarSeleccion = servicio => {
        dispatch({
            type: GUARDAR_SELECCION,
            payload: servicio
        })
    }

    const eliminarDelResumen = id => {
        dispatch({
            type: ELIMINAR_RESUMEN,
            payload: id
        })

    }

    const calcularCostoTotal = total => {

        dispatch({
            type: CALCULAR_TOTAL,
            payload: total
        })
    }

    const CerrarModal = negativo => {
        dispatch({
            type: CERRAR_MODAL,
            payload: negativo
        })
    }

    const buscarCliente = async documento => {
        try {
            console.log(documento);
            const respuesta = await clienteAxios.get(`/api/validacion-cliente/${documento}`);

            dispatch({
                type: USUARIO_EXITOSO,
                payload: respuesta.data
            });

        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg,
            }

            dispatch({
                type: USUARIO_ERROR,
                payload: alerta
            })
        }
    }

    const guardarAgendamiento = async cita => {
        try {
            console.log(cita);
            const respuesta = await clienteAxios.post('/api/agendar-cita', cita);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg,
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const consultarAgendamiento = async (consulta) => { 
        console.log(consulta);
        try {
            const resultado = await clienteAxios.post('/api/consultar-agendamiento', consulta);
            dispatch({
                type: CONSULTA_EXITOSA,
                payload: resultado.data.result
            })
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg,
            }
         
            dispatch({
                type: CONSULTA_ERROR,
                payload: alerta
            })
        }
    }

    const limpiarAlert = () => {

        dispatch({
            type: LIMPIAR_STATE,
        })
    }

    const eliminarSeleccion = id => {
        dispatch({
            type: LIMPIAR_SELECCION,
            payload: id

        })
    }

    // Obtener los empleados
    const obtenerEstados = async () => {
        try {
            const resultado = await clienteAxios.get('/api/estados');
            dispatch({
                type: OBTENER_ESTADOS,
                payload: resultado.data.estados
            })
        } catch (error) {

        }
    }

    const limpiarStateResumen = () => {
        dispatch({
            type: LIMPIAR_RESUMEN
        })
    }

    // Valida el formulario por errores
    const mostrarError = alert => {
        dispatch({
            type: VALIDAR_FORMULARIO,
            payload: alert
        })
    }

    return (
        <AgendamientoContext.Provider
            value={{
                servicios: state.servicios,
                costoTotal: state.costoTotal,
                abrirModal: state.abrirModal,
                usuarioConfirmado: state.usuarioConfirmado,
                mensaje: state.mensaje,
                eventoExitoso: state.eventoExitoso,
                servicioSeleccionado: state.servicioSeleccionado,
                mensajeConfirmación: state.mensajeConfirmación,
                citas: state.citas,
                totalDispo: state.totalDispo,
                mensajeError: state.mensajeError,
                modalError: state.modalError,
                estados: state.estados,
                textoAlert: state.textoAlert,
                errorformulario: state.errorformulario,
                mensajeDispo: state.mensajeDispo,
                guardarServicio,
                eliminarDelResumen,
                calcularCostoTotal,
                CerrarModal,
                buscarCliente,
                guardarSeleccion,
                guardarAgendamiento,
                consultarAgendamiento,
                limpiarAlert,
                eliminarSeleccion,
                obtenerEstados,
                limpiarStateResumen,
                mostrarError
            }}
        >{props.children}

        </AgendamientoContext.Provider>
    )
}
export default AgendamientoState;
