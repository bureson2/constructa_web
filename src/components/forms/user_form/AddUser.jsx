import styles from "../style.module.scss";
import axios from 'axios';
import AcceptButton from "../../buttons/AcceptButton";
import {Link, useNavigate} from "react-router-dom";
import RejectButton from "../../buttons/RejectButton";
import React, {useState} from "react";
import CloseButton from "../../buttons/CloseButton";

const AddUser = () => {
    const navigate = useNavigate();
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
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postCode, setPostCode] = useState('');
    const [descriptiveNumber, setDescriptiveNumber] = useState('');

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
            bankAccount: bankAccount,
            country: country,
            city: city,
            street: street,
            postCode: postCode,
            descriptiveNumber: descriptiveNumber,
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

                    <label htmlFor="country">Země:</label>
                    <input type="text" id="country" name="country"
                           onChange={(event) => setCountry(event.target.value)}/>

                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="bankAccount">Bankovní účet:</label>
                    <input type="text" id="bankAccount" name="bankAccount"
                           value={bankAccount}
                           onChange={(event) => setBankAccout(event.target.value)}/>
                    <label htmlFor="hourRate">Hodinová mzda:</label>
                    <input type="text" id="hourRate" name="hourRate"
                           onChange={(event) => setHourRate(event.target.value)}/>
                    <label htmlFor="monthSalary">Měsíční mzda:</label>
                    <input type="text" id="monthSalary" name="monthSalary"
                           onChange={(event) => setMonthSalary(event.target.value)}/>
                    <label htmlFor="role-select">Pracovní pozice:</label>
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