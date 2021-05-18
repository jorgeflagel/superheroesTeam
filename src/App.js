import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Login from './pages/login';
import Home from './pages/home';
import AgregarHeroe from './pages/agregarHeroe';
import DetallesHeroe from './pages/detallesHeroe';

import BarraDeNavegacion from './components/barraDeNavegacion';
import RutaProtegida from './components/rutaProtegida';


function App() {

  const [usuarioAutorizado, setUsuarioAutorizado] = useState(true);
  const [equipo, setEquipo] = useState([]);
  const [totalPersonajesBuenos, setTotalPersonajesBuenos] = useState(0);

  useEffect(() => {
    var token = localStorage.getItem("tokenEquipoDeHeroes");
    if (!token) {
      setUsuarioAutorizado(false);
    } 
  }, [])

  return (
    <Router>
      <BarraDeNavegacion usuarioAutorizado={usuarioAutorizado} setUsuarioAutorizado={setUsuarioAutorizado} />
      <div className="App">
        <Switch>
          <RutaProtegida usuarioAutorizado={usuarioAutorizado} exact path="/">
            <Home equipo={equipo} setEquipo={setEquipo} setTotalPersonajesBuenos={setTotalPersonajesBuenos}/>
          </RutaProtegida>
          <RutaProtegida usuarioAutorizado={usuarioAutorizado} path="/agregarheroe">
            <AgregarHeroe setEquipo={setEquipo} equipo={equipo} totalPersonajesBuenos={totalPersonajesBuenos} setTotalPersonajesBuenos={setTotalPersonajesBuenos} />
          </RutaProtegida>
          <RutaProtegida usuarioAutorizado={usuarioAutorizado} path="/heroes/:heroeId">
            <DetallesHeroe />
          </RutaProtegida>
          <Route path="/login">
            <Login setUsuarioAutorizado={setUsuarioAutorizado}/>
          </Route>        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
