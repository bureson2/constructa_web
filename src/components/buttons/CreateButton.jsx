import styles from "./style.module.scss";
import icon from "../../images/add_icon.svg"

function CreateButton() {
    return (
        <button className={`${styles.button} ${styles.createButton}`}>
            <img src={icon} alt="Create Icon" />
        </button>
    );
}

export default CreateButton;