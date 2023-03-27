import styles from "./style.module.scss";
import axios from 'axios';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import CreateButton from "../buttons/CreateButton";
import ReportButton from "../buttons/ReportButton";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

const WorkReportListTable = () => {
    const url = window.location.href;
    const userId = url.substring(url.lastIndexOf("/") + 1);

    const [reports, setReports] = useState([]);

    // TODO - id usera

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/work-reports/user/' + userId , {
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

    function handleDeleteWorkReports(workReportId) {
        axios.delete('http://localhost:8080/api/v1/work-reports/' + workReportId, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });

        const updatedReports = reports.filter(report => report.id !== workReportId);
        setReports(updatedReports);
    }

    return (
        <div>
            <div className={styles.tableHeader}>
                <h2>Docházka</h2>
                <div className={styles.buttonTd}>
                    <Link to={"/work-reports/create"}>
                        <ReportButton/>
                    </Link>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Datum:</th>
                    <th>Čas od:</th>
                    <th>Čas do:</th>
                    <th>Lokace</th>
                    <th>Typ výkazu</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                {reports.map(report => (<tr key={report.id}>
                    <td>
                        <Link to={"/work-reports/report/" + report.id} className={styles.detailLink}>
                            {report.timeTo ? report.timeFrom.substring(0, 10) : "-"}
                        </Link>
                    </td>
                    <td>
                        {report.timeTo ? report.timeFrom.substring(11, 16) : "-"}
                    </td>
                    <td>
                        {report.timeTo ? report.timeTo.substring(11, 16) : "-"}
                    </td>
                    <td>
                        {report.location ? report.location.city + ", " + report.location.street : "-"}
                    </td>
                    <td>
                        {report.type}
                    </td>

                    <td className={styles.buttonTd}>
                        <Link to={"/work-reports/edit/" + report.id}>
                            <EditButton/>
                        </Link>
                        <div onClick={() => handleDeleteWorkReports(report.id)}>
                            <DeleteButton/>
                        </div>
                    </td>
                </tr>))}
                </tbody>
            </table>
        </div>
    );
}

export default WorkReportListTable;