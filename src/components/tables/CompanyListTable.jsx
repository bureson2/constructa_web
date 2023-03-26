import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./style.module.scss";
import {Link} from "react-router-dom";
import CreateButton from "../buttons/CreateButton";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

const CompanyListTable = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/companies', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleDeleteProject(companyId) {

        axios.delete('http://localhost:8080/api/v1/companies/' + companyId , {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });

        const updatedCompanies = companies.filter(task => task.id !== companyId);
        setCompanies(updatedCompanies);
    }

    return (
        <div>
        <div className={styles.tableHeader}>
            <h2>Společnosti</h2>
            <Link to="/companies/create">
                <CreateButton/>
            </Link>
        </div>
        <table>
            <thead>
            <tr>
                <th>Jméno</th>
                <th>IČO</th>
                <th>DIČ</th>
                <th>Město</th>
                <th>Akce</th>
            </tr>
            </thead>
            <tbody>
            {companies.map(company => (<tr key={company.id}>
                <td>
                    <Link to={"/companies/" + company.id} className={styles.detailLink}>
                        {company.name}
                    </Link>
                </td>
                <td>{company.cin}</td>
                <td>{company.din}</td>
                <td>{company.companyAddress ? company.companyAddress.city : "-"}</td>
                <td className={styles.buttonTd}>
                    <Link to={"/companies/edit/" + company.id}>
                        <EditButton/>
                    </Link>
                    <div onClick={() => handleDeleteProject(company.id)}>
                        <DeleteButton />
                    </div>
                </td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default CompanyListTable;