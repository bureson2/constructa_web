import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import Select from 'react-select';
import axios from "axios";


const UserInput = ({ onUserIdChange  }) => {
    const [inputValue, setInputValue] = useState('');
    const [users, setUsers] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get('http://localhost:8080/api/v1/users/search', config);
            setUsers(response.data);
        };
        fetchUsers();
    }, [token]);


    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleSelectUser = (selectedOption) => {
        onUserIdChange(selectedOption.value); // předáváme vybranou hodnotu zpět do rodičovské komponenty
    };

    const options = users.map((user) => ({
        value: user.id,
        label: user.firstname + " " + user.lastname,
    }));

    return (
        <Select
            options={options}
            inputValue={inputValue}
            onInputChange={ (event) => handleInputChange(event.valueOf())}
            onChange={handleSelectUser}
            className="input-list"
        />
    );
};

export default UserInput;