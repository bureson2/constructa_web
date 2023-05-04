import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../style.module.scss";
import CloseButton from "../../buttons/CloseButton";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";

const EditVehicleReport = () => {
    const navigate = useNavigate();
    const { id } = useParams();


    const [timeFrom, setTimeFrom] = useState(new Date());
    const [timeTo, setTimeTo] = useState(new Date());
    const [vehicle, setVehicle] = useState('');
    const [driver, setDriver] = useState('');
    const [originalConditionMotorcycleWatch, setOriginalConditionMotorcycleWatch] = useState(0);
    const [afterworkConditionMotorcycleWatch, setAfterworkConditionMotorcycleWatch] = useState(0);
    const [cargoMass, setCargoMass] = useState(0);
    const [cargoType, setCargoType] = useState(0);
    const [distance, setDistance] = useState(0);
    const [purchaseOfFuelLitres, setPurchaseOfFuelLitres] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vehicles/reports/' + id
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setTimeFrom(new Date(response.data.timeFrom));
                setTimeTo(new Date(response.data.timeTo));
                setVehicle(response.data.vehicle.factory + " " + response.data.vehicle.name + " (" + response.data.vehicle.registrationNumber + ")");
                setDriver(response.data.driver.firstname + " " + response.data.driver.firstname);
                setOriginalConditionMotorcycleWatch(response.data.originalConditionMotorcycleWatch);
                setAfterworkConditionMotorcycleWatch(response.data.afterworkConditionMotorcycleWatch);
                setCargoMass(response.data.cargoMass);
                setCargoType(response.data.cargoType);
                setDistance(response.data.distance);
                setPurchaseOfFuelLitres(response.data.purchaseOfFuelLitres);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleEditVehicleReport() {
        axios.put('http://localhost:8080/api/v1/vehicles/reports', {
            id: id,
            timeFrom: timeFrom,
            timeTo: timeTo,
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
                <Link to={"/vehicles"} >
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>

                    <label htmlFor="timeTo">Vozidlo:</label>
                    <input type="text" id="vehicle" name="vehicle"
                           value={vehicle} readOnly={true}/>

                    <label htmlFor="driver">Řidič</label>
                    <input type="text" id="driver" name="driver"
                           value={driver} readOnly={true}/>

                    <label htmlFor="timeFrom">Datum zahájení:</label>
                    <input
                        type="datetime-local"
                        id="timeFrom"
                        name="timeFrom"
                        value={timeFrom.toISOString().slice(0, 16) }
                        onChange={(event) => setTimeFrom(new Date(event.target.value))}
                    />
                    <label htmlFor="timeTo">Datum ukončení:</label>
                    <input
                        type="datetime-local"
                        id="timeTo"
                        name="timeTo"
                        value={timeTo.toISOString().slice(0, 16) }
                        onChange={(event) => setTimeTo(new Date(event.target.value))}
                    />
                </div>

                <div className={styles.rightSide}>
                    <label htmlFor="cargoType">Druh nákladu:</label>
                    <input type="text" id="cargoType" name="cargoType"
                           value={cargoType}
                           onChange={(event) => setCargoType(event.target.value)}/>
                    <label htmlFor="cargoMass">Množství nákladu [kg]:</label>
                    <input type="text" id="cargoMass" name="cargoMass"
                           value={cargoMass}
                           onChange={(event) => setCargoMass(event.target.value)}/>
                    <label htmlFor="purchaseOfFuelLitres">Nákup benzínu [l]:</label>
                    <input type="text" id="purchaseOfFuelLitres" name="purchaseOfFuelLitres"
                           value={purchaseOfFuelLitres}
                           onChange={(event) => setPurchaseOfFuelLitres(event.target.value)}/>
                    <label htmlFor="originalConditionMotorcycleWatch">Stav motohodin na začátku práce:</label>
                    <input type="text" id="originalConditionMotorcycleWatch" name="originalConditionMotorcycleWatch"
                           value={originalConditionMotorcycleWatch}
                           onChange={(event) => setOriginalConditionMotorcycleWatch(event.target.value)}/>
                    <label htmlFor="afterworkConditionMotorcycleWatch">Stav motohodin po ukončení práce</label>
                    <input type="text" id="afterworkConditionMotorcycleWatch" name="afterworkConditionMotorcycleWatch"
                           value={afterworkConditionMotorcycleWatch}
                           onChange={(event) => setAfterworkConditionMotorcycleWatch(event.target.value)}/>
                    <label htmlFor="distance">Ujetá vzdálenost [km]:</label>
                    <input type="text" id="distance" name="distance"
                           value={distance}
                           onChange={(event) => setDistance(event.target.value)}/>

                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleEditVehicleReport}><AcceptButton/></div>
                <Link to={"/vehicles"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default EditVehicleReport;