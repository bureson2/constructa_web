import styles from "./style.module.scss";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import CreateButton from "../buttons/CreateButton";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

const VehicleReports = ({vehicleId}) => {
    const [reports, setReports] = useState([]);
    const [tableHeader, setTableHeader] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/vehicles/" + vehicleId + "/reports", {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => {
                setReports(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleDeleteProject(vehicleReportId) {
        axios.delete('http://localhost:8080/api/v1/vehicles/reports/' + vehicleReportId, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });

        const updatedReports = reports.filter(task => task.id !== vehicleReportId);
        setReports(updatedReports);
    }

    return (
        <>
            <div className={styles.tableHeader}>
                <h2>
                    Kniha jízd a stazek
                </h2>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Datum</th>
                    <th>Řidič</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                {reports.map(report => (<tr key={report.id}>
                    <td>
                        <Link to={"/vehicles/reports/" + report.id} className={styles.detailLink}>
                            {report.timeFrom.substring(0, 10)}
                        </Link>
                    </td>
                    <td>{report.driver.firstname + " " + report.driver.lastname}</td>
                    <td className={styles.buttonTd}>
                        <Link to={"/vehicles/reports/edit/" + report.id}>
                            <EditButton/>
                        </Link>
                        <div onClick={() => handleDeleteProject(report.id)}>
                            <DeleteButton/>
                        </div>
                    </td>
                </tr>))}
                </tbody>
            </table>
        </>

    )
}

export default VehicleReports;