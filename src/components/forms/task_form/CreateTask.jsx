import axios from "axios";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {icon} from "leaflet";
import "leaflet/dist/leaflet.css"
import locationIcon from "./location_on_FILL1_wght100_GRAD0_opsz48.png";

const CreateTask = () => {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLocation, setTaskLocation] = useState('');
    const [locationCheckBox, setLocationCheckBox] = useState(false);
    const [timeFrom, setTimeFrom] = useState(new Date().toISOString().slice(0, 16));
    const [timeTo, setTimeTo] = useState(new Date().toISOString().slice(0, 16));
    const [markerPosition, setMarkerPosition] = useState([50.073658, 14.418540]);
    const customIcon = icon({
        iconUrl: locationIcon,
        iconSize: [40, 40],
    });

    function handleCreateTask() {
        axios.post('http://localhost:8080/api/v1/tasks', {
            name: taskName,
            description: taskDescription,
            timeFrom: timeFrom,
            timeTo: timeTo,
            locationCheckBox: locationCheckBox,
            locationName: taskLocation,
            longitude: locationCheckBox ? markerPosition[1]: null,
            latitude: locationCheckBox ? markerPosition[0]: null
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/tasks");
    }

    function handleMarkerDragEnd(event) {
        const marker = event.target;
        const position = marker.getLatLng();
        setMarkerPosition([position.lat, position.lng]);
    }

    return (
        <form className={styles.form}>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="taskName">Jméno:</label>
                    <input type="text" id="taskName" name="taskName"
                           onChange={(event) => setTaskName(event.target.value)}/>
                    <label htmlFor="taskDescription">Popis:</label>
                    <input type="text" id="taskDescription" name="taskDescription"
                           onChange={(event) => setTaskDescription(event.target.value)}/>
                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input
                        type="datetime-local"
                        id="timeFrom"
                        name="timeFrom"
                        min={new Date().toISOString().slice(0, 16)}
                        value={timeFrom}
                        onChange={(event) => setTimeFrom(event.target.value)}
                    />
                    <label htmlFor="timeTo">Datum ukončení:</label>
                    <input
                        type="datetime-local"
                        id="timeTo"
                        name="timeTo"
                        min={new Date().toISOString().slice(0, 16)}
                        value={timeTo}
                        onChange={(event) => setTimeTo(event.target.value)}
                    />
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.mapCheckbox}>
                        <input type="checkbox" name="locationCheckBox"
                               onChange={(event) => setLocationCheckBox(!locationCheckBox)}/>
                        <label htmlFor="taskLocation">Místo výkonu práce:
                        </label>
                    </div>

                    <input type="text" id="taskLocation" name="taskLocation"
                           onChange={(event) => setTaskLocation(event.target.value)}/>
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
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleCreateTask}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>

        </form>
    );
}
export default CreateTask;