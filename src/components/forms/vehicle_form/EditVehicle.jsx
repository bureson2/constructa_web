import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import styles from "../task_form/style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";

const EditVehicle = () => {
    const navigate = useNavigate();
    const url = window.location.href;

    const [vehicleId, setVehicleId] = useState(url.substring(url.lastIndexOf("/") + 1));
    const [vehicleFactory, setVehicleFactory] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleMileage, setVehicleMileage] = useState('');
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');

    function handleEditVehicle() {
        axios.put('http://localhost:8080/api/v1/vehicles', {
            id: vehicleId,
            factory: vehicleFactory,
            name: vehicleName,
            registrationNumber: vehicleMileage,
            mileage: vehicleRegistrationNumber,
        }, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
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
            <div className={styles.formButtons}>
                <div onClick={handleEditVehicle}><AcceptButton/></div>
                <Link to={"/vehicles"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default EditVehicle;