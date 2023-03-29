import React from "react";
import styles from "./style.module.scss";

function TaskFilter({ onFilterChange }) {
    function handleFilterChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        onFilterChange(name, value);
    }

    return (
        <tr className={styles.filterRow}>
            <td><input type="text" name="name" onChange={handleFilterChange} placeholder="Název..." /></td>
            <td><input type="text" name="locationName" onChange={handleFilterChange} placeholder="Lokalita..." /></td>
            <td><input type="text" name="assignee" onChange={handleFilterChange} placeholder="Řešitel..." /></td>
            <td><input type="text" name="timeFrom" onChange={handleFilterChange} placeholder="Od..." /></td>
            <td><input type="text" name="timeTo" onChange={handleFilterChange} placeholder="Do..." /></td>
            <td><input type="text" name="state" onChange={handleFilterChange} placeholder="Stav..." /></td>
            <td></td>
        </tr>
    );
}

export default TaskFilter;