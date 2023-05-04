import styles from "../style.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import axios from "axios";
import {useState} from "react";
import CloseButton from "../../buttons/CloseButton";
import UserInput from "../../inputs/UserInput";

const CreateConstructionReport = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [taskName, setTaskName] = useState('');
    const [note, setNote] = useState('');
    const [weather, setWeather] = useState('');
    const [executorId, setExecutor] = useState('');
    const [state, setState] = useState('IN_PROGRESS');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    function handleCreateContructionReport() {
        axios.post('http://localhost:8080/api/v1/construction-reports', {
            taskName: taskName,
            note: note,
            weather: weather,
            executorId: executorId,
            state: state,
            projectId: id,
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
                <Link to={"/projects/" + id}>
                    <CloseButton/>
                </Link>
            </div>

            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="projectManager">Autor záznamu:</label>
                    <UserInput onUserIdChange={setExecutor} />
                    <label htmlFor="date">Datum zahájení:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        min={new Date().toISOString().slice(0, 10)}
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        onChange={(event) => setDate(event.target.value)}
                    />
                    <label htmlFor="taskName">Název činnosti:</label>
                    <input type="text" id="taskName" name="taskName"
                           onChange={(event) => setTaskName(event.target.value)}/>

                    <label htmlFor="note">Poznámka:</label>
                    <input type="text" id="note" name="note"
                           onChange={(event) => setNote(event.target.value)}/>

                    <label htmlFor="weather">Počasí:</label>
                    <input type="text" id="weather" name="weather"
                           onChange={(event) => setWeather(event.target.value)}/>
                    <label htmlFor="state">Stav práce:</label>
                    <select name="state" onChange={(event) => setState(event.target.value)}>
                        <option value="FINISHED">Dokončeno</option>
                        <option value="IN_PROGRESS" selected>Rozpracováno</option>
                        <option value="BLOCKED">Blokováno</option>
                    </select>
                </div>
                <div className={styles.rightSide}>

                </div>
            </div>


            <div className={styles.formButtons}>
                <div onClick={handleCreateContructionReport}><AcceptButton/></div>
                <Link to={"/projects/" + id}><RejectButton/></Link>
            </div>
        </form>
    );
}

export default CreateConstructionReport;