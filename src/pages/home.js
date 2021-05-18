import axios from 'axios';
import React, { useState, useEffect } from 'react';

import sortObject from '../utils/sortObject';
import HomeCard from '../components/homeCard';

export default function Home({ team, setTeam, setGoodHeroesTotal }) {

    const [teamInfo, setTeamInfo] = useState([]);
    const [error, setError] = useState(null);
    const [powerstatsTotal, setPowerstatsTotal] = useState({
        intelligence: 0,
        strength: 0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0
    });

    const addPowerstatsToTotal = (heroPowerstats) => {
        for (const [power, value] of Object.entries(heroPowerstats)) {
            setPowerstatsTotal((previousPowerstats) => ({...previousPowerstats, [power]: previousPowerstats[`${power}`] + (parseInt(value))}));
          } 
    }

    useEffect(() => {
        setError(null);
        setTeamInfo([]);
        setPowerstatsTotal({
            intelligence: 0,
            strength: 0,
            speed: 0,
            durability: 0,
            power: 0,
            combat: 0
        })
        team.forEach((id) => {     
            axios.get(`https://www.superheroapi.com/api.php/${process.env.REACT_APP_API_TOKEN}/${id}`)
            .then((res) => {
                if (res.data.response === "success") {
                    setError(null);
                    setTeamInfo((previousTeam) => [...previousTeam, res.data]);
                    addPowerstatsToTotal(res.data.powerstats, res.data.biography.alignment);
                }
                else {
                    setError(res.data.error);
                }})
            .catch((error) => setError(error))
        })}, [team]
    )

    return (
        <div>
            <h1>Your Team of Superheroes</h1>
            <h2>Powerstats Total</h2>
            <ul>
                {sortObject(powerstatsTotal, "descendent").map((power) => <li>{power[0]}: {power[1]}</li>)}
            </ul>
            <ul className="p-0 d-flex flex-wrap justify-content-around">
                {teamInfo.map((heroe) => {
                    return(
                        <HomeCard {...heroe}  setTeam={setTeam} setGoodHeroesTotal={setGoodHeroesTotal} />
                        )
                    })
                }
            </ul>
            {error ? <div className="alert alert-danger mt-3" role="alert">{error}</div> : null}
        </div>
    )
}
