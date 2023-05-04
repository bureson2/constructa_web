import styles from "../style.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CloseButton from "../../buttons/CloseButton";
import BackButton from "../../buttons/BackButton";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";

const EditConstructionReport = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [taskName, setTaskName] = useState('');
    const [note, setNote] = useState('');
    const [weather, setWeather] = useState('');
    const [executor, setExecutor] = useState('');
    const [state, setState] = useState('IN_PROGRESS');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/construction-reports/' + id
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setTaskName(response.data.taskName);
                setNote(response.data.note);
                setWeather(response.data.weather);
                setExecutor(response.data.executor.firstname + " " + response.data.executor.lastname);
                setState(response.data.state);
                setDate(response.data.date);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleEditContructionReport() {
        axios.put('http://localhost:8080/api/v1/construction-reports', {
            id: id,
            taskName: taskName,
            note: note,
            weather: weather,
            state: state,
            date: date,
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/projects");
    }

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/projects"}>
                    <CloseButton/>
                </Link>
            </div>

            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="taskName">Struný popis práce:</label>
                    <input type="text" id="taskName" name="taskName"
                           value={taskName} onChange={(event) => setTaskName(event.target.value)}/>

                    <label htmlFor="date">Datum záznamu:</label>
                    <input type="text" name="date" id="date"
                           value={date.substring(0,10)} readOnly={true}/>

                    <label htmlFor="note">Dodatečné poznámky:</label>
                    <input type="text" id="note" name="note"
                           value={note} onChange={(event) => setNote(event.target.value)}/>

                    <label htmlFor="state">Stav práce:</label>
                    <select id="state-select" value={state} onChange={(event) => setState(event.target.value)}>
                        <option value="FINISHED">Dokončeno</option>
                        <option value="IN_PROGRESS">Rozpracováno</option>
                        <option value="BLOCKED">Blokováno</option>
                    </select>

                    <label htmlFor="weather">Počasí:</label>
                    <input type="text" id="weather" name="weather"
                           value={weather} onChange={(event) => setWeather(event.target.value)}
                    />

                    <label htmlFor="executor">Autor záznamu:</label>
                    <input type="text" name="executor" id="executor"
                           value={executor} readOnly={true}/>

                </div>
                <div className={styles.rightSide}>
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleEditContructionReport}><AcceptButton/></div>
                <Link to={"/projects"}><RejectButton/></Link>
            </div>
        </form>
    );
}

export default EditConstructionReport;