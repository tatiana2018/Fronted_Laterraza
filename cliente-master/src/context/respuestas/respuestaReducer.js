import {
    AGREGAR,
    ERROR,
    LIMPIAR
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case AGREGAR:
            return {
                ...state,
                mensajeConfirmacion:  action.payload
            }
        case ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR:
            return {
                ...state,
                mensaje: null,
                mensajeConfirmacion: ''
            }

        default:
            return state;
    }
}