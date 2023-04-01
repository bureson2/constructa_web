import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import CloseButton from "../../buttons/CloseButton";

const CreateVehicle = () => {
    const navigate = useNavigate();
    const [factory, setFactory] = useState('');
    const [name, setName] = useState('');
    const [vinCode, setVinCode] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [conditionMotorcycleWatch, setConditionMotorcycleWatch] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [type, setType] = useState('CAR')
    const [boughtAt, setBoughtAt] = useState(new Date());
    const [createdAt, setCreatedAt] = useState(new Date());

    function handleCreateVehicle() {

        axios.post('http://localhost:8080/api/v1/vehicles', {
            factory: factory,
            name: name,
            vinCode: vinCode,
            mileage: mileage,
            registrationNumber: registrationNumber,
            type: type,
            conditionMotorcycleWatch: conditionMotorcycleWatch,
            createdAt: createdAt,
            boughtAt: boughtAt,
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/vehicles");
    }

    return (
        <form>
            <div className={styles.form}>
                <div className={styles.topButtons}>
                    <Link to={"/vehicles"} className={styles.topBackButton}>
                        <CloseButton/>
                    </Link>
                </div>
                <div>
                    <div className={styles.leftSide}>
                        <label htmlFor="vehicleFactory">Značka:</label>
                        <input type="text" id="vehicleFactory" name="vehicleFactory"
                               onChange={(event) => setFactory(event.target.value)}/>
                        <label htmlFor="vehicleName">Model:</label>
                        <input type="text" id="vehicleName" name="vehicleName"
                               onChange={(event) => setName(event.target.value)}/>
                        <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
                        <input type="text" id="vehicleRegistrationNumber" name="vehicleRegistrationNumber"
                               onChange={(event) => setRegistrationNumber(event.target.value)}/>
                        <label htmlFor="vinCode">VIN kód:</label>
                        <input type="text" id="vinCode" name="vinCode"
                               onChange={(event) => setVinCode(event.target.value)}/>
                    </div>
                    <div className={styles.rightSide}>
                        <label htmlFor="createdAt">Datum výroby:</label>
                        <input type="date" id="createdAt" name="createdAt"
                               onChange={(event) => setCreatedAt(event.target.value)}/>
                        <label htmlFor="boughtAt">Datum nákupu:</label>
                        <input type="date" id="boughtAt" name="boughtAt"
                               onChange={(event) => setBoughtAt(event.target.value)}/>
                        <label htmlFor="vehicleType">Typ vozidla:</label>
                        <select name="type" onChange={(event) => setType(event.target.value)}>
                            <option value="CAR" selected>Auto</option>
                            <option value="VEHICLE">Stroj</option>
                            <option value="TRAILER  ">Přívěs</option>
                        </select>
                        {type === "CAR" ?
                            <>
                                <label htmlFor="vehicleMileage">Najeté kilometry:</label>
                                <input type="text" id="vehicleMileage" name="vehicleMileage"
                                       value={mileage}
                                       onChange={(event) => setMileage(event.target.value)}/>
                            </> : ""
                        }
                        {type === "VEHICLE" ? <>
                            <label htmlFor="vehicleMileage">Stav odpracovaných motohodin:</label>
                            <input type="text" id="motorcycleWatch" name="motorcycleWatch"
                                   value={conditionMotorcycleWatch}
                                   onChange={(event) => setConditionMotorcycleWatch(event.target.value)}/>
                        </> : ""}
                    </div>
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleCreateVehicle}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default CreateVehicle;