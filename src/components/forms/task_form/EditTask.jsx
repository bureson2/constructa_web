import axios from "axios";
import {useEffect, useState} from "react";
import styles from "./style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import {Link, useNavigate} from "react-router-dom";
import RejectButton from "../../buttons/RejectButton";


const EditTask = () => {

    const navigate = useNavigate();
    const url = window.location.href;

    const [taskId, setTaskId] = useState(url.substring(url.lastIndexOf("/") + 1));
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [assignee, setAssignee] = useState('');

    function handleEditTask() {
        axios.put('http://localhost:8080/api/v1/tasks', {
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

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/tasks/' + taskId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setTaskId(response.data.id);
                setTaskName(response.data.name);
                setTaskDescription(response.data.description);
                setTimeFrom(response.data.timeFrom);
                setTimeTo(response.data.timeTo);
                setAssignee(response.data.assignee ? response.data.assignee.firstname.concat(" ", response.data.assignee.lastname)
                    : "-");
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <label htmlFor="taskId">Identifikátor:</label>
            <input type="text" id="taskId" name="taskId" value={taskId} readOnly={true}/>
            <label htmlFor="taskName">Jméno:</label>
            <input type="text" id="taskName" name="taskName"
                   value={taskName}
                   onChange={(event) => setTaskName(event.target.value)}/>
            <label htmlFor="taskDescription">Popis:</label>
            <input type="text" id="taskDescription" name="taskDescription"
                   value={taskDescription}
                   onChange={(event) => setTaskDescription(event.target.value)}/>
            {/*<label htmlFor="taskLocation">Lokalita:</label>*/}
            {/*<input type="text" id="taskLocation" name="taskLocation" value={task.locationTime}/>*/}
            <label htmlFor="assignee">Zodpovědná osoba:</label>
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
            <div className={styles.formButtons}>
                <div onClick={handleEditTask}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default EditTask;