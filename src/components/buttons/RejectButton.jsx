import styles from "./style.module.scss";
import icon from "../../images/close_icon.svg"

function RejectButton() {
    return (
        <button className={`${styles.button} ${styles.rejectButton}`}>
            <img src={icon} alt="Reject Icon" />
        </button>
    );
}

export default RejectButton;