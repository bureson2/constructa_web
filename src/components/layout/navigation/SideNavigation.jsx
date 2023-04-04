import React, {useContext, useEffect} from "react";
import styles from "./style.module.scss";
import {Link} from "react-router-dom"
import {UserContext} from "../../../security_context/UserContext";

function SideNavigation({location}) {
    const {permissions, fetchPermissions} = useContext(UserContext);

    useEffect(() => {
        fetchPermissions();
    }, []);

    return (
        <ul className={styles.navList}>
            <li className={location === "USERS" ? styles.active : ""}>
                <Link to="/users" className={styles.navLink}>
                    Zaměstnanci
                </Link>
            </li>
            <li className={location === "TASKS" ? styles.active : ""}>
                <Link to="/tasks" className={styles.navLink}>
                    Úkoly
                </Link>
            </li>
            <li className={location === "VEHICLES" ? styles.active : ""}>
                <Link to="/vehicles" className={styles.navLink}>
                    Vozidla
                </Link>
            </li>
            <li className={location === "PROJECTS" ? styles.active : ""}>
                <Link to="/projects" className={styles.navLink}>
                    Projekty
                </Link>
            </li>
            <li className={location === "COMPANIES" ? styles.active : ""}>
                <Link to="/companies" className={styles.navLink}>
                    Společnosti
                </Link>
            </li>
            {/*{permissions === "ROLE_ADMIN" ?*/}
            {/*    <>*/}
            {/*        <li className={location === "TASKS" ? styles.active : ""}>*/}
            {/*            <Link to="/tasks" className={styles.navLink}>*/}
            {/*                Úkoly*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={location === "VEHICLES" ? styles.active : ""}>*/}
            {/*            <Link to="/vehicles" className={styles.navLink}>*/}
            {/*                Vozidla*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={location === "PROJECTS" ? styles.active : ""}>*/}
            {/*            <Link to="/projects" className={styles.navLink}>*/}
            {/*                Projekty*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*        <li className={location === "COMPANIES" ? styles.active : ""}>*/}
            {/*            <Link to="/companies" className={styles.navLink}>*/}
            {/*                Společnosti*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*    </> */}
            {/*    */}
            {/*    :*/}
            {/*    <>*/}
            {/*        <li className={location === "USERS" ? styles.active : ""}>*/}
            {/*            <Link to="/users" className={styles.navLink}>*/}
            {/*                Zaměstnanci*/}
            {/*            </Link>*/}
            {/*        </li>*/}
            {/*    </>*/}
            {/*}*/}
        </ul>
    );
}

export default SideNavigation;