import {useEffect, useState} from "react";
import Select from 'react-select';
import axios from "axios";


const UserInput = ({ onUserIdChange, defaultUser  }) => {
    const [inputValue, setInputValue] = useState('');
    let [options, setOptions] = useState([]);
    let defaultOption = {
        label: "",
        value: ""
    };
    const [selectedOption, setSelectedOption] = useState(defaultOption);
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

    // TODO fix first try on change
    useEffect(() => {
        let defaultOption = null;
        if (defaultUser) {
            const selectedUser = users.find(user => user.id === defaultUser.id);
            if (selectedUser) {
                defaultOption = {
                    value: selectedUser.id,
                    label: selectedUser.firstname + ' ' + selectedUser.lastname,
                };
                setInputValue(defaultOption.label);
            }
        }

    }, [defaultUser, users]);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleSelectUser = (selectedOption) => {
        onUserIdChange(selectedOption.value); // předáváme vybranou hodnotu zpět do rodičovské komponenty

    };

    options = users.map((user) => ({
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