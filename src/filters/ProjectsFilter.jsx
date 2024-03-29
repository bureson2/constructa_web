import React from "react";
import styles from "./style.module.scss";

function ProjectsFilter({ onFilterChange }) {
    function handleFilterChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        onFilterChange(name, value);
    }

    return (
        <tr className={styles.filterRow}>
            <td><input type="text" name="name" onChange={handleFilterChange} placeholder="Jméno..." /></td>
            <td><input type="text" name="projectAddress" onChange={handleFilterChange} placeholder="Město..." /></td>
            <td><input type="text" name="buldingFacility" onChange={handleFilterChange} placeholder="Název..." /></td>
            <td><input type="text" name="projectManager" onChange={handleFilterChange} placeholder="Jméno..." /></td>
            <td><input type="text" name="startedAt" onChange={handleFilterChange} placeholder="Datum..." /></td>
            <td><input type="text" name="deadline" onChange={handleFilterChange} placeholder="Datum..." /></td>
            <td><input type="text" name="state" onChange={handleFilterChange} placeholder="Stav..." /></td>
            <td></td>
        </tr>
    );
}

export default ProjectsFilter;