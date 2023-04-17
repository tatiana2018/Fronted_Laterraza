import React, { useReducer } from "react";
import productoContext from "./productoContext";
import productoReducer from "./productoReducer";

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
} from "../../types";

import clienteAxios from "../../config/axios";

const ProductoState = (props) => {
  const initialState = {
    productos: [],
    formulario: false,
    errorformulario: false,
    producto: null,
    mensaje: null,
    productoSeleccionado: null,
    textoAlert: "",
  };
  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(productoReducer, initialState);

  // Serie de funciones para el CRUD

  // Obtener los productos
  const obtenerProductos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/productos");
      dispatch({
        type: OBTENER,
        payload: resultado.data.productos,
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
  const agregarProducto = async (producto) => {
    try {
      const resultado = await clienteAxios.post("/api/productos", producto);

      // Insertar el producto en el state
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

  // Valida el formulario por errores
  const mostrarError = (alert) => {
    dispatch({
      type: VALIDAR_FORMULARIO,
      payload: alert,
    });
  };

  const guardarProductoSeccionado = (producto) => {
    dispatch({
      type: ACTUAL,
      payload: producto,
    });
  };

  // Elimina un producto
  const eliminarProducto = async (productoId) => {
    try {
      await clienteAxios.delete(`/api/productos/${productoId}`);
      dispatch({
        type: ELIMINAR,
        payload: productoId,
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

  // Edita o modifica un producto
  const actualizarProducto = async (producto) => {
    console.log(producto);
    try {
      const resultado = await clienteAxios.put( `/api/productos/${producto._id}`, producto );
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data.producto,
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

  // Elimina el producto seleccionado
  const limpiarProducto = () => {
    dispatch({
      type: LIMPIAR,
    });
  };

  // ver formulario registro de productos
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO,
    });
  };

  const limpiarError = ()=> {
    dispatch({
        type: LIMPIAR
    })
  }
  return (
    <productoContext.Provider
      value={{
        productos: state.productos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        producto: state.producto,
        productoSeleccionado: state.productoSeleccionado,
        mensaje: state.mensaje,
        textoAlert: state.textoAlert,
        obtenerProductos,
        agregarProducto,
        mostrarError,
        eliminarProducto,
        actualizarProducto,
        guardarProductoSeccionado,
        limpiarProducto,
        mostrarFormulario,
        limpiarError
      }}
    >
      {props.children}
    </productoContext.Provider>
  );
};
export default ProductoState;
