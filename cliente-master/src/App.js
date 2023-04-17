import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Servicios from "./components/servicios/Servicios";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import ServicioState from "./context/servicios/servicioState";
import NuevoServicio from "./components/servicios/nuevoServicio";
import RutaPrivada from "./components/rutas/RutaPrivada";
import ListadoServicios from "./components/servicios/listadoServicios";
import Empleados from "./components/empleados/Empleados";
import EmpleadoSatate from "./context/empleados/empleadoState";
import Principal from "./components/principal/Principal";
import Inicio from "./components/inicio/inicio";
import Somos from "./components/informativo/Somos";
import Galeria from "./components/informativo/Galeria";
import NuevoEmpleado from "./components/empleados/NuevoEmpleado";
import NuevoProducto from "./components/productos/NuevoProducto";
import Productos from "./components/productos/Productos";
import ProductoState from "./context/productos/productoState";
import ConfiguracionState from "./context/cambioContraseña/configuracionState";
import NuevaRespuesta from "./components/respuestas/NuevaRespuesta";
import RespuestaState from "./context/respuestas/respuestaState";
import ValidarPregunta from "./components/cambioContraseña/ValidarPregunta";
import NuevaContraseña from "./components/cambioContraseña/NuevaContraseña";
import Clientes from "./components/clientes/Clientes";
import ClienteState from "./context/clientes/clienteState";
import Agendamientos from "./components/agendamiento/Agendamientos";
import AgendamientoState from "./context/agendamiento/agendamientoState";
import CarouselContainer from "./components/principal/CarruselContainer";
import Contacto from "./components/informativo/Contacto";
import Modal from "react-modal";
import Citas from "./components/citas/Citas";
import CitaState from "./context/citas/citaState";
import NuevoCliente from "./components/clientes/NuevoCliente";
import Reportes from "./components/reportes/Reportes";
import ReporteState from "./context/reportes/reporteState";
import Puntos from "./components/puntos/Puntos";
import PuntosState from "./context/puntaje/puntosState";
import InsumoState from "./context/insumos/insumoState";
import ServiciosParaClientes from "./components/servicios/ServiciosParaClientes";
Modal.setAppElement("#root");

//Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    (
      <div>
        <CarouselContainer />
      </div>
    ),
    (
      <InsumoState>
        <PuntosState>
          <ReporteState>
            <ClienteState>
              <CitaState>
                <AgendamientoState>
                  <ClienteState>
                    <EmpleadoSatate>
                      <ServicioState>
                        <ProductoState>
                          <AlertaState>
                            <ConfiguracionState>
                              <RespuestaState>
                                <AuthState>
                                  <Router>
                                    <Switch>
                                      <RutaPrivada
                                        exact
                                        path="/inicio"
                                        component={Inicio}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/nueva-cuenta"
                                        component={NuevaCuenta}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/nuevo-servicio"
                                        component={NuevoServicio}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/empleados"
                                        component={Empleados}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/nuevo-empleado"
                                        component={NuevoEmpleado}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/nuevo-producto"
                                        component={NuevoProducto}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/productos"
                                        component={Productos}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/nueva-pregunta"
                                        component={NuevaRespuesta}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/servicios"
                                        component={Servicios}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/agendamiento"
                                        component={Agendamientos}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/clientes"
                                        component={Clientes}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/nuevo-cliente"
                                        component={NuevoCliente}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/citas"
                                        component={Citas}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/reportes"
                                        component={Reportes}
                                      />
                                      <RutaPrivada
                                        exact
                                        path="/puntos"
                                        component={Puntos}
                                      />
                                      <Route
                                        exact
                                        path="/iniciar-sesion"
                                        component={Login}
                                      />
                                      <Route
                                        exact
                                        path="/validar-pregunta"
                                        component={ValidarPregunta}
                                      />
                                      <Route
                                        exact
                                        path="/nueva-contraseña"
                                        component={NuevaContraseña}
                                      />
                                      <Route
                                        exact
                                        path="/lista-servicios"
                                        component={ListadoServicios}
                                      />
                                      <Route
                                        exact
                                        path="/somos"
                                        component={Somos}
                                      />
                                      <Route
                                        exact
                                        path="/galeria"
                                        component={Galeria}
                                      />
                                      <Route
                                        exact
                                        path="/contacto"
                                        component={Contacto}
                                      />
                                      <Route
                                        exact
                                        path="/"
                                        component={Principal}
                                      />
                                      <Route exact path="/servicio-cliente" component={ServiciosParaClientes}/>
                                    </Switch>
                                  </Router>
                                </AuthState>
                              </RespuestaState>
                            </ConfiguracionState>
                          </AlertaState>
                        </ProductoState>
                      </ServicioState>
                    </EmpleadoSatate>
                  </ClienteState>
                </AgendamientoState>
              </CitaState>
            </ClienteState>
          </ReporteState>
        </PuntosState>
      </InsumoState>
    )
  );
}

export default App;
