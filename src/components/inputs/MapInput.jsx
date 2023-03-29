import React, {useRef, useState} from 'react';
import {MapContainer, Marker, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import styles from "./style.module.scss";
import "leaflet/dist/leaflet.css"
import {icon} from 'leaflet';
import locationIcon from "../forms/task_form/location_on_FILL1_wght100_GRAD0_opsz48.png";

const MapInput = ({setMarkerPosition, markerPosition, read}) => {
    const [position, setPosition] = useState(markerPosition);
    const markerRef = useRef(null);
    const dragable = read !== true;

    const customIcon = icon({
        iconUrl: locationIcon,
        iconSize: [40, 40],
    });

    function handleMapClick(e) {
        if(dragable){
            setPosition([e.latlng.lat, e.latlng.lng]);
            setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        }
    }

    function handleMarkerDragEnd(e) {
        const marker = e.target;
        setPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
        setMarkerPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
    }

    function ClickHandler({ handleMapClick }) {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    }

    function MapView({ markerPosition }) {
        const map = useMap();
        if (markerPosition.length !== 0) {
            map.setView(markerPosition, 13);
        }
        return null;
    }

    return (
        <MapContainer id={"map"} scrollWheelZoom={true}
                      className={styles.map} style={{height: "400px", width: "100%"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
            {markerPosition.length !== 0 && <Marker position={position} icon={customIcon} ref={markerRef} draggable={dragable} eventHandlers={
                { dragend: handleMarkerDragEnd }
            } /> }
            <MapView markerPosition={position} />



            <ClickHandler handleMapClick={handleMapClick} />
        </MapContainer>
    );
}

export default MapInput;


