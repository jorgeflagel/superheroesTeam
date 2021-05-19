import React from 'react';
import sortObject from '../utils/sortObject';
import removeItem from '../utils/removeItem'
;
export default function HomeCard( {image, name, id, powerstats, setTeam, biography, setGoodHeroesTotal} ) {

    const eliminateHeroe = (id, alignment) => {
        setTeam((previousTeam) => [...removeItem(previousTeam, id)]);
        if(alignment === "good") {
            setGoodHeroesTotal((previousTotal) => previousTotal - 1);
        } 
    }  

    return (
        <li className="card m-5" style={{maxWidth: "540px"}} key={id}>
            <div className="row g-0">
                <div className="col-sm-6">
                    <img src={image.url} alt="..." style={{objectFit: "cover", width: "100%"}}/>
                </div>
                <div className="col-sm-6">
                    <div className="card-body d-flex flex-column justify-content-between" style={{height: "100%"}}>
                        <h3 className="card-title text-center">{name}</h3>
                        <ul className="card-text list-unstyled">
                            {sortObject(powerstats, "descendent").map((power) => <li><b>{power[0].toUpperCase()}:</b> {power[1]}</li>)}
                        </ul>
                        <div className="d-grid gap-2 mt-3">
                            <button onClick={() => eliminateHeroe(id, biography.alignment)} className="btn btn-outline-dark btn-lg" type="button">Eliminate Heroe</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
