import React, {useEffect, useState} from "react";
import { AdEntity } from "types";

interface Props {
    id: string;
}

export const SingleAd = (props: Props) => {
    const [ad, setAd] = useState<AdEntity | null>(null);
    console.log('test')
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3002/ad/${props.id}`);
            const data = await res.json();

            setAd(data);

        })();
    }, []);

    if (ad === null) {
        return <p>Wczytywanie...</p>;
    }

    return <>
        <h2>{ad.title}</h2>
        <p>{ad.description}</p>
        {!!ad.price && <p><b>{ad.price} zł</b></p>}
        <hr/>
        <a href={ad.url} target="_blank" rel="noreferrer">Otwórz ogłoszenie</a>
        {console.log('test')}
    </>;
}