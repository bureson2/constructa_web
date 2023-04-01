import styles from "../style.module.scss";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import CloseButton from "../../buttons/CloseButton";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import UserInput from "../../inputs/UserInput";

const EditProject = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [projectName, setProjectName] = useState('');
    const [buldingFacility, setBuildingFacility] = useState('');
    const [projectState, setProjectState] = useState('');
    const [projectManagerId, setUserId] = useState(id);
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
                switch (response.data.state){
                    case "Hotovo":
                        setProjectState("FINISHED")
                        break;
                    case "Příprava":
                        setProjectState("IN_PREPARATION")
                        break;
                    default: setProjectState("IN_REALIZATION")
                }
                setUserId(response.data.projectManager);
                setStartsAt(new Date(response.data.startedAt).toISOString().slice(0, 16));
                setDeadline(new Date(response.data.deadline).toISOString().slice(0, 16));
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

    function handleEdit() {
        axios.put('http://localhost:8080/api/v1/projects', {
            id: id,
            name: projectName,
            buldingFacility: buldingFacility,
            state: projectState,
            country: country,
            startedAt: startsAt,
            deadline: deadline,
            city: city,
            street: street,
            postCode: postCode,
            descriptiveNumber: descriptiveNumber,
            userId: projectManagerId
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
                    <label htmlFor="projectName">Název projektu:</label>
                    <input type="text" id="projectName" name="projectName"
                           value = {projectName}
                           onChange={(event) => setProjectName(event.target.value)}/>

                    <label htmlFor="state-select">Stav projektu projektu:</label>
                    <select id="state-select" value={projectState} onChange={(event) => setProjectState(event.target.value)}>
                        <option value="FINISHED">Hotovo</option>
                        <option value="IN_PREPARATION">Příprava</option>
                        <option value="IN_REALIZATION">Realizace</option>
                    </select>

                    <label htmlFor="buldingFacility">Stavební objekt:</label>
                    <input type="text" id="buldingFacility" name="buldingFacility"
                           value = {buldingFacility}
                           onChange={(event) => setBuildingFacility(event.target.value)}/>
                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input
                        type="datetime-local"
                        id="timeFrom"
                        name="timeFrom"
                        value={startsAt}
                        onChange={(event) => setStartsAt(event.target.value)}
                    />
                    <label htmlFor="timeTo">Plánované datum ukončení:</label>
                    <input
                        type="datetime-local"
                        id="timeTo"
                        name="timeTo"
                        value={deadline}
                        onChange={(event) => setDeadline(event.target.value)}
                    />
                    <label htmlFor="projectManager">Projektový manager:</label>
                    <UserInput onUserIdChange={setUserId} defaultUser={projectManagerId}
                    />
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="city">Město:</label>
                    <input type="text" id="city" name="city"
                           value = {city}
                           onChange={(event) => setCity(event.target.value)}/>

                    <label htmlFor="street">Ulice:</label>
                    <input type="text" id="street" name="street"
                           value = {street}
                           onChange={(event) => setStreet(event.target.value)}/>

                    <label htmlFor="descriptiveNumber">Číslo popisné:</label>
                    <input type="text" id="descriptiveNumber" name="descriptiveNumber"
                           value = {descriptiveNumber}
                           onChange={(event) => setDescriptiveNumber(event.target.value)}/>

                    <label htmlFor="postCode">PSČ:</label>
                    <input type="text" id="postCode" name="postCode"
                           value = {postCode}
                           onChange={(event) => setPostCode(event.target.value)}/>

                    <label htmlFor="country">Domovská země společnosti:</label>
                    <input type="text" id="country" name="country"
                           value = {country}
                           onChange={(event) => setCountry(event.target.value)}/>
                </div>
            </div>

            <div className={styles.formButtons}>
                <div onClick={handleEdit}><AcceptButton/></div>
                <Link to={"/projects"}><RejectButton/></Link>
            </div>
        </form>
    );
}

export default EditProject;