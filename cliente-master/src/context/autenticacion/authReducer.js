import {
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    VALIDAR_FORMULARIO,
    LIMPIAR_STATE,
    LIMPIAR
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false,
                errorformulario: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true,
                mensaje: action.payload
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                token: null,
                usuario: null,
                autenticado: false,
                mensajeError: action.payload,
                cargando: false,
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                errorformulario: false,
                textoAlert: '',
                mensajeConfirmación: '',
                mensaje: null
            }
       case LIMPIAR:
                return {
                    token: null,
                    usuario: null,
                    autenticado: false,
                    mensaje: action.payload,
                    cargando: false                }
        default:
            return state;
    }
}