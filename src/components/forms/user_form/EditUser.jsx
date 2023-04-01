import styles from "../style.module.scss";
import axios from 'axios';
import {Link, useNavigate, useParams} from "react-router-dom";
import CloseButton from "../../buttons/CloseButton";
import React, {useEffect, useState} from "react";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";

const EditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postCode, setPostCode] = useState('');
    const [descriptiveNumber, setDescriptiveNumber] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users/' + id
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
                setCountry(response.data.address.country);
                setCity(response.data.address.city);
                setStreet(response.data.address.street);
                setDescriptiveNumber(response.data.address.descriptiveNumber);
                setPostCode(response.data.address.postCode);
                setPhone(response.data.phone);
                if(response.data.role === "Manager"){
                    setRoles("ROLE_MANAGER");
                } else if(response.data.role === "Referent") {
                    setRoles("ROLE_REPORTER");
                } else if(response.data.role === "Strojní technik") {
                    setRoles("ROLE_MECHANICAL_ENGINEER");
                } else if(response.data.role === "Stavbyvedoucí") {
                    setRoles("ROLE_CONSTRUCTION_MANAGER");
                } else if(response.data.role === "Řidič") {
                    setRoles("ROLE_DRIVER");
                } else if(response.data.role === "Zedník") {
                    setRoles("ROLE_WORKER");
                } else if(response.data.role === "Zaměstnanec") {
                    setRoles("ROLE_EMPLOYEE");
                } else if(response.data.role === "Externalista") {
                    setRoles("ROLE_EXTERNALIST");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleEdit() {
        axios.put('http://localhost:8080/api/v1/users', {
            id: id,
            email: email,
            password: password,
            titleBeforeName: titleBeforeName,
            firstname: firstname,
            lastname: lastname,
            titleAfterName: titleAfterName,
            role: roles,
            dateOfBirth: dateOfBirth,
            birthId: birthId,
            hourRate: hourRate,
            monthSalary: monthSalary,
            bankAccount: bankAccount,
            phone: phone,
            country: country,
            city: city,
            street: street,
            postCode: postCode,
            descriptiveNumber: descriptiveNumber
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/users");
    }

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/users"}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="titleBeforeName">Tituly před jménem:</label>
                    <input type="text" id="titleBeforeName" name="titleBeforeName"
                           value={titleBeforeName}
                           onChange={(event) => setTitleBeforeName(event.target.value)}/>

                    <label htmlFor="firstname">Jméno:</label>
                    <input type="text" id="firstname" name="firstname"
                           value={firstname}
                           onChange={(event) => setFirstname(event.target.value)}/>

                    <label htmlFor="lastname">Příjmení:</label>
                    <input type="text" id="lastname" name="lastname"
                           value={lastname}
                           onChange={(event) => setLastname(event.target.value)}/>
                    <label htmlFor="titleAfterName">Tituly za jménem:</label>

                    <input type="text" id="titleAfterName" name="titleAfterName"
                           value={titleAfterName}
                           onChange={(event) => setTitleAfterName(event.target.value)}/>

                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email"
                           value={email}
                           onChange={(event) => setEmail(event.target.value)}/>

                    <label htmlFor="phone">Telefoní číslo:</label>
                    <input type="text" id="phone" name="phone"
                           value={phone}
                           onChange={(event) => setPhone(event.target.value)}/>

                    <label htmlFor="dateOfBirth">Datum narození:</label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth"
                           value={dateOfBirth.substring(0, 10)}
                           onChange={(event) => setDateOfBirth(event.target.value)}/>

                    <label htmlFor="birthId">Rodné číslo:</label>
                    <input type="text" id="birthId" name="birthId"
                           value={birthId}
                           onChange={(event) => setBirthId(event.target.value)}/>

                    <label htmlFor="city">Město:</label>
                    <input type="text" id="city" name="city"
                           value={city}
                           onChange={(event) => setCity(event.target.value)}/>

                    <label htmlFor="street">Ulice:</label>
                    <input type="text" id="street" name="street"
                           value={street}
                           onChange={(event) => setStreet(event.target.value)}/>

                    <label htmlFor="descriptiveNumber">Číslo popisné:</label>
                    <input type="text" id="descriptiveNumber" name="descriptiveNumber"
                           value={descriptiveNumber}
                           onChange={(event) => setDescriptiveNumber(event.target.value)}/>

                    <label htmlFor="postCode">PSČ:</label>
                    <input type="text" id="postCode" name="postCode"
                           value={postCode}
                           onChange={(event) => setPostCode(event.target.value)}/>

                    <label htmlFor="country">Země:</label>
                    <input type="text" id="country" name="country"
                           value={country}
                           onChange={(event) => setCountry(event.target.value)}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="hourRate">Hodinová mzda:</label>
                    <input type="text" id="hourRate" name="hourRate"
                           value={hourRate}
                           onChange={(event) => setHourRate(event.target.value)}/>
                    <label htmlFor="monthSalary">Měsíční mzda:</label>
                    <input type="text" id="monthSalary" name="monthSalary"
                           value={monthSalary}
                           onChange={(event) => setMonthSalary(event.target.value)}/>
                    <label htmlFor="bankAccount">Bankovní účet:</label>
                    <input type="text" id="bankAccount" name="bankAccount"
                           value={bankAccount}
                           onChange={(event) => setBankAccout(event.target.value)}/>
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
                <div onClick={handleEdit}><AcceptButton/></div>
                <Link to={"/users"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default EditUser;