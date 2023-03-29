import styles from "../style.module.scss";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import BackButton from "../../buttons/BackButton";
import {Link, useNavigate} from "react-router-dom";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import MapInput from "../../inputs/MapInput";

const TaskDetail = () => {

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
    const [taskState, setState] = useState('');


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
                if(response.data.state === "Nový"){
                    setState("NEW");
                } else if(response.data.state === "V řešení") {
                    setState("IN_PROGRESS");
                } else if(response.data.state === "Pozastaveno") {
                    setState("STOPPED");
                } else if(response.data.state === "Hotovo") {
                    setState("DONE");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div>
                <div className={styles.topButtons}>
                    <Link to={"/tasks/edit/" + taskId} className={styles.topEditButton}>
                        <EditButton/>
                    </Link>
                    <Link to={"/tasks"} className={styles.topBackButton}>
                        <CloseButton/>
                    </Link>
                </div>
                <div className={styles.leftSide}>
                    <label htmlFor="taskName">Jméno:</label>
                    <input type="text" id="taskName" name="taskName" value={taskName} readOnly={true}/>
                    <label htmlFor="taskDescription">Popis:</label>
                    <input type="text" id="taskDescription" name="taskDescription" value={taskDescription}
                           readOnly={true}/>
                    <label htmlFor="assignee">Zodpovědná osoba:</label>
                    <input type="text" id="assignee" name="assignee"
                           value={assignee}
                           readOnly={true}/>
                    <label htmlFor="author">Zadavatel úkolu:</label>
                    <input type="text" id="author" name="author"
                           value={author}
                           readOnly={true}/>
                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input type="text" id="timeFrom" name="timeFrom"
                           value={timeFrom ? timeFrom.substring(0, 10) : timeFrom} readOnly={true}/>
                    <label htmlFor="timeTo">Datum ukončení:</label>
                    <input type="text" id="timeTo" name="timeTo"
                           value={timeTo ? timeTo.substring(0, 10) : timeTo} readOnly={true}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="taskLocation">Místo výkonu práce:
                    </label>
                    <input type="text" id="taskLocation" name="taskLocation"
                           value={taskLocation} readOnly={true}/>
                    <MapInput setMarkerPosition={setMarkerPosition} markerPosition={markerPosition}/>
                </div>
            </div>
            <Link to={"/tasks"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default TaskDetail;