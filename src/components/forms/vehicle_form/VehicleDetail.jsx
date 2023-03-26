import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../style.module.scss";
import {Link} from "react-router-dom";
import BackButton from "../../buttons/BackButton";
import CloseButton from "../../buttons/CloseButton";
import EditButton from "../../buttons/EditButton";
import VehicleReports from "../../tables/VehicleReports";

const VehicleDetail = () => {
    const url = window.location.href;
    const vehicleId = url.substring(url.lastIndexOf("/") + 1);
    const [vehicleFactory, setVehicleFactory] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleMileage, setVehicleMileage] = useState('');
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [motorcycleWatch, setMotorcycleWatch] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [boughtAt, setBoughtAt] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vehicles/' + vehicleId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setVehicleFactory(response.data.factory);
                setVehicleName(response.data.name);
                setVehicleMileage(response.data.mileage);
                setVehicleRegistrationNumber(response.data.registrationNumber);
                setMotorcycleWatch(response.data.conditionMotorcycleWatch);
                setCreatedAt(response.data.createdAt);
                setBoughtAt(response.data.boughtAt);
                if (response.data.type === "CAR") {
                    setVehicleType("Auto")
                } else if (response.data.type === "VEHICLE") {
                    setVehicleType("Stroj");
                } else {
                    setVehicleType("Přívěs");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/vehicles/edit/" + vehicleId} className={styles.topEditButton}>
                    <EditButton/>
                </Link>
                <Link to={"/vehicles"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="vehicleFactory">Značka:</label>
                    <input type="text" id="vehicleFactory" name="vehicleFactory"
                           value={vehicleFactory} readOnly={true}
                           onChange={(event) => setVehicleFactory(event.target.value)}/>
                    <label htmlFor="vehicleName">Model:</label>
                    <input type="text" id="vehicleName" name="vehicleName"
                           value={vehicleName} readOnly={true}
                           onChange={(event) => setVehicleName(event.target.value)}/>
                    <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
                    <input type="text" id="vehicleRegistrationNumber" name="vehicleRegistrationNumber"
                           value={vehicleRegistrationNumber} readOnly={true}
                           onChange={(event) => setVehicleRegistrationNumber(event.target.value)}/>
                    <label htmlFor="createdAt">Datum výroby:</label>
                    <input type="text" id="createdAt" name="createdAt"
                           value={createdAt.substring(0, 10)} readOnly={true}
                           onChange={(event) => setCreatedAt(event.target.value)}/>
                    <label htmlFor="boughtAt">Datum nákupu:</label>
                    <input type="text" id="boughtAt" name="boughtAt"
                           value={boughtAt.substring(0, 10)} readOnly={true}
                           onChange={(event) => setBoughtAt(event.target.value)}/>
                    <label htmlFor="vehicleType">Typ vozidla:</label>
                    <input type="text" id="vehicleType" name="vehicleType"
                           value={vehicleType} readOnly={true}
                           onChange={(event) => setVehicleType(event.target.value)}/>
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
                <div className={styles.rightSide}>
                    <VehicleReports vehicleId={vehicleId} vehicleType={vehicleType}/>
                </div>
            </div>
            <Link to={"/vehicles"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default VehicleDetail;