import {useEffect, useState} from "react";
import axios from "axios";
import styles from "../task_form/style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import {Link} from "react-router-dom";
import RejectButton from "../../buttons/RejectButton";

const VehicleDetail = () => {
    const url = window.location.href;
    const vehicleId = url.substring(url.lastIndexOf("/") + 1);
    const [vehicleFactory, setVehicleFactory] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleMileage, setVehicleMileage] = useState('');
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');

    useEffect(() => {
        // TODO
        axios.get('http://localhost:8080/api/v1/vehicles/' + vehicleId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setVehicleFactory(response.data.factory);
                setVehicleName(response.data.name);
                setVehicleMileage(response.data.mileage);
                setVehicleRegistrationNumber(response.data.registrationNumber);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <label htmlFor="vehicleFactory">Značka:</label>
            <input type="text" id="vehicleFactory" name="vehicleFactory"
                   value={vehicleFactory}
                   onChange={(event) => setVehicleFactory(event.target.value)} readOnly={true}/>
            <label htmlFor="vehicleName">Model:</label>
            <input type="text" id="vehicleName" name="vehicleName"
                   value={vehicleName}
                   onChange={(event) => setVehicleName(event.target.value)} readOnly={true}/>
            <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
            <input type="text" id="vehicleRegistrationNumber" name="vehicleRegistrationNumber"
                   value={vehicleRegistrationNumber}
                   onChange={(event) => setVehicleRegistrationNumber(event.target.value)} readOnly={true}/>
            <label htmlFor="vehicleMileage">Najeté kilometry:</label>
            <input type="text" id="vehicleMileage" name="vehicleMileage"
                   value={vehicleMileage}
                   onChange={(event) => setVehicleMileage(event.target.value)} readOnly={true}/>
        </form>
    );
}
export default VehicleDetail;