import styles from "../style.module.scss";
import axios from 'axios';
import BackButton from "../../buttons/BackButton";
import {Link} from "react-router-dom";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import React, {useEffect, useState} from "react";
import ReportButton from "../../buttons/ReportButton";

const UserDetail = () => {
    const url = window.location.href;
    const userId = url.substring(url.lastIndexOf("/") + 1);
    const [email, setEmail] = useState('');
    const [titleBeforeName, setTitleBeforeName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [titleAfterName, setTitleAfterName] = useState('');
    const [roles, setRoles] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [dateOfAcceptance, setDateOfAcceptance] = useState('');
    const [birthId, setBirthId] = useState('');
    const [hourRate, setHourRate] = useState('');
    const [monthSalary, setMonthSalary] = useState('');
    const [bankAccount, setBankAccout] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({
        country: "",
        city: "",
        postCode: "",
        street: "",
        descriptiveNumber: "",
    });

    useEffect(() => {
        // TODO
        axios.get('http://localhost:8080/api/v1/users/' + userId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setEmail(response.data.email);
                setTitleBeforeName(response.data.titleBeforeName ? response.data.titleBeforeName : "");
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setTitleAfterName(response.data.titleAfterName ? response.data.titleAfterName : "");
                setDateOfBirth(response.data.dateOfBirth);
                setBirthId(response.data.birthId);
                setHourRate(response.data.hourRate);
                setMonthSalary(response.data.monthSalary);
                setBankAccout(response.data.bankAccount);
                setPhone(response.data.phone);
                setDateOfAcceptance(response.data.dateOfAcceptance);
                setRoles(response.data.role);
                setAddress(response.data.userAddress);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/work-reports/" + userId} className={styles.topEditButton}>
                    <ReportButton/>
                </Link>
                <Link to={"/users/edit/" + userId} className={styles.topEditButton}>
                    <EditButton/>
                </Link>
                <Link to={"/users"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="titleBeforeName">Tituly před jménem:</label>
                    <input type="text" id="titleBeforeName" name="titleBeforeName"
                           value={titleBeforeName} readOnly={true}
                           onChange={(event) => setTitleBeforeName(event.target.value)}/>
                    <label htmlFor="firstname">Jméno:</label>
                    <input type="text" id="firstname" name="firstname"
                           value={firstname} readOnly={true}
                           onChange={(event) => setFirstname(event.target.value)}/>
                    <label htmlFor="lastname">Příjmení:</label>
                    <input type="text" id="lastname" name="lastname"
                           value={lastname} readOnly={true}
                           onChange={(event) => setLastname(event.target.value)}/>
                    <label htmlFor="titleAfterName">Tituly za jménem:</label>
                    <input type="text" id="titleAfterName" name="titleAfterName"
                           value={titleAfterName} readOnly={true}
                           onChange={(event) => setTitleAfterName(event.target.value)}/>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email"
                           value={email} readOnly={true}
                           onChange={(event) => setEmail(event.target.value)}/>
                    <label htmlFor="phone">Telefoní číslo:</label>
                    <input type="text" id="phone" name="phone"
                           value={phone} readOnly={true}
                           onChange={(event) => setPhone(event.target.value)}/>
                    <label htmlFor="dateOfBirth">Datum narození:</label>
                    <input type="text" id="dateOfBirth" name="dateOfBirth"
                           value={dateOfBirth.substring(0, 10)} readOnly={true}
                           onChange={(event) => setDateOfBirth(event.target.value)}/>
                    <label htmlFor="birthId">Rodné číslo:</label>
                    <input type="text" id="birthId" name="birthId"
                           value={birthId} readOnly={true}
                           onChange={(event) => setBirthId(event.target.value)}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="dateOfAcceptance">Datum nástupu:</label>
                    <input type="text" id="dateOfAcceptance" name="dateOfAcceptance"
                           value={dateOfAcceptance.substring(0, 10)} readOnly={true}
                           onChange={(event) => setDateOfAcceptance(event.target.value)}/>
                    <label htmlFor="hourRate">Hodinová mzda:</label>
                    <input type="text" id="hourRate" name="hourRate"
                           value={hourRate} readOnly={true}
                           onChange={(event) => setHourRate(event.target.value)}/>
                    <label htmlFor="monthSalary">Měsíční mzda:</label>
                    <input type="text" id="monthSalary" name="monthSalary"
                           value={monthSalary} readOnly={true}
                           onChange={(event) => setMonthSalary(event.target.value)}/>
                    <label htmlFor="bankAccount">Bankovní účet:</label>
                    <input type="text" id="bankAccount" name="bankAccount"
                           value={bankAccount} readOnly={true}
                           onChange={(event) => setBankAccout(event.target.value)}/>
                    <label htmlFor="role">Pracovní pozice:</label>
                    <input type="text" id="role" name="role"
                           value={roles} readOnly={true}
                           onChange={(event) => setRoles(event.target.value)}/>
                </div>
            </div>
            <Link to={"/users"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default UserDetail;