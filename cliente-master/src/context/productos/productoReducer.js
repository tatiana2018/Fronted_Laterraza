import {
    FORMULARIO,
    OBTENER,
    AGREGAR,
    ERROR,
    VALIDAR_FORMULARIO,
    ACTUAL,
    ELIMINAR,
    ACTUALIZAR,
    LIMPIAR
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER:
            return {
                ...state,
                productos: action.payload
            }
        case AGREGAR:
            return {
                ...state,
                productos: [...state.productos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true,
                textoAlert: action.payload
            }
        case ACTUAL:
            return {
                ...state,
                productoseleccionado: action.payload
            }
        case ELIMINAR:
            return {
                ...state,
                productos: state.productos.filter(producto => producto._id !== action.payload),
                producto: null
            }
        case ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case ACTUALIZAR:
            return {
                ...state,
                productos: state.productos.map(producto => producto._id === action.payload._id ? action.payload : producto)
            }
        case LIMPIAR:
            return {
                ...state,
                productoSeleccionado: null,
                mensaje: null,
                errorformulario: false,
                textoAlert: ""
            }
        default:
            return state;
    }
}