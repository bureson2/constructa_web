import React, {useState, useEffect} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import EditButton from "../buttons/EditButton";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import {Link} from "react-router-dom";
import ReportButton from "../buttons/ReportButton";
import carIcon from "../../svg/car_icon.svg";
import vehicleIcon from "../../svg/vehicle_icon.svg";
import trailerIcon from "../../svg/trailer_icon.svg";


const VehicleListTable = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vehicles', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => {
                setVehicles(response.data);
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

        const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== vehicleId);
        setVehicles(updatedVehicles);
    }

    const getVehicleIcon = (vehicleType) => {
        switch (vehicleType) {
            case 'CAR':
                return <button className={styles.vehicleIcons}>
                    <img src={carIcon} alt="Car Icon" />
                </button>;
            case 'VEHICLE':
                return <button className={styles.vehicleIcons}>
                    <img src={vehicleIcon} alt="vehicle Icon" />
                </button>;
            case 'TRAILER':
                return <button className={styles.vehicleIcons}>
                    <img src={trailerIcon} alt="trailer Icon" />
                </button>;
            default:
                return null;
        }
    };

    return (<div>
        <div className={styles.tableHeader}>
            <h2>Seznam vozidel</h2>
            <div className={styles.buttonTd}>
                <Link to="/vehicles/create">
                    <CreateButton/>
                </Link>
                <Link to={"/vehicles/reports/create"}>
                    <ReportButton/>
                </Link>
            </div>
        </div>
        <table>
            <thead>
            <tr>
                <th>SPZ</th>
                <th>Typ vozidla</th>
                <th>Značka</th>
                <th>Typ model</th>
                <th>Najeté km / odpracované mth</th>
                <th>Akce</th>
            </tr>
            </thead>
            <tbody>
            {vehicles.map(vehicle => (<tr key={vehicle.id}>
                <td>
                    <Link to={"/vehicles/" + vehicle.id} className={styles.detailLink}>
                        {vehicle.registrationNumber}
                    </Link>
                </td>
                <td>
                    {getVehicleIcon(vehicle.type)}
                </td>
                <td>{vehicle.factory}</td>
                <td>
                    {vehicle.name}
                </td>
                <td>
                    {vehicle.type === "CAR" ?
                        <>
                            {vehicle.mileage}&nbsp;km
                        </> : ""}
                    {vehicle.type === "VEHICLE" ?
                        <>
                            {vehicle.conditionMotorcycleWatch}&nbsp;mth
                    </> : ""}
                    {vehicle.type === "TRAILER" ?
                        <>
                            -
                        </> : ""}
                </td>
                <td className={styles.buttonTd}>
                    <Link to={"/vehicles/edit/" + vehicle.id}>
                        <EditButton/>
                    </Link>
                    <div onClick={() => handleDeleteVehicle(vehicle.id)}>
                        <DeleteButton/>
                    </div>
                </td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default VehicleListTable;