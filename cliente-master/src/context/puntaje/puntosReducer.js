import {
  OBTENER_PUNTOS,
  GUARDAR_PUNTAJE,
  ACTUALIZAR_PUNTOS,
  ELIMINAR,
  LIMPIAR
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

    case ACTUALIZAR_PUNTOS:
      return {
        ...state,
        puntaje: action.payload,
      };
    case ELIMINAR:
      return {
        ...state,
        puntos: state.puntos.filter((punto) => punto._id !== action.payload),
      };
      case LIMPIAR:
        return {
          ...state,
          puntaje: ''
        }
    default:
      return state;
  }
};
