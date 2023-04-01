import styles from "../style.module.scss";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import BackButton from "../../buttons/BackButton";
import ReportButton from "../../buttons/ReportButton";
import ConstructionReports from "../../tables/ConstructionReports";

const ProjectDetail = () => {
    const { id } = useParams();
    const [projectName, setProjectName] = useState('');
    const [buldingFacility, setBuildingFacility] = useState('');
    const [projectState, setProjectState] = useState('');
    const [projectManagerId, setUserId] = useState('');
    const [startsAt, setStartsAt] = useState('');
    const [deadline, setDeadline] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postCode, setPostCode] = useState('');
    const [descriptiveNumber, setDescriptiveNumber] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/projects/' + id
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
                setCountry(response.data.projectAddress.country);
                setCity(response.data.projectAddress.city);
                setStreet(response.data.projectAddress.street);
                setDescriptiveNumber(response.data.projectAddress.descriptiveNumber);
                setPostCode(response.data.projectAddress.postCode);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/projects/" + id + "/reports/create"} >
                    <ReportButton/>
                </Link>
                <Link to={"/projects/edit/" + id}>
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

                    <label htmlFor="address">Adresa:</label>
                    <input type="text" id="address" name="address"
                           value={city + ", " + street + " " + descriptiveNumber + ", " + postCode + ", " + country}
                           readOnly={true}/>

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
                    <ConstructionReports projectId={id}/>
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