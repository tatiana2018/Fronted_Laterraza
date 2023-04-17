import React, { useReducer, useState } from "react";
import servicioContext from "./servicioContext";
import servicioReducer from "./servicioReducer";

import {
  FORMULARIO,
  OBTENER,
  AGREGAR,
  ERROR,
  VALIDAR_FORMULARIO,
  ACTUAL,
  ELIMINAR,
  ACTUALIZAR,
  LIMPIAR,
  OBTENER_TIPOS,
} from "../../types";

import clienteAxios from "../../config/axios";

const ServicioState = (props) => {
  const initialState = {
    servicios: [],
    formulario: false,
    errorformulario: false,
    servicio: null,
    mensaje: null,
    servicioSeleccionado: null,
    textoAlert: "",
    tipos: [],
    mensajeConfirmación: "",
  };
  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(servicioReducer, initialState);

  const [editServicio, guardarServicio] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    duracion: "",
    tipo: "",
  });
  // Obtener los servicios
  const obtenerServicios = async () => {
    try {
      const resultado = await clienteAxios.get("/api/servicios");
      dispatch({
        type: OBTENER,
        payload: resultado.data.servicios,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };

  // Agregar nuevo proyecto
  const agregarServicio = async (servicio) => {
    try {
      const resultado = await clienteAxios.post("/api/servicios", servicio);

      // Insertar el servicio en el state
      dispatch({
        type: AGREGAR,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: error.response?.data.msg,
        categoria: "alerta-error",
      };

      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };

  // Selecciona el Proyecto que el usuario dio click
  const guardarServicioSeccionado = (servicio) => {
    dispatch({
      type: ACTUAL,
      payload: servicio,
    });
  };

  // Elimina un servicio
  const eliminarServicio = async (servicioId) => {
    try {
      await clienteAxios.delete(`/api/servicios/${servicioId}`);
      dispatch({
        type: ELIMINAR,
        payload: servicioId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };

  // Edita o modifica un servicio
  const actualizarServicio = async (servicio) => {
    console.log(servicio);
    try {
      const resultado = await clienteAxios.put(
        `/api/servicios/${servicio._id}`,
        servicio
      );
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data.servicio,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };

  // Elimina el servicio seleccionado
  const limpiarServicio = () => {
    dispatch({
      type: LIMPIAR,
    });
  };

  // Valida el formulario por errores
  const mostrarError = (alert) => {
    dispatch({
      type: VALIDAR_FORMULARIO,
      payload: alert,
    });
  };
  // ver formulario registro de productos
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO,
    });
  };

  const obtenerTipos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/tipos-servicios");
      dispatch({
        type: OBTENER_TIPOS,
        payload: resultado.data.tipo,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
      };

      dispatch({
        type: ERROR,
        payload: alerta,
      });
    }
  };

  const limpiarError = () => {
    dispatch({
        type: LIMPIAR
    });
  };

  return (
    <servicioContext.Provider
      value={{
        servicios: state.servicios,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        servicio: state.servicio,
        servicioSeleccionado: state.servicioSeleccionado,
        mensaje: state.mensaje,
        textoAlert: state.textoAlert,
        editServicio: editServicio,
        tipos: state.tipos,
        mensajeConfirmación: state.mensajeConfirmación,
        obtenerServicios,
        agregarServicio,
        mostrarError,
        eliminarServicio,
        guardarServicio,
        actualizarServicio,
        guardarServicioSeccionado,
        limpiarServicio,
        mostrarFormulario,
        obtenerTipos,
        limpiarError,
      }}
    >
      {props.children}
    </servicioContext.Provider>
  );
};
export default ServicioState;
