import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import Select from 'react-select';
import axios from "axios";


const UserInput = ({ onVehicleIdChange, onVehicleTypeChange  }) => {
    const [inputValue, setInputValue] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchVehicles = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response = await axios.get('http://localhost:8080/api/v1/vehicles/search', config);
            setVehicles(response.data);
        };
        fetchVehicles();
    }, [token]);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleSelectVehicle = (selectedOption) => {
        onVehicleIdChange(selectedOption.value); // předáváme vybranou hodnotu zpět do rodičovské komponenty
        onVehicleTypeChange(selectedOption.type);
        console.log(selectedOption.type);
    };

    const options = vehicles.map((vehicle) => ({
        value: vehicle.id,
        label: vehicle.factory + " " + vehicle.name + " (" + vehicle.registrationNumber + ")",
        type: vehicle.type,
    }));

    return (
        <Select
            options={options}
            inputValue={inputValue}
            onInputChange={ (event) => handleInputChange(event.valueOf())}
            onChange={handleSelectVehicle}
            className="input-list"
        />
    );
};

export default UserInput;