import styles from "../style.module.scss";
import {Link, useParams} from "react-router-dom";
import CloseButton from "../../buttons/CloseButton";
import React, {useEffect, useState} from "react";
import axios from "axios";
import EditButton from "../../buttons/EditButton";
import BackButton from "../../buttons/BackButton";

const CompanyDetail = () => {
    const { id } = useParams();
    const [companyName, setCompanyName] = useState('');
    const [din, setDin] = useState('');
    const [cin, setCin] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [postCode, setPostCode] = useState('');
    const [descriptiveNumber, setDescriptiveNumber] = useState('');
    const [phone,setPhone] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/companies/' + id
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setCompanyName(response.data.name);
                setDin(response.data.din);
                setCin(response.data.cin);
                setPhone(response.data.phone);
                setCountry(response.data.companyAddress.country);
                setCity(response.data.companyAddress.city);
                setStreet(response.data.companyAddress.street);
                setDescriptiveNumber(response.data.companyAddress.descriptiveNumber);
                setPostCode(response.data.companyAddress.postCode);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/companies/edit/" + id} className={styles.topEditButton}>
                    <EditButton/>
                </Link>
                <Link to={"/companies"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="companyName">Název společnosti:</label>
                    <input type="text" id="companyName" name="companyName"
                           value={companyName} readOnly={true}/>

                    <label htmlFor="companyCin">IČO:</label>
                    <input type="text" id="companyCin" name="companyCin"
                           value={cin} readOnly={true}/>

                    <label htmlFor="companyDin">DIČ:</label>
                    <input type="text" id="companyDin" name="companyDin"
                           value={din} readOnly={true}/>

                    <label htmlFor="phone">DIČ:</label>
                    <input type="text" id="phone" name="phone"
                           value={phone} readOnly={true}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="city">Město:</label>
                    <input type="text" id="city" name="city"
                           value={city} readOnly={true}/>

                    <label htmlFor="street">Ulice:</label>
                    <input type="text" id="street" name="street"
                           value={street} readOnly={true}/>

                    <label htmlFor="descriptiveNumber">Číslo popisné:</label>
                    <input type="text" id="descriptiveNumber" name="descriptiveNumber"
                           value={descriptiveNumber} readOnly={true}/>

                    <label htmlFor="postCode">PSČ:</label>
                    <input type="text" id="postCode" name="postCode"
                           value={postCode} readOnly={true}/>

                    <label htmlFor="country">Domovská země společnosti:</label>
                    <input type="text" id="country" name="country"
                           value={country} readOnly={true}/>
                </div>
            </div>
            <Link to={"/companies"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>

        </form>
    );
}

export default CompanyDetail;