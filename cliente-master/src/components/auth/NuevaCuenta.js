import React, { useState, useContext, useEffect } from 'react';
import { Fragment } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import MenuPrincipal from '../inicio/menuPrincipal';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';


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
    },
    textFecha: {
        fontSize: 14,
        marginTop: -2
    },
    textField: {
        marginRight: theme.spacing(1),
        fontSize: 14,
    },

}));


const NuevaCuenta = (props) => {

    const classes = useStyles();

    // extraer los valores del context
    const authContext = useContext(AuthContext);
    const { registrarUsuario, errorformulario, mostrarError,
        mensajeConfirmación, mensaje, limpiarAlert, usuarioAutenticado } = authContext;

    useEffect(() => {

        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])
    // State para guardar usuario
    const [usuario, guardarUsuario] = useState({
        tipo: '',
        documento: '',
        nombres: '',
        apellidos: '',
        correo: '',
        confirmarCorreo: '',
        telefono: Number,
        fecha: '',
        contraseña: ''

    });

    // extraer de usuario
    const { tipo, documento, nombres, apellidos, correo,
        confirmarCorreo, telefono, fecha } = usuario;

    const onChange = evento => {

        //destructure de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        //no permite escribir numeros en el campo tipo
        if (name !== "telefono" && name !== "documento" && name !== "correo" && name !== "confirmarCorreo"
            && name !== "fecha"
        ) {
            //No permite escribir numeros en los campos de texto
            let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
            for (let i = 0; i <= value.length - 1; i++) {
                let letra = value[i]
                if (!regex.test(letra) || !letra === " ") {
                    return;
                }
            }
        }

        guardarUsuario({
            ...usuario,
            [name]: value
        })

        limpiarAlert();
    }

    // Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if (tipo.trim() === '' || documento.trim() === '' || nombres.trim() === '' || apellidos.trim() === '' ||
            correo.trim() === '' || confirmarCorreo.trim() === '' || telefono.trim() === '') {
            mostrarError();
            return;

        }

        // Los 2 correos son iguales
        if (documento <= 0) {
            mostrarError('INGRESE UN NÚMERO DE DOCUMENTO VALIDO');
            return;
        }


        // Los 2 correos son iguales
        if (correo !== confirmarCorreo) {
            mostrarError('LOS CORREOS NO COINCIDEN');
            return;
        }

        // Pasarlo al action
        registrarUsuario
            ({
                tipo,
                documento,
                nombres,
                apellidos,
                correo,
                telefono,
                fecha
            });

        //limpiar form
        limpiarForm();
    }

    const limpiarForm = () => {
        guardarUsuario({
            tipo: '',
            documento: '',
            nombres: '',
            apellidos: '',
            correo: '',
            confirmarCorreo: '',
            telefono: '',
            fecha: ''
        });

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
                    onSubmit={onSubmit}
                >
                    <main className={classes.layout}>

                        {errorformulario ? (<Alert severity="error">{mensaje}</Alert>) : null}

                        {mensajeConfirmación ? (<Alert severity="success">{mensajeConfirmación}</Alert>) : null}

                        <Paper className={classes.paper}>

                            <div className="campos-obligatorios">
                                <h3>Los campos marcados con * son obligatorios</h3>
                            </div>

                            <h1>Nuevo Cliente</h1>
                            <hr></hr>
                            <br></br>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel className={classes.text} id="required-label">Tipo Documento</InputLabel>
                                        <Select
                                            required
                                            labelId="required-label"
                                            id="select-required"
                                            value={tipo}
                                            name="tipo"
                                            className={classes.selectEmpty}
                                            fullWidth
                                            onChange={onChange}
                                        >
                                            <MenuItem value='CC'>CC</MenuItem>
                                            <MenuItem value='PASAPORTE'>PASAPORTE</MenuItem>
                                            <MenuItem value='TI'>T.I.</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="text"
                                        id="documento"
                                        name="documento"
                                        label="N° Documento"
                                        value={documento}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="nombres"
                                        name="nombres"
                                        label="Nombres"
                                        value={nombres}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="apellidos"
                                        name="apellidos"
                                        label="Apellidos"
                                        value={apellidos}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        label="Correo Electrónico"
                                        value={correo}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="email"
                                        id="confirmarCorreo"
                                        name="confirmarCorreo"
                                        label="Confirmar correo"
                                        value={confirmarCorreo}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        type="number"
                                        id="telefono"
                                        name="telefono"
                                        label="Teléfono"
                                        value={telefono}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>

                                    <InputLabel className={classes.textFecha} id="required-label">Fecha de nacimiento</InputLabel>
                                    <TextField
                                        required
                                        type="date"
                                        id="fecha"
                                        name="fecha"
                                        value={fecha}
                                        className={classes.textField}
                                        fullWidth
                                        onChange={onChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
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

export default NuevaCuenta;