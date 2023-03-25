import styles from "../style.module.scss";
import axios from 'axios';
import AcceptButton from "../../buttons/AcceptButton";
import {Link, useNavigate} from "react-router-dom";
import RejectButton from "../../buttons/RejectButton";
import React, {useState} from "react";
import CloseButton from "../../buttons/CloseButton";

const AddUser = () => {
    const navigate = useNavigate();
    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [titleBeforeName, setTitleBeforeName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [titleAfterName, setTitleAfterName] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState("ROLE_EMPLOYEE");
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [birthId, setBirthId] = useState('');
    const [hourRate, setHourRate] = useState('');
    const [monthSalary, setMonthSalary] = useState('');
    const [bankAccount, setBankAccout] = useState('');
    const [phone, setPhone] = useState('');

    function handleCreateUser() {
        axios.post('http://localhost:8080/api/v1/auth/register', {
            email: email,
            phone: phone,
            titleBeforeName: titleBeforeName,
            firstname: firstname,
            lastname: lastname,
            titleAfterName: titleAfterName,
            roles: roles,
            password: password,
            dateOfBirth: dateOfBirth,
            birthId: birthId,
            hourRate: hourRate,
            monthSalary: monthSalary,
            bankAccount: bankAccount
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/users");
    }

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/users"} className={styles.topBackButton}>
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
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email"
                           onChange={(event) => setEmail(event.target.value)}/>
                    <label htmlFor="phone">Telefoní číslo:</label>
                    <input type="text" id="phone" name="phone"
                           onChange={(event) => setPhone(event.target.value)}/>
                    <label htmlFor="dateOfBirth">Datum narození:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth"
                           onChange={(event) => setDateOfBirth(event.target.value)}/>
                    <label htmlFor="birthId">Rodné číslo:</label>
                    <input type="text" id="birthId" name="birthId"
                           onChange={(event) => setBirthId(event.target.value)}/>
                    <label htmlFor="roles">Pracovní role:</label>

                </div>
                <div className={styles.rightSide}>
                    <input type="text" id="bankAccount" name="bankAccount"
                           onChange={(event) => setBankAccout(event.target.value)}/>
                    <label htmlFor="hourRate">Hodinová mzda:</label>
                    <input type="text" id="hourRate" name="hourRate"
                           onChange={(event) => setHourRate(event.target.value)}/>
                    <label htmlFor="monthSalary">Měsíční mzda:</label>
                    <input type="text" id="monthSalary" name="monthSalary"
                           onChange={(event) => setMonthSalary(event.target.value)}/>
                    <label htmlFor="bankAccount">Bankovní účet:</label>


                    <label htmlFor="role-select">Select your role:</label>
                    <select id="role-select" value={roles} onChange={(event) => setRoles(event.target.value)}>
                        <option value="ROLE_MANAGER">Manager</option>
                        <option value="ROLE_REPORTER">Referent</option>
                        <option value="ROLE_MECHANICAL_ENGINEER">Strojní technik</option>
                        <option value="ROLE_CONSTRUCTION_MANAGER">Stavbyvedoucí</option>
                        <option value="ROLE_DRIVER">Řidič</option>
                        <option value="ROLE_WORKER">Zedník</option>
                        <option value="ROLE_EMPLOYEE">Zaměstnanec</option>
                        <option value="ROLE_EXTERNALIST">Externalista</option>
                    </select>
                    <label htmlFor="password">heslo:</label>
                    <input type="password" id="password" name="password"
                           onChange={(event) => setPassword(event.target.value)}/>
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleCreateUser}><AcceptButton/></div>
                <Link to={"/users"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default AddUser;