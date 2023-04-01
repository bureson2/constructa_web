import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import styles from "../style.module.scss";
import AcceptButton from "../../buttons/AcceptButton";
import RejectButton from "../../buttons/RejectButton";
import CloseButton from "../../buttons/CloseButton";
import DeleteButton from "../../buttons/DeleteButton";

const EditVehicle = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [factory, setFactory] = useState('');
    const [name, setName] = useState('');
    const [vinCode, setVinCode] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [conditionMotorcycleWatch, setConditionMotorcycleWatch] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [type, setType] = useState('')
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
                setCreatedAt(response.data.createdAt.substring(0,10));
                setBoughtAt(response.data.boughtAt.substring(0,10));
                switch (response.data.type){
                    case "Auto":
                        setType("CAR");
                        break;
                    case "Stroj":
                        setType("VEHICLE");
                        break;
                    default:
                        setType("TRAILER")
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleEditVehicle() {
        axios.put('http://localhost:8080/api/v1/vehicles', {
            id: id,
            factory: factory,
            name: name,
            registrationNumber: registrationNumber,
            vinCode: vinCode,
            mileage: mileage,
            type: type,
            conditionMotorcycleWatch: conditionMotorcycleWatch,
            createdAt: createdAt,
            boughtAt: boughtAt,
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
                    <div onClick={() => handleDeleteVehicle(id)}>
                        <DeleteButton/>
                    </div>
                    <CloseButton/>
                </Link>
            </div>
            <div>
                <div className={styles.leftSide}>
                    <label htmlFor="vehicleFactory">Značka:</label>
                    <input type="text" id="vehicleFactory" name="vehicleFactory"
                           value={factory}
                           onChange={(event) => setFactory(event.target.value)}/>

                    <label htmlFor="vehicleName">Model:</label>
                    <input type="text" id="vehicleName" name="vehicleName"
                           value={name}
                           onChange={(event) => setName(event.target.value)}/>

                    <label htmlFor="vehicleRegistrationNumber">SPZ:</label>
                    <input type="text" id="vehicleRegistrationNumber" name="vehicleRegistrationNumber"
                           value={registrationNumber}
                           onChange={(event) => setRegistrationNumber(event.target.value)}/>

                    <label htmlFor="vinCode">VIN kód:</label>
                    <input type="text" id="vinCode" name="vinCode"
                           value={vinCode}
                           onChange={(event) => setVinCode(event.target.value)}/>
                </div>
                <div className={styles.rightSide}>
                    <label htmlFor="createdAt">Datum výroby:</label>
                    <input type="date" id="createdAt" name="createdAt"
                           value={createdAt}
                           onChange={(event) => setCreatedAt(event.target.value)}/>

                    <label htmlFor="boughtAt">Datum nákupu:</label>
                    <input type="date" id="boughtAt" name="boughtAt"
                           value={boughtAt}
                           onChange={(event) => setBoughtAt(event.target.value)}/>

                    <label htmlFor="vehicleType">Typ vozidla:</label>
                    <select name="type" value={type} onChange={(event) => setType(event.target.value)}>
                        <option value="CAR">Auto</option>
                        <option value="VEHICLE">Stroj</option>
                        <option value="TRAILER">Přívěs</option>
                    </select>
                    {type === "CAR" || type === "Auto" ?
                        <>
                            <label htmlFor="vehicleMileage">Najeté kilometry:</label>
                            <input type="text" id="vehicleMileage" name="vehicleMileage"
                                   value={mileage}
                                   onChange={(event) => setMileage(event.target.value)}/>
                        </> : ""
                    }
                    {type === "VEHICLE" || type === "Stroj" ? <>
                        <label htmlFor="vehicleMileage">Stav odpracovaných motohodin:</label>
                        <input type="text" id="motorcycleWatch" name="motorcycleWatch"
                               value={conditionMotorcycleWatch}
                               onChange={(event) => setConditionMotorcycleWatch(event.target.value)}/>
                    </> : ""}
                </div>
            </div>
            <div className={styles.formButtons}>
                <div onClick={handleEditVehicle}><AcceptButton/></div>
                <Link to={"/vehicles"}><RejectButton/></Link>
            </div>
        </form>
    );
}
export default EditVehicle;