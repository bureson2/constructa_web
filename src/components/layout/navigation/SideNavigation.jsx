import React from "react";
import styles from "./style.module.scss";
import {Link} from "react-router-dom"

// TODO links and items in navigation
function SideNavigation({location}) {
    return (
        <ul className={styles.navList}>
            <li className={ location === "USERS" ? styles.active : ""}>
                <Link to="/users" className={styles.navLink}>
                    Zaměstnanci
                </Link>
            </li>
            <li className={ location === "TASKS" ? styles.active : ""}>
                <Link to="/tasks" className={styles.navLink}>
                    Úkoly
                </Link>
            </li>
            <li className={ location === "VEHICLES" ? styles.active : ""}>
                <Link to="/vehicles" className={styles.navLink}>
                    Vozidla
                </Link>
            </li>
            <li className={ location === "PROJECTS" ? styles.active : ""}>
                <Link to="/projects" className={styles.navLink}>
                    Projekty
                </Link>
            </li>
            <li className={ location === "COMPANIES" ? styles.active : ""}>
                <Link to="/companies" className={styles.navLink}>
                    Společnosti
                </Link>
            </li>
        </ul>
    );
}

export default SideNavigation;