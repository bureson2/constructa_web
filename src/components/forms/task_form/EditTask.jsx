import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./style.module.scss";


const EditTask = () => {

    const url = window.location.href;
    const taskId = url.substring(url.lastIndexOf("/") + 1);
    const [task, setTask] = useState("");

    useEffect(() => {
        // TODO
        axios.get('http://localhost:8080/api/v1/tasks/'+ taskId
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
            <label htmlFor="taskId">Identifikátor:</label>
            <input type="text" id="taskId" name="taskId" value={task.id}/>
            <label htmlFor="taskName">Jméno:</label>
            <input type="text" id="taskName" name="taskName" value={task.name}/>
            <label htmlFor="taskDescription">Popis:</label>
            <input type="text" id="taskDescription" name="taskDescription" value={task.description}/>
            <label htmlFor="taskLocation">Lokalita:</label>
            <input type="text" id="taskLocation" name="taskLocation" value={task.locationTime}/>
            <label htmlFor="assignee">Zodpovědná osoba:</label>
            <input type="text" id="assignee" name="assignee"
                   value={task.assignee ? task.assignee.firstname.concat(" ", task.assignee.lastname) : "-"}/>
            <label htmlFor="timeFrom">Datum zahájení:</label>
            <input type="text" id="timeFrom" name="timeFrom" value={task.timeFrom}/>
            <label htmlFor="timeTo">Datum ukončení:</label>
            <input type="text" id="timeTo" name="timeTo" value={task.timeTo}/>
        </form>
    );
}
export default EditTask;