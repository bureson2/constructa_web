import React from "react";

function Filter({ onFilterChange }) {
    function handleFilterChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        onFilterChange(name, value);
    }

    return (
        <div>
            <input type="text" name="name" onChange={handleFilterChange} placeholder="Jméno..." />
            <input type="text" name="city" onChange={handleFilterChange} placeholder="Lokalita..." />
            <input type="text" name="city" onChange={handleFilterChange} placeholder="Stavební objekt..." />
            <input type="text" name="city" onChange={handleFilterChange} placeholder="Projektový manager..." />
            <input type="text" name="city" onChange={handleFilterChange} placeholder="Zahájení projektu..." />
            <input type="text" name="city" onChange={handleFilterChange} placeholder="Plánované ukončení..." />
            <input type="text" name="city" onChange={handleFilterChange} placeholder="Stav projektu..." />
        </div>
    );
}

export default Filter;