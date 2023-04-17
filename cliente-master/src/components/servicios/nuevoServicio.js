import React, { Fragment, useState, useContext, useEffect } from 'react';
import ServicioContext from '../../context/servicios/servicioContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuPrincipal from '../inicio/menuPrincipal';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormLabel-root':
        {
            fontSize: 14,
            marginTop: -10

        }
    },
    appBar: {
        position: 'relative',
    },

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControl: {
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 265

    },
    text: {
        fontSize: 14,
        marginTop: -10
    }

}));

const NuevoServicio = () => {
    const classes = useStyles();
    // Obtener el state del formulario
    const servicioContext = useContext(ServicioContext);
    const { errorformulario, agregarServicio, mostrarError,
         limpiarServicio, textoAlert, obtenerTipos, tipos, mensajeConfirmación,limpiarError } = servicioContext;

    // Effect que detecta si hay un servicio seleccionado
    useEffect(() => {

        obtenerTipos();
        // eslint-disable-next-line  
    }, []);

    // State para Servicio
    const [servicio, guardarServicio] = useState({
        nombre: '',
        precio: '',
        duracion: '',
        tipo: ''
    });

    // Extraer nombre de proyecto
    const { nombre, precio, duracion, tipo } = servicio;

    // Lee los contenidos del input
    const onChangeServicio = evento => {
        limpiarError();
        //destructure de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        if (name !== "duracion" && name !== "precio" && name !== "tipo") {
            let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
            for (let i = 0; i <= value.length - 1; i++) {
                let letra = value[i]
                if (!regex.test(letra) || !letra === " ") {
                    return;
                }
            }
        }
        guardarServicio({
            ...servicio,
            [name]: value
        })
    }

    // Cuando el usuario envia un proyecto
    const onSubmitServicio = e => {
        e.preventDefault();
        // Validar  de campos 
        if (nombre === '' || precio === null || duracion === null || tipo === '') {
            return;
        }

        if (precio <= 0 || precio > 500000) {
            mostrarError('El valor debe ser mayor a 0 y menor a 500.000$');
            return;
        }

        if (duracion <= 0 || duracion > 360) {
            mostrarError("Ingrese el tiempo en minutos debe ser masyor a 0 y menor a 6 horas ( 360 min)")
            return;
        }
        // agregar la el servicio al state de servicios
        agregarServicio(servicio);
        // Elimina servicio seleccionado del state
        limpiarServicio();
        // Reiniciar el form
        limpiarForm();
    }

    const limpiarForm = () => {
        guardarServicio({
            nombre: '',
            precio: '',
            duracion: '',
            tipo: ''
        })
    }

    return (
        <Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <MenuPrincipal />
            </AppBar>
            <div className="contenedor-principal">
                <br></br>
                <form
                    onSubmit={onSubmitServicio}
                >
                    <main className={classes.layout}>
                        {errorformulario ?
                            ( <Alert severity="error">{textoAlert}</Alert>  )
                            : null}
                        {mensajeConfirmación ?
                          (<Alert severity="success">{mensajeConfirmación}</Alert>  ) : null}
                        <Paper className={classes.paper}>
                            <div className="campos-obligatorios">
                                <h3>Los campos marcados con * son obligatorios</h3>
                            </div>
                            <h1>Nuevo Servicio</h1>
                            <hr></hr>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="nombre"
                                        name="nombre"
                                        label="Nombre"
                                        value={nombre}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChangeServicio}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="precio"
                                        name="precio"
                                        label="Precio"
                                        value={precio}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChangeServicio}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="duracion"
                                        name="duracion"
                                        label="Duración (Min)"
                                        value={duracion}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChangeServicio}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel className={classes.text} id="required-label">Tipo</InputLabel>
                                        <Select
                                            labelId="required-label"
                                            id="select-required"
                                            value={tipo}
                                            name="tipo"
                                            className={classes.selectEmpty}
                                            fullWidth
                                            onChange={onChangeServicio}
                                        >
                                            {tipos ? (
                                                tipos.map(tipo => (
                                                    <MenuItem
                                                        key={tipo._id}
                                                        value={tipo.nombreTipo}
                                                    >
                                                        {tipo.nombreTipo}
                                                    </MenuItem>
                                                )))
                                                :
                                                null}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <div className={classes.buttons}>
                                <Button className={classes.button}
                                    onClick={() => limpiarForm()}>
                                    Limpiar  </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >Registrar </Button>
                            </div>
                        </Paper>
                    </main>
                </form>
            </div>
        </Fragment>
    );
}

export default NuevoServicio;