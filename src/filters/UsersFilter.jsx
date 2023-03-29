import React from "react";
import styles from "./style.module.scss";

function UsersFilter({ onFilterChange }) {
    function handleFilterChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        onFilterChange(name, value);
    }

    return (
        <tr className={styles.filterRow}>
            <td><input type="text" name="name" onChange={handleFilterChange} placeholder="Jméno..." /></td>
            <td><input type="text" name="role" onChange={handleFilterChange} placeholder="Role..." /></td>
            <td><input type="text" name="email" onChange={handleFilterChange} placeholder="Email..." /></td>
            <td><input type="text" name="phone" onChange={handleFilterChange} placeholder="Telefon..." /></td>
            <td></td>
        </tr>
    );
}

export default UsersFilter;