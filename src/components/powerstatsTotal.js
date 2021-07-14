import React from 'react';
import sortObject from '../utils/sortObject';

export default function PowerstatsTotal( { powerstatsTotal, numHeroes } ) {
   
    const setBackground = (porcentage) => {
        if (porcentage < 40) {
            return "bg-danger"
        }
        else if (porcentage < 70) {
            return "bg-warning"
        }
        else if (porcentage <= 100) {
            return "bg-success"
        }
        else {
            return "bg-info"
        }
    }

    return (
        <div>
            <h2 className="text-center">Powerstats Total</h2>

            {sortObject(powerstatsTotal, "descendent").map((power) => {
                const porcentage = power[1] / numHeroes;
                return(
                    <div>
                        <h3 className="pt-3">{power[0].toUpperCase()}: </h3>
                        <div className="progress">
                            <div className={`progress-bar ${setBackground(porcentage)}`} role="progressbar" style={{width: `${porcentage}%`}} aria-valuenow={porcentage} aria-valuemin="0" aria-valuemax="100">{power[1]}</div>
                        </div>                    
                    </div>
                )
            })}
        </div>
    )
}
