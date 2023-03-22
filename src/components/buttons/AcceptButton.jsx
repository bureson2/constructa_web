import styles from "./style.module.scss";
import icon from "../../images/check_icon.svg"
function AcceptButton() {
    return (
        <button className={`${styles.button} ${styles.acceptButton}`}>
            <img src={icon} alt="Accept Icon" />
        </button>
    );
}

export default AcceptButton;