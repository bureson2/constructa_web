
import styles from "../style.module.scss";
import axios from 'axios';
import {useEffect, useState} from "react";
import BackButton from "../../buttons/BackButton";
import {Link} from "react-router-dom";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";

const TaskDetail = () => {

    const url = window.location.href;
    const taskId = url.substring(url.lastIndexOf("/") + 1);
    const [task, setTask] = useState("");

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
            <div className={styles.topButtons}>
                <Link to={"/tasks/edit/" + taskId} className={styles.topEditButton}>
                    <EditButton/>
                </Link>
                <Link to={"/vehicles"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
            <label htmlFor="taskId">Identifikátor:</label>
            <input type="text" id="taskId" name="taskId" value={task.id} readOnly={true}/>
            <label htmlFor="taskName">Jméno:</label>
            <input type="text" id="taskName" name="taskName" value={task.name} readOnly={true}/>
            <label htmlFor="taskDescription">Popis:</label>
            <input type="text" id="taskDescription" name="taskDescription" value={task.description} readOnly={true}/>
            <label htmlFor="taskLocation">Lokalita:</label>
            <input type="text" id="taskLocation" name="taskLocation" value={task.locationTime} readOnly={true}/>
            <label htmlFor="assignee">Zodpovědná osoba:</label>
            <input type="text" id="assignee" name="assignee"
                   value={task.assignee ? task.assignee.firstname.concat(" ", task.assignee.lastname) : "-"} readOnly={true}/>
            <label htmlFor="timeFrom">Datum zahájení:</label>
            <input type="text" id="timeFrom" name="timeFrom" value={task.timeFrom} readOnly={true}/>
            <label htmlFor="timeTo">Datum ukončení:</label>
            <input type="text" id="timeTo" name="timeTo" value={task.timeTo} readOnly={true}/>
            <Link to={"/tasks"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default TaskDetail;