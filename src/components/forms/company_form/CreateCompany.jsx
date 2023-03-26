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

    function handleCreateCompany() {
        axios.post('http://localhost:8080/api/v1/companies', {
            name: companyName,
            din: din,
            cin: cin,
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/projects");
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
                </div>
                <div className={styles.rightSide}>
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