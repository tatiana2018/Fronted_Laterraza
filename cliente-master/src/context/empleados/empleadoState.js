import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios';
import empleadoReducer from './empleadoReducer';
import empleadoContext from './empleadoContext';

import {
    FORMULARIO,
    VALIDAR_FORMULARIO,
    AGREGAR,
    ERROR,
    ELIMINAR,
    OBTENER,
    ACTUAL,
    LIMPIAR,
    ACTUALIZAR,
    CAMBIAR,
    REGISTRO_ERROR,
    LIMPIAR_STATE
} from '../../types';




const EmpleadoSatate = props => {

    const initialState = {

        empleados: [],
        formulario: false,
        errorformulario: false,
        empleado: null,
        mensaje: null,
        empleadoSeleccionado: null,
        textoAlert:'',
        mensajeConfirmación: '',
    }

    const tipoEmpleado = [
        { nombre: 'Manicurista' },
        { nombre: 'Maquilladora' }
    ]

    // Dispatch para ejecutar las acciones del reducer
    const [state, dispatch] = useReducer(empleadoReducer, initialState);

    // ver formulario registro de empleados
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO
        })
    }

    // Valida el formulario por errores
    const mostrarError = alert => {
        const alerta = {
            msg: alert
        }

        dispatch({
            type: VALIDAR_FORMULARIO,
            payload: alerta
        })
    }

    //guardar nuevo empleado peticion al api
    const agregarEmpleado = async empleado => {
        
        try {
            const resultado = await clienteAxios.post('/api/empleados', empleado);


            // Insertar el empleado en el state
            dispatch({
                type: AGREGAR,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: error.response?.data.msg,
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Obtener los empleados
    const obtenerEmpleados = async () => {
        try {
            const resultado = await clienteAxios.get('/api/empleados');
            dispatch({
                type: OBTENER,
                payload: resultado.data.empleados
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }

            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    // Elimina un empleado
    const eliminarEmpleado = async empleadoId => {
        try {
            await clienteAxios.delete(`/api/empleados/${empleadoId}`);
            dispatch({
                type: ELIMINAR,
                payload: empleadoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            })
        }
    }

    // Guarda el empleado que el usuario dio click para editar
    const guardarEmpleadoSeccionado = empleado => {
        dispatch({
            type: ACTUAL,
            payload: empleado
        })
    }


    //limpia el empleado seleccionado
    const limpiarEmpleado = () => {
        dispatch({
            type: LIMPIAR
        })
    }


    // Edita o modifica un servicio
    const actualizarEmpleado = async empleado => {

        try {
            const resultado = await clienteAxios.put(`/api/empleados/${empleado._id}`, empleado);
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data.empleado
            })
        } catch (error) {
        }
    }

    const cambiarCaso = caso => {
        dispatch({
            type: CAMBIAR,
            payload:caso
        })
    }

    const limpiarAlert = () => {

        dispatch({
            type: LIMPIAR_STATE,
        })
    }

    return (
        <empleadoContext.Provider
            value={{
                empleados: state.empleados,
                formulario: state.formulario,
                formulario_cita: state.formulario_cita,
                errorformulario: state.errorformulario,
                empleadoSeleccionado: state.empleadoSeleccionado,
                mensajeConfirmación: state.mensajeConfirmación,
                mensaje: state.mensaje,
                caso: state.caso,
                mostrarFormulario,
                mostrarError,
                agregarEmpleado,
                obtenerEmpleados,
                eliminarEmpleado,
                guardarEmpleadoSeccionado,
                limpiarEmpleado,
                actualizarEmpleado,
                tipoEmpleado,
                cambiarCaso,
                limpiarAlert
            }}
        >
            {props.children}
        </empleadoContext.Provider>

    )
}

export default EmpleadoSatate;