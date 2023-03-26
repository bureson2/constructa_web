import styles from "../style.module.scss";
import {Link, useNavigate} from "react-router-dom";
import CloseButton from "../../buttons/CloseButton";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import React, {useEffect, useState} from "react";
import axios from "axios";
import EditButton from "../../buttons/EditButton";
import BackButton from "../../buttons/BackButton";

const CompanyDetail = () => {
    const url = window.location.href;
    const companyId = url.substring(url.lastIndexOf("/") + 1);
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [din, setDin] = useState('');
    const [cin, setCin] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/companies/' + companyId
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
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/companies/edit/" + companyId} className={styles.topEditButton}>
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
                           value={companyName} readOnly={true}
                           onChange={(event) => setCompanyName(event.target.value)}/>

                    <label htmlFor="companyCin">IČO:</label>
                    <input type="text" id="companyCin" name="companyCin"
                           value={cin} readOnly={true}
                           onChange={(event) => setCin(event.target.value)}/>

                    <label htmlFor="companyDin">DIČ:</label>
                    <input type="text" id="companyDin" name="companyDin"
                           value={din} readOnly={true}
                           onChange={(event) => setDin(event.target.value)}/>
                </div>
                <div className={styles.rightSide}>
                </div>
            </div>
            <Link to={"/companies"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>

        </form>
    );
}

export default CompanyDetail;