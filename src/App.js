import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/login';
import Home from './pages/home';
import AgregarHeroe from './pages/agregarHeroe';
import DetallesHeroe from './pages/detallesHeroe';
import BarraDeNavegacion from './components/barraDeNavegacion';

function App() {
  return (
    <Router>
      <BarraDeNavegacion />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/agregarheroe" component={AgregarHeroe}/>
          <Route path="/heroes/:heroeId" component={DetallesHeroe} />
          <Route path="/login" component={Login} />        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
