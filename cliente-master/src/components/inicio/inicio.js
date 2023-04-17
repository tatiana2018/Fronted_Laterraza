import React, { Fragment, useEffect , useContext} from 'react';
import Menu from '../inicio/menuPrincipal';
import Header from '../layout/Header';
import AuthContext from '../../context/autenticacion/authContext';
import Logo from '../../images/logo.png';
const Inicio = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;


    useEffect(() => {
        // usuarioAutenticado();
        // eslint-disable-next-line
    }, [])


    return (
        <Fragment>
            <Header />
            <Menu />
            <img className="tamano-logo" src={Logo} />
        </Fragment>
    );
}

export default Inicio;