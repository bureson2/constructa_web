import React, {useState, useEffect, useContext} from 'react';
import styles from "./style.module.scss";
import axios from 'axios';
import {Link} from "react-router-dom";
import CreateButton from "../buttons/CreateButton";
import ReportButton from "../buttons/ReportButton";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import UsersFilter from "../../filters/UsersFilter";
import {UserContext} from "../../security_context/UserContext";

const UserListTable = () => {
    const [users, setUsers] = useState([]);
    const [filteredUser, setFilteredUsers] = useState([]);
    const {permissions, fetchPermissions} = useContext(UserContext);
    const [filters, setFilters] = useState({
        name: "",
        role: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        fetchPermissions();
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users'
            , {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data)
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

    function handleFilterChange(name, value) {
        const updatedFilters = {...filters, [name]: value};
        setFilters(updatedFilters);

        const filtered = users.filter((user) => {
            return (
                (user.firstname + " " + user.lastname).toLowerCase().includes(updatedFilters.name.toLowerCase()) &&
                user.role.toLowerCase().includes(updatedFilters.role.toLowerCase()) &&
                user.email.toLowerCase().includes(updatedFilters.email.toLowerCase()) &&
                user.phone.toLowerCase().includes(updatedFilters.phone.toLowerCase())
            );
        });
        setFilteredUsers(filtered);
    }

    return (
        <div>
            <div className={styles.tableHeader}>

                <h2>Seznam zaměstnanců</h2>
                <div className={styles.buttonTd}>
                    <Link to="/users/create">
                        <CreateButton/>
                    </Link>
                    <Link to={"/work-reports/create"}>
                        <ReportButton/>
                    </Link>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Jméno a příjmení</th>
                    <th>Pozice</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    {
                        permissions === "ROLE_ADMIN" ?
                            <th>Akce</th> : ""
                    }
                </tr>
                <UsersFilter onFilterChange={handleFilterChange}/>
                </thead>
                <tbody>
                {filteredUser.map(user => (
                    <tr key={user.id}>
                        <td className={"td25percent"}>
                            <Link to={"/users/" + user.id} className={styles.detailLink}>
                                {user.firstname}&nbsp;{user.lastname}
                            </Link>
                        </td>
                        <td className={"td25percent"}>{user.role}</td>
                        <td className={"td25percent"}>{user.email}</td>
                        <td className={"td25percent"}>{user.phone}</td>
                        {
                            permissions === "ROLE_ADMIN" ?
                                <td className={styles.buttonTd}>
                                    <Link to={"/users/edit/" + user.id}>
                                        <EditButton/>
                                    </Link>
                                    <div onClick={() => handleDeleteUser(user.id)}>
                                        <DeleteButton/>
                                    </div>
                                </td> : ""
                        }
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserListTable;