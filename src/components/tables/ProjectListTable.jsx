import React, {useState, useEffect} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import EditButton from "../buttons/EditButton";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import {Link} from "react-router-dom";

const ProjectListTable = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/projects', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleDeleteProject(projectId) {

        axios.delete('http://localhost:8080/api/v1/projects/' + projectId, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });

        const updatedProjects = projects.filter(task => task.id !== projectId);
        setProjects(updatedProjects);
    }

    function getStatusClassName(status) {
        switch (status) {
            case "Hotovo":
                return "green";
            case "Příprava":
                return "yellow";
            case "Realizace":
                return "blue";
            default:
                return "red";
        }
    }

    return (<div>
        <div className={styles.tableHeader}>
            <h2>Projekty</h2>
            <Link to="/projects/create">
                <CreateButton/>
            </Link>
        </div>
        <table>
            <thead>
            <tr>
                <th>Jméno</th>
                <th>Lokalita</th>
                <th>Stavební objekt</th>
                <th>Projektový manager</th>
                <th>Stav</th>
                <th>Akce</th>
            </tr>
            </thead>
            <tbody>
            {projects.map(project => (<tr key={project.id}>
                <td>
                    <Link to={"/projects/" + project.id} className={styles.detailLink}>
                        {project.name}
                    </Link>
                </td>
                <td>{project.projectAddress ? project.projectAddress.city : "-"}</td>
                <td>{project.buldingFacility}</td>
                <td>{project.projectManager ?
                    <Link to={"/users/" + project.projectManager.id} className={styles.detailLink}>
                        {project.projectManager.firstname.concat(" ", project.projectManager.lastname) }
                    </Link>
                    :
                    "-"}</td>
                <td className={`${getStatusClassName(project.state)} ${styles.state}`}>
                    {project.state}
                </td>
                <td className={styles.buttonTd}>
                    <Link to={"/projects/edit/" + project.id}>
                        <EditButton/>
                    </Link>
                    <div onClick={() => handleDeleteProject(project.id)}>
                        <DeleteButton />
                    </div>
                </td>

            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default ProjectListTable;