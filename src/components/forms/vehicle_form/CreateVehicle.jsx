import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import CloseButton from "../../buttons/CloseButton";

const CreateVehicle = () => {
    const navigate = useNavigate();
    const [vehicleFactory, setVehicleFactory] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleMileage, setVehicleMileage] = useState(0);
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('CAR');
    const [motorcycleWatch, setMotorcycleWatch] = useState(0);
    const [createdAt, setCreatedAt] = useState(new Date());
    const [boughtAt, setBoughtAt] = useState(new Date());

    function handleCreateVehicle() {

        axios.post('http://localhost:8080/api/v1/vehicles', {
            factory: vehicleFactory,
            name: vehicleName,
            mileage: vehicleMileage,
            registrationNumber: vehicleRegistrationNumber,
            type: vehicleType,
            conditionMotorcycleWatch: motorcycleWatch,
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
                               onChange={(event) => setVehicleFactory(event.target.value)}/>
                        <label htmlFor="vehicleName">Model:</label>
                        <input type="text" id="vehicleName" name="vehicleName"
                               onChange={(event) => setVehicleName(event.target.value)}/>
                        <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
                        <input type="text" id="vehicleRegistrationNumber" name="vehicleRegistrationNumber"
                               onChange={(event) => setVehicleRegistrationNumber(event.target.value)}/>
                    </div>
                    <div className={styles.rightSide}>
                        <label htmlFor="createdAt">Datum výroby:</label>
                        <input type="date" id="createdAt" name="createdAt"
                               onChange={(event) => setCreatedAt(event.target.value)}/>
                        <label htmlFor="boughtAt">Datum nákupu:</label>
                        <input type="date" id="boughtAt" name="boughtAt"
                               onChange={(event) => setBoughtAt(event.target.value)}/>
                        <label htmlFor="vehicleType">Typ vozidla:</label>
                        <select name="type" onChange={(event) => setVehicleType(event.target.value)}>
                            <option value="CAR" selected>Auto</option>
                            <option value="VEHICLE">Stroj</option>
                            <option value="TRAILER  ">Přívěs</option>
                        </select>
                        {vehicleType === "CAR" ?
                            <>
                                <label htmlFor="vehicleMileage">Najeté kilometry:</label>
                                <input type="text" id="vehicleMileage" name="vehicleMileage"
                                       value={vehicleMileage} readOnly={true}
                                       onChange={(event) => setVehicleMileage(event.target.value)}/>
                            </> : ""
                        }
                        {vehicleType === "VEHICLE" ? <>
                            <label htmlFor="vehicleMileage">Stav odpracovaných motohodin:</label>
                            <input type="text" id="motorcycleWatch" name="motorcycleWatch"
                                   value={motorcycleWatch} readOnly={true}
                                   onChange={(event) => setMotorcycleWatch(event.target.value)}/>
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