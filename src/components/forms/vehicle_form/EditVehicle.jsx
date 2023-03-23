import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import DeleteButton from "../../buttons/DeleteButton";

const EditVehicle = () => {
    const navigate = useNavigate();
    const url = window.location.href;

    const [vehicleId, setVehicleId] = useState(url.substring(url.lastIndexOf("/") + 1));
    const [vehicleFactory, setVehicleFactory] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleMileage, setVehicleMileage] = useState('');
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    function handleEditVehicle() {
        axios.put('http://localhost:8080/api/v1/vehicles', {
            id: vehicleId,
            factory: vehicleFactory,
            name: vehicleName,
            registrationNumber: vehicleRegistrationNumber,
            mileage: vehicleMileage,
            type: vehicleType
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
                setVehicleType(response.data.type);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleDeleteVehicle(vehicleId) {

        axios.delete('http://localhost:8080/api/v1/vehicles/' + vehicleId, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });
        navigate("/vehicles");
    }

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/vehicles"} className={styles.topButtons}>
                    <div onClick={() => handleDeleteVehicle(vehicleId)}>
                        <DeleteButton/>
                    </div>
                    <CloseButton/>
                </Link>
            </div>
            <label htmlFor="vehicleFactory">Značka:</label>
            <input type="text" id="vehicleFactory" name="vehicleFactory"
                   value={vehicleFactory}
                   onChange={(event) => setVehicleFactory(event.target.value)}/>
            <label htmlFor="vehicleName">Model:</label>
            <input type="text" id="vehicleName" name="vehicleName"
                   value={vehicleName}
                   onChange={(event) => setVehicleName(event.target.value)}/>
            <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
            <input type="text" id="vehicleRegistrationNumber" name="vehicleRegistrationNumber"
                   value={vehicleRegistrationNumber}
                   onChange={(event) => setVehicleRegistrationNumber(event.target.value)}/>
            <label htmlFor="vehicleMileage">Najeté kilometry:</label>
            <input type="text" id="vehicleMileage" name="vehicleMileage"
                   value={vehicleMileage}
                   onChange={(event) => setVehicleMileage(event.target.value)}/>
            <label htmlFor="vehicleType">Druh vozidla:</label>
            <select name="vehicleType" id="vehicleType"
                    value={vehicleType}
                    onChange={(event) => setVehicleType(event.target.value)}>
                <option value="CAR">Auto</option>
                <option value="VEHICLE">Stroj</option>
                <option value="TRAILER">Přívěs</option>
            </select>
            <div className={styles.formButtons}>
                <div onClick={handleEditVehicle}><AcceptButton/></div>
                <Link to={"/vehicles"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default EditVehicle;