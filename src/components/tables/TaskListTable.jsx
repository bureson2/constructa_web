import {useState, useEffect} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import EditButton from "../buttons/EditButton";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import {Link} from "react-router-dom";

const TaskListTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/tasks'
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div>
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
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.description}</td>
                        <td>{user.id}</td>
                        <td>{user.locationTime}</td>
                        <td>{user.assignee ? user.assignee.firstname.concat(" ", user.assignee.lastname) : "-"}</td>
                        <td>{user.timeFrom}</td>
                        <td>{user.timeTo}</td>
                        <td className={styles.buttonTd}>
                            {/* TODO edit*/}
                            <Link to="/tasks/edit/1">
                                <EditButton/>
                            </Link>
                            <DeleteButton/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskListTable;