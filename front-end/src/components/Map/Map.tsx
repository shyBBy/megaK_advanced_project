import React, {useContext, useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvents} from "react-leaflet";
import '../utils/fix-map-icons';
import 'leaflet/dist/leaflet.css'
import './Map.css'
import {SearchContext} from "../../contexts/search.context";
import { SimpleAdEntity } from "types";
import { SingleAd } from "./SingleAd";

export const Map = () => {
    const {search} = useContext(SearchContext);
    const [ads, setAds] = useState<SimpleAdEntity[]>([]);

    useEffect(() => {

        (async () => {
            const res = await fetch(`http://localhost:3002/ad/search/${search}`);
            const data = await res.json();

            setAds(data);


        })();
    }, [search]) // podana wartosc SEARCH czyli uruch ten efekt za kazdym razem kiedy zmienia sie wartosc SEARCH

    return (
        <div className="map">
            <MapContainer center={[50.2657152,18.9945008]} zoom={20}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors"
                />


                {
                    ads.map(ad => (
                        <Marker key={ad.id} position={[ad.lat, ad.lon]}>
                            <Popup>
                                <SingleAd id={ad.id}/>
                            </Popup>
                            <Tooltip>{ad.title}</Tooltip>
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    );
}
