import {useState, useEffect} from 'react';
import axios from 'axios';

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
            <h2>Seznam úkolů</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Úkol</th>
                    <th>Popis úkolu</th>
                    <th>Místo</th>
                    <th>Řešitel</th>
                    <th>Od:</th>
                    <th>Do:</th>
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskListTable;