import React, { Fragment, useContext, useState } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import RespuestaContext from '../../context/respuestas/respuestaContext';
import Grid from '@material-ui/core/Grid';
import MenuPrincipal from '../inicio/menuPrincipal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Header from '../layout/Header';
import AppBar from '@material-ui/core/AppBar';
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
        width: 265,

    },

    text: {
        fontSize: 14,
        marginTop: -10
    },

}));


const NuevaRespuesta = () => {
    const classes = useStyles();

    //obtener el state y todas sus funciones
    const authContext = useContext(AuthContext);

    const respuestaContext = useContext(RespuestaContext);

    //extraer objetos del state
    const { usuario } = authContext;

    const { agregarRespuesta, mensaje,mensajeConfirmacion,limpiarMensajes } = respuestaContext;
    const [respuesta, guardarRespuesta] = useState({
        idPregunta: '',
        idUsuario: '',
        responde: ''
    });

    const { idPregunta, responde } = respuesta;
    const onChange = e => {
        const { name, value } = e.target;
        guardarRespuesta({
            ...respuesta,
            [name]: value
        })
        limpiarMensajes();

    }
    //funcion onsubmit
    const onSubmit = e => {
        e.preventDefault();
        respuesta.idUsuario = usuario._id;
        agregarRespuesta(respuesta);
        limpiarForm();
    }

    const limpiarForm = () => {
        guardarRespuesta({
            idPregunta: '',
            idUsuario: '',
            responde: ''

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
                        {mensaje ? (<Alert severity="error">{mensaje.msg}</Alert>) : null}
                        {mensajeConfirmacion ? (<Alert severity="success">{mensajeConfirmacion}</Alert>) : null}

                        <Paper className={classes.paper}>
                            <div className="campos-obligatorios">
                                <h3>Los campos marcados con * son obligatorios</h3>
                            </div>
                            <h1>Registrar Pregunta</h1>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel className={classes.text} id="required-label">Pregunta</InputLabel>
                                        <Select
                                            required
                                            labelId="required-label"
                                            id="demo-simple-select-required"
                                            name="idPregunta"
                                            value={idPregunta}
                                            className={classes.selectEmpty}
                                            onChange={onChange}
                                        >
                                            <MenuItem value={1}>¿Cómo se llama tu abuelo paterno?</MenuItem>
                                            <MenuItem value={2}>¿Cuál fue tu primera escuela primaria?</MenuItem>
                                            <MenuItem value={3}>¿Cuál es tu cantante favorito?</MenuItem>
                                            <MenuItem value={4}>¿Cuál es el nombre de tu equipo deportivo favorito?</MenuItem>
                                            <MenuItem value={5}>¿Cómo se llama tu sobrina mayor?</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="responde"
                                        name="responde"
                                        label="Tu respuesta"
                                        value={responde}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}
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
        </Fragment >
    );
}

export default NuevaRespuesta;
