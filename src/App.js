import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

import Login from './pages/login';
import Home from './pages/home';
import AddHeroes from './pages/addHeroes';
import HeroDetails from './pages/heroDetails';

import NavigationBar from './components/navigationBar';
import ProtectedRoute from './components/protectedRoute';


function App() {

  const [authorizedUser, setAuthorizedUser] = useState(true);
  const [team, setTeam] = useState([]);
  const [goodHeroesTotal, setGoodHeroesTotal] = useState(0);

  const [ results, setResults ] = useState([]);
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    var token = localStorage.getItem("tokenHeroesTeam");
    if (!token) {
      setAuthorizedUser(false);
    } 
  }, [])

  return (
    <Router>
      <NavigationBar authorizedUser={authorizedUser} setAuthorizedUser={setAuthorizedUser} />
      <div className="App">
        <Switch>
          <ProtectedRoute authorizedUser={authorizedUser} exact path="/">
            <Home team={team} setTeam={setTeam} setGoodHeroesTotal={setGoodHeroesTotal}/>
          </ProtectedRoute>
          <ProtectedRoute authorizedUser={authorizedUser} path="/addHeroes">
            <AddHeroes setTeam={setTeam} team={team} goodHeroesTotal={goodHeroesTotal} setGoodHeroesTotal={setGoodHeroesTotal}
              results={results} setResults={setResults} search={search} setSearch={setSearch}/>
          </ProtectedRoute>
          <ProtectedRoute authorizedUser={authorizedUser} path="/heroes/:heroId">
            <HeroDetails />
          </ProtectedRoute>
          <Route path="/login">
            <Login setAuthorizedUser={setAuthorizedUser}/>
          </Route>        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
