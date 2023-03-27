import React, {useState, useEffect} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import EditButton from "../buttons/EditButton";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import {Link} from "react-router-dom";
import Filter from "../../filters/ProjectsFilter";

const ProjectListTable = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        projectAddress: "",
        buldingFacility: "",
        projectManager: "",
        startedAt: "",
        deadline: "",
        state: "",
    });

    function handleFilterChange(name, value) {
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);

        const filtered = projects.filter((project) => {
            return (
                project.name.toLowerCase().includes(updatedFilters.name.toLowerCase())
                 && project.projectManager.toLowerCase().includes(updatedFilters.projectManager.toLowerCase())
                // project.projectAddress.city.toLowerCase().includes(updatedFilters.projectAddress.city.toLowerCase()) &&
                // project.buldingFacility.toLowerCase().includes(updatedFilters.buldingFacility.toLowerCase()) &&
                // project.projectManager.toLowerCase().includes(updatedFilters.projectManager.toLowerCase()) &&
                // project.startedAt.toLowerCase().includes(updatedFilters.startedAt.toLowerCase()) &&
                // project.deadline.toLowerCase().includes(updatedFilters.deadline.toLowerCase()) &&
                // project.state.toLowerCase().includes(updatedFilters.state.toLowerCase())
                // project.projectAddress.city.toLowerCase().includes(updatedFilters.city.toLowerCase())
                // &&
                // // ...
            );
        });
        setFilteredProjects(filtered);
    }


    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/projects', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => {
                setProjects(response.data);
                setFilteredProjects(response.data);
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

    return (
        <div>
            <div className={styles.tableHeader}>
                <h2>Projekty</h2>
                <Link to="/projects/create">
                    <CreateButton/>
                </Link>
            </div>
            <Filter onFilterChange={handleFilterChange} />
            <table>
                <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Lokalita</th>
                    <th>Stavební objekt</th>
                    <th>Projektový manager</th>
                    <th>Zahájení projektu</th>
                    <th>Plánované ukončení</th>
                    <th>Stav</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                {filteredProjects.map(project => (<tr key={project.id}>
                    <td>
                        <Link to={"/projects/" + project.id} className={styles.detailLink}>
                            {project.name}
                        </Link>
                    </td>
                    <td>{project.projectAddress ? project.projectAddress.city : "-"}</td>
                    <td>{project.buldingFacility}</td>
                    <td>{project.projectManager ?
                        <Link to={"/users/" + project.projectManager.id} className={styles.detailLink}>
                            {project.projectManager.firstname.concat(" ", project.projectManager.lastname)}
                        </Link>
                        :
                        "-"}</td>
                    <td>{project.startedAt.substring(0, 10)}</td>
                    <td>{project.deadline.substring(0, 10)}</td>
                    <td className={`${getStatusClassName(project.state)} ${styles.state}`}>
                        {project.state}
                    </td>
                    <td className={styles.buttonTd}>
                        <Link to={"/projects/edit/" + project.id}>
                            <EditButton/>
                        </Link>
                        <div onClick={() => handleDeleteProject(project.id)}>
                            <DeleteButton/>
                        </div>
                    </td>

                </tr>))}
                </tbody>
            </table>
        </div>);
};

export default ProjectListTable;