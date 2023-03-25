
import styles from "../style.module.scss";
import axios from 'axios';
import {Link} from "react-router-dom";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import BackButton from "../../buttons/BackButton";
import React, {useEffect, useState} from "react";

const EditUser = () => {
    const url = window.location.href;
    const userId = url.substring(url.lastIndexOf("/") + 1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [titleBeforeName, setTitleBeforeName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [titleAfterName, setTitleAfterName] = useState('');
    const [roles, setRoles] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [birthId, setBirthId] = useState('');
    const [hourRate, setHourRate] = useState('');
    const [monthSalary, setMonthSalary] = useState('');
    const [bankAccount, setBankAccout] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users/' + userId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setEmail(response.data.email);
                setTitleBeforeName(response.data.titleBeforeName);
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setTitleAfterName(response.data.titleAfterName);
                setDateOfBirth(response.data.dateOfBirth);
                setBirthId(response.data.birthId);
                setHourRate(response.data.hourRate);
                setMonthSalary(response.data.monthSalary);
                setBankAccout(response.data.bankAccount);
                setPhone(response.data.phone);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/tasks/users/" + userId} className={styles.topEditButton}>
                    <EditButton/>
                </Link>
                <Link to={"/vehicles"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="titleBeforeName">Tituly před jménem:</label>
                    <input type="text" id="titleBeforeName" name="titleBeforeName"
                           onChange={(event) => setTitleBeforeName(event.target.value)}/>
                    <label htmlFor="firstname">Jméno:</label>
                    <input type="text" id="firstname" name="firstname"
                           onChange={(event) => setFirstname(event.target.value)}/>
                    <label htmlFor="lastname">Příjmení:</label>
                    <input type="text" id="lastname" name="lastname"
                           onChange={(event) => setLastname(event.target.value)}/>
                    <label htmlFor="titleAfterName">Tituly za jménem:</label>
                    <input type="text" id="titleAfterName" name="titleAfterName"
                           onChange={(event) => setTitleAfterName(event.target.value)}/>
                    <label htmlFor="dateOfBirth">Datum narození:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth"
                           onChange={(event) => setDateOfBirth(event.target.value)}/>
                    <label htmlFor="birthId">Rodné číslo:</label>
                    <input type="text" id="birthId" name="birthId"
                           onChange={(event) => setBirthId(event.target.value)}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email"
                           onChange={(event) => setEmail(event.target.value)}/>
                    <label htmlFor="phone">Telefoní číslo:</label>
                    <input type="text" id="phone" name="phone"
                           onChange={(event) => setPhone(event.target.value)}/>
                    <label htmlFor="password">heslo:</label>
                    <input type="password" id="password" name="password"
                           onChange={(event) => setPassword(event.target.value)}/>
                    <label htmlFor="hourRate">Hodinová mzda:</label>
                    <input type="text" id="hourRate" name="hourRate"
                           onChange={(event) => setHourRate(event.target.value)}/>
                    <label htmlFor="monthSalary">Měsíční mzda:</label>
                    <input type="text" id="monthSalary" name="monthSalary"
                           onChange={(event) => setMonthSalary(event.target.value)}/>
                    <label htmlFor="bankAccount">Bankovní účet:</label>
                    <input type="text" id="bankAccount" name="bankAccount"
                           onChange={(event) => setBankAccout(event.target.value)}/>
                </div>
            </div>
            <Link to={"/users"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default EditUser;