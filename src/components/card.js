import React from 'react';

export default function Card({image, name, id}) {
    return (
        <li key={id} className="card d-inline-block m-2" style={{width: "287px"}}>
            <img src={image.url} className="card-img-top" alt="" width={"287"} height={"380"} style={{"object-fit": "cover"}}/>
            <div className="card-body">
                <h2 className="card-title text-center">{name}</h2>
                <p className="card-text"></p>
                <div className="d-grid gap-2">
                    <button className="btn btn-outline-dark btn-lg" type="button">Agregar Héroe</button>
                </div>
            </div>
        </li>
    )
}
