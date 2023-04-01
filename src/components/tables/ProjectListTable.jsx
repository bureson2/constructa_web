import React, {useState, useEffect, useContext} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import EditButton from "../buttons/EditButton";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import {Link} from "react-router-dom";
import ProjectsFilter from "../../filters/ProjectsFilter";
import {UserContext} from "../../security_context/UserContext";

const ProjectListTable = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const {permissions, fetchPermissions} = useContext(UserContext);
    const [filters, setFilters] = useState({
        name: "",
        projectAddress: "",
        buldingFacility: "",
        projectManager: "",
        startedAt: "",
        deadline: "",
        state: "",
    });

    useEffect(() => {
        fetchPermissions();
    }, []);

    function handleFilterChange(name, value) {
        const updatedFilters = {...filters, [name]: value};
        setFilters(updatedFilters);

        const filtered = projects.filter((project) => {
            return (
                project.name.toLowerCase().includes(updatedFilters.name.toLowerCase()) &&
                //     TODO if null then break
                project.projectAddress.city.toLowerCase().includes(updatedFilters.projectAddress.toLowerCase()) &&
                project.buldingFacility.toLowerCase().includes(updatedFilters.buldingFacility.toLowerCase()) &&
                (project.projectManager.firstname + " " + project.projectManager.lastname).toLowerCase().includes(updatedFilters.projectManager.toLowerCase()) &&
                project.startedAt.toLowerCase().includes(updatedFilters.startedAt.toLowerCase()) &&
                project.deadline.toLowerCase().includes(updatedFilters.deadline.toLowerCase()) &&
                project.state.toLowerCase().includes(updatedFilters.state.toLowerCase())
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
        setFilteredProjects(updatedProjects);
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
            <table>
                <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Město</th>
                    <th>Stavební objekt</th>
                    <th>Projektový manager</th>
                    <th>Zahájení projektu</th>
                    <th>Plánované ukončení</th>
                    <th>Stav</th>
                    {
                        permissions === "ROLE_ADMIN" ?
                            <th>Akce</th> : ""
                    }                </tr>
                <ProjectsFilter onFilterChange={handleFilterChange}/>
                </thead>
                <tbody>
                {filteredProjects.map(project => (<tr key={project.id}>
                    <td className={"td14rem"}>
                        <Link to={"/projects/" + project.id} className={styles.detailLink}>
                            {project.name}
                        </Link>
                    </td>
                    <td className={"td10rem"}>{project.projectAddress ? project.projectAddress.city : "-"}</td>
                    <td className={"td14rem"}>{project.buldingFacility}</td>
                    <td className={"td14rem"}>{project.projectManager ?
                        <Link to={"/users/" + project.projectManager.id} className={styles.detailLink}>
                            {project.projectManager.firstname.concat(" ", project.projectManager.lastname)}
                        </Link>
                        :
                        "-"}</td>
                    <td className={"td10rem"}>{project.startedAt.substring(0, 10)}</td>
                    <td className={"td10rem"}>{project.deadline.substring(0, 10)}</td>
                    <td className={`${getStatusClassName(project.state)} ${styles.state} td10rem`}>
                        {project.state}
                    </td>
                    {
                        permissions === "ROLE_ADMIN" ?
                            <td className={styles.buttonTd}>
                                <Link to={"/projects/edit/" + project.id}>
                                    <EditButton/>
                                </Link>
                                <div onClick={() => handleDeleteProject(project.id)}>
                                    <DeleteButton/>
                                </div>
                            </td> : ""
                    }
                </tr>))}
                </tbody>
            </table>
        </div>);
};

export default ProjectListTable;