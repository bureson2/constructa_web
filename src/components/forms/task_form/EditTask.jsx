import axios from "axios";
import React, {useEffect, useState} from "react";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import {Link, useNavigate, useParams} from "react-router-dom";
import RejectButton from "../../buttons/RejectButton";
import MapInput from "../../inputs/MapInput";
import UserInput from "../../inputs/UserInput";
import CloseButton from "../../buttons/CloseButton";

const EditTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLocation, setTaskLocation] = useState('');
    const [timeFrom, setTimeFrom] = useState(new Date().toISOString().slice(0, 16));
    const [timeTo, setTimeTo] = useState(new Date().toISOString().slice(0, 16));
    const [markerPosition, setMarkerPosition] = useState([50.073658, 14.418540]);
    const [assignee, setAssignee] = useState('');
    const [author, setAuthor] = useState('');
    const [taskState, setState] = useState('');

    function handleEditTask() {
        axios.put('http://localhost:8080/api/v1/tasks', {
            id: id,
            name: taskName,
            description: taskDescription,
            timeFrom: timeFrom,
            timeTo: timeTo,
            locationName: taskLocation,
            state: taskState,
            longitude: markerPosition[1],
            latitude: markerPosition[0],
            userId: assignee.id
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/tasks");
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/tasks/' + id
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setTaskName(response.data.name);
                setTaskDescription(response.data.description);
                setTimeFrom(response.data.timeFrom.substring(0,16));
                setTimeTo(response.data.timeTo.substring(0,16));
                setTaskLocation(response.data.locationName)
                setAssignee(response.data.assignee);
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
            <div className={styles.topButtons}>
                <Link to={"/tasks/" + id}>
                    <CloseButton/>
                </Link>
            </div>
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
                    <UserInput onUserIdChange={setAssignee} defaultUser={assignee} />

                    <label htmlFor="timeTo">Datum zahájení:</label>
                    <input
                        type="datetime-local"
                        id="timeFrom"
                        name="timeFrom"
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

                    <label htmlFor="state-select">Současný stav:</label>
                    <select id="state-select" value={taskState} onChange={(event) => setState(event.target.value)}>
                        <option value="NEW">Nový</option>
                        <option value="IN_PROGRESS">V řešení</option>
                        <option value="STOPPED">Pozastaveno</option>
                        <option value="DONE">Hotovo</option>
                    </select>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="taskLocation">Místo výkonu práce:
                    </label>
                    <input type="text" id="taskLocation" name="taskLocation"
                           value={taskLocation}
                           onChange={(event) => setTaskLocation(event.target.value)}/>
                    <MapInput setMarkerPosition={setMarkerPosition} markerPosition={markerPosition} />
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