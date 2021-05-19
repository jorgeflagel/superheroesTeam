import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinning from '../components/spinning';

import HeroDetailsCard from '../components/heroDetailsCard';
import GoBackButton from '../components/goBackButton';

export default function HeroDetails() {

    const { heroId } = useParams();
    const [heroInfo, setHeroInfo] = useState(null);
    const [error, setError] = useState(null);

    //state: {image: image.url, appearance: appearance, workIn: work.base, name: name, aliases: biography.aliases}


    useEffect(() => {
        axios.get(`https://www.superheroapi.com/api.php/${process.env.REACT_APP_API_TOKEN}/${heroId}`)
        .then((res) => {
            if (res.data.response === "success") {
                setError(null);
                setHeroInfo(res.data);
            }
            else {
                setError(res.data.error);
            }
            
        })
        .catch((error) => setError(error));
       
    })

    return (
        <div>
            <GoBackButton />
            {heroInfo 
                ? <HeroDetailsCard heroInfo={heroInfo} />
                : error 
                    ? <div className="alert alert-danger mt-3" role="alert">{error}</div>
                    : <Spinning />}
        </div> 
    )
}
