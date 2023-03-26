import VehicleInput from "../../inputs/VehicleInput";
import UserInput from "../../inputs/UserInput";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import axios from "axios";
import MapInput from "../../inputs/MapInput";
import CloseButton from "../../buttons/CloseButton";

const CreateVehicleReport = () => {
    const navigate = useNavigate();
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [vehicleType, setType] = useState('');
    const [originalConditionMotorcycleWatch, setOriginalConditionMotorcycleWatch] = useState(0);
    const [afterworkConditionMotorcycleWatch, setAfterworkConditionMotorcycleWatch] = useState(0);
    const [cargoMass, setCargoMass] = useState(0);
    const [cargoType, setCargoType] = useState(0);
    const [distance, setDistance] = useState(0);
    const [purchaseOfFuelLitres, setPurchaseOfFuelLitres] = useState('');

    function handleCreateVehicleReport() {
        axios.post('http://localhost:8080/api/v1/vehicles/reports', {
            timeFrom: timeFrom,
            timeTo: timeTo,
            vehicle: vehicleId,
            driver : driverId,
            originalConditionMotorcycleWatch: originalConditionMotorcycleWatch,
            afterworkConditionMotorcycleWatch: afterworkConditionMotorcycleWatch,
            cargoMass: cargoMass,
            cargoType: cargoType,
            distance: distance,
            purchaseOfFuelLitres: purchaseOfFuelLitres,

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
            <div className={styles.topButtons}>
                <Link to={"/vehicles"} className={styles.topBackButton}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>

                    <label>Řidič:</label>
                    <UserInput onUserIdChange={setDriverId}/>
                    <label>Vozidlo:</label>
                    <VehicleInput onVehicleIdChange={setVehicleId} onVehicleTypeChange={setType}/>
                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input
                        type="datetime-local"
                        id="timeFrom"
                        name="timeFrom"
                        min={new Date().toISOString().slice(0, 16)}
                        value={timeFrom}
                        onChange={(event) => setTimeFrom(event.target.value)}
                    />
                    <label htmlFor="timeTo">Datum ukončení:</label>
                    <input
                        type="datetime-local"
                        id="timeTo"
                        name="timeTo"
                        min={new Date().toISOString().slice(0, 16)}
                        value={timeTo}
                        onChange={(event) => setTimeTo(event.target.value)}
                    />
                </div>

                <div className={styles.rightSide}>
                    <label htmlFor="cargoType">Druh nákladu:</label>
                    <input type="text" id="cargoType" name="cargoType"
                           onChange={(event) => setCargoType(event.target.value)}/>
                    <label htmlFor="cargoMass">Množství nákladu [kg]:</label>
                    <input type="text" id="cargoMass" name="cargoMass"
                           onChange={(event) => setCargoMass(event.target.value)}/>
                    <label htmlFor="purchaseOfFuelLitres">Nákup benzínu [l]:</label>
                    <input type="text" id="purchaseOfFuelLitres" name="purchaseOfFuelLitres"
                           onChange={(event) => setPurchaseOfFuelLitres(event.target.value)}/>
                    {vehicleType === "VEHICLE" ?
                        <>
                            <label htmlFor="originalConditionMotorcycleWatch">Stav motohodin na začátku práce:</label>
                            <input type="text" id="originalConditionMotorcycleWatch" name="originalConditionMotorcycleWatch"
                                   onChange={(event) => setOriginalConditionMotorcycleWatch(event.target.value)}/>
                            <label htmlFor="afterworkConditionMotorcycleWatch">Stav motohodin po ukončení práce</label>
                            <input type="text" id="afterworkConditionMotorcycleWatch" name="afterworkConditionMotorcycleWatch"
                                   onChange={(event) => setAfterworkConditionMotorcycleWatch(event.target.value)}/>
                        </>
                        :
                        <>
                            <label htmlFor="distance">Ujetá vzdálenost [km]:</label>
                            <input type="text" id="distance" name="distance"
                                   onChange={(event) => setDistance(event.target.value)}/>
                        </>
                        }
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleCreateVehicleReport}><AcceptButton/></div>
                <Link to={"/vehicles"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default CreateVehicleReport;