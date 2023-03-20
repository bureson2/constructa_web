import axios from "axios";
import styles from "./style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const CreateTask = () => {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [timeFrom, setTimeFrom] = useState(new Date().toISOString().slice(0, 16));
    const [timeTo, setTimeTo] = useState(new Date().toISOString().slice(0, 16));

    function handleCreateTask(taskId) {

        axios.post('http://localhost:8080/api/v1/tasks', {
            name: taskName,
            description: taskDescription,
            timeFrom: timeFrom,
            timeTo: timeTo,
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
            <label htmlFor="taskName">Jméno:</label>
            <input type="text" id="taskName" name="taskName"
                   onChange={(event) => setTaskName(event.target.value)}/>
            <label htmlFor="taskDescription">Popis:</label>
            <input type="text" id="taskDescription" name="taskDescription"
                   onChange={(event) => setTaskDescription(event.target.value)}/>
            {/*<label htmlFor="taskLocation">Lokalita:</label>*/}
            {/*<input type="text" id="taskLocation" name="taskLocation"/>*/}
            {/*<label htmlFor="assignee">Zodpovědná osoba:</label>*/}
            {/*<input type="text" id="assignee" name="assignee"/>*/}
            <label htmlFor="timeFrom">Datum zahájení:</label>
            <input
                type="datetime-local"
                id="timeFrom"
                name="timeFrom"
                // defaultValue={new Date().toISOString().slice(0, 16)}
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
            <div className={styles.formButtons}>
                <div onClick={handleCreateTask}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default CreateTask;