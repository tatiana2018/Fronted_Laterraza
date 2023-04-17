import React, { useReducer } from 'react';
import ConfiguracionContext from './configuracionContext';
import ConfiguracionReducer from './configuracionReducer';

import clienteAxios from '../../config/axios';

import {
    USUARIO_ERROR,
    USUARIO_EXITOSO,
    VALIDAR_FORMULARIO,
    AGREGAR,
    ERROR
} from '../../types';

const ConfiguracionState = props => {
    const initialState = {
        errorformulario: false,
        mensaje: null,
        usuarioConfirmado: null,
        textoAlert: '',
        mensajeConfirmación: '',
    }

    const [state, dispatch] = useReducer(ConfiguracionReducer, initialState);


    const validarRegistro = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/validacion', datos);
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


    // Valida el formulario por errores
    const mostrarError = alert => {
        dispatch({
            type: VALIDAR_FORMULARIO,
            payload: alert
        })
    }

    // Guardar nueva contraseña
    const agregarContraseña = async usuario => {
        console.log(usuario);
        try {
            const resultado = await clienteAxios.put(`/api/contrasena/${usuario._id}`, usuario);

            // Guarda resultado en el state
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


    return (
        <ConfiguracionContext.Provider
            value={{
                mensaje: state.mensaje,
                errorformulario: state.errorformulario,
                usuarioConfirmado: state.usuarioConfirmado,
                textoAlert: state.textoAlert,
                mensajeConfirmación: state.mensajeConfirmación,
                validarRegistro,
                mostrarError,
                agregarContraseña
            }}
        >{props.children}

        </ConfiguracionContext.Provider>
    )
}
export default ConfiguracionState;
