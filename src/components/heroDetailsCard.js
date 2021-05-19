import React from 'react';

export default function HeroDetailsCard( { heroInfo }) {
    return (
        <div className="card m-5 mx-md-auto" style={{maxWidth: "800px"}}>
            <div className="row g-0">
                <div className="col-sm-6">
                    <img src={heroInfo.image.url} alt="" style={{objectFit: "cover", width: "100%", height: "100%"}}/>
                </div>
                <div className="col-sm-6">
                    <div className="card-body">
                        <h3 className="card-title text-center">{heroInfo.name}</h3>
                        <p><b>Aliases: </b>{heroInfo.biography.aliases.map((alias) => <><br />{alias}</>)}</p>
                        <p><b>Work in: </b>{heroInfo.work.base}</p>
                        <p><b>Height: </b>{heroInfo.appearance.height[0]}</p>
                        <p><b>Weight: </b>{heroInfo.appearance.weight[0]}</p>
                        <p><b>Hair Color: </b>{heroInfo.appearance["hair-color"]}</p>
                        <p><b>Eye Color: </b>{heroInfo.appearance["eye-color"]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}