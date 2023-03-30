import styles from "../style.module.scss";
import {Link, useNavigate} from "react-router-dom";
import CloseButton from "../../buttons/CloseButton";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import React, {useState} from "react";
import axios from "axios";

const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [din, setDin] = useState('');
    const [cin, setCin] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postCode, setPostCode] = useState('');
    const [descriptiveNumber, setDescriptiveNumber] = useState('');
    const [phone,setPhone] = useState('');

    function handleCreateCompany() {
        axios.post('http://localhost:8080/api/v1/companies', {
            name: companyName,
            din: din,
            cin: cin,
            country: country,
            city: city,
            street: street,
            postCode: postCode,
            descriptiveNumber: descriptiveNumber,
            phone: phone
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/companies");
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
                    <label htmlFor="companyName">Název společnosti:</label>
                    <input type="text" id="companyName" name="companyName"
                           onChange={(event) => setCompanyName(event.target.value)}/>

                    <label htmlFor="companyCin">IČO:</label>
                    <input type="text" id="companyCin" name="companyCin"
                           onChange={(event) => setCin(event.target.value)}/>

                    <label htmlFor="companyDin">DIČ:</label>
                    <input type="text" id="companyDin" name="companyDin"
                           onChange={(event) => setDin(event.target.value)}/>

                    <label htmlFor="phone">Kontaktní telefon:</label>
                    <input type="text" id="phone" name="phone"
                           onChange={(event) => setPhone(event.target.value)}/>

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
                <div onClick={handleCreateCompany}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>

        </form>
    );
}

export default CreateCompany;