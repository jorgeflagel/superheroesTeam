import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Home({ equipo }) {

    const [equipoInfo, setEquipoInfo] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        equipo.forEach((id) => {     
            axios.get(`https://www.superheroapi.com/api.php/${process.env.REACT_APP_API_TOKEN}/${id}`)
            .then((res) => {
                if (res.data.response === "success") {
                    setError(null);
                    setEquipoInfo((equipoPrevio) => [...equipoPrevio, res.data]);
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
            <ul>
                {equipoInfo.map((heroe) => {
                    return(
                        <li key={heroe.id}>
                            <h2>{heroe.name}</h2>
                            <img src={heroe.image.url}/>
                            <p>{JSON.stringify(heroe.powerstats)}</p>
                            
                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
