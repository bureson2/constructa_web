import axios from "axios";
import styles from "./style.module.scss";
import {Link} from "react-router-dom";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import {useEffect, useState} from "react";

const ConstructionReports = ({projectId}) => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/construction-reports/project/" + projectId, {
        // axios.get("http://localhost:8080/api/v1/construction-reports", {
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

    function handleDeleteReport(constructionReportId) {
        axios.delete('http://localhost:8080/api/v1/construction-reports/' + constructionReportId, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });

        const updatedReports = reports.filter(task => task.id !== constructionReportId);
        setReports(updatedReports);
    }

    return (
        <>
            <div className={styles.tableHeader}>
                <h2>
                    Stavební deník
                </h2>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Datum</th>
                    <th>Zodpovědná osoba</th>
                    <th>Aktivita</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                {reports.map(report => (<tr key={report.id}>
                    <td>
                        <Link to={"/projects/reports/" + report.id} className={styles.detailLink}>
                            {report.date.substring(0, 10)}
                        </Link>
                    </td>
                    <td>{report.executor.firstname + " " + report.executor.lastname}</td>
                    <td>{report.taskName}</td>
                    <td className={styles.buttonTd}>
                        <Link to={"/projects/reports/edit/" + report.id}>
                            <EditButton/>
                        </Link>
                        <div onClick={() => handleDeleteReport(report.id)}>
                            <DeleteButton/>
                        </div>
                    </td>
                </tr>))}
                </tbody>
            </table>
        </>

    )
}

export default ConstructionReports;