import axios from 'axios';
import React, { useState, useEffect } from 'react';

import sortObject from '../utils/sortObject';

export default function Home({ equipo }) {

    const [equipoInfo, setEquipoInfo] = useState([]);
    const [error, setError] = useState(null);
    const [powerstatsTotal, setPowerstatsTotal] = useState({
        intelligence: 0,
        strength: 0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0
    });

    const agregarPowerstatsATotal = (heroePowerstats, alineamiento) => {
        for (const [power, valor] of Object.entries(heroePowerstats)) {
            setPowerstatsTotal((powerstatsPrevio) => ({...powerstatsPrevio, [power]: powerstatsPrevio[`${power}`] + parseInt(valor) }));
          } 
    }

    useEffect(() => {
        setError(null);
        equipo.forEach((id) => {     
            axios.get(`https://www.superheroapi.com/api.php/${process.env.REACT_APP_API_TOKEN}/${id}`)
            .then((res) => {
                if (res.data.response === "success") {
                    setError(null);
                    setEquipoInfo((equipoPrevio) => [...equipoPrevio, res.data]);
                    agregarPowerstatsATotal(res.data.powerstats, res.data.biography.alignment);
                }
                else {
                    setError(res.data.error);
                }})
            .catch((error) => setError(error))
        })}, [equipo]
    )

    return (
        <div>
            <h1>Página Home</h1>
            <h2>Powerstats Total</h2>
            <ul>
                {sortObject(powerstatsTotal, "descendent").map((power) => <li>{power[0]}: {power[1]}</li>)}
            </ul>
            <ul>
                {equipoInfo.map((heroe) => {
                    return(
                        <li key={heroe.id}>
                            <h2>{heroe.name}</h2>
                            <img src={heroe.image.url} alt=""/>
                            <p>{JSON.stringify(heroe.powerstats)}</p>
                            
                        </li>
                        )
                    })
                }
            </ul>
            {error ? <div className="alert alert-danger mt-3" role="alert">{error}</div> : null}
        </div>
    )
}
