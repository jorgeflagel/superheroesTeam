import React from 'react';
import { Link } from 'react-router-dom';

export default function AddHeroesCard({image, name, id, biography, setTeam, team, goodHeroesTotal, setGoodHeroesTotal, appearance, work}) {

    const addHero = (e) => {
        let heroId = e.target.getAttribute("heroId")
        if (team.length >= 6) alert("Your team can't have more than 6 superheroes");
        else if (team.includes(heroId)) {
            alert("This superhero is already in your team");
        }
        else if (biography.alignment === "good" && goodHeroesTotal >= 3) {
            alert("You can't have more than 3 good superheroes in your team");
        }
        else if (biography.alignment !== "good" && team.length - goodHeroesTotal >= 3) {
            alert("You can't have more than 3 bad superheroes in your team");
        }
        else {
            setTeam((previousTeam) => [...previousTeam , heroId]);
            if (biography.alignment === "good") {
                setGoodHeroesTotal((previousTotal) => previousTotal + 1);
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
                    <button onClick={addHero} heroId={id} className="btn btn-outline-dark btn-lg" type="button">Add Superhero</button>
                    <Link to={`/heroes/${id}`} className="btn btn-outline-secondary btn-lg" type="button">View Details</Link>
                </div>
            </div>
        </li>
    )
}
