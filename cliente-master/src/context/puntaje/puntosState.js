import React, { useReducer } from 'react';
import puntosContext from './puntosContext';
import puntosReducer from './puntosReducer';

import {
    OBTENER_PUNTOS,
    GUARDAR_PUNTAJE,
    ACTUALIZAR_PUNTOS,
    ERROR,
    ELIMINAR,
    LIMPIAR
} from '../../types';

import clienteAxios from '../../config/axios';


const PuntosState = props => {

    const initialState = {
        puntos: [],
        puntaje: ''
    }
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(puntosReducer
    , initialState);


    // Serie de funciones para el CRUD

    const liberacionPuntos = async cita => {
        let calculo = (5 / 100) * cita.costo;

        let puntos = ({
            docCliente: cita.docCliente,
            cantidad: calculo,
            estado: 'Activo'
        });

        try {
            const resultado = await clienteAxios.post('/api/puntos', puntos);

        } catch (error) {

        }

    }

    // Obtener las citas
    const obtenerPuntaje = async () => {
        try {
            const resultado = await clienteAxios.get('/api/puntos');
            dispatch({
                type: OBTENER_PUNTOS,
                payload: resultado.data.puntos
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

    const actualizarPuntos = async puntos => {
        try {
            const resultado = await clienteAxios.put(`/api/puntos/${puntos._id}`, puntos);
             dispatch({
                 type: ACTUALIZAR_PUNTOS,
                payload: resultado.data.puntos
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

    const guardarPuntaje = async puntosCliente => {
        dispatch({
            type: GUARDAR_PUNTAJE,
            payload: puntosCliente
        })
    }

    // Elimina un producto
    const eliminarPuntuacion = async puntosId => {
        try {
            await clienteAxios.delete(`/api/puntos/${puntosId}`);
            dispatch({
                type: ELIMINAR,
                payload: puntosId
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

    const limpiarPuntaje = () => {
        dispatch({
            type: LIMPIAR
        })
    }

    return (
        <puntosContext.Provider
            value={{
                puntos: state.puntos,
                puntaje: state.puntaje,
                liberacionPuntos,
                obtenerPuntaje,
                actualizarPuntos,
                guardarPuntaje,
                eliminarPuntuacion,
                limpiarPuntaje        
            }}
        >
            {props.children}
        </puntosContext.Provider>

    )
}
export default PuntosState;