import React, { useState, useContext, useEffect } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';
import Barra from '../layout/Barra';
import Header from '../layout/Header';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="https://material-ui.com/">
                La Terraza de Frida
        </Link>{' '}
            {new Date().getFullYear()}

            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormLabel-root':
        {
            fontSize: 14,
            marginTop: -6

        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {

        fontSize: 14
    },
}));

const Login = (props) => {

    const classes = useStyles();
    // extraer los valores del context

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion, mostrarError, mensajeError,limpiarUsuario,limpiarAlert } = authContext;

    // En caso de que el password o usuario no exista
    useEffect(() => {
        if (autenticado && documento !== '' && contraseña !== '') {
            alert("Ingreso Exitoso");
            props.history.push('/inicio');

        }
        else {
            limpiarUsuario();
        }

        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        documento: '',
        contraseña: ''
    });

    // extraer de usuario
    const { documento, contraseña } = usuario;

    const onChange = evento => {
        //destructurin de los valores enviados por el metodo onchange de cada input

        const { name, value } = evento.target;
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
        if (documento.trim() === '' || contraseña.trim() === '') {
            return;
        }

        if (documento <= 0) {
            mostrarError('Número de documento invalido');
            return;
        }
        // Pasarlo al action
        iniciarSesion({ documento, contraseña });
    }


    return (
        <Fragment>
            <Header />
            <Barra />
            {mensajeError ? (<Alert severity="error">{mensajeError.msg}</Alert>) : null}
            <div className="contenedor-form sombra-dark">
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Inicia sesión
                              </Typography>
                        <form
                            onSubmit={onSubmit}
                            className={classes.form}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="number"
                                required
                                fullWidth
                                id="documento"
                                label="N° Documento"
                                name="documento"
                                className={classes.root}
                                autoFocus
                                value={documento}
                                onChange={onChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="contraseña"
                                label="Contraseña"
                                className={classes.root}
                                type="password"
                                id="password"
                                value={contraseña}
                                onChange={onChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >Acceder  </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link
                                        to="/validar-pregunta"
                                        variant="body2"
                                        className={classes.link}
                                    >
                                        ¿Olvidaste la contraseña? </Link>
                                </Grid>

                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
            </div>
        </Fragment>
    );
}

export default Login;