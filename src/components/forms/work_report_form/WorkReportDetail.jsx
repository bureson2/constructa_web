import styles from "../style.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CloseButton from "../../buttons/CloseButton";

import BackButton from "../../buttons/BackButton";
import axios from "axios";

const WorkReportDetail = () => {
    const { id } = useParams();

    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [type, setType] = useState('WORK_REPORT');
    const [user, setUser] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/work-reports/' + id
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setTimeFrom(response.data.timeFrom);
                setTimeTo(response.data.timeTo);
                setType(response.data.type);
                setUser(response.data.reportingEmployee);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

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
                <Link to={"/users"} >
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label>Zaměstnanec:</label>
                    <input value={ user ? user.firstname + " " + user.lastname : "-"}
                           readOnly={true}/>
                    <label htmlFor="type">Typ výkazu:</label>
                    <input type="text" value={getState(type)}
                           readOnly={true}/>

                    {/*TODO lokalita*/}

                    <label htmlFor="timeFrom">Čas zahájení práce:</label>
                    <input
                        type="text" readOnly={true}
                        id="timeFrom"
                        name="timeFrom"
                        value={timeFrom.substring(0,10)}
                    />
                    <label htmlFor="timeTo">Čas ukončení práce:</label>
                    <input
                        type="text" readOnly={true}
                        id="timeTo"
                        name="timeTo"
                        value={timeTo.substring(0,10)}
                    />
                </div>

                <div className={styles.rightSide}>
                </div>
            </div>
            <Link to={"/work-reports/" + user.id} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}

export default WorkReportDetail;
