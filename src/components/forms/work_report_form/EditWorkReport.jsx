import styles from "../style.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CloseButton from "../../buttons/CloseButton";
import BackButton from "../../buttons/BackButton";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";

const EditWorkReport = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [timeFrom, setTimeFrom] = useState(new Date());
    const [timeTo, setTimeTo] = useState(new Date());
    const [type, setType] = useState('WORK_REPORT');
    const [location, setLocation] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/work-reports/' + id
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setTimeFrom(new Date(response.data.timeFrom));
                setTimeTo(new Date(response.data.timeTo));
                setType(response.data.type);
                setLocation(response.data.location);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleEditWorkReport() {
        axios.put('http://localhost:8080/api/v1/work-reports', {
            id: id,
            timeFrom: timeFrom,
            timeTo: timeTo,
            type: type,
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/users");
    }

    function getState(state) {
        switch (state) {
            case "WORK_REPORT":
                return "Pracovní záznam";
            case "HOLIDAY":
                return "Dovolená";
            case "SICK_NOTE":
                return "Nemocenská";
            case "MATERNITY_LEAVE":
                return "Mateřská";
            case "UNPAID_VACATION":
                return "Neplacená dovolená";
            default:
                return "Sick day";
        }
    }

    return(
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/users"}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="type">Typ výkazu:</label>
                    <select name="type" onChange={(event) => setType(event.target.value)}>
                        <option value="WORK_REPORT" selected>Pracovní záznam</option>
                        <option value="HOLIDAY">Dovolená</option>
                        <option value="SICK_NOTE">Nemocenská</option>
                        <option value="MATERNITY_LEAVE">Mateřská</option>
                        <option value="UNPAID_VACATION">Neplacená dovolená</option>
                        <option value="SICK_DAY">Sick day</option>
                    </select>

                    <label htmlFor="location">Lokalita:</label>
                    <input type="text" id="location" name="location"
                           readOnly={true} value={location ? location.city ? location.city : '-' : '-'}/>

                    <label htmlFor="timeFrom">Datum zahájení práce:</label>
                    <input
                        type="datetime-local"
                        id="timeFrom"
                        name="timeFrom"
                        value={timeFrom.toISOString().slice(0, 16) }
                        onChange={(event) => setTimeFrom(new Date(event.target.value))}
                    />
                    <label htmlFor="timeTo">Datum ukončení práce:</label>
                    <input
                        type="datetime-local"
                        id="timeTo"
                        name="timeTo"
                        value={timeTo.toISOString().slice(0, 16) }
                        onChange={(event) => setTimeTo(new Date(event.target.value))}
                    />
                </div>

                <div className={styles.rightSide}>
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleEditWorkReport}><AcceptButton/></div>
                <Link to={"/users"}><RejectButton/></Link>
            </div>
        </form>
    );
}

export default EditWorkReport;