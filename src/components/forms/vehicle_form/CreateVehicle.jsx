import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import styles from "../task_form/style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";

const CreateVehicle = () => {
    const navigate = useNavigate();
    const [vehicleFactory, setVehicleFactory] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleMileage, setVehicleMileage] = useState('');
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');


    function handleCreateVehicle() {

        axios.post('http://localhost:8080/api/v1/vehicles', {
            factory: vehicleFactory,
            name: vehicleName,
            mileage: vehicleMileage,
            registrationNumber: vehicleRegistrationNumber,
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

    return (
        <form className={styles.form}>
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
            <div className={styles.formButtons}>
                <div onClick={handleCreateVehicle}><AcceptButton/></div>
                <Link to={"/tasks"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default CreateVehicle;