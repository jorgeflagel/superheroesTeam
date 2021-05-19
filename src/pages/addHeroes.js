import axios from 'axios';
import React, { useState } from 'react';

import AddHeroesCard from '../components/addHeroesCard';

// Para buscar a un superheroe:
// https://superheroapi.com/api/access-token/search/name ======> la busqueda devuelve un objeto 
//  con las siguentes caracteristicas:
//      si hay uno o mas matches: {response: "success", response-for: <name>, results: []}
//      si no hubo match: {response: "error", error: "character with given name not found"}


export default function AddHeroes( { setTeam, team, goodHeroesTotal, setGoodHeroesTotal, results, setResults, search, setSearch }) {

    
    const [ error, setError ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setResults([]);
        axios.get(`https://www.superheroapi.com/api.php/${process.env.REACT_APP_API_TOKEN}/search/${search}`)
            .then((res) => {
                if (res.data.response === "success") {
                    setError(null);
                    setResults(res.data.results);
                    setSearch("");
                }
                else {
                    setError(res.data.error);
                }
                
            })
            .catch((error) => setError(error));
    }

    return (
        <div className="m-3">
            <h1 className="text-center mt-5">Search and Add Superheroes</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 align-items-center">
                    <div className="text-md-end col-12 col-md-4">
                        <label htmlFor="searchHeroes" className="form-label">Search Superheroes: </label>
                    </div>
                    <div className="col-12 col-md-5 col-xl-4">
                        <input type="text" className="form-control col-12 col-md-6 col-xl-2" id="searchHeroes" aria-describedby="Search Heroes" 
                            onChange={(e) => setSearch(e.target.value)} value={search}/>
                    </div>
                    <div className="col-12 col-md-1 my-3">
                        <button type="submit" className="btn btn-primary">Search</button>   
                    </div>
                </div>
                
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
