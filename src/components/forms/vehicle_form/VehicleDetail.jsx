import {useEffect, useState} from "react";
import axios from "axios";
import styles from "../style.module.scss";
import {Link} from "react-router-dom";
import BackButton from "../../buttons/BackButton";
import CloseButton from "../../buttons/CloseButton";
import EditButton from "../../buttons/EditButton";

const VehicleDetail = () => {
    const url = window.location.href;
    const vehicleId = url.substring(url.lastIndexOf("/") + 1);
    const [vehicleFactory, setVehicleFactory] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleMileage, setVehicleMileage] = useState('');
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    useEffect(() => {
        // TODO
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
            <div className={styles.readonly}>
                <label htmlFor="vehicleFactory">Značka:</label>
                <div className={styles.readonly}>{vehicleFactory}</div>
            </div>
            <div className={styles.readonly}>
                <label htmlFor="vehicleName">Model:</label>
                <div className={styles.readonly}>{vehicleName}</div>
            </div>
            <div className={styles.readonly}>
                <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
                <div className={styles.readonly}>{vehicleRegistrationNumber}</div>
            </div>
            <div className={styles.readonly}>
                <label htmlFor="vehicleMileage">Najeté kilometry:</label>
                <div className={styles.readonly}>{vehicleMileage}</div>
            </div>
            <div className={styles.readonly}>
                <label htmlFor="vehicleType">Druh vozidla:</label>
                <div className={styles.readonly}>{vehicleType}</div>
            </div>
            <Link to={"/vehicles"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default VehicleDetail;