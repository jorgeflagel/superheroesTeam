import axios from 'axios';
import React, { useState } from 'react';

import AddHeroesCard from '../components/addHeroesCard';

// Para buscar a un superheroe:
// https://superheroapi.com/api/access-token/search/name ======> la busqueda devuelve un objeto 
//  con las siguentes caracteristicas:
//      si hay uno o mas matches: {response: "success", response-for: <name>, results: []}
//      si no hubo match: {response: "error", error: "character with given name not found"}


export default function AddHeroes( { setTeam, team, goodHeroesTotal, setGoodHeroesTotal }) {

    const [ search, setSearch ] = useState("");
    const [ results, setResults ] = useState([]);
    const [ error, setError ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setResults([]);
        axios.get(`https://www.superheroapi.com/api.php/${process.env.REACT_APP_API_TOKEN}/search/${search}`)
            .then((res) => {
                if (res.data.response === "success") {
                    setError(null);
                    setResults(res.data.results);
                }
                else {
                    setError(res.data.error);
                }
                
            })
            .catch((error) => setError(error));
    }

    return (
        <div className="m-3">
            <h1>Search and Add Superheroes</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="searchHeroes" className="form-label">Search Superheroes</label>
                    <input type="text" className="form-control" id="searchHeroes" aria-describedby="Search Heroes" 
                        onChange={(e) => setSearch(e.target.value)} value={search}/>
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <div className="mt-5">
                {results 
                    ?   <ul className="p-0 d-flex flex-wrap justify-content-around">
                            {results.map((hero) => {
                                return(
                                    <AddHeroesCard {...hero} setTeam={setTeam} team={team} goodHeroesTotal={goodHeroesTotal} setGoodHeroesTotal={setGoodHeroesTotal}/>
                                )})}
                        </ul>
                    : null}
                
                {error ? <div className="alert alert-danger mt-3" role="alert">{error}</div> : null}
            </div>
        </div>
    )
}
