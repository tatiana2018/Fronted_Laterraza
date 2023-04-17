import React, { Fragment, useState, useContext, useEffect} from 'react';
import Header from '../layout/Header';
import ConfiguracionContext from '../../context/cambioContraseña/configuracionContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Barra from '../layout/Barra';



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
    link: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        display: 'flex',
        justifyContent: 'flex-start',
    }

}));


const ValidarPregunta = (props)  => {

    const classes = useStyles();


    const configuracionContext = useContext(ConfiguracionContext);


    const { validarRegistro, usuarioConfirmado, mensaje } = configuracionContext;

    useEffect(() => {

        if (usuarioConfirmado) {
            props.history.push('/nueva-contraseña');
        }
        // eslint-disable-next-line
    }, [usuarioConfirmado,props.history]);
    
    const [validacion, guardarValidacion] = useState({
        documento: '',
        idPregunta: '',
        responde: ''
    });

    const { documento, idPregunta, responde } = validacion;

    const onChange = e => {
        const { name, value } = e.target;


        guardarValidacion({
            ...validacion,
            [name]: value
        })

    }

    //funcion onsubmit
    const onSubmit = e => {

        e.preventDefault();

        validarRegistro(validacion);

        limpiarForm();

    }



    const limpiarForm = () => {
        guardarValidacion({
            documento: '',
            idPregunta: '',
            responde: ''

        });

    }




    return (

        <Fragment>
            <Header />
            <Barra />

            <div className="contenedor-principal">
                <br></br>


                <form
                    onSubmit={onSubmit}
                >
                    <main className={classes.layout}>
                        {mensaje ? (  <Alert severity="error">{mensaje.msg}</Alert>  ) : null}
                        <Paper className={classes.paper}>
                            <div className="campos-obligatorios">
                                <h3>Los campos marcados con * son obligatorios</h3>
                            </div>
                            <h1>Valide su Identidad</h1>
                            <hr></hr>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="documento"
                                        type="number"
                                        name="documento"
                                        value={documento}
                                        label="N° de Documento"
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}

                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel className={classes.text} id="required-label">Pregunta de Seguridad</InputLabel>
                                        <Select
                                            labelId="required-label"
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
                                        value={responde}
                                        label="Tu respuesta"
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChange}
                                    />
                                </Grid>
                            </Grid>
                            <div className={classes.buttons}>
                                <Button
                                    className={classes.button}
                                    href="/iniciar-sesion"
                                > Atrás </Button>
                                <Button
                                    className={classes.button}
                                > Limpiar  </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >Siguiente</Button>
                            </div>
                        </Paper>
                    </main>
                </form>
            </div>
        </Fragment>
    );
}

export default ValidarPregunta;