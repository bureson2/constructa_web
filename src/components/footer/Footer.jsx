import styles from "./style.module.scss";

function Footer() {
    return (
        <div className={styles.container}>
            <p>&copy; {new Date().getFullYear()} Constructa. Všechna práva vyhrazena.</p>
        </div>
    );
}

export default Footer;