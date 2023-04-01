import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../style.module.scss";
import {Link} from "react-router-dom";
import EditButton from "../../buttons/EditButton";
import CloseButton from "../../buttons/CloseButton";
import BackButton from "../../buttons/BackButton";

const VehicleReportDetail = () => {
    const url = window.location.href;
    const vehicleReportId = url.substring(url.lastIndexOf("/") + 1);

    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [driver, setDriver] = useState('');
    const [vehicleType, setType] = useState('');
    const [originalConditionMotorcycleWatch, setOriginalConditionMotorcycleWatch] = useState(0);
    const [afterworkConditionMotorcycleWatch, setAfterworkConditionMotorcycleWatch] = useState(0);
    const [cargoMass, setCargoMass] = useState(0);
    const [cargoType, setCargoType] = useState(0);
    const [distance, setDistance] = useState(0);
    const [purchaseOfFuelLitres, setPurchaseOfFuelLitres] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vehicles/reports/' + vehicleReportId
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setTimeFrom(response.data.timeFrom);
                setTimeTo(response.data.timeTo);
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

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/vehicles/reports/edit/" + vehicleReportId}>
                    <EditButton/>
                </Link>
                <Link to={"/vehicles"}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="timeFrom">Čas provozu od:</label>
                    <input type="text" id="timeFrom" name="timeFrom"
                           value={timeFrom} readOnly={true}/>

                    <label htmlFor="timeTo">Čas provozu do:</label>
                    <input type="text" id="timeTo" name="timeTo"
                           value={timeTo} readOnly={true}/>

                    <label htmlFor="timeTo">Vozidlo:</label>
                    <input type="text" id="vehicle" name="vehicle"
                           value={vehicle} readOnly={true}/>

                    <label htmlFor="driver">Řidič</label>
                    <input type="text" id="driver" name="driver"
                           value={driver} readOnly={true}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="cargoType">Typ nákladu</label>
                    <input type="text" id="cargoType" name="cargoType"
                           value={cargoType} readOnly={true}/>

                    <label htmlFor="cargoMass">Množství nákladu [kg]</label>
                    <input type="text" id="cargoMass" name="cargoMass"
                           value={cargoMass} readOnly={true}/>

                    <label htmlFor="purchaseOfFuelLitres">Množství natankovaného paliva [l]</label>
                    <input type="text" id="purchaseOfFuelLitres" name="purchaseOfFuelLitres"
                           value={purchaseOfFuelLitres} readOnly={true}/>

                    <label htmlFor="distance">Ujetá vzdálenost</label>
                    <input type="text" id="distance" name="distance"
                           value={distance} readOnly={true}/>

                    <label htmlFor="originalConditionMotorcycleWatch">Stav motohodin před zahájením</label>
                    <input type="text" id="originalConditionMotorcycleWatch"
                           name="originalConditionMotorcycleWatch"
                           value={originalConditionMotorcycleWatch} readOnly={true}/>
                    <label htmlFor="afterworkConditionMotorcycleWatch">Stav motohodin po ukončení</label>
                    <input type="text" id="afterworkConditionMotorcycleWatch"
                           name="afterworkConditionMotorcycleWatch"
                           value={afterworkConditionMotorcycleWatch} readOnly={true}/>

                    {/* TODO FIX dynamická změna po přijetí informací - rovnou upravit i h2 v detailu auta kniha jízd/stazky*/}

                    {/*{vehicleType === "CAR" ?*/}
                    {/*    <>*/}
                    {/*        <label htmlFor="distance">Ujetá vzdálenost</label>*/}
                    {/*        <input type="text" id="distance" name="distance"*/}
                    {/*               value={distance} readOnly={true}/>*/}
                    {/*    </>*/}
                    {/*    : ""*/}
                    {/*}*/}

                    {/*{vehicleType === "VEHICLE" ?*/}
                    {/*    <>*/}
                    {/*        <label htmlFor="originalConditionMotorcycleWatch">Stav motohodin před zahájením</label>*/}
                    {/*        <input type="text" id="originalConditionMotorcycleWatch"*/}
                    {/*               name="originalConditionMotorcycleWatch"*/}
                    {/*               value={originalConditionMotorcycleWatch} readOnly={true}/>*/}
                    {/*        <label htmlFor="afterworkConditionMotorcycleWatch">Stav motohodin po ukončení</label>*/}
                    {/*        <input type="text" id="afterworkConditionMotorcycleWatch"*/}
                    {/*               name="afterworkConditionMotorcycleWatch"*/}
                    {/*               value={afterworkConditionMotorcycleWatch} readOnly={true}/>*/}
                    {/*    </>*/}
                    {/*    : ""*/}
                    {/*}*/}
                </div>
            </div>
            <Link to={"/vehicles"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default VehicleReportDetail;