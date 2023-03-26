import styles from "../style.module.scss";
import UserInput from "../../inputs/UserInput";
import {Link, useNavigate} from "react-router-dom";
import CloseButton from "../../buttons/CloseButton";
import React, {useState} from "react";
import MapInput from "../../inputs/MapInput";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import axios from "axios";

const CreateProject = () => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [buldingFacility, setBuildingFacility] = useState('');
    const [projectState, setProjectState] = useState('');
    const [projectManagerId, setUserId] = useState('');
    const [startsAt, setStartsAt] = useState('');
    const [deadline, setDeadline] = useState('');

    function handleCreateProject() {
        axios.post('http://localhost:8080/api/v1/projects', {
            name: projectName,
            buldingFacility: buldingFacility,
            startedAt: startsAt,
            deadline: deadline,
            userId: projectManagerId,
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
                <Link to={"/projects"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="projectName">Název projektu:</label>
                    <input type="text" id="projectName" name="projectName"
                           onChange={(event) => setProjectName(event.target.value)}/>
                    <label htmlFor="buldingFacility">Stavební objekt:</label>
                    <input type="text" id="buldingFacility" name="buldingFacility"
                           onChange={(event) => setBuildingFacility(event.target.value)}/>
                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input
                        type="datetime-local"
                        id="timeFrom"
                        name="timeFrom"
                        min={new Date().toISOString().slice(0, 16)}
                        value={startsAt}
                        onChange={(event) => setStartsAt(event.target.value)}
                    />
                    <label htmlFor="timeTo">Plánované datum ukončení:</label>
                    <input
                        type="datetime-local"
                        id="timeTo"
                        name="timeTo"
                        min={new Date().toISOString().slice(0, 16)}
                        value={deadline}
                        onChange={(event) => setDeadline(event.target.value)}
                    />
                    <label htmlFor="projectManager">Projektový manager:</label>
                    <UserInput onUserIdChange={setUserId} />
                </div>
                <div className={styles.rightSide}>
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleCreateProject}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>
        </form>
    );
}

export default CreateProject;