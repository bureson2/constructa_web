import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../style.module.scss";
import {Link, useParams} from "react-router-dom";
import BackButton from "../../buttons/BackButton";
import CloseButton from "../../buttons/CloseButton";
import EditButton from "../../buttons/EditButton";
import VehicleReports from "../../tables/VehicleReports";

const VehicleDetail = () => {
    const { id } = useParams();
    const [factory, setFactory] = useState('');
    const [name, setName] = useState('');
    const [vinCode, setVinCode] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [conditionMotorcycleWatch, setConditionMotorcycleWatch] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [type, setType] = useState('CAR')
    const [boughtAt, setBoughtAt] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vehicles/' + id
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setFactory(response.data.factory);
                setName(response.data.name);
                setVinCode(response.data.vinCode)
                setMileage(response.data.mileage);
                setRegistrationNumber(response.data.registrationNumber);
                setConditionMotorcycleWatch(response.data.conditionMotorcycleWatch);
                setCreatedAt(response.data.createdAt);
                setBoughtAt(response.data.boughtAt);
                setType(response.data.type);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <form className={styles.form}>
            <div className={styles.topButtons}>
                <Link to={"/vehicles/edit/" + id}>
                    <EditButton/>
                </Link>
                <Link to={"/vehicles"}>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="vehicleFactory">Značka a model:</label>
                    <input type="text" id="vehicleFactory" name="vehicleFactory"
                           value={factory + " " + name} readOnly={true}/>

                    <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
                    <input type="text" id="vehicleRegistrationNumber" name="vehicleRegistrationNumber"
                           value={registrationNumber} readOnly={true}/>

                    <label htmlFor="vinCode">Vin kód:</label>
                    <input type="text" id="vinCode" name="vinCode"
                           value={vinCode} readOnly={true}/>

                    <label htmlFor="createdAt">Datum výroby:</label>
                    <input type="text" id="createdAt" name="createdAt"
                           value={createdAt.substring(0, 10)}
                           readOnly={true}
                    />

                    <label htmlFor="boughtAt">Datum nákupu:</label>
                    <input type="text" id="boughtAt" name="boughtAt"
                           value={boughtAt.substring(0, 10)} readOnly={true}
                    />

                    <label htmlFor="vehicleType">Typ vozidla:</label>
                    <input type="text" id="vehicleType" name="vehicleType"
                           value={type} readOnly={true}/>

                    {type === "Auto" ?
                        <>
                            <label htmlFor="vehicleMileage">Najeté kilometry:</label>
                            <input type="text" id="vehicleMileage" name="vehicleMileage"
                                   value={mileage + " km"} readOnly={true}/>
                        </> : ""
                    }
                    {type === "Stroj" ? <>
                        <label htmlFor="vehicleMileage">Stav odpracovaných motohodin:</label>
                        <input type="text" id="motorcycleWatch" name="motorcycleWatch"
                               value={conditionMotorcycleWatch + " mth"} readOnly={true}/>
                    </> : ""}

                </div>
                <div className={styles.rightSide}>
                    <VehicleReports vehicleId={id} vehicleType={type}/>
                </div>
            </div>
            <Link to={"/vehicles"} className={styles.bottomBackButton}>
                <BackButton/>
            </Link>
        </form>
    );
}
export default VehicleDetail;