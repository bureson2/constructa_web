import styles from "../style.module.scss";
import React, {useEffect, useState} from "react";
import BackButton from "../../buttons/BackButton";
import {Link, useParams} from "react-router-dom";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import MapInput from "../../inputs/MapInput";

const TaskDetail = () => {

    // const url = window.location.href;
    // const taskId = url.substring(url.lastIndexOf("/") + 1);
    const {id} = useParams();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLocation, setTaskLocation] = useState('');
    const [timeFrom, setTimeFrom] = useState(new Date().toISOString().slice(0, 16));
    const [timeTo, setTimeTo] = useState(new Date().toISOString().slice(0, 16));
    const [markerPosition, setMarkerPosition] = useState([]);
    const [assignee, setAssignee] = useState('');
    const [author, setAuthor] = useState('');
    const [taskState, setState] = useState('');

    const [map, setMap] = useState(<></>)

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetch('http://localhost:8080/api/v1/tasks/' + id, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                    setTaskName(data.name);
                    setTaskDescription(data.description);
                    setTimeFrom(data.timeFrom);
                    setTimeTo(data.timeTo);
                    setTaskLocation(data.locationName);
                    setAssignee(data.assignee ? data.assignee.firstname.concat(" ", data.assignee.lastname)
                        : "-");
                    setAuthor(data.author ? data.author.firstname.concat(" ", data.author.lastname)
                        : "-")
                    setMarkerPosition([data.latitude, data.longitude]);
                    setState(data.state);
                    setMap(
                        <MapInput setMarkerPosition={setMarkerPosition} markerPosition={[data.latitude, data.longitude]} read={true}/>
                    )
                }
            )
            .catch(error => console.log(error));
    }

    return (
        <form className={styles.form}>
            <div>
                <div className={styles.topButtons}>
                    <Link to={"/tasks/edit/" + id} className={styles.topEditButton}>
                        <EditButton/>
                    </Link>
                    <Link to={"/tasks"} className={styles.topBackButton}>
                        <CloseButton/>
                    </Link>
                </div>
                <div className={styles.leftSide}>
                    <label htmlFor="taskName">Jméno:</label>
                    <input type="text" id="taskName" name="taskName" value={taskName} readOnly={true}/>
                    <label htmlFor="taskState">Stav:</label>
                    <input type="text" id="taskState" name="taskState" value={taskState} readOnly={true}/>
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
                    {map}

                </div>
            </div>
            <Link to={"/tasks"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default TaskDetail;