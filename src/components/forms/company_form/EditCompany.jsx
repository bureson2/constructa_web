import styles from "../style.module.scss";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import BackButton from "../../buttons/BackButton";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";

const EditCompany = () => {
    const navigate = useNavigate();
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

    function handleEdit() {
        axios.put('http://localhost:8080/api/v1/companies', {
            id: id,
            name: companyName,
            din: din,
            cin: cin,
            country: country,
            phone: phone,
            city: city,
            street: street,
            postCode: postCode,
            descriptiveNumber: descriptiveNumber
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
                <Link to={"/companies"}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="companyName">Název společnosti:</label>
                    <input type="text" id="companyName" name="companyName"
                           value={companyName} onChange={(event) => setCompanyName(event.target.value)}/>

                    <label htmlFor="companyCin">IČO:</label>
                    <input type="text" id="companyCin" name="companyCin"
                           value={cin} onChange={(event) => setCin(event.target.value)}/>

                    <label htmlFor="companyDin">DIČ:</label>
                    <input type="text" id="companyDin" name="companyDin"
                           value={din} onChange={(event) => setDin(event.target.value)}/>

                    <label htmlFor="phone">Telefonní číslo:</label>
                    <input type="text" id="phone" name="phone"
                           value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="city">Město:</label>
                    <input type="text" id="city" name="city"
                           value={city} onChange={(event) => setCity(event.target.value)}/>

                    <label htmlFor="street">Ulice:</label>
                    <input type="text" id="street" name="street"
                           value={street} onChange={(event) => setStreet(event.target.value)}/>

                    <label htmlFor="descriptiveNumber">Číslo popisné:</label>
                    <input type="text" id="descriptiveNumber" name="descriptiveNumber"
                           value={descriptiveNumber} onChange={(event) => setDescriptiveNumber(event.target.value)}/>

                    <label htmlFor="postCode">PSČ:</label>
                    <input type="text" id="postCode" name="postCode"
                           value={postCode} onChange={(event) => setPostCode(event.target.value)}/>

                    <label htmlFor="country">Domovská země společnosti:</label>
                    <input type="text" id="country" name="country"
                           value={country} onChange={(event) => setCountry(event.target.value)}/>
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleEdit}><AcceptButton/></div>
                <Link to={"/companies"}><RejectButton/></Link>
            </div>
        </form>
    );
}

export default EditCompany;