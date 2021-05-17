import axios from 'axios';
import React, { useState } from 'react';

import Card from '../components/card';

// Para buscar a un superheroe:
// https://superheroapi.com/api/access-token/search/name ======> la busqueda devuelve un objeto 
//  con las siguentes caracteristicas:
//      si hay uno o mas matches: {response: "success", response-for: <name>, results: []}
//      si no hubo match: {response: "error", error: "character with given name not found"}


export default function AgregarHeroe( { setEquipo, equipo, totalPersonajesBuenos, setTotalPersonajesBuenos }) {

    const [ busqueda, setBusqueda ] = useState("");
    const [ resultados, setResultados ] = useState([]);
    const [ error, setError ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setResultados([]);
        axios.get(`https://www.superheroapi.com/api.php/${process.env.REACT_APP_API_TOKEN}/search/${busqueda}`)
            .then((res) => {
                if (res.data.response === "success") {
                    setError(null);
                    setResultados(res.data.results);
                }
                else {
                    setError(res.data.error);
                }
                
            })
            .catch((error) => setError(error));
    }

    return (
        <div className="m-3">
            <h1>Buscar y agregar héroe</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="buscarHeroes" className="form-label">Buscar Héroes</label>
                    <input type="text" className="form-control" id="buscarHeroes" aria-describedby="buscarHeroes" 
                        onChange={(e) => setBusqueda(e.target.value)} value={busqueda}/>
                </div>
                <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
            <div className="mt-5">
                {resultados 
                    ?   <ul className="p-0 d-flex flex-wrap justify-content-around">
                            {resultados.map((heroe) => {
                                return(
                                    <Card {...heroe} setEquipo={setEquipo} equipo={equipo} totalPersonajesBuenos={totalPersonajesBuenos} setTotalPersonajesBuenos={setTotalPersonajesBuenos}/>
                                )})}
                        </ul>
                    : null}
                
                {error ? <div className="alert alert-danger mt-3" role="alert">{error}</div> : null}
            </div>
        </div>
    )
}
