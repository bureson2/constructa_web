import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./style.module.scss";

const CreateTask = () => {

    return (
        <form className={styles.form}>
            <label htmlFor="taskId">Identifikátor:</label>
            <input type="text" id="taskId" name="taskId"/>
            <label htmlFor="taskName">Jméno:</label>
            <input type="text" id="taskName" name="taskName"/>
            <label htmlFor="taskDescription">Popis:</label>
            <input type="text" id="taskDescription" name="taskDescription"/>
            <label htmlFor="taskLocation">Lokalita:</label>
            <input type="text" id="taskLocation" name="taskLocation"/>
            <label htmlFor="assignee">Zodpovědná osoba:</label>
            <input type="text" id="assignee" name="assignee"/>
            <label htmlFor="timeFrom">Datum zahájení:</label>
            <input type="text" id="timeFrom" name="timeFrom"/>
            <label htmlFor="timeTo">Datum ukončení:</label>
            <input type="text" id="timeTo" name="timeTo"/>
        </form>
    );
}
export default CreateTask;