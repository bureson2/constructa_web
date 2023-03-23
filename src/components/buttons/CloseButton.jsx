import styles from "./style.module.scss";
import icon from "../../svg/close_icon.svg"

function CloseButton() {
    return (
        <button className={`${styles.button} ${styles.closeButton}`}>
            <img src={icon} alt="Close Icon" />
        </button>
    );
}

export default CloseButton;