import axios from 'axios';
import React, { useState, useEffect } from 'react';

import sortObject from '../utils/sortObject';
import HomeCard from '../components/homeCard';

export default function Home({ equipo, setEquipo, setTotalPersonajesBuenos }) {

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

    const agregarPowerstatsATotal = (heroePowerstats) => {
        for (const [power, valor] of Object.entries(heroePowerstats)) {
            setPowerstatsTotal((powerstatsPrevio) => ({...powerstatsPrevio, [power]: powerstatsPrevio[`${power}`] + parseInt(valor) }));
          } 
    }

    useEffect(() => {
        setError(null);
        setEquipoInfo([]);
        setPowerstatsTotal({
            intelligence: 0,
            strength: 0,
            speed: 0,
            durability: 0,
            power: 0,
            combat: 0
        })
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
            <h1>Tu equipo</h1>
            <h2>Powerstats Total</h2>
            <ul>
                {sortObject(powerstatsTotal, "descendent").map((power) => <li>{power[0]}: {power[1]}</li>)}
            </ul>
            <ul className="p-0 d-flex flex-wrap justify-content-around">
                {equipoInfo.map((heroe) => {
                    return(
                        <HomeCard {...heroe}  setEquipo={setEquipo} setTotalPersonajesBuenos={setTotalPersonajesBuenos} />
                        )
                    })
                }
            </ul>
            {error ? <div className="alert alert-danger mt-3" role="alert">{error}</div> : null}
        </div>
    )
}
