import React, {useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import styles from "./style.module.scss";
import "leaflet/dist/leaflet.css"
import {icon} from 'leaflet';
import locationIcon from "../forms/task_form/location_on_FILL1_wght100_GRAD0_opsz48.png";

const MapInput = ({setMarkerPosition, markerPosition}) => {
    const [position, setPosition] = useState(markerPosition);
    const markerRef = useRef(null);

    const customIcon = icon({
        iconUrl: locationIcon,
        iconSize: [40, 40],
    });

    function handleMapClick(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        console.log(e.latlng.lat);
    }

    function handleMarkerDragEnd(e) {
        const marker = e.target;
        setPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        setMarkerPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        console.log(marker.getLatLng().lat);
    }

    function ClickHandler({ handleMapClick }) {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }

    return (
        <MapContainer id={"map"} center={position} zoom={13} scrollWheelZoom={true}
                      className={styles.map} style={{height: "400px", width: "100%"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
            <Marker position={position} icon={customIcon} ref={markerRef} draggable={true} eventHandlers={
                { dragend: handleMarkerDragEnd }
            } />

            <ClickHandler handleMapClick={handleMapClick} />
        </MapContainer>
        // <MapContainer id={"map"} center={markerPosition}
        //               zoom={13}
        //               className={styles.map} scrollWheelZoom={true}>
        //     <TileLayer
        //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //     />
        //     <Marker position={markerPosition} icon={customIcon}
        //             draggable={true}
        //             onDragend={handleMarkerDragEnd}>
        //         <Popup>
        //             Vámi zvolené místo
        //         </Popup>
        //     </Marker>
        // </MapContainer>
    );
}

export default MapInput;


