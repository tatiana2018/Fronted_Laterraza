import React, { Fragment, useContext, useState } from 'react';
import Barra from '../layout/Barra';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import ConfiguracionContext from '../../context/cambioContraseña/configuracionContext';


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

const NuevaContraseña = () => {

    const classes = useStyles();

    const configuracionContext = useContext(ConfiguracionContext);

    const { mostrarError, errorformulario, textoAlert,
        usuarioConfirmado, agregarContraseña, mensajeConfirmación } = configuracionContext;


    const [nuevaContraseña, guardarContraseña] = useState({
        idUsuario: '',
        contraseña: '',
        confirmaContraseña: ''
    });


    const { contraseña, confirmaContraseña } = nuevaContraseña;


    // Lee los contenidos del input
    const onChange = evento => {

        //destructure de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;

        guardarContraseña({
            ...nuevaContraseña,
            [name]: value
        })

    }


    const onSubmit = e => {
        e.preventDefault();
        if (contraseña !== confirmaContraseña) {
            mostrarError('Las contraseñas no coinciden');
            return;
        }

        let regex3 = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (!regex3.test(contraseña) || !contraseña === " ") {
            mostrarError('LA CONTRASEÑA DEBE SER MÍNIMO DE 6 CARACTERES, DEBE INCLUIR UN NÚMERO, MAYÚSCULAS, MINÚSCULAS Y UN SÍMBOLO');
            return;
        }

        if (usuarioConfirmado) {
            usuarioConfirmado.contraseña = contraseña;
            agregarContraseña(usuarioConfirmado);
        }
        if (!usuarioConfirmado) {
            mostrarError('Ingrese nuevamente la pregunta y respuesta de seguridad');
        }

        limpiarForm();
    }

    const limpiarForm = () => {
        guardarContraseña({
            idUsuario: '',
            contraseña: '',
            confirmaContraseña: ''
        });

    }

    return (
        <Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <Barra />
            </AppBar>

            <div className="contenedor-principal">
                <br></br>

                <form
                    onSubmit={onSubmit}
                >

                    <main className={classes.layout}>

                        {errorformulario ?
                            (
                                <Alert severity="error">{textoAlert}</Alert>

                            )
                            : null}
                        {mensajeConfirmación ?
                            (
                                <Alert severity="success">{mensajeConfirmación}</Alert>

                            )
                            : null}

                        <Paper className={classes.paper}>

                            <div className="campos-obligatorios">
                                <h3>Los campos marcados con * son obligatorios</h3>
                            </div>

                            <h1>Nueva Contraseña</h1>
                            <hr></hr>
                            <br></br>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="password"
                                        id="contraseña"
                                        name="contraseña"
                                        value={contraseña}
                                        label="Contraseña"
                                        className={classes.root}
                                        onChange={onChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        type="password"
                                        id="confirmaContraseña"
                                        name="confirmaContraseña"
                                        value={confirmaContraseña}
                                        label="Confirmar Contraseña"
                                        className={classes.root}
                                        onChange={onChange}
                                        fullWidth
                                    />
                                </Grid>

                            </Grid>
                            <div className={classes.buttons}>

                                <Button className={classes.button}
                                >
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

export default NuevaContraseña;