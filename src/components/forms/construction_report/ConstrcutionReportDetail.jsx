import styles from "../style.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReportButton from "../../buttons/ReportButton";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import ConstructionReports from "../../tables/ConstructionReports";
import BackButton from "../../buttons/BackButton";

const ConstructionReportDetail = () => {
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
                           value={taskName} readOnly={true}/>

                    <label htmlFor="date">Datum záznamu:</label>
                    <input type="text" name="date" id="date"
                           value={date.substring(0,10)} readOnly={true}/>

                    <label htmlFor="note">Dodatečné poznámky:</label>
                    <input type="text" id="note" name="note"
                           value={note} readOnly={true}/>

                    <label htmlFor="state">Stav práce:</label>
                    <input type="text" name="state" id="state"
                           value={state} readOnly={true}
                    />

                    <label htmlFor="weather">Počasí:</label>
                    <input type="text" id="weather" name="weather"
                           value={weather} readOnly={true}/>

                    <label htmlFor="executor">Autor záznamu:</label>
                    <input type="text" name="executor" id="executor"
                           value={executor} readOnly={true}/>

                </div>
                <div className={styles.rightSide}>
                </div>
            </div>
            <div>

                <Link to={"/projects"} className={styles.bottomBackButton}>
                    <BackButton/>
                </Link>
            </div>
        </form>
    );
}

export default ConstructionReportDetail;