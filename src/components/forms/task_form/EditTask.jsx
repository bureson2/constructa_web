import axios from "axios";
import React, {useEffect, useState} from "react";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import {Link, useNavigate} from "react-router-dom";
import RejectButton from "../../buttons/RejectButton";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {icon} from "leaflet";
import locationIcon from "./location_on_FILL1_wght100_GRAD0_opsz48.png";


const EditTask = () => {
    const navigate = useNavigate();
    const url = window.location.href;
    const taskId = url.substring(url.lastIndexOf("/") + 1);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLocation, setTaskLocation] = useState('');
    const [timeFrom, setTimeFrom] = useState(new Date().toISOString().slice(0, 16));
    const [timeTo, setTimeTo] = useState(new Date().toISOString().slice(0, 16));
    const [markerPosition, setMarkerPosition] = useState([50.073658, 14.418540]);
    const [assignee, setAssignee] = useState('');
    const [author, setAuthor] = useState('');
    const customIcon = icon({
        iconUrl: locationIcon,
        iconSize: [40, 40],
    });

    function handleEditTask() {
        axios.put('http://localhost:8080/api/v1/tasks', {
            name: taskName,
            description: taskDescription,
            timeFrom: timeFrom,
            timeTo: timeTo,
            locationName: taskLocation,
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

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/tasks/' + taskId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setTaskName(response.data.name);
                setTaskDescription(response.data.description);
                setTimeFrom(response.data.timeFrom);
                setTimeTo(response.data.timeTo);
                setTaskLocation(response.data.locationName)
                setAssignee(response.data.assignee ? response.data.assignee.firstname.concat(" ", response.data.assignee.lastname)
                    : "-");
                setAuthor(response.data.author ? response.data.author.firstname.concat(" ", response.data.author.lastname)
                    : "-")
                setMarkerPosition([response.data.latitude, response.data.longitude])
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="taskName">Jméno:</label>
                    <input type="text" id="taskName" name="taskName"
                           value={taskName}
                           onChange={(event) => setTaskName(event.target.value)}/>
                    <label htmlFor="taskDescription">Popis:</label>
                    <input type="text" id="taskDescription" name="taskDescription"
                           value={taskDescription}
                           onChange={(event) => setTaskDescription(event.target.value)}/>
                    <label htmlFor="assignee">Zadavatel:</label>
                    <input type="text" id="author" name="author"
                           value={author}
                           onChange={(event) => setAuthor(event.target.value)} readOnly={true}/>
                    <label htmlFor="assignee">Pověřená osoba:</label>
                    <input type="text" id="assignee" name="assignee"
                           value={assignee}
                           onChange={(event) => setAssignee(event.target.value)} readOnly={true}/>
                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input type="text" id="timeFrom" name="timeFrom"
                           value={timeFrom}
                           onChange={(event) => setTimeFrom(event.target.value)}/>
                    <label htmlFor="timeTo">Datum ukončení:</label>
                    <input type="text" id="timeTo" name="timeTo"
                           value={timeTo}
                           onChange={(event) => setTimeTo(event.target.value)}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="taskLocation">Místo výkonu práce:
                    </label>
                    <input type="text" id="taskLocation" name="taskLocation"
                           value={taskLocation}
                           onChange={(event) => setTaskLocation(event.target.value)}/>
                    <MapContainer center={markerPosition} zoom={7}
                                  className={styles.map} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={markerPosition} icon={customIcon}
                                draggable={true}
                                id = "marker"
                                >
                            <Popup>
                                Vámi zvolené místo
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleEditTask}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default EditTask;