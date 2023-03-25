import React, {useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import styles from "./style.module.scss";
import "leaflet/dist/leaflet.css"
import {icon} from 'leaflet';
// import locationIcon from "../../svg/location_icon.svg"
import locationIcon from "../forms/task_form/location_on_FILL1_wght100_GRAD0_opsz48.png";

const MapInput = ({setMarkerPosition, markerPosition}) => {

    const customIcon = icon({
        iconUrl: locationIcon,
        iconSize: [40, 40],
    });

    function handleMarkerDragEnd(event) {
        const marker = event.target;
        const position = marker.getLatLng();
        setMarkerPosition([position.lat, position.lng]);
    }
    
    return (
        <MapContainer center={markerPosition} zoom={13}
                      className={styles.map} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={markerPosition} icon={customIcon}
                    draggable={true}
                    onDragend={handleMarkerDragEnd}>
                <Popup>
                    Vámi zvolené místo
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MapInput;


