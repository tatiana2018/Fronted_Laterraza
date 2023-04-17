import {
    FORMULARIO,
    VALIDAR_FORMULARIO,
    AGREGAR,
    REGISTRO_ERROR,
    OBTENER,
    ELIMINAR,
    ACTUAL,
    LIMPIAR,
    ACTUALIZAR,
    DISPONIBLE,
    CAMBIAR,
    LIMPIAR_STATE
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO:
            return {
                ...state,
                formulario: true
            }

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true,
                mensaje: action.payload
            }
        case CAMBIAR:
            return {
                ...state,
                caso: action.payload
            }

        case AGREGAR:
            return {
                ...state,
                formulario: false,
                errorformulario: false,
                mensajeConfirmación:  action.payload
            }
        case OBTENER:
            return {
                ...state,
                empleados: action.payload
            }
        case ACTUAL:
            return {
                ...state,
                empleadoSeleccionado: action.payload
            }
        case DISPONIBLE:
            return {
                ...state,
                empleadoDisponible: action.payload
            }

        case ELIMINAR:
            return {
                ...state,
                empleados: state.empleados.filter(empleado => empleado._id !== action.payload),
                empleado: null
            }
        case ACTUALIZAR:
            return {
                ...state,
                empleados: state.empleados.map(empleado => empleado._id === action.payload._id ? action.payload : empleado)
            }
        case LIMPIAR:
            return {
                ...state,
                empleadoSeleccionado: null
            }
        case REGISTRO_ERROR:
            return {
                ...state,
                errorformulario: true,
                mensaje: action.payload
            }
        case LIMPIAR_STATE:
            return {
                errorformulario: false,
                mensaje: null
            }

        default:
            return state;
    }
}