import React, {useState, useEffect} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import {Link} from "react-router-dom";
import CreateButton from "../buttons/CreateButton";
import ReportButton from "../buttons/ReportButton";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

const UserListTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users'
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

    function handleDeleteUser(userId) {

        axios.delete('http://localhost:8080/api/v1/users/' + userId, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .catch(error => {
                console.log(error);
            });

        const updatedUser = users.filter(user => user.id !== userId);
        setUsers(updatedUser);
    }

    return (
        <div>
            <div className={styles.tableHeader}>

                <h2>Seznam zaměstnanců</h2>
                <div className={styles.buttonTd}>
                    <Link to="/users/create">
                        <CreateButton/>
                    </Link>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Jméno a příjmení</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>
                            <Link to={"/users/" + user.id} className={styles.detailLink}>
                                {user.firstname}&nbsp;{user.lastname}
                            </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td className={styles.buttonTd}>
                            <Link to={"/users/edit/" + user.id}>
                                <EditButton/>
                            </Link>
                            <div onClick={() => handleDeleteUser(user.id)}>
                                <DeleteButton/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserListTable;