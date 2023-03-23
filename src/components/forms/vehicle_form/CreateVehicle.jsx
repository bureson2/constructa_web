import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import CloseButton from "../../buttons/CloseButton";

const CreateVehicle = () => {
    const navigate = useNavigate();
    const [vehicleFactory, setVehicleFactory] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleMileage, setVehicleMileage] = useState('');
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');
    const [vehicleTyp, setVehicleType] = useState('CAR');

    function handleCreateVehicle() {

        axios.post('http://localhost:8080/api/v1/vehicles', {
            factory: vehicleFactory,
            name: vehicleName,
            mileage: vehicleMileage,
            registrationNumber: vehicleRegistrationNumber,
            type: vehicleTyp
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
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/vehicles"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
            <label htmlFor="vehicleFactory">Značka:</label>
            <input type="text" id="vehicleFactory" name="vehicleFactory"
                   onChange={(event) => setVehicleFactory(event.target.value)}/>
            <label htmlFor="vehicleName">Model:</label>
            <input type="text" id="vehicleName" name="vehicleName"
                   onChange={(event) => setVehicleName(event.target.value)}/>
            <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
            <input type="text" id="vehicleRegistrationNumber" name="vehicleRegistrationNumber"
                   onChange={(event) => setVehicleRegistrationNumber(event.target.value)}/>
            <label htmlFor="vehicleMileage">Najeté kilometry:</label>
            <input type="text" id="vehicleMileage" name="vehicleMileage"
                   onChange={(event) => setVehicleMileage(event.target.value)}/>
            <label htmlFor="vehicleType">Typ vozidla:</label>
            <select name="type" onChange={(event) => setVehicleType(event.target.value)}>
                <option value="CAR" selected>Auto</option>
                <option value="VEHICLE">Stroj</option>
                <option value="TRAILER  ">Přívěs</option>
            </select>
            <div className={styles.formButtons}>
                <div onClick={handleCreateVehicle}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default CreateVehicle;