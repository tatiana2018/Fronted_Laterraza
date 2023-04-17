import {
    GUARDAR_RESUMEN,
    ELIMINAR_RESUMEN,
    CALCULAR_TOTAL,
    CERRAR_MODAL,
    USUARIO_EXITOSO,
    USUARIO_ERROR,
    GUARDAR_SELECCION,
    REGISTRO_EXITOSO,
    CONSULTA_EXITOSA,
    REGISTRO_ERROR,
    LIMPIAR_STATE,
    LIMPIAR_SELECCION,
    OBTENER_ESTADOS,
    LIMPIAR_RESUMEN,
    VALIDAR_FORMULARIO,
    CONSULTA_ERROR
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case GUARDAR_RESUMEN:
            return {
                ...state,
                servicios: [...state.servicios, action.payload],
                abrirModal: true
            }
        case ELIMINAR_RESUMEN:
            return {
                ...state,
                servicios: state.servicios.filter(servicio => servicio._id !== action.payload),
            }
        case CALCULAR_TOTAL:
            return {
                ...state,
                costoTotal: action.payload
            }
        case CERRAR_MODAL:
            return {
                ...state,
                abrirModal: action.payload,
                mensajeConfirmación: null,
                citas: [],
                modalError: false
            }
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
        case GUARDAR_SELECCION:
            return {
                ...state,
                servicioSeleccionado: action.payload
            }
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensajeConfirmación: action.payload,
                mensaje: null,
                errorformulario: false,
                mensajeError: null,
                servicioSeleccionado: null,
                modalError: false,
                citas: []
            }
        case CONSULTA_EXITOSA:
            return {
                ...state,
                citas: action.payload,
                modalError: false
            }
        case REGISTRO_ERROR:
            return {
                ...state,
                mensajeConfirmación: null,
                modalError: true,
                mensajeError: action.payload,
                citas: []
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                citas: [],
                mensajeConfirmación: null,
                mensajeError: null,
                modalError: false,
                errorformulario: false,
                mensajeDispo: ''
            }
        case LIMPIAR_SELECCION:
            return {
                ...state,
                servicioSeleccionado: state.servicioSeleccionado.filter(servicio => servicio._id !== action.payload),
            }
        case OBTENER_ESTADOS:
            return {
                ...state,
                estados: action.payload
            }
        case LIMPIAR_RESUMEN:
            return {
                servicios: []
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true,
                textoAlert: action.payload
            }
        case CONSULTA_ERROR:
            return {
                ...state,
                mensajeDispo:  action.payload
            }
        default:
            return state;
    }
}