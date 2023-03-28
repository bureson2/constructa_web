import React from "react";
import styles from "./style.module.scss";

function Filter({ onFilterChange }) {
    function handleFilterChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        onFilterChange(name, value);
    }

    return (
        <tr className={styles.filterRow}>
            <td className={styles.filterInput12}><input type="text" name="name" onChange={handleFilterChange} placeholder="Název..." /></td>
            <td className={styles.filterInput8}><input type="text" name="cin" onChange={handleFilterChange} placeholder="IČO..." /></td>
            <td className={styles.filterInput8}><input type="text" name="din" onChange={handleFilterChange} placeholder="DIČ..." /></td>
            <td className={styles.filterInput8}><input type="text" name="companyAddress" onChange={handleFilterChange} placeholder="Město..." /></td>
        <td></td>
        </tr>
    );
}

export default Filter;