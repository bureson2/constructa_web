import axios from "axios";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import "leaflet/dist/leaflet.css"
import CloseButton from "../../buttons/CloseButton";
import UserInput from "../../inputs/UserInput";
import MapInput from "../../inputs/MapInput";

const CreateTask = () => {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLocation, setTaskLocation] = useState('');
    const [timeFrom, setTimeFrom] = useState(new Date().toISOString().slice(0, 16));
    const [timeTo, setTimeTo] = useState(new Date().toISOString().slice(0, 16));
    const [markerPosition, setMarkerPosition] = useState([50.073658, 14.418540]);
    const [userId, setUserId] = useState('');

    function handleCreateTask() {
        axios.post('http://localhost:8080/api/v1/tasks', {
            name: taskName,
            description: taskDescription,
            timeFrom: timeFrom,
            timeTo: timeTo,
            locationName: taskLocation,
            longitude: markerPosition[1],
            latitude: markerPosition[0],
            userId: userId,
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

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/vehicles"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
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
                    <label htmlFor="assignee">Pověřená osoba:</label>
                    <UserInput onUserIdChange={setUserId}
                    />
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="taskLocation">Místo výkonu práce:
                    </label>

                    <input type="text" id="taskLocation" name="taskLocation"
                           onChange={(event) => setTaskLocation(event.target.value)}/>
                    <MapInput setMarkerPosition={setMarkerPosition} markerPosition={markerPosition} />
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