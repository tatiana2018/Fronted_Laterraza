import React, { useReducer } from 'react';
import insumoContext from './insumoContext';
import insumoReducer from './insumoReducer';

import {

    ERROR,ACTUALIZAR, LIMPIAR
} from '../../types';

import clienteAxios from '../../config/axios';


const InsumoState = props => {

    const initialState = {
       insumos: [],
       mensajeConfirmación: '',
       mensajeError: ''
    }
    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(insumoReducer, initialState);


    // Serie de funciones para el CRUD

    // Edita o modifica los insumos
    const ActualizandoInsumos = async gasto => {
        try {
            const resultado = await clienteAxios.put(`/api/insumos/${gasto.idProducto}`, gasto);
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data
            });
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

    const limpiarMensajes = () => {
        dispatch({
            type: LIMPIAR
        });
    }


    return (
        <insumoContext.Provider
            value={{
                mensajeConfirmación: state.mensajeConfirmación,
                mensajeError: state.mensajeError,
                ActualizandoInsumos,
                limpiarMensajes
            }}
        >
            {props.children}
        </insumoContext.Provider>

    )
}
export default InsumoState;