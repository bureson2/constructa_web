import styles from "../style.module.scss";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import BackButton from "../../buttons/BackButton";
import ReportButton from "../../buttons/ReportButton";
import ConstructionReports from "../../tables/ConstructionReports";

const ProjectDetail = () => {
    const url = window.location.href;
    const projectId = url.substring(url.lastIndexOf("/") + 1);
    const [projectName, setProjectName] = useState('');
    const [buldingFacility, setBuildingFacility] = useState('');
    const [projectState, setProjectState] = useState('');
    const [projectManagerId, setUserId] = useState('');
    const [startsAt, setStartsAt] = useState('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/projects/' + projectId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setProjectName(response.data.name);
                setBuildingFacility(response.data.buldingFacility);
                setProjectState(response.data.state);
                setUserId(response.data.projectManager.firstname + " " + response.data.projectManager.lastname);
                setStartsAt(response.data.startedAt);
                setDeadline(response.data.deadline);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/projects/" + projectId + "/reports/create"} >
                    <ReportButton/>
                </Link>
                <Link to={"/projects/edit/" + projectId}>
                    <EditButton/>
                </Link>
                <Link to={"/projects"}>
                    <CloseButton/>
                </Link>
            </div>

            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="projectName">Název projektu:</label>
                    <input type="text" id="projectName" name="projectName"
                           value={projectName} readOnly={true}/>

                    <label htmlFor="buldingFacility">Stavební objekt:</label>
                    <input type="text" id="buldingFacility" name="buldingFacility"
                           value={buldingFacility} readOnly={true}/>

                    <label htmlFor="projectState">Stav projektu:</label>
                    <input type="text" id="projectState" name="projectState"
                           value={projectState} readOnly={true}/>

                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input type="text" name="timeFrom" id="timeFrom"
                           value={startsAt.substring(0,16)} readOnly={true}/>

                    <label htmlFor="timeTo">Plánované datum ukončení:</label>
                    <input type="text" name="timeTo" id="timeTo"
                           value={deadline.substring(0,16)} readOnly={true}/>

                    <label htmlFor="projectManager">Projektový manager:</label>
                    <input type="text" name="projectManager" id="projectManager"
                           value={projectManagerId} readOnly={true}
                    />
                </div>
                <div className={styles.rightSide}>
                    <ConstructionReports projectId={projectId}/>
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

export default ProjectDetail;