import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios';
import citaContext from './citaContext';
import citaReducer from './citaReducer';

import {
    ACTUALIZAR,
    OBTENER,
    ERROR,
    ELIMINAR
} from '../../types';

const CitaState = props => {

    const initialState = {
        citas: [],

    }

    const [state, dispatch] = useReducer(citaReducer, initialState);

    // Obtener las citas
    const obtenerCitas = async () => {
        try {
            const resultado = await clienteAxios.get('/api/citas');
            dispatch({
                type: OBTENER,
                payload: resultado.data.citas
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    const eliminacionCita = async idCita => {
        // Elimina una cita
        try {
            await clienteAxios.delete(`/api/citas/${idCita}`);
            dispatch({
                type: ELIMINAR,
                payload: idCita
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }

    }

    const actualizarCita = async cita => {
        try {
            const resultado = await clienteAxios.put(`/api/citas/${cita._id}`, cita);
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data.cita
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    // Obtener las citas
    const obtenerCitasEmpleado = async () => {
        try {
            const resultado = await clienteAxios.get('/api/citas');
            dispatch({
                type: OBTENER,
                payload: resultado.data.citas
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

   

    return (
        <citaContext.Provider
            value={{
                citas: state.citas,
                obtenerCitas,
                eliminacionCita,
                actualizarCita,
                obtenerCitasEmpleado
            }}
        >
            {props.children}
        </citaContext.Provider>

    )


}

export default CitaState;