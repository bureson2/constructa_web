import React from "react";
import styles from "./style.module.scss";

function VehiclesFilter({ onFilterChange }) {
    function handleFilterChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        onFilterChange(name, value);
    }

    return (
        <tr className={styles.filterRow}>
            <td><input type="text" name="registrationNumber" onChange={handleFilterChange} placeholder="SPZ..." /></td>
            <td><input type="text" name="type" onChange={handleFilterChange} placeholder="Typ (ca, v, t)..." /></td>
            <td><input type="text" name="factory" onChange={handleFilterChange} placeholder="Značka..." /></td>
            <td><input type="text" name="name" onChange={handleFilterChange} placeholder="Model..." /></td>
            <td></td>
            <td></td>
        </tr>
    );
}

export default VehiclesFilter;