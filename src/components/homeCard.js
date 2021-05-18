import React from 'react';
import sortObject from '../utils/sortObject';
import removeItem from '../utils/removeItem'
;
export default function HomeCard( {image, name, id, powerstats, setEquipo, biography, setTotalPersonajesBuenos} ) {

    const eliminarHeroe = (id, alignment) => {
        setEquipo((equipoPrevio) => [...removeItem(equipoPrevio, id)]);
        if(alignment === "good") {
            setTotalPersonajesBuenos((totalPrevio) => totalPrevio - 1)
        } 
    }  

    return (
        <li className="card m-3" style={{maxWidth: "540px"}} key={id}>
            <div className="row g-0">
                <div className="col-md-6">
                    <img src={image.url} alt="..." style={{objectFit: "cover", width: "100%"}}/>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h3 className="card-title text-center">{name}</h3>
                        <ul className="card-text list-unstyled">
                            {sortObject(powerstats, "descendent").map((power) => <li><b>{power[0].toUpperCase()}:</b> {power[1]}</li>)}
                        </ul>
                        <div className="d-grid gap-2">
                            <button onClick={() => eliminarHeroe(id, biography.alignment)} className="btn btn-outline-dark btn-lg" type="button">Eliminar Héroe</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
