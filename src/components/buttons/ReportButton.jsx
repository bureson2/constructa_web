import styles from "./style.module.scss";
import icon from "../../svg/report_icon.svg"
function ReportButton() {
    return (
        <button className={`${styles.button} ${styles.reportButton}`}>
            <img src={icon} alt="Report Icon" />
        </button>
    );
}

export default ReportButton;