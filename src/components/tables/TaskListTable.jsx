import React, {useState, useEffect} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import EditButton from "../buttons/EditButton";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import {Link} from "react-router-dom";
import EditTask from "../forms/task_form/EditTask";

const TaskListTable = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/tasks', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleDeleteTask(taskId) {

        axios.delete('http://localhost:8080/api/v1/tasks/' + taskId , {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });

        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    }

    return (<div>
        <div className={styles.tableHeader}>
            <h2>Seznam úkolů</h2>
            <Link to="/tasks/create">
                <CreateButton/>
            </Link>
        </div>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Úkol</th>
                <th>Popis úkolu</th>
                <th>Místo</th>
                <th>Řešitel</th>
                <th>Od</th>
                <th>Do</th>
                <th>Akce</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map(task => (<tr key={task.id}>
                <td>{task.id}</td>
                <td>
                    <Link to={"/tasks/" + task.id} className={styles.detailLink}>
                        {task.name}
                    </Link></td>
                <td>{task.description}</td>
                <td>{task.locationTime}</td>
                <td>{task.assignee ? task.assignee.firstname.concat(" ", task.assignee.lastname) : "-"}</td>
                <td>{task.timeFrom}</td>
                <td>{task.timeTo}</td>
                <td className={styles.buttonTd}>
                    <Link to={"/tasks/edit/" + task.id}>
                        <EditButton/>
                    </Link>
                    <div onClick={() => handleDeleteTask(task.id)}>
                        <DeleteButton />
                    </div>
                </td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default TaskListTable;