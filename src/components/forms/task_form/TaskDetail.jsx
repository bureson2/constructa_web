import styles from "../style.module.scss";
import axios from 'axios';
import React, {useEffect, useState} from "react";
import BackButton from "../../buttons/BackButton";
import {Link} from "react-router-dom";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import MapInput from "../../inputs/MapInput";

const TaskDetail = () => {

    // TODO useStates - Correct

    const url = window.location.href;
    const taskId = url.substring(url.lastIndexOf("/") + 1);
    const [task, setTask] = useState("");
    const [markerPosition, setMarkerPosition] = useState([50.073658, 14.418540]);


    useEffect(() => {
        // TODO
        axios.get('http://localhost:8080/api/v1/tasks/' + taskId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setTask(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div>
                <div className={styles.leftSide}>
                    <div className={styles.topButtons}>
                        <Link to={"/tasks/edit/" + taskId} className={styles.topEditButton}>
                            <EditButton/>
                        </Link>
                        <Link to={"/vehicles"} className={styles.topBackButton}>
                            <CloseButton/>
                        </Link>
                    </div>
                    <label htmlFor="taskName">Jméno:</label>
                    <input type="text" id="taskName" name="taskName" value={task.name} readOnly={true}/>
                    <label htmlFor="taskDescription">Popis:</label>
                    <input type="text" id="taskDescription" name="taskDescription" value={task.description}
                           readOnly={true}/>
                    <label htmlFor="assignee">Zodpovědná osoba:</label>
                    <input type="text" id="assignee" name="assignee"
                           value={task.assignee ? task.assignee.firstname.concat(" ", task.assignee.lastname) : "-"}
                           readOnly={true}/>
                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input type="text" id="timeFrom" name="timeFrom"
                           value={task.timeFrom ? task.timeFrom.substring(0, 10) : task.timeFrom} readOnly={true}/>
                    <label htmlFor="timeTo">Datum ukončení:</label>
                    <input type="text" id="timeTo" name="timeTo"
                           value={task.timeTo ? task.timeTo.substring(0, 10) : task.timeTo} readOnly={true}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="taskLocation">Místo výkonu práce:
                    </label>
                    <input type="text" id="taskLocation" name="taskLocation"
                           value={task.locationName} readOnly={true}/>
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