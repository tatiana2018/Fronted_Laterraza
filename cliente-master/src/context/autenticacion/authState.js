import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    VALIDAR_FORMULARIO,
    CERRAR_SESION_LOG,
    LIMPIAR_STATE,
    LIMPIAR
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        errorformulario: false,
        usuario: null,
        mensaje: null,
        cargando: true,
        textoAlert: '',
        mensajeConfirmación: '',
        mensajeError: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response?.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
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

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    const limpiarAlert = () => {
        dispatch({
            type: LIMPIAR_STATE,
        })
    }

    const limpiarUsuario = ()=> {
        dispatch({
            type: LIMPIAR
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                errorformulario: state.errorformulario,
                textoAlert: state.textoAlert,
                mensajeConfirmación: state.mensajeConfirmación,
                mensajeError: state.mensajeError,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion,
                mostrarError,
                limpiarAlert,
                limpiarUsuario
            }}
        >{props.children}

        </AuthContext.Provider>
    )
}
export default AuthState;
