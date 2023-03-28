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
            <td className={styles.filterInput12}><input type="text" name="name" onChange={handleFilterChange} placeholder="Jméno..." /></td>
            <td className={styles.filterInput8}><input type="text" name="role" onChange={handleFilterChange} placeholder="Role..." /></td>
            <td className={styles.filterInput8}><input type="text" name="email" onChange={handleFilterChange} placeholder="Email..." /></td>
            <td className={styles.filterInput8}><input type="text" name="phone" onChange={handleFilterChange} placeholder="Telefon..." /></td>
            <td></td>
        </tr>
    );
}

export default UsersFilter;