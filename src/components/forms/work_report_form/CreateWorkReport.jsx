import styles from "../style.module.scss";
import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CloseButton from "../../buttons/CloseButton";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import UserInput from "../../inputs/UserInput";

const CreateWorkReport = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const now = new Date().toISOString().slice(0,16);
    const [timeFrom, setTimeFrom] = useState(now);
    const [timeTo, setTimeTo] = useState(now);
    const [type, setType] = useState('WORK_REPORT');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userId, setUserId] = useState(id);

    useEffect(() => {
        if(id != null){
            axios.get('http://localhost:8080/api/v1/users/' + id
                , {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    setFirstname(response.data.firstname);
                    setLastname(response.data.lastname);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, []);


    function handleCreateWorkReport() {
        axios.post('http://localhost:8080/api/v1/work-reports', {
            timeFrom: timeFrom,
            timeTo: timeTo,
            type: type,
            userId : userId,
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

                    {
                        id == null ?
                            <UserInput onUserIdChange={setUserId}/>
                            :
                            <input value={firstname + " " + lastname}
                                   readOnly={true}/>
                    }
                    <label htmlFor="type">Typ výkazu:</label>
                    <select name="type" onChange={(event) => setType(event.target.value)}>
                        <option value="WORK_REPORT" selected>Pracovní záznam</option>
                        <option value="HOLIDAY">Dovolená</option>
                        <option value="SICK_NOTE">Nemocenská</option>
                        <option value="MATERNITY_LEAVE">Mateřská</option>
                        <option value="UNPAID_VACATION">Neplacená dovolená</option>
                        <option value="SICK_DAY">Sick day</option>
                    </select>
                    <label htmlFor="timeFrom">Čas zahájení práce:</label>
                    <input
                        type="datetime-local"
                        id="timeFrom"
                        name="timeFrom"
                        defaultValue={now}
                        onChange={(event) => setTimeFrom(event.target.value)}
                    />
                    <label htmlFor="timeTo">Čas ukončení práce:</label>
                    <input
                        type="datetime-local"
                        id="timeTo"
                        name="timeTo"
                        defaultValue={now}
                        onChange={(event) => setTimeTo(event.target.value)}
                    />
                </div>

                <div className={styles.rightSide}>
                </div>
             </div>
            <div className={styles.formButtons}>
                <div onClick={handleCreateWorkReport}><AcceptButton/></div>
                <Link to={"/users"}><RejectButton/></Link>
            </div>
        </form>
    );
}

export default CreateWorkReport;