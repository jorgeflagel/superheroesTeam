import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React, { useState } from 'react';

import Login from './pages/login';
import Home from './pages/home';
import AgregarHeroe from './pages/agregarHeroe';
import DetallesHeroe from './pages/detallesHeroe';

import BarraDeNavegacion from './components/barraDeNavegacion';
import RutaProtegida from './components/rutaProtegida';


function App() {

  const [usuarioAutorizado, setUsuarioAutorizado] = useState(false);

  return (
    <Router>
      <BarraDeNavegacion />
      <div className="App">
        <Switch>
          <RutaProtegida usuarioAutorizado={usuarioAutorizado} exact path="/" component={Home} />
          <RutaProtegida usuarioAutorizado={usuarioAutorizado} path="/agregarheroe" component={AgregarHeroe}/>
          <RutaProtegida usuarioAutorizado={usuarioAutorizado} path="/heroes/:heroeId" component={DetallesHeroe} />
          <Route path="/login">
            <Login setUsuarioAutorizado={setUsuarioAutorizado}/>
          </Route>        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
