import {
    USUARIO_ERROR,
    USUARIO_EXITOSO,
    VALIDAR_FORMULARIO,
    AGREGAR
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case USUARIO_EXITOSO:
            return {
                ...state,
                usuarioConfirmado: action.payload,
                mensaje: null,
                errorformulario: false
            }
        case USUARIO_ERROR:
            return {
                ...state,
                usuarioConfirmado: null,
                mensaje: action.payload,
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true,
                textoAlert: action.payload
            }
        case AGREGAR:
            return {
                ...state,
                mensajeConfirmación: [...state.mensajeConfirmación, action.payload],
                formulario: false,
                errorformulario: false
            }
        default:
            return state;
    }
}