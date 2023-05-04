import React, {useState, useEffect, useContext} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import EditButton from "../buttons/EditButton";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import {Link} from "react-router-dom";
import TaskFilter from "../../filters/TasksFilter";
import {UserContext} from "../../security_context/UserContext";

const TaskListTable = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const {permissions, fetchPermissions} = useContext(UserContext);
    const [filters, setFilters] = useState({
        name: "",
        locationName: "",
        assignee: "",
        timeFrom: "",
        timeTo: "",
        state: "",
    });

    // useEffect(() => {
    //     fetchPermissions();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPermissions();
                let endpoint = 'http://localhost:8080/api/v1/tasks';
                if (!["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_CONSTRUCTION_MANAGER"].includes(permissions)){
                    endpoint = 'http://localhost:8080/api/v1/tasks/my'
                }

                const response = await axios.get(endpoint, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });

                setTasks(response.data);
                setFilteredTasks(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    function handleFilterChange(name, value) {
        const updatedFilters = {...filters, [name]: value};
        setFilters(updatedFilters);

        const filtered = tasks.filter((task) => {
            return (
                task.name.toLowerCase().includes(updatedFilters.name.toLowerCase()) &&
                task.locationName.toLowerCase().includes(updatedFilters.locationName.toLowerCase()) &&
                (task.assignee.firstname.toLowerCase() + " " + task.assignee.lastname.toLowerCase()).includes(updatedFilters.assignee) &&
                task.timeFrom.toLowerCase().includes(updatedFilters.timeFrom.toLowerCase()) &&
                task.timeTo.toLowerCase().includes(updatedFilters.timeTo.toLowerCase()) &&
                task.state.toLowerCase().includes(updatedFilters.state.toLowerCase())
            );
        });
        setFilteredTasks(filtered);
    }

    function handleDeleteTask(taskId) {

        axios.delete('http://localhost:8080/api/v1/tasks/' + taskId, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });

        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setFilteredTasks(updatedTasks);
    }

    function getStatusClassName(status) {
        switch (status) {
            case "Nový":
                return "blue";
            case "V řešení":
                return "yellow";
            case "Pozastaveno":
                return "red";
            default:
                return "green";
        }
    }

    return (<div>
        <div className={styles.tableHeader}>
            <h2>Seznam úkolů</h2>
            {
                ["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_CONSTRUCTION_MANAGER"].includes(permissions) ?
                    <Link to="/tasks/create">
                        <CreateButton/>
                    </Link> : ""
            }
        </div>
        <table>
            <thead>
            <tr>
                <th>Úkol</th>
                <th>Místo</th>
                <th>Řešitel</th>
                <th>Od</th>
                <th>Do</th>
                <th>Stav</th>
                {
                    permissions === "ROLE_ADMIN" ?
                        <th>Akce</th> : ""
                }            </tr>
            <TaskFilter onFilterChange={handleFilterChange}/>
            </thead>
            <tbody>
            {filteredTasks.map(task => (<tr key={task.id}>
                <td className={"td26rem"}>
                    <Link to={"/tasks/" + task.id} className={styles.detailLink}>
                        {task.name}
                    </Link>
                </td>
                <td className={"td18rem"}>{task.locationName}</td>
                <td className={"td14rem"}>{task.assignee ? task.assignee.firstname.concat(" ", task.assignee.lastname) : "-"}</td>
                <td className={"td10rem"}>{task.timeFrom.substring(0, 10)}</td>
                <td className={"td10rem"}>{task.timeTo.substring(0, 10)}</td>
                <td className={
                    `${getStatusClassName(task.state)} ${styles.state} "td10rem"`}>{task.state}
                </td>
                {
                    permissions === "ROLE_ADMIN" ?
                        <td className={styles.buttonTd}>
                            <Link to={"/tasks/edit/" + task.id}>
                                <EditButton/>
                            </Link>
                            <div onClick={() => handleDeleteTask(task.id)}>
                                <DeleteButton/>
                            </div>
                        </td> : ""
                }
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default TaskListTable;