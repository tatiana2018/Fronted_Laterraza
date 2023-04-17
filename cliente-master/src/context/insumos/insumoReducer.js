import {
  OBTENER_PUNTOS,
  GUARDAR_PUNTAJE,
  LIMPIAR,
  ELIMINAR,
  ACTUALIZAR,
  ERROR
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case OBTENER_PUNTOS:
      return {
        ...state,
        puntos: action.payload,
      };
    case GUARDAR_PUNTAJE:
      return {
        ...state,
        puntaje: action.payload,
      };
    case ELIMINAR:
      return {
        ...state,
        puntos: state.puntos.filter((punto) => punto._id !== action.payload),
      };
    case ACTUALIZAR:
      return {
        ...state,
        mensajeConfirmación: action.payload,
      };
    case LIMPIAR:
      return {
        ...state,
        mensajeConfirmación: '',
        mensajeError: ''
      };
      case ERROR:
        return {
          ...state,
          mensajeError: action.payload
        }
    default:
      return state;
  }
};
