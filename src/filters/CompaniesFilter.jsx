import React from "react";
import styles from "./style.module.scss";

function CompaniesFilter({ onFilterChange }) {
    function handleFilterChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        onFilterChange(name, value);
    }

    return (
        <tr className={styles.filterRow}>
            <td><input type="text" name="name" onChange={handleFilterChange} placeholder="Název..." /></td>
            <td><input type="text" name="cin" onChange={handleFilterChange} placeholder="IČO..." /></td>
            <td><input type="text" name="din" onChange={handleFilterChange} placeholder="DIČ..." /></td>
            <td><input type="text" name="companyAddress" onChange={handleFilterChange} placeholder="Město..." /></td>
            <td><input type="text" name="phone" onChange={handleFilterChange} placeholder="Telefon..." /></td>
        <td></td>
        </tr>
    );
}

export default CompaniesFilter;