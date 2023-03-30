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
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postCode, setPostCode] = useState('');
    const [descriptiveNumber, setDescriptiveNumber] = useState('');

    function handleCreateProject() {
        axios.post('http://localhost:8080/api/v1/projects', {
            name: projectName,
            buldingFacility: buldingFacility,
            startedAt: startsAt,
            deadline: deadline,
            userId: projectManagerId,
            country: country,
            city: city,
            street: street,
            postCode: postCode,
            descriptiveNumber: descriptiveNumber,
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
                    <label htmlFor="city">Město:</label>
                    <input type="text" id="city" name="city"
                           onChange={(event) => setCity(event.target.value)}/>

                    <label htmlFor="street">Ulice:</label>
                    <input type="text" id="street" name="street"
                           onChange={(event) => setStreet(event.target.value)}/>

                    <label htmlFor="descriptiveNumber">Číslo popisné:</label>
                    <input type="text" id="descriptiveNumber" name="descriptiveNumber"
                           onChange={(event) => setDescriptiveNumber(event.target.value)}/>

                    <label htmlFor="postCode">PSČ:</label>
                    <input type="text" id="postCode" name="postCode"
                           onChange={(event) => setPostCode(event.target.value)}/>

                    <label htmlFor="country">Domovská země společnosti:</label>
                    <input type="text" id="country" name="country"
                           onChange={(event) => setCountry(event.target.value)}/>
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