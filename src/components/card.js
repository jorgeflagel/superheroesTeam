import React from 'react';

export default function Card({image, name, id, biography, setEquipo, equipo, totalPersonajesBuenos, setTotalPersonajesBuenos}) {

    const agregarHeroe = (e) => {
        let heroeId = e.target.getAttribute("heroeId")
        if (equipo.length >= 6) alert("Tu equipo no puede tener más de 6 héroes");
        else if (equipo.includes(heroeId)) {
            alert("Este heroe ya pertenece a tu equipo");
            alert(biography.alignment);      
        }
        else if (biography.alignment === "good" && totalPersonajesBuenos >= 3) {
            alert("No puedes tener más de 3 héroes buenos en tu equipo");
        }
        else if (biography.alignment !== "good" && equipo.length - totalPersonajesBuenos >= 3) {
            alert("No puedes tener más de 3 héroes malos en tu equipo");
        }
        else {
            setEquipo((equipoPrevio) => [...equipoPrevio, heroeId]);
            if (biography.alignment === "good") {
                setTotalPersonajesBuenos((totalAnterior) => totalAnterior + 1);
            }
        }
    }

    return (
        <li key={id} className="card d-inline-block m-2" style={{width: "287px"}}>
            <img src={image.url} className="card-img-top" alt="" width={"287"} height={"380"} style={{objectFit: "cover"}}/>
            <div className="card-body">
                <h2 className="card-title text-center">{name}</h2>
                <p className="card-text"></p>
                <div className="d-grid gap-2">
                    <button onClick={agregarHeroe} heroeId={id} className="btn btn-outline-dark btn-lg" type="button">Agregar Héroe</button>
                </div>
            </div>
        </li>
    )
}
