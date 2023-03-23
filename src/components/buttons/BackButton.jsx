import styles from "./style.module.scss";
import icon from "../../svg/back_icon.svg"
function BackButton() {
    return (
        <button className={`${styles.button} ${styles.backButton}`}>
            <img src={icon} alt="Back Icon" />
        </button>
    );
}

export default BackButton;