import React from "react";
import styles from "./style.module.scss";
import {Link} from "react-router-dom"

// TODO links and items in navigation
function SideNavigation() {
    return (
        <ul className={styles.navList}>
            <li className={styles.navItem}>
                <Link to="/users" className={styles.navLink}>
                    Zaměstnanci
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link to="/tasks" className={styles.navLink}>
                    Úkoly
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link to="/vehicles" className={styles.navLink}>
                    Vozidla
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link to="/projects" className={styles.navLink}>
                    Projekty
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link to="/documents" className={styles.navLink}>
                    Dokumenty
                </Link>
            </li>
        </ul>
    );
}

export default SideNavigation;